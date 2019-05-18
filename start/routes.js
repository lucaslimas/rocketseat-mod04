const Route = use('Route');

Route.post('users', 'UserController.store').validator('User/Create');
Route.post('sessions', 'SessionController.store').validator('Session');
Route.post('forgot_password', 'ForgotPasswordController.store').validator(
  'Password/ForgotPassword',
);

Route.group(() => {
  Route.put('users', 'UserController.update').validator('User/Change');

  /* Route.get('events', 'EventController.index');
  Route.post('events', 'EventController.store').validator('Event/Store');
  Route.put('events/:id', 'EventController.update').validator('Event/Update');
  Route.get('events/:id', 'EventController.show');
  Route.delete('events/:id', 'EventController.destroy'); */

  Route.resource('events', 'EventController')
    .apiOnly()
    .validator(
      new Map([[['events.store'], ['Event/Create']], [['events.update'], ['Event/Update']]]),
    );

  Route.post('share/:id', 'ShareController.store').validator('Event/Shared');
}).middleware(['auth']);
