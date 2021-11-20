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
      name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      address: {
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
      available_sports: {
        allowNull: false,
        type: Sequelize.ARRAY(Sequelize.STRING)
      },
      baners: {
        allowNull: true,
        type: Sequelize.ARRAY(Sequelize.STRING)
      },
      state: {
        allowNull: false,
        type: Sequelize.STRING
      },
      city: {
        allowNull: false,
        type: Sequelize.STRING
      },
      street: {
        allowNull: false,
        type: Sequelize.STRING
      },
      facilities: {
        allowNull: true,
        type: Sequelize.ARRAY(Sequelize.STRING)
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