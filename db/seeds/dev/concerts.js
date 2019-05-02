const seedData = require('../../data/seedData.js');

const createConcert = (knex, concert) => {
  return knex('concerts').insert({
    date: concert.date,
    time_start: concert.time_start,
    time_doors: concert.time_doors,
    tickets_link: concert.tickets_link,
  }, 'id')
  .then(concertId => {
    let bandPromises = [];

    concert.bands.forEach(band => {
      bandPromises.push(
        createBands(knex, {
          name: band.name,
          headliner: band.headliner,
          concertId: concertId[0]
        })
      )
    });

    return Promise.all(bandPromises);
  })
};

const createBands = (knex, band) => {
  return knex('bands').insert(band);
};

exports.seed = (knex, Promise) => {
  return knex('bands').del()
    .then(() => knex('concerts').del())
    .then(() => {
      let concertPromises = [];

      seedData.forEach(concert => {
        concertPromises.push(createConcert(knex, concert));
      });

      return Promise.all(concertPromises);
    })
    .catch(error => console.log(`Error seeding data: ${error}`));
};
