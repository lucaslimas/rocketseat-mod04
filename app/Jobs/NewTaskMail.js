/* eslint-disable camelcase */
const Mail = use('Mail');
const moment = require('moment');

class NewTaskMail {
  // If this getter isn't provided, it will default to 1.
  // Increase this number to increase processing concurrency.
  static get concurrency() {
    return 1;
  }

  // This is required. This is a unique key used to identify this job.
  static get key() {
    return 'NewTaskMail-job';
  }

  // This is where the work is done.
  async handle({
    username, title, localization, event_date, shared, email,
  }) {
    await Mail.send(
      'emails.event_share',
      {
        username,
        title,
        localization,
        // event_date,
        event_date: moment(event_date).format('DD/MM/YYYY hh:mm:ss'),
      },
      (message) => {
        message
          .to(shared)
          .from(email)
          .subject('Compartilhamento de Evento');
      },
    );
  }
}

module.exports = NewTaskMail;
