const { Charity, Project, ImpactUpdate } = require('../models');
const { Op } = require('sequelize');

class CharityService {
  // 1. Register a new charity profile
  async registerCharity(userId, charityData) {
    const {
      name,
      category,
      registration_number,
      mission,
      vision,
      description,
      city,
      state,
      postal_code
    } = charityData;

    const existingCharity = await Charity.findOne({ where: { user_id: userId } });
    if (existingCharity) {
      const error = new Error('You have already registered a charity profile.');
      error.statusCode = 400;
      throw error;
    }

    const regExists = await Charity.findOne({ where: { registration_number } });
    if (regExists) {
      const error = new Error('Registration number is already registered by another organization.');
      error.statusCode = 400;
      throw error;
    }

    return await Charity.create({
      user_id: userId,
      name,
      category,
      registration_number,
      mission,
      vision,
      description,
      city,
      state,
      postal_code,
      verification_status: 'pending'
    });
  }

  // 2. Get logged-in charity profile
  async getMyCharity(userId) {
    const charity = await Charity.findOne({
      where: { user_id: userId },
      include: [
        { model: Project, as: 'projects' },
        { model: ImpactUpdate, as: 'updates' }
      ]
    });

    if (!charity) {
      const error = new Error('No charity profile found for this user.');
      error.statusCode = 404;
      throw error;
    }

    return charity;
  }

  // 3. Update logged-in charity profile
  async updateMyCharity(userId, updateData) {
    const charity = await Charity.findOne({ where: { user_id: userId } });

    if (!charity) {
      const error = new Error('No charity profile found.');
      error.statusCode = 404;
      throw error;
    }

    const { name, category, mission, vision, description, city, state, postal_code } = updateData;

    return await charity.update({
      name: name || charity.name,
      category: category || charity.category,
      mission: mission || charity.mission,
      vision: vision !== undefined ? vision : charity.vision,
      description: description || charity.description,
      city: city || charity.city,
      state: state || charity.state,
      postal_code: postal_code || charity.postal_code
    });
  }

  // 4. Public search and filter (Only approved charities)
  async getAllCharities({ category, city, search }) {
    const whereConditions = {
      verification_status: 'approved'
    };

    if (category) {
      whereConditions.category = category;
    }
    if (city) {
      whereConditions.city = city;
    }
    if (search) {
      whereConditions[Op.or] = [
        { name: { [Op.like]: `%${search}%` } },
        { description: { [Op.like]: `%${search}%` } },
        { mission: { [Op.like]: `%${search}%` } }
      ];
    }

    return await Charity.findAll({
      where: whereConditions,
      attributes: ['id', 'name', 'category', 'mission', 'city', 'state', 'createdAt']
    });
  }

  // 5. Public single charity details
  async getCharityById(id) {
    const charity = await Charity.findOne({
      where: {
        id,
        verification_status: 'approved'
      },
      include: [
        { model: Project, as: 'projects' },
        { model: ImpactUpdate, as: 'updates' }
      ]
    });

    if (!charity) {
      const error = new Error('Charity not found or not yet approved.');
      error.statusCode = 404;
      throw error;
    }

    return charity;
  }

  // 6. Admin verification (approve/reject)
  async verifyCharity(id, status, rejectionReason) {
    if (!['approved', 'rejected'].includes(status)) {
      const error = new Error("Status must be either 'approved' or 'rejected'.");
      error.statusCode = 400;
      throw error;
    }

    const charity = await Charity.findByPk(id);
    if (!charity) {
      const error = new Error('Charity not found.');
      error.statusCode = 404;
      throw error;
    }

    charity.verification_status = status;
    charity.verified_at = status === 'approved' ? new Date() : null;
    charity.rejection_reason = status === 'rejected' ? (rejectionReason || 'Does not meet requirements') : null;

    return await charity.save();
  }
}

module.exports = new CharityService();