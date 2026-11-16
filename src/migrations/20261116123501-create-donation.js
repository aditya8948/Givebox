'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Donations', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
     user_id: {
  type: Sequelize.INTEGER,
  allowNull: false,
  references: {
    model: 'Users',
    key: 'id'
  },
  onDelete: 'CASCADE'
},
     charity_id: {
  type: Sequelize.INTEGER,
  allowNull: false,
  references: {
    model: 'Charities',
    key: 'id'
  },
  onDelete: 'CASCADE'
},
     project_id: {
  type: Sequelize.INTEGER,
  allowNull: true,
  references: {
    model: 'Projects',
    key: 'id'
  },
  onDelete: 'SET NULL' // Keep donation record even if project is deleted
},
      donor_name: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      donor_email: {
        type: Sequelize.STRING(150),
        allowNull: false
      },
      amount: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false
      },
     payment_status: {
  type: Sequelize.ENUM('pending', 'success', 'failed'),
  defaultValue: 'pending',
  allowNull: false
},
      order_id: {
        type: Sequelize.STRING
      },
      payment_id: {
        type: Sequelize.STRING
      },
    receipt_number: {
  type: Sequelize.STRING(50),
  allowNull: true,
  unique: true
},
      receipt_path: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Donations');
  }
};