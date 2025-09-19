const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const messageQueue = require('./config/messageQueue');
const ResumeController = require('./controllers/resumeController');

// Import routes
const authRoutes = require('./routes/auth');
const resumeRoutes = require('./routes/resume');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Database connection
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

// Initialize RabbitMQ connection
async function initializeMessageQueue() {
    try {
        await messageQueue.connect();
        
        // Start consuming PDF responses
        messageQueue.consumePDFResponses(ResumeController.handlePDFResponse);
        
        console.log('Message queue initialized successfully');
    } catch (error) {
        console.error('Failed to initialize message queue:', error);
        process.exit(1);
    }
}

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/resume', resumeRoutes);

// Health check
app.get('/health', (req, res) => {
    res.json({ 
        status: 'OK', 
        timestamp: new Date().toISOString(),
        service: 'main-service'
    });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ 
        message: 'Something went wrong!',
        error: process.env.NODE_ENV === 'development' ? err.message : {}
    });
});

// Start server
async function startServer() {
    try {
        await initializeMessageQueue();
        
        app.listen(PORT, () => {
            console.log(`Main service running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
}

// Graceful shutdown
process.on('SIGINT', () => {
    console.log('Received SIGINT, shutting down gracefully...');
    messageQueue.close();
    process.exit(0);
});

startServer();
