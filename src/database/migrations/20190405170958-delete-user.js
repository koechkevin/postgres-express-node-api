

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.addColumn('UserRoles', 'deletedAt', {
    allowNull: true,
    type: Sequelize.DATE
  }),

  down: (queryInterface, Sequelize) => queryInterface.removeColumn('UserRoles', 'deletedAt')
};
