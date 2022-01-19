module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Slot_players', {
      id: {
        primaryKey: true,
        type: Sequelize.BIGINT
      },
      slot_reservation_id: {
        allowNull: false,
        type: Sequelize.BIGINT
      },
      player_id: {
        allowNull: false,
        type: Sequelize.BIGINT
      },
      invitation_status: {
        type: Sequelize.BOOLEAN
      },
      invitation_responded: {
        type: Sequelize.BOOLEAN
      },
      price: {
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