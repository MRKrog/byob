const express = require('express')
const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);

const app = express()
// const port = 3000
const PORT = process.env.PORT || 3000;
// app.set('port', process.env.PORT || 3000)

app.use(express.json())

// {
//   name: 'The 1975',
//   genre: 'Rock',
//   concerts: [
//     {
//       date: 'TUESDAY April 30, 2019',
//       time_start: '7:00 PM',
//       time_doors: '6:00 PM',
//       tickets_link: 'https://www.axs.com/events/363535/the-1975-tickets?skin=redrocks',
//     }
//   ]
// },

// {
// 	"name": "New Band",
// 	"genre": "Classical"
// }

//
// {
//   "concerts": [
//     {
//       "date": "SAT Test",
//       "time_start": "7 PM",
//       "time_doors": "60 PM",
//       "tickets_link": "redrocks"
//     }
//   ]
// }


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

// DELETE A Specific Band
app.delete('/api/v1/bands/:id', (request, response) => {

  database('concerts').where({ concertId: request.params.id }).del()
    .then(concertID => {
      console.log(concertID);
    })


  // database('bands').where({ id: request.params.id }).del()
  //   .then(band => {
  //     if (band > 0) {
  //       response.status(202).json('Band Deleted');
  //     } else {
  //       response.status(404).json({
  //         error: `Could not find or delete band with id ${request.params.id}`
  //       });
  //     }
  //   }).catch(error => {
  //     response.status(500).json({ error });
  //   })
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




app.put('/api/v1/bands/:id', (request, response) => {
  let { id } = request.params;

  database('bands').where('id', id)
    .update({
      name: 'Homer'
    })
    .then(concert => {
      response.status(201).json('Successfully Posted Bands')
    })
    .catch(error => {
      response.status(500).json({ error });
    });

});




// PUT Update Content
app.put('/api/v1/concerts/:id', (request, response) => {
  let { id } = request.params;
  let { date, time_start, time_doors, tickets_link, bands } = request.body;

  database('concerts').where('id', id).select()
    .then(concert => {
      if(concert.length){
        database('concerts').where('id', id).update({
          date: request.body.date || concert[0].date,
          time_start: request.body.time_start || concert[0].time_start,
          time_doors: request.body.time_doors || concert[0].time_doors,
          tickets_link: request.body.tickets_link || concert[0].tickets_link,
        }).then(concert => {
          if(request.body.bands){
            database('bands').where('concertId', request.params.id).select()
              .then(bandsDB => {
                Promise.all(bands.map((band, i) => {
                  console.log(band);
                  return database('bands').where('id', bandsDB[i].id)
                    .update({
                      name: request.body.bands[i].name || bandsDB[i].name,
                      headliner: request.body.bands[i].headliner || bandsDB[i].headliner
                    })
                })).then(more => {
                  response.status(201).json('Successfully Updated Concerts and Bands')
                })
              })
          } else {
            response.status(201).json('Successfully Updated Concerts')
          }
        })
        .catch(error => {
          response.status(500).json({ error });
        });
      }
    })

})


// for(let i = 0; i < band.length; i++) {
//   console.log(band[i].name);
//   console.log(request.body.bands[i].name);
//   database('bands').where('id', band[i].id)
//     .update({
//       name: request.body.bands[i].name || band[i].name,
//       headliner: request.body.bands[i].headliner || band[i].headliner
//     })
// }
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

// knex('users')
//   .where({ id: 2 })
//   .update({ name: 'Homer' })
// knex('books')
//   .where('published_date', '<', 2000)
//   .update({
//     status: 'archived',
//     thisKeyIsSkipped: undefined
//   })

app.listen(PORT, () => {
    console.log(`Our app is running on port ${ PORT }`);
});

// app.listen(port, () => console.log(`Example app listening on port ${port}!`))
