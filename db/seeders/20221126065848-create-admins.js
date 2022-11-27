'use strict';
const bcrypt = require('bcrypt');

let createHash = async (data) => {
  const salt = await bcrypt.genSalt(Number(process.env.HASH_SALT_ROUNDS));
  return bcrypt.hash(data, salt);
};

module.exports = {
  up: async (queryInterface, Sequelize) => {
    let hashpassword = await createHash('Admin@123');
    return queryInterface.bulkInsert(
      'admins',
      [
        {
          firstName: 'admin',
          lastName: 'one',
          email: 'admin@yopmail.com',
          password: hashpassword,
          roleId: '1',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    );
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('admins', null, {});
  },
};
