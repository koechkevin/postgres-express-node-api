
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Staffs', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    name: {
      allowNull: false,
      type: Sequelize.STRING
    },
    mobile: {
      allowNull: false,
      type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING,
      allowNull: true,
      defaultValue: null
    },
    position: {
      allowNull: false,
      type: Sequelize.STRING
    },
    idNumber: {
      allowNull: false,
      type: Sequelize.STRING
    },
    hireDate: {
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
  }),
  down: (queryInterface, Sequelize) => queryInterface.dropTable('Staffs')
};
