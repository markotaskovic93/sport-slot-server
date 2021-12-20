'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Court_slots', {
      id: {
        primaryKey: true,
        type: Sequelize.BIGINT
      },
      court_id: {
        allowNull: false,
        type: Sequelize.BIGINT
      },
      court_slot_date: {
        allowNull: false,
        type: Sequelize.STRING
      },
      court_slot_start_time: {
        allowNull: false,
        type: Sequelize.STRING
      },
      court_slot_end_time: {
        allowNull: false,
        type: Sequelize.STRING
      },
      court_slot_price: {
        allowNull: false,
        type: Sequelize.STRING
      },
      court_slot_discount: {
        allowNull: true,
        type: Sequelize.STRING
      },
      blocked: {
        allowNull: false,
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
    await queryInterface.dropTable('Court_slots');
  }
};