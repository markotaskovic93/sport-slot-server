module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Court_owners', {
      id: {
        primaryKey: true,
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
      avatar: {
        allowNull: true,
        type: Sequelize.STRING
      },
      birthday: {
        type: Sequelize.DATE
      },
      address: {
        type: Sequelize.STRING
      },
      email: {
        unique: true,
        allowNull: false,
        type: Sequelize.CHAR
      },
      password: {
        allowNull: false,
        type: Sequelize.CHAR
      },
      phone: {
        type: Sequelize.CHAR
      },
      personal_id: {
        allowNull: false,
        type: Sequelize.CHAR
      },
      nationality: {
        allowNull: false,
        type: Sequelize.STRING
      },
      verified: {
        type: Sequelize.BOOLEAN
      },
      blocked: {
        type: Sequelize.BOOLEAN
      },
      role: {
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
    await queryInterface.dropTable('Court_owners');
  }
};