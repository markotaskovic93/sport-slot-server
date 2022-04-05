'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Players_notifications', {
      id: {
        primaryKey: true,
        type: Sequelize.BIGINT
      },
      slot_id: {
        allowNull: false,
        type: Sequelize.BIGINT
      },
      reservation_id: {
        allowNull: false,
        type: Sequelize.BIGINT
      },
      player_id: {
        allowNull: false,
        type: Sequelize.BIGINT
      },
      notification_type: {
        type: Sequelize.STRING
      },
      notification_desc: {
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
    await queryInterface.dropTable('Players_notifications');
  }
};