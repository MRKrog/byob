const express = require('express')
const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);

const app = express()
const port = 3000

app.use(express.json())

// GET All Concerts
app.get('/api/v1/concerts', (request, response) => {
  database('concerts').select()
    .then((concerts) => {
      response.status(200).json(concerts);
    })
    .catch((error) => {
      response.status(500).json({ error });
    });
});

// GET All Bands
app.get('/api/v1/bands', (request, response) => {
  database('bands').select()
    .then((bands) => {
      response.status(200).json(bands);
    })
    .catch((error) => {
      response.status(500).json({ error });
    });
});

// GET Specific Concert
app.get('/api/v1/concerts/:id', (request, response) => {
  database('concerts').where('id', request.params.id).select()
    .then(concert => {
      if (concert.length) {
        response.status(200).json(concert);
      } else {
        response.status(404).json({
          error: `Could not find concert with id ${request.params.id}`
        });
      }
    })
    .catch(error => {
      response.status(500).json({ error });
    });
});

// GET Specific Bands
app.get('/api/v1/concerts/:id/bands', (request, response) => {
  database('bands').where('concertId', request.params.id).select()
    .then((bands) => {
      if (bands.length) {
        response.status(200).json(bands);
      } else {
        response.status(404).json({
          error: `Could not find bands with id ${request.params.id}`
        });
      }
    })
    .catch((error) => {
      response.status(500).json({ error });
    });
});

// POST Specific Concert and Bands Together
app.post('/api/v1/concerts', (request, response) => {
  const concert = request.body;

  for (let concertParam of ['date', 'time_start', 'time_doors', 'tickets_link']) {
    if (!concert[concertParam]) {
      return response.status(422).send({ error: `You're missing a concert "${concertParam}" property.` });
    }
  }

  database('concerts').insert({
    date: concert.date,
    time_start: concert.time_start,
    time_doors: concert.time_doors,
    tickets_link: concert.tickets_link,
  }, 'id' )
  .then(concertId => {
    const bandsToInsert = concert.bands.map(band => (
      { name: band.name, headliner: band.headliner, concertId: concertId[0] }
    ));
    return database('bands').insert(bandsToInsert)
  })
  .then(concert => {
    response.status(201).json('Successfully Posted Concerts and Bands')
  })
  .catch(error => {
    response.status(500).json({ error });
  });

});

//
// {
//   "date": "THURSDAY May 09, 2019",
//   "time_start": "7:00 PM",
//   "time_doors": "6:00 PM",
//   "tickets_link": "https://www.axs.com/events/364883/vulfpeck-tickets?skin=redrocks",
//   "bands": [
//     { "name": "Vulfpeck", "headliner": true },
//     { "name": "with Khruangbin, Cory Henry", "headliner": false }
//   ]
// }

// DELETE Specific Concert
app.delete('/api/v1/concerts/:id', (request, response) => {
  database('concerts').where({ id: request.params.id }).del()
    .then(concert => {
      if (concert > 0) {
        response.status(202).json('Concert Deleted');
      } else {
        response.status(404).json({
          error: `Could not find or delete concert with id ${request.params.id}`
        });
      }
    }).catch(error => {
      response.status(500).json({ error });
    })
})

// DELETE Specific Band
app.delete('/api/v1/bands/:id', (request, response) => {
  database('bands').where({ id: request.params.id }).del()
    .then(band => {
      if (band > 0) {
        response.status(202).json('Band Deleted');
      } else {
        response.status(404).json({
          error: `Could not find or delete band with id ${request.params.id}`
        });
      }
    }).catch(error => {
      response.status(500).json({ error });
    })
})


// PUT Update Content
app.put('/api/v1/concerts/:id', (request, response) => {
  let { id } = request.params
  let { time_doors } = request.body
  console.log(id);
  console.log(request.body);
  database('concerts').where('id', request.params.id)
    .update({

    })
    .then(function() {
      console.log('in concert');
      // response.status(202).json('Concert Deleted Successfully')
    })
    .catch(error => {
      response.status(500).json({ error });
    })

})

// knex('users')
//   .where({ id: 2 })
//   .update({ name: 'Homer' })
// knex('books')
//   .where('published_date', '<', 2000)
//   .update({
//     status: 'archived',
//     thisKeyIsSkipped: undefined
//   })


app.listen(port, () => console.log(`Example app listening on port ${port}!`))
