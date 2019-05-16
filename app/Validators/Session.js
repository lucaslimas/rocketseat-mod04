class Session {
  get validatorAll() {
    return true;
  }

  get rules() {
    return {
      email: 'required|email',
      password: 'required',
    };
  }
}

module.exports = Session;
