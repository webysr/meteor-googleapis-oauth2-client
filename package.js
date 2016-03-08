Package.describe({
  name: 'webysr:googleapis-oauth2-client',
  version: '1.0.0',
  // Brief, one-line summary of the package.
  summary: '',
  // URL to the Git repository containing the source code for this package.
  git: '',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Npm.depends({
  googleapis: '2.1.6'
});

Package.onUse(function(api) {
  api.versionsFrom('1.3-beta.11');
  api.use('ecmascript@0.4.0-beta.11');
  api.use('service-configuration@1.0.6-beta.11');

  api.mainModule('server/OAuth2Client.js', 'server');
});

Package.onTest(function(api) {
  api.use('ecmascript');
  api.use('tinytest');
  api.use('googleapis-oauth2-client');
  api.addFiles('googleapis-oauth2-client-tests.js');
});
