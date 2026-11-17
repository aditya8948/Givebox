const express = require('express');
const router = express.Router();
const charityController = require('../../controller/charitiesController');
const {authenticate, authorize} = require('../../middleware');

router.get('/', charityController.getAllCharities);
router.get('/:id', charityController.getCharityById);

router.post('/', authenticate, authorize('charity'), charityController.registerCharity);
router.get('/me/profile', authenticate, authorize('charity'), charityController.getMyCharity);
router.put('/me/profile', authenticate, authorize('charity'), charityController.updateMyCharity);


// Admin-only route (Approve or Reject charity)
router.patch('/:id/verify', authenticate, authorize('admin'), charityController.verifyCharity);
module.exports = router;