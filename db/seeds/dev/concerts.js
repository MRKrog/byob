const seedData = require('../../data/seedData.js');

const createBands = (knex, band) => {
  return knex('bands').insert({
    name: band.name,
    genre: band.genre,
  }, 'id')
  .then(concertId => {
    let concertPromises = [];

    band.concerts.forEach(concert => {
      concertPromises.push(
        createConcerts(knex, {
          date: concert.date,
          time_start: concert.time_start,
          time_doors: concert.time_doors,
          tickets_link: concert.tickets_link,
          concertId: concertId[0]
        })
      )
    });

    return Promise.all(concertPromises);
  })
};

const createConcerts = (knex, concert) => {
  return knex('concerts').insert(concert);
};

exports.seed = (knex, Promise) => {
  return knex('concerts').del()
    .then(() => knex('bands').del())
    .then(() => {
      let bandPromises = [];

      seedData.forEach(band => {
        bandPromises.push(createBands(knex, band));
      });

      return Promise.all(bandPromises);
    })
    .catch(error => console.log(`Error seeding data: ${error}`));
};
