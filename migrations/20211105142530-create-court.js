'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Courts', {
      id: {
        primaryKey: true,
        type: Sequelize.BIGINT
      },
      court_owner_id: {
        allowNull: false,
        type: Sequelize.BIGINT
      },
      court_name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      court_address: {
        allowNull: false,
        type: Sequelize.STRING
      },
      court_enviroment: {
        allowNull: false,
        type: Sequelize.STRING
      },
      court_size: {
        allowNull: false,
        type: Sequelize.STRING
      },
      court_available_sports: {
        allowNull: false,
        type: Sequelize.ARRAY(Sequelize.STRING)
      },
      court_baners: {
        allowNull: true,
        type: Sequelize.ARRAY(Sequelize.STRING)
      },
      court_state: {
        allowNull: false,
        type: Sequelize.STRING
      },
      court_city: {
        allowNull: false,
        type: Sequelize.STRING
      },
      court_street: {
        allowNull: false,
        type: Sequelize.STRING
      },
      court_facilities: {
        allowNull: true,
        type: Sequelize.ARRAY(Sequelize.STRING)
      },
      court_payment_type: {
        allowNull: false,
        type: Sequelize.STRING
      },
      verified: {
        type: Sequelize.BOOLEAN
      },
      blocked: {
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