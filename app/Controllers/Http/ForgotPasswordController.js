const Crypto = require('crypto');
const moment = require('moment');

const User = use('App/Models/User');
const Mail = use('Mail');

class ForgotPasswordController {
  async store({ request, response }) {
    try {
      const email = request.input('email');
      const user = await User.findByOrFail('email', email);

      user.token = Crypto.randomBytes(10).toString('hex');
      user.token_created_at = new Date();

      await user.save();

      await Mail.send(
        'emails.forgot_password',
        {
          email,
          token: user.token,
          link: `${request.input('redirect_url')}?token=${user.token}`,
        },
        (message) => {
          message
            .to(user.email)
            .from(user.mail)
            .subject('Recuperação de Senha');
        },
      );
    } catch (err) {
      return response.status(err.status).send({
        error: {
          message: 'Não foi possível localizar o e-mail',
        },
      });
    }
  }

  async update({ request, response }) {
    try {
      const { token, password } = request.all();

      const user = await User.findByOrFail('token', token);

      // Verifica se o token não expirou com mais de um dia
      const tokenExpired = moment()
        .subtract('1', 'days')
        .isAfter(user.token_create_at);

      if (tokenExpired) {
        return response.status(401).send({
          error: {
            message: 'O token não é mais válido!',
          },
        });
      }

      user.token = null;
      user.token_created_at = null;

      user.password = password;

      await user.save();
    } catch (err) {
      response.status(err.status).send({
        error: {
          message: 'Não foi possível resetar a senha. O token é inválido ou não é mais válido',
        },
      });
    }
  }
}

module.exports = ForgotPasswordController;
