const Antl = use('Antl');
class Shared {
  get validatorAll() {
    return true;
  }

  get rules() {
    return {
      shared: 'required|email',
    };
  }

  get messages() {
    return Antl.list('validation');
  }
}

module.exports = Shared;
