'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Reservation_players_requests', {
      id: {
        primaryKey: true,
        type: Sequelize.BIGINT
      },
      slot_id: {
        type: Sequelize.BIGINT
      },
      reservation_id: {
        type: Sequelize.BIGINT
      },
      player_id: {
        type: Sequelize.BIGINT
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
    await queryInterface.dropTable('Reservation_players_requests');
  }
};