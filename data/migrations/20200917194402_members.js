
exports.up = function(knex) {
    return knex.schema
        .createTable("members", tbl =>{
            tbl.increments();
            tbl.string("username").notNullable().unique();
            tbl.string("game")
        })
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('members');
};
