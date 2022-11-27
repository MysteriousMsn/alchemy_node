'use strict';

module.exports = (sequelize, DataTypes) => {
  const users = sequelize.define(
    'users',
    {
      fullName: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      address: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      phone: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      roleId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM,
        values: ['active', 'in-active'],
        defaultValue: 'active',
        allowNull: false,
      },
    },
    {
      paranoid: true,
      timestamps: true,
      hooks: {
        beforeCreate: async (admin) => {
          admin.password = await global.utils.createHash(admin.password);
        },
      },
    },
  );

  users.associate = (models) => {
    users.belongsTo(models.roles, { foreignKey: 'roleId' });
    models.roles.hasOne(models.users, { foreignKey: 'roleId' });
  };

  users.authenticate = async (password, hasPassword) => {
    return global.utils.compareHash(password, hasPassword);
  };

  return users;
};
