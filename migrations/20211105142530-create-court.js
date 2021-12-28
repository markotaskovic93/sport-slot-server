'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Courts', {
      id: {
        primaryKey: true,
        type: Sequelize.BIGINT
      },
      court_owner_id: {
        allowNull: true,
        type: Sequelize.BIGINT
      },
      court_name: {
        allowNull: true,
        type: Sequelize.STRING
      },
      court_address: {
        allowNull: true,
        type: Sequelize.STRING
      },
      court_enviroment: {
        allowNull: true,
        type: Sequelize.STRING
      },
      court_size: {
        allowNull: true,
        type: Sequelize.STRING
      },
      court_available_sports: {
        allowNull: true,
        type: Sequelize.ARRAY(Sequelize.STRING)
      },
      court_baners: {
        allowNull: true,
        type: Sequelize.ARRAY(Sequelize.STRING)
      },
      court_state: {
        allowNull: true,
        type: Sequelize.STRING
      },
      court_city: {
        allowNull: true,
        type: Sequelize.STRING
      },
      court_street: {
        allowNull: true,
        type: Sequelize.STRING
      },
      court_facilities: {
        allowNull: true,
        type: Sequelize.ARRAY(Sequelize.STRING)
      },
      court_payment_type: {
        allowNull: true,
        type: Sequelize.STRING
      },
      verified: {
        allowNull: true,
        type: Sequelize.BOOLEAN
      },
      blocked: {
        allowNull: true,
        type: Sequelize.BOOLEAN
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
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Courts');
  }
};