exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('bands', function(table) {
      table.dropColumn('headliner');
      table.dropColumn('concertId');
      table.string('genre');
    }),

    knex.schema.table('concerts', function(table) {
      table.integer('concertId').unsigned()
      table.foreign('concertId')
        .references('bands.id');
    })

  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('bands'),
    knex.schema.dropTable('concerts')
  ]);
};
