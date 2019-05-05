const express = require('express') // bringing in express framework to use
const environment = process.env.NODE_ENV || 'development'; // environment defined as either 'production' env connection or 'development'
const configuration = require('./knexfile')[environment]; // bring in knex file that configures our database
const database = require('knex')(configuration); // connecting database variable to knex query builder db

const app = express() // initialize app variable using express framework
const PORT = process.env.PORT || 3000; // declare PORT to be used for either production env or development 3000

app.use(express.json()) // app variable for express convert to json

// GET All Concerts
app.get('/api/v1/concerts', (request, response) => {
  database('concerts').select() // select concerts table from db
    .then((concerts) => { // returns all the concerts into an object
      if(concerts.length) { // then if concerts are found and has a length
        response.status(200).json(concerts); // send back all the concerts
      } else {
        response.status(404).json({ // else send back an error if concerts do not have a length, with provided error
          error: `Could not find concerts`
        });
      }
    })
    .catch((error) => { // if response is bad catch and send 500 status code with error
      response.status(500).json({ error });
    });
});

// GET All Bands
app.get('/api/v1/bands', (request, response) => {
  database('bands').select() // select bands table from db
    .then((bands) => { // returns all bands into an object
      if(bands.length) { // then if a band is found and has a length
        response.status(200).json(bands); // send back all the bands
      } else {
        response.status(404).json({  // else send back an error if band does not have a length, with provided error
          error: `Could not find band`
        });
      }
    })
    .catch((error) => { // if response is bad catch and send 500 status code with error
      response.status(500).json({ error });
    });
});

// GET A Specific Band
app.get('/api/v1/bands/:id', (request, response) => {
  database('bands').where('id', request.params.id).select() // select the specific band that matches request paramater id in the bands table
    .then((band) => { // returns the band object
      if (band.length) { // then if a band is found and has a length
        response.status(200).json(band); // send back the found band
      } else {
        response.status(404).json({ // else send back an error if band does not have a length, with provided error and request parameter id sent
          error: `Could not find band with id ${request.params.id}`
        });
      }
    })
    .catch((error) => { // if response is bad catch and send 500 status code with error
      response.status(500).json({ error });
    });
});

// GET Specific Concerts where a Band is playing
app.get('/api/v1/bands/:id/concerts', (request, response) => {
  database('concerts').where('concertId', request.params.id).select() // select the all the concerts that matches request paramater id in the concerts table
    .then(concerts => { // returns all the concerts into an object
      if(concerts.length) { // then if the concerts object has a length
        response.status(200).json(concerts); // send back all the found concerts
      } else {
        response.status(404).json({ // else send back an error if the concerts does not have a length, with provided error and request parameter id sent
          error: `Could not find concerts with band id ${request.params.id}`
        })
      }
    })
    .catch((error) => { // if response is bad, catch and send 500 status code with error
      response.status(500).json({ error });
    });
});

// POST A New Band
app.post('/api/v1/bands', (request, response) => {
  const band = request.body; // destructure band object that is being send in the request.body

  for (let bandParam of ['name', 'genre']) { // check each key of the band parameter for the ones in brackets
    if (!band[bandParam]) { // if the band object does not contain the required key send back an error message and ask for the required key
      return response.status(422).send({ error: `You're missing a band "${bandParam}" property.` });
    }
  }

  database('bands').insert({ // find the db table bands and insert in an the object sent in the request
    name: band.name, // name value provided
    genre: band.genre, // genre value provided
  }, [ 'name', 'genre' ])
  .then(band => { // returns either 1 or 0 if posted Successfully
    response.status(201).json(`Successfully Posted band`) // send back the response code and Successful message
  })
  .catch(error => { // if response is bad, catch and send 500 status code with error
    response.status(500).json({ error });
  });
})

// DELETE A Specific Band and associated concerts
app.delete('/api/v1/bands/:id/concerts', (request, response) => {

  database('concerts').where({ concertId: request.params.id }).del() // find the concerts table where the concertId matches the request parameter id provided
    .then(concertID => { // if found will be 1 or more meaning those concerts have been found
      if(concertID > 0) {
        database('bands').where({ id: request.params.id }).del() // Finds the bands table where the id matches the request parameter id and deletes it
        .then(id => { // returns 1 if deleted or 0 if not found
          if(id > 0) {
            response.status(202).json('Band and Concerts Deleted') // sends a status code and message that band and concerts have been deleted
          } else {
            response.status(404).json({ // if band not found will responed with message that band could not be found
              error: `Could not find or delete band with id ${request.params.id}`
            });
          }
        })
      } else {
        response.status(404).json({  // if concert not found will responed with message that concert could not be found
          error: `Could not find or delete concert with concerID ${request.params.id}`
        });
      }
    })
    .catch(error => { // if response is bad, catch and send 500 status code with error
      response.status(500).json({ error });
    })

})

// POST A Specific Concert
app.post('/api/v1/bands/:id/concerts', (request, response) => {
  const { concerts } = request.body; // destructure concerts from request object
  const { id } = request.params // destructure id from request object

  concerts.forEach(concert => { // iterates over each concert object if 1 or more and checks to make sure it has all the right values/keys
    for (let concertParam of ['date', 'time_start', 'time_doors', 'tickets_link']) { // checks the specific keys provided in the brackets
      if (!concert[concertParam]) { // if one of the keys is missing will throw error that you are missing concert properties
        return response.status(422).send({ error: `You're missing a concert "${concertParam}" property.` });
      }
    }
  })

  const concertsToInsert = concerts.map(concert => { // maps over all the concert objects and creates new objects with the provided information
    return {
          date: concert.date, // date value provided
          time_start: concert.time_start, // time_start value provided
          time_doors: concert.time_doors, // time_doors value provided
          tickets_link: concert.tickets_link, // tickets_link value provided
          concertId: id // id value provided
        }
  });

  database('concerts').insert(concertsToInsert) // finds the concerts table and inserts the created concertsToInsert variable
    .then(() => {
      response.status(201).json('Successfully Posted Concerts') // when Successful will send back provided message
    })
    .catch((error) => {
      response.status(500).json({ error }); // if response is bad, catch and send 500 status code with error
    });

});

// DELETE Specific Concert
app.delete('/api/v1/concerts/:id', (request, response) => {
  database('concerts').where({ id: request.params.id }).del() // finds the concerts table where the id matches the provided id in the request parameter and deletes row
    .then(concert => { // returns either 1 or 0 if deleted
      if (concert > 0) {
        response.status(202).json('Concert Deleted'); // if Successfully deleted row will send back provided message
      } else {
        response.status(404).json({ // if can not find the concert that matches the id provided in the request parameter will send provided message
          error: `Could not find or delete concert with id ${request.params.id}`
        });
      }
    }).catch(error => { // if response is bad, catch and send 500 status code with error
      response.status(500).json({ error });
    })
})


app.listen(PORT, () => { // listen on port assigned and then log to console to show which port is running
    console.log(`Our app is running on port ${ PORT }`);
});
