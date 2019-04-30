exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('concerts', function(table) {
      table.increments('id').primary();
      table.string('date');
      table.string('time_start');
      table.string('time_doors');
      table.string('tickets_link');

      table.timestamps(true, true);
    }),

    knex.schema.createTable('bands', function(table) {
      table.increments('id').primary();
      table.string('name');
      table.integer('concertId').unsigned()
      table.foreign('concertId')
        .references('concerts.id');

      table.timestamps(true, true);
    })
  ])
};


exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('bands'),
    knex.schema.dropTable('concerts')
  ]);
};
