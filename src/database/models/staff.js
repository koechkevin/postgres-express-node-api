module.exports = (sequelize, DataTypes) => {
  const Staff = sequelize.define('Staff', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    mobile: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null
    },
    position: {
      type: DataTypes.STRING,
      allowNull: false
    },
    idNumber: {
      type: DataTypes.STRING,
      allowNull: false
    },
    hireDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: new Date()
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    }
  }, {});
  Staff.associate = (models) => {
    Staff.hasMany(models.UserRole, {
      foreignKey: 'staffID',
      as: 'staff'
    });
  };
  Staff.prototype.toJSON = function () {
    const values = Object.assign({}, this.get());
    delete values.password;
    return values;
  };
  return Staff;
};
