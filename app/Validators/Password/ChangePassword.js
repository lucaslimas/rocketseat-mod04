class ChangePassword {
  get validatorAll() {
    return true;
  }

  get rules() {
    return {
      password: 'required|confirmed',
      token: 'required',
    };
  }

  get messages() {
    return {
      'password.required': 'Novo password é obrigatório',
      'password.confirmed': 'Confirmação do novo password é obrigatório',
      'token.required': 'Token é obrigatório',
    };
  }
}

module.exports = ChangePassword;
