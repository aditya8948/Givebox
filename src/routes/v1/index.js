const express = require('express');
const router = express.Router();
const authRoutes = require('./authRoutes');
const charityRoutes = require('./charityRoutes');


router.use('/auth', authRoutes);
router.use('/charities', charityRoutes);

module.exports = router;