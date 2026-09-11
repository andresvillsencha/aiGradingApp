const express = require('express');


// Routes
    const studentRoutes = require('./student.routes');
    const testsRoutes = require('./tests.routes');
    const attemptsRoutes = require('./attempts.routes');
    
// Express Router

    const router = express.Router();

router.get('/health', (req, res) => {
    res.json({
        success: true,
        status: 'healthy',
        timestamp: new Date().toISOString()
    });
});

router.use('/students', studentRoutes);
router.use('/tests', testsRoutes);
router.use('/attempts', attemptsRoutes);

module.exports = router;