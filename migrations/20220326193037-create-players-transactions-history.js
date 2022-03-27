'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Players_transactions_histories', {
      id: {
        primaryKey: true,
        type: Sequelize.BIGINT
      },
      player_id: {
        type: Sequelize.BIGINT
      },
      transaction_type: {
        type: Sequelize.STRING
      },
      transaction_desc: {
        type: Sequelize.STRING
      },
      transaction_time: {
        type: Sequelize.STRING
      },
      transaction_amount: {
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
    await queryInterface.dropTable('Players_transactions_histories');
  }
};