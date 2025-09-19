const Resume = require('../models/Resume');
const messageQueue = require('../config/messageQueue');
const { v4: uuidv4 } = require('uuid');

// Store pending PDF requests
const pendingRequests = new Map();

class ResumeController {
    // Generate PDF (async via message queue)
    async generatePDF(req, res) {
        try {
            const { resumeId } = req.params;
            const userId = req.user.id;

            // Fetch resume data
            const resume = await Resume.findOne({ 
                _id: resumeId, 
                userId: userId 
            });

            if (!resume) {
                return res.status(404).json({ 
                    message: 'Resume not found' 
                });
            }

            // Generate unique request ID
            const requestId = uuidv4();
            
            // Store request info for later response
            pendingRequests.set(requestId, {
                userId: userId,
                resumeId: resumeId,
                timestamp: Date.now(),
                res: res // Store response object for later use
            });

            // Prepare message for PDF service
            const pdfRequest = {
                requestId: requestId,
                resumeData: {
                    personalInfo: resume.personalInfo,
                    education: resume.education,
                    experience: resume.experience,
                    skills: resume.skills,
                    projects: resume.projects
                },
                template: req.body.template || 'modern',
                userId: userId
            };

            // Send to PDF generation queue
            messageQueue.sendToPDFQueue(pdfRequest);

            // Don't send response yet - will be sent when PDF is ready
            console.log(`PDF generation requested for resume ${resumeId}`);

        } catch (error) {
            console.error('Error generating PDF:', error);
            res.status(500).json({ 
                message: 'Failed to generate PDF',
                error: error.message 
            });
        }
    }

    // Handle PDF generation responses
    static handlePDFResponse(data) {
        const { requestId, success, pdfBuffer, error } = data;
        
        const pendingRequest = pendingRequests.get(requestId);
        if (!pendingRequest) {
            console.error('No pending request found for:', requestId);
            return;
        }

        const { res } = pendingRequest;

        if (success && pdfBuffer) {
            // Send PDF as response
            const buffer = Buffer.from(pdfBuffer, 'base64');
            
            res.setHeader('Content-Type', 'application/pdf');
            res.setHeader('Content-Disposition', 'attachment; filename="resume.pdf"');
            res.setHeader('Content-Length', buffer.length);
            res.send(buffer);
            
            console.log(`PDF generated successfully for request ${requestId}`);
        } else {
            res.status(500).json({
                message: 'PDF generation failed',
                error: error || 'Unknown error'
            });
        }

        // Clean up pending request
        pendingRequests.delete(requestId);
    }

    // Get all resumes for user
    async getResumes(req, res) {
        try {
            const userId = req.user.id;
            const resumes = await Resume.find({ userId });
            
            res.json({
                success: true,
                data: resumes
            });
        } catch (error) {
            res.status(500).json({
                message: 'Failed to fetch resumes',
                error: error.message
            });
        }
    }

    // Create new resume
    async createResume(req, res) {
        try {
            const userId = req.user.id;
            const resumeData = req.body;

            const newResume = new Resume({
                ...resumeData,
                userId: userId
            });

            const savedResume = await newResume.save();
            
            res.status(201).json({
                success: true,
                data: savedResume
            });
        } catch (error) {
            res.status(500).json({
                message: 'Failed to create resume',
                error: error.message
            });
        }
    }

    // Update resume
    async updateResume(req, res) {
        try {
            const { resumeId } = req.params;
            const userId = req.user.id;
            const updateData = req.body;

            const updatedResume = await Resume.findOneAndUpdate(
                { _id: resumeId, userId: userId },
                updateData,
                { new: true }
            );

            if (!updatedResume) {
                return res.status(404).json({
                    message: 'Resume not found'
                });
            }

            res.json({
                success: true,
                data: updatedResume
            });
        } catch (error) {
            res.status(500).json({
                message: 'Failed to update resume',
                error: error.message
            });
        }
    }

    // Delete resume
    async deleteResume(req, res) {
        try {
            const { resumeId } = req.params;
            const userId = req.user.id;

            const deletedResume = await Resume.findOneAndDelete({
                _id: resumeId,
                userId: userId
            });

            if (!deletedResume) {
                return res.status(404).json({
                    message: 'Resume not found'
                });
            }

            res.json({
                success: true,
                message: 'Resume deleted successfully'
            });
        } catch (error) {
            res.status(500).json({
                message: 'Failed to delete resume',
                error: error.message
            });
        }
    }
}

module.exports = new ResumeController();
