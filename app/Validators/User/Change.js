const Antl = use('Antl');
class UserChange {
  get validateAll() {
    return true;
  }

  get rules() {
    const data = this.ctx.auth.user.id;
    // Isso faz com que ignore se o email for o msm que está editando
    return {
      username: `unique:users, username, id, ${data}`,
      password: 'confirmed',
    };
  }

  get messages() {
    return Antl.list('validation');
  }
}

module.exports = UserChange;
