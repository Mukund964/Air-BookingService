'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.addColumn('Bookings','noOfSeats',{type :Sequelize.INTEGER, defaultValue : 1});
    await queryInterface.addColumn('Bookings','totalPrice',{type : Sequelize.INTEGER, defaultValue :0});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeColumn('Bookings','noOfSeats');
    await queryInterface.removeColumn('Bookings','totalPrice');
  }
};
