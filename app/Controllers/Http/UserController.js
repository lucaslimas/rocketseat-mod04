/* eslint-disable no-param-reassign */
/* eslint-disable camelcase */
const User = use('App/Models/User');
const Hash = use('Hash');

class UserController {
  async store({ request }) {
    const data = request.only(['username', 'email', 'password']);
    const user = User.create(data);
    return user;
  }

  async update({ request, response, auth: { user } }) {
    try {
      const { username, oldPassword, password } = request.all();

      if (password) {
        const isCorrect = await Hash.verify(oldPassword, user.password);

        if (!isCorrect) {
          return response.status(400).send({
            error: {
              message: 'Senha inválida',
            },
          });
        }

        user.merge({
          username,
          password,
        });
      } else {
        user.merge({
          username,
        });
      }
      await user.save();
    } catch (err) {
      return response.status(err.status).send({
        error: {
          message: 'Não foi possível alterar a senha. Verifique o e-mail e tente novamente',
        },
      });
    }
  }
}

module.exports = UserController;
