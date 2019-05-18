const Antl = use('Antl');
class EventUpdate {
  get rules() {
    return {
      event_date: 'date',
      shared: 'email',
    };
  }

  get messages() {
    return Antl.list('validation');
  }
}

module.exports = EventUpdate;
