const Model = use('Model');
const Hash = use('Hash');

class User extends Model {
  static boot() {
    super.boot();
    this.addHook('beforeSave', async (userInstance) => {
      if (userInstance.dirty.password) {
        // eslint-disable-next-line no-param-reassign
        userInstance.password = await Hash.make(userInstance.password);
      }
    });
  }

  tokens() {
    return this.hasMany('App/Models/Token');
  }

  events() {
    return this.hasMany('App/Models/Event');
  }
}

module.exports = User;
