const charityService = require("../service/charityService")

exports.registerCharity = async (req, res) => {
  try {
    const charity = await charityService.registerCharity(req.user.id, req.body);
    return res.status(201).json({
      message: 'Charity registered successfully. Waiting for admin approval.',
      charity
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({ error: error.message || 'Internal server error' });
  }
};
// GET /api/v1/charities/me
exports.getMyCharity = async (req, res) => {
  try {
    const charity = await charityService.getMyCharity(req.user.id);
    return res.status(200).json({ charity });
  } catch (error) {
    return res.status(error.statusCode || 500).json({ error: error.message || 'Internal server error' });
  }
};
// PUT /api/v1/charities/me
exports.updateMyCharity = async (req, res) => {
  try {
    const charity = await charityService.updateMyCharity(req.user.id, req.body);
    return res.status(200).json({ message: 'Charity profile updated successfully', charity });
  } catch (error) {
    return res.status(error.statusCode || 500).json({ error: error.message || 'Internal server error' });
  }
};
// GET /api/v1/charities
exports.getAllCharities = async (req, res) => {
  try {
    const charities = await charityService.getAllCharities(req.query);
    return res.status(200).json({ total: charities.length, charities });
  } catch (error) {
    return res.status(error.statusCode || 500).json({ error: error.message || 'Internal server error' });
  }
};
// GET /api/v1/charities/:id
exports.getCharityById = async (req, res) => {
  try {
    const charity = await charityService.getCharityById(req.params.id);
    return res.status(200).json({ charity });
  } catch (error) {
    return res.status(error.statusCode || 500).json({ error: error.message || 'Internal server error' });
  }
};
// PATCH /api/v1/charities/:id/verify
exports.verifyCharity = async (req, res) => {
  try {
    const { status, rejection_reason } = req.body;
    const charity = await charityService.verifyCharity(req.params.id, status, rejection_reason);
    return res.status(200).json({
      message: `Charity has been ${status} successfully.`,
      charity
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({ error: error.message || 'Internal server error' });
  }
};