const Antl = use('Ant');
class ForgotPassword {
  get validatorAll() {
    return true;
  }

  get rules() {
    return {
      email: 'required|email',
      redirect_url: 'required|url',
    };
  }

  get messages() {
    return Antl.list('validation');
  }
}

module.exports = ForgotPassword;
