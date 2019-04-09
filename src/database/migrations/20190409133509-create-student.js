
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Students', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    name: {
      type: Sequelize.STRING
    },
    level: {
      type: Sequelize.INTEGER
    },
    stream: {
      type: Sequelize.STRING
    },
    guardian: {
      type: Sequelize.STRING
    },
    contact: {
      type: Sequelize.STRING
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    deletedAt: {
      allowNull: true,
      type: Sequelize.DATE
    }
  }),
  down: (queryInterface, Sequelize) => queryInterface.dropTable('Students')
};
