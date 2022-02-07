module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Court_owner_payment_methods', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.BIGINT
      },
      court_owner_id: {
        allowNull: false,
        type: Sequelize.BIGINT
      },
      first_name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      last_name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      card_number: {
        allowNull: false,
        type: Sequelize.STRING,
        unique: true
      },
      expiration_month: {
        allowNull: false,
        type: Sequelize.STRING
      },
      expiration_year: {
        allowNull: false,
        type: Sequelize.STRING
      },
      cvv: {
        allowNull: false,
        type: Sequelize.STRING
      },
      zip_code: {
        allowNull: false,
        type: Sequelize.STRING
      },
      state: {
        allowNull: false,
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
    await queryInterface.dropTable('Court_owner_payment_methods');
  }
};