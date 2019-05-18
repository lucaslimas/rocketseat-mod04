/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class EventSchema extends Schema {
  up() {
    this.create('events', (table) => {
      table.increments();
      table
        .integer('user_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
        .notNullable();
      table.string('title').notNullable();
      table.string('localization').notNullable();
      table.timestamp('event_date').notNullable();
      table.timestamps();
    });
  }

  down() {
    this.drop('events');
  }
}

module.exports = EventSchema;
