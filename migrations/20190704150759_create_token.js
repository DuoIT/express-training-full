
exports.up = function(knex) {
    return knex.schema.createTable('token',(table)=>{
        table.increments();
        table.integer('userid');
        table.string('token');
        table.string('status');
        table.timestamps(true, true);
      })
};

exports.down = function(knex) {
  
};
