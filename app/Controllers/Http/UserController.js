/* eslint-disable camelcase */
const User = use('App/Models/User');
const Hash = use('Hash');

class UserController {
  async store({ request }) {
    const data = request.only(['username', 'email', 'password']);
    const user = User.create(data);
    return user;
  }

  async update({ request, response }) {
    try {
      const {
        username, email, oldPassword, password, password_confirmation,
      } = request.all();

      const user = await User.findByOrFail('email', email);

      // Verifica se a senha está correta
      const isSame = await Hash.verify(oldPassword, user.password);

      if (!isSame) {
        return response.status(400).send({
          error: {
            message: 'Senha inválida',
          },
        });
      }

      if (password !== password_confirmation) {
        return response.status(400).send({
          error: {
            message: 'Confirmação da senha é diferente da senha',
          },
        });
      }

      user.username = username;
      user.password = password;

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
