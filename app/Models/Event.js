const Model = use('Model');

class Event extends Model {
  static get dates() {
    return super.dates.concat(['event_date']);
  }

  static castDates(field, value) {
    if (['event_date'].indexOf(field) > -1) {
      return value.format('DD/MM/YYYY hh:mm:ss');
    }

    return super.formatDates(field, value);
  }

  user() {
    return this.belongsTo('App/Models/User');
  }
}

module.exports = Event;
