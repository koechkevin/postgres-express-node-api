
module.exports = (sequelize, DataTypes) => {
  const Student = sequelize.define('Student', {
    name: {
      allowNull: false,
      type: DataTypes.STRING
    },
    level: {
      type: DataTypes.INTEGER
    },
    stream: {
      type: DataTypes.STRING
    },
    guardian: {
      type: DataTypes.STRING
    },
    contact: {
      type: DataTypes.STRING
    }
  }, { paranoid: true });
  Student.associate = (models) => {
    // associations can be defined here
  };
  return Student;
};
