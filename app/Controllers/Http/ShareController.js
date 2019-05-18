/* eslint-disable camelcase */
const Event = use('App/Models/Event');
const Kue = use('Kue');
const Job = use('App/Jobs/NewTaskMail');

class ShareController {
  async store({
    request, params, auth, response,
  }) {
    try {
      const { id } = auth.user;

      const { shared } = request.all();

      const event = await Event.findOrFail(params.id);

      if (event.user_id !== id) {
        response.status(400).send({
          error: {
            message: 'Evento não pode ser compartilhado. Usuário não é o criador do evento',
          },
        });
      }
      const { title, localization, event_date } = event;
      const { username, email } = await event.user().fetch();

      Kue.dispatch(
        Job.key,
        {
          title,
          localization,
          username,
          event_date,
          email,
          shared,
        },
        { attempts: 2 },
      );
    } catch (err) {
      response.status(400).send({
        error: {
          message: 'Evento não encontrado',
        },
      });
    }
  }
}

module.exports = ShareController;
