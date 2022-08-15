'use strict';

const content =
  'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Rerum, sit laboriosam qui molestias sed nihil deleniti incidunt. Reprehenderit eum inventore alias quisquam velit? Reprehenderit fugit sint ut cupiditate maiores quae.';
const names = [
  'Cecilia Mendez',
  'Marco Fernandez',
  'María Garcia',
  'María Irola',
  'Marita Gomez',
  'Miriam Rodriguez',
  'Rodrigo Fuente',
];
const image = 'https://placeimg.com/200/200/people';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'testimonials',
      names.map((name) => ({
        name,
        content,
        image,
      })),
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('testimonials', null, {});
  },
};

// To fill the table with mock data run:
// npx sequelize-cli db:seed --seed 20220727011212-create-demo-testimonials.js

// To empty the table run:
// npx sequelize-cli db:seed:undo --seed 20220727011212-create-demo-testimonials.js
