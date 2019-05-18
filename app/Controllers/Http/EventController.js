/* eslint-disable camelcase */
const Event = use('App/Models/Event');
const moment = require('moment');

class EventController {
  async index({ request, auth }) {
    const { page, date } = request.get();

    let query = Event.query().withs('user');
    query = query.where('user_id', '=', auth.user.id);

    if (date) {
      query = query.whereRaw(`event_date::date = '${date}'`);
    }

    const events = await query.paginate(page);
    return events;
  }

  async store({ request, response, auth }) {
    const { id } = auth.user;
    const { title, event_date, localization } = request.all();

    try {
      await Event.findByOrFail({
        event_date,
        user_id: id,
      });

      response.status(400).send({
        error: {
          message: `Não foi possível agendar essa data. Verifique se já não possível um agendamento para a data ${event_date}`,
        },
      });
    } catch (err) {
      const event = await Event.create({
        user_id: id,
        title,
        event_date,
        localization,
      });

      return event;
    }
  }

  async show({ params, response, auth: { user } }) {
    try {
      const event = await Event.find(params.id);

      if (user.id !== event.user_id) {
        response.status(400).send({
          error: {
            message: 'Evento não pertence ao usuário.',
          },
        });
      }

      return event;
    } catch (err) {
      response.status(400).send({
        error: {
          message: 'Evento não encontrado.',
        },
      });
    }
  }

  async update({
    params, request, response, auth,
  }) {
    const { id } = auth.user;
    try {
      const event = await Event.findOrFail(params.id);

      if (event.user_id !== id) {
        response.status(400).send({
          error: {
            message: 'Você não pode alterar esse agendamento.',
          },
        });
      }

      const past = moment().isAfter(event.event_date);

      if (past) {
        response.status(400).send({
          error: {
            message: 'Você não pode alterar, o evento já ocorreu!',
          },
        });
      }

      const data = request.only(['title', 'event_date', 'localization']);

      try {
        await Event.findByOrFail({
          event_date: data.event_date,
          user_id: id,
        });

        response.status(400).send({
          error: {
            message: `Não foi possível agendar essa data. Verifique se já não possível um agendamento para a data ${event_date}`,
          },
        });
      } catch (err) {
        event.merge(data);

        await event.save();

        return event;
      }
    } catch (err) {
      response.status(400).send({
        error: {
          message: 'Não foi possível alterar o agendamento.',
        },
      });
    }
  }

  async destroy({ params, auth, response }) {
    try {
      const { id } = auth.user;
      const event = await Event.find(params.id);

      if (id !== event.user_id) {
        response.status(400).send({
          error: {
            message: 'Evento não pertence ao usuário.',
          },
        });
      }

      if (moment().isAfter(event.event_date)) {
        response.status(400).send({
          error: {
            message: 'Você não pode excluir, o evento já ocorreu!',
          },
        });
      }
      await event.delete();
    } catch (err) {
      response.status(400).send({
        error: {
          message: 'Evento não encontrado.',
        },
      });
    }
  }
}

module.exports = EventController;
