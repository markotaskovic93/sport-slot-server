module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Slot_players', {
      id: {
        primaryKey: true,
        type: Sequelize.BIGINT
      },
      slot_id: {
        type: Sequelize.BIGINT
      },
      player_id: {
        type: Sequelize.BIGINT
      },
      invite_status: {
        type: Sequelize.BOOLEAN
      },
      invitation_responded: {
        type: Sequelize.BOOLEAN
      },
      slot_price: {
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
    await queryInterface.dropTable('Slot_players');
  }
};