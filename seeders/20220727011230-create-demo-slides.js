'use strict';

const orders = [1, 2, 3, 4, 5, 5, 6, 7, 8, 9];
const createdAt = new Date();

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'slides',
      orders.map((order) => ({
        order,
        imageUrl: `https://image-bucket.com/image-${Math.floor(Math.random() * 11)}.jpg`,
        text: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Perferendis assumenda eum, illum harum accusamus corrupti similique illo id reiciendis necessitatibus doloremque voluptatum rem consectetur ex saepe alias at? Fuga, odit.',
        organizationId: Math.floor(Math.random() * 5) + 1,
        createdAt,
        updatedAt: createdAt,
      })),
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('slides', null, {});
  },
};

// To fill the table with mock data run:
// npx sequelize-cli db:seed --seed 20220727011230-create-demo-slides.js

// To empty the table run:
// npx sequelize-cli db:seed:undo --seed 20220727011230-create-demo-slides.js
