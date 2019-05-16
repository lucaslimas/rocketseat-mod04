class ChangePassword {
  get validatorAll() {
    return true;
  }

  get rules() {
    // const userId = this.ctx.params.id;
    return {
      oldPassword: 'required',
      password: 'required|confirmed',
      // username: `required|unique:users,username,id,${userId}`,
      username: 'required',
      email: 'required|email',
    };
  }
}

module.exports = ChangePassword;
