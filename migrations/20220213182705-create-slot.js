'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Slots', {
      id: {
        primaryKey: true,
        type: Sequelize.BIGINT
      },
      court_id: {
        allowNull: false,
        type: Sequelize.BIGINT
      },
      slot_date: {
        allowNull: false,
        type: Sequelize.STRING
      },
      slot_start_time: {
        allowNull: false,
        type: Sequelize.STRING
      },
      slot_end_time: {
        allowNull: false,
        type: Sequelize.STRING
      },
      slot_price: {
        allowNull: false,
        type: Sequelize.STRING
      },
      slot_discount: {
        allowNull: true,
        type: Sequelize.STRING
      },
      slot_city: {
        allowNull: false,
        type: Sequelize.STRING
      },
      slot_state: {
        allowNull: false,
        type: Sequelize.STRING
      },
      slot_has_reservation: {
        allowNull: true,
        type: Sequelize.BOOLEAN
      },
      slot_reservation_id: {
        allowNull: true,
        type: Sequelize.STRING
      },
      slot_available_sports: {
        allowNull: false,
        type: Sequelize.ARRAY(Sequelize.STRING)
      },  
      slot_booked: {
        allowNull: false,
        type: Sequelize.BOOLEAN
      },
      slot_blocked: {
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
    await queryInterface.dropTable('Slots');
  }
};