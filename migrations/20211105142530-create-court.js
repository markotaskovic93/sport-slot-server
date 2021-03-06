'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Courts', {
      id: {
        allowNull: false,
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
      court_description: {
        allowNull: true,
        type: Sequelize.TEXT
      },
      court_enviroment: {
        allowNull: false,
        type: Sequelize.STRING
      },
      court_size: {
        allowNull: true,
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
        allowNull: false,
        type: Sequelize.ARRAY(Sequelize.STRING)
      },
      court_promoted: {
        allowNull: false,
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