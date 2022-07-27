'use strict';

const names = [
  'Juana Molina',
  'Pedro Sanchez',
  'Juliana Torres',
  'Federico Robles',
  'Maria Fernandez',
  'Norberto Molinari',
];

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'contacts',
      names.map((name) => ({
        name,
        phone: Math.floor(Math.random() * 999999999) + 111111111,
        email: `${name.replace(' ', '_')}@gmail.com`,
        message: `Hola, soy ${name} y me gustaría saber mas acerca de la ONG. Estoy interesade en participar y colaborar con la causa. Espero pronta respuesta. Saludos`,
      })),
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('contacts', null, {});
  },
};

// To fill the table with mock data run:
// npx sequelize-cli db:seed --seed 20220727011251-create-demo-contacts.js

// To empty the table run:
// npx sequelize-cli db:seed:undo --seed 20220727011251-create-demo-contacts.js
