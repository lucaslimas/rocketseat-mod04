const Env = use('Env');

module.exports = {
  dsn: Env.get('SENTRY_DSN'),
};
