'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Booked_slots', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id: {
        type: Sequelize.BIGINT
      },
      court_id: {
        type: Sequelize.BIGINT
      },
      slot_id: {
        type: Sequelize.BIGINT
      },
      player_id: {
        type: Sequelize.BIGINT
      },
      player_needed: {
        type: Sequelize.STRING
      },
      reservation_status: {
        type: Sequelize.STRING
      },
      blocked: {
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
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Booked_slots');
  }
};