'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Reservations', {
      id: {
        primaryKey: true,
        type: Sequelize.BIGINT
      },
      slot_id: {
        allowNull: false,
        type: Sequelize.BIGINT
      },
      admin_player_id: {
        allowNull: false,
        type: Sequelize.STRING
      },
      players_needed: {
        allowNull: false,
        type: Sequelize.STRING
      },
      players_accepted: {
        allowNull: false,
        type: Sequelize.STRING
      },
      sport: {
        allowNull: false,
        type: Sequelize.STRING
      },
      is_paid: {
        allowNull: false,
        type: Sequelize.BOOLEAN
      },
      price_per_person: {
        allowNull: true,
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
    await queryInterface.dropTable('Reservations');
  }
};