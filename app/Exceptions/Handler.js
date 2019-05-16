const BaseExceptionHandler = use('BaseExceptionHandler');
const Env = use('Env');
const Youch = use('Youch');

class ExceptionHandler extends BaseExceptionHandler {
  async handle(error, { request, response }) {
    if (error.name === 'ValidationException') {
      return response.status(error.status).send(error.messages);
    }

    if (Env.NODE_ENV === 'development') {
      const youch = new Youch(error, request.request);
      const errorJson = await youch;
      return response.status(error.status).send(errorJson);
    }
    return response.status(error.status).send(error.message);
  }

  async report(error, { request }) {
    console.log(error);
  }
}

module.exports = ExceptionHandler;
