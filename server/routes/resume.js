const express = require('express');
const router = express.Router();
const ResumeController = require('../controllers/resumeController');
const auth = require('../middleware/auth');

// Apply auth middleware to all routes
router.use(auth);

// CRUD operations
router.get('/', ResumeController.getResumes);
router.post('/', ResumeController.createResume);
router.put('/:resumeId', ResumeController.updateResume);
router.delete('/:resumeId', ResumeController.deleteResume);

// PDF generation (async via message queue)
router.post('/:resumeId/generate-pdf', ResumeController.generatePDF);

module.exports = router;
