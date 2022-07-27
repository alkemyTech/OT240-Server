'use strict';

const content =
  'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Rerum, sit laboriosam qui molestias sed nihil deleniti incidunt. Reprehenderit eum inventore alias quisquam velit? Reprehenderit fugit sint ut cupiditate maiores quae.';
const names = [
  'Juana Molina',
  'Pedro Sanchez',
  'Juliana Torres',
  'Federico Robles',
  'Maria Fernandez',
  'Norberto Molinari',
];
const image = 'https://image-bucket.com/test-image.png';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'testimonials',
      names.map((name) => ({ name, content, image })),
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('testimonials', null, {});
  },
};

// To fill the table with mock testimonials run:
// npx sequelize-cli db:seed --seed 20220727011212-create-demo-testimonials.js

// To empty the table "testimonials" run:
// npx sequelize-cli db:seed:undo --seed 20220727011212-create-demo-testimonials.js
