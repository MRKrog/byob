let concertData = [{
  date: 'TUESDAY April 30, 2019',
  time_start: '7:00 PM',
  time_doors: '6:00 PM',
  tickets_link: 'https://www.axs.com/events/363535/the-1975-tickets?skin=redrocks',
  bands: [
    {
      name: 'The 1975',
    },
    {
      name: 'PALE WAVES, NO ROME'
    }
  ]
}]


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
  return knex('bands').del() // delete footnotes first
    .then(() => knex('concerts').del()) // delete all papers
    .then(() => {
      let concertPromises = [];

      concertData.forEach(concert => {
        concertPromises.push(createConcert(knex, concert));
      });

      return Promise.all(concertPromises);
    })
    .catch(error => console.log(`Error seeding data: ${error}`));
};
