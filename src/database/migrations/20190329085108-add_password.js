module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.addColumn(
    'Staffs', 'password', {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: ''
    }
  ),
  down: queryInterface => queryInterface.removeColumn('Staffs', 'password')
};
