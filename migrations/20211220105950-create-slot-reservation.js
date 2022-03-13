module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Slot_reservations', {
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
        type: Sequelize.BIGINT
      },
      players_needed: {
        allowNull: false,
        type: Sequelize.STRING
      },
      players_accepted: {
        allowNull: false,
        type: Sequelize.STRING
      },
      reservation_status: {
        allowNull: false,
        type: Sequelize.STRING
      },
      players_can_join: {
        allowNull: false,
        type: Sequelize.STRING
      },
      payment_type: {
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
    await queryInterface.dropTable('Slot_reservations');
  }
};