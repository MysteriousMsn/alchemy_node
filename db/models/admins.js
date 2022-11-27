'use strict';

module.exports = (sequelize, DataTypes) => {
  const admins = sequelize.define(
    'admins',
    {
      firstName: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      lastName: {
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

  admins.associate = (models) => {
    admins.belongsTo(models.roles, { foreignKey: 'roleId' });
    models.roles.hasOne(models.admins, { foreignKey: 'roleId' });
  };

  admins.authenticate = async (password, hasPassword) => {
    return global.utils.compareHash(password, hasPassword);
  };

  return admins;
};
