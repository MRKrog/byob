const express = require('express')
const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);

const app = express()
const PORT = process.env.PORT || 3000;

app.use(express.json())

// GET All Concerts
app.get('/api/v1/concerts', (request, response) => {
  database('concerts').select()
    .then((concerts) => {
      if(concerts.length) {
        response.status(200).json(concerts);
      } else {
        response.status(404).json({
          error: `Could not find concerts`
        });
      }
    })
    .catch((error) => {
      response.status(500).json({ error });
    });
});

// GET All Bands
app.get('/api/v1/bands', (request, response) => {
  database('bands').select()
    .then((bands) => {
      if(bands.length) {
        response.status(200).json(bands);
      } else {
        response.status(404).json({
          error: `Could not find bands`
        });
      }
    })
    .catch((error) => {
      response.status(500).json({ error });
    });
});

// GET A Specific Band
app.get('/api/v1/bands/:id', (request, response) => {
  database('bands').where('id', request.params.id).select()
    .then((band) => {
      if (band.length) {
        response.status(200).json(band);
      } else {
        response.status(404).json({
          error: `Could not find band with id ${request.params.id}`
        });
      }
    })
    .catch((error) => {
      response.status(500).json({ error });
    });
});

// GET Specific Concerts where a Band is playing
app.get('/api/v1/bands/:id/concerts', (request, response) => {
  database('concerts').where('concertId', request.params.id).select()
    .then(concerts => {
      if(concerts.length) {
        response.status(200).json(concerts);
      } else {
        response.status(404).json({
          error: `Could not find concerts with band id ${request.params.id}`
        })
      }
    })
    .catch((error) => {
      response.status(500).json({ error });
    });
});

// POST A New Band
app.post('/api/v1/bands', (request, response) => {
  const band = request.body;

  for (let bandParam of ['name', 'genre']) {
    if (!band[bandParam]) {
      return response.status(422).send({ error: `You're missing a band "${bandParam}" property.` });
    }
  }

  database('bands').insert({
    name: band.name,
    genre: band.genre,
  }, [ 'name', 'genre' ])
  .then(band => {
    response.status(201).json(`Successfully Posted band`)
  })
  .catch(error => {
    response.status(500).json({ error });
  });
})

// DELETE A Specific Band and associated concerts
app.delete('/api/v1/bands/:id/concerts', (request, response) => {

  database('concerts').where({ concertId: request.params.id }).del()
    .then(concertID => {
      if(concertID > 0) {
        database('bands').where({ id: request.params.id }).del()
        .then(id => {
          if(id > 0) {
            response.status(202).json('Band and Concerts Deleted')
          } else {
            response.status(404).json({
              error: `Could not find or delete band with id ${request.params.id}`
            });
          }
        })
      } else {
        response.status(404).json({
          error: `Could not find or delete concert with concerID ${request.params.id}`
        });
      }
    })
    .catch(error => {
      response.status(500).json({ error });
    })

})

// POST A Specific Concert
app.post('/api/v1/bands/:id/concerts', (request, response) => {
  const { concerts } = request.body;
  const { id } = request.params

  concerts.forEach(concert => {
    for (let concertParam of ['date', 'time_start', 'time_doors', 'tickets_link']) {
      if (!concert[concertParam]) {
        return response.status(422).send({ error: `You're missing a concert "${concertParam}" property.` });
      }
    }
  })

  const concertsToInsert = concerts.map(concert => {
    return {
          date: concert.date,
          time_start: concert.time_start,
          time_doors: concert.time_doors,
          tickets_link: concert.tickets_link,
          concertId: id
        }
  });

  database('concerts').insert(concertsToInsert)
    .then(() => {
      response.status(201).json('Successfully Posted Concerts')
    })
    .catch((error) => {
      response.status(500).json({ error });
    });

});

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


app.listen(PORT, () => {
    console.log(`Our app is running on port ${ PORT }`);
});
