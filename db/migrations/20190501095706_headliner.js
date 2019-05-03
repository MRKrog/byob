exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('bands', function(table) {
      table.string('headliner')
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('bands', function(table) {
      table.dropColumn('headliner');
    })
  ]);
};
