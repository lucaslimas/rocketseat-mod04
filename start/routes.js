const Route = use('Route');

Route.get('/', () => ({ greeting: 'Hello world in JSON' }));
Route.post('users', 'UserController.store').validator('User');
Route.post('sessions', 'SessionController.store').validator('Session');
Route.post('forgot_password', 'ForgotPasswordController.store').validator('ForgotPassword');

// Rotas que necessitam estar autenticado
Route.group(() => {
  Route.put('users', 'UserController.update').validator('ChangePassword');
}).middleware(['auth']);
