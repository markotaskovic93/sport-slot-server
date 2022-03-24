'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Fees', {
      id: {
        primaryKey: true,
        type: Sequelize.BIGINT
      },
      slot_base_fee: {
        allowNull: false,
        type: Sequelize.STRING
      },
      slot_additional_fee: {
        allowNull: false,
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
    await queryInterface.dropTable('Fees');
  }
};