Package.describe({
  name: 'webysr:googleapis-oauth2-client',
  version: '1.0.0',
  summary: 'Provides an auto generated OAuth2 client to authorize calls to Google APIs',
  git: 'https://github.com/webysr/meteor-googleapis-oauth2-client.git',
  documentation: 'README.md'
});

Npm.depends({
  googleapis: '2.1.7',
  moment: '2.12.0'
});

Package.onUse(function(api) {
  api.versionsFrom('1.2.1');
  api.use('ecmascript');
  api.use('service-configuration');

  api.addFiles(['server/OAuth2Client.js'], 'server');
  api.export('OAuth2Client');
});

Package.onTest(function(api) {
  api.use('ecmascript');
  api.use('tinytest');
  api.use('webysr:googleapis-oauth2-client');
  api.addFiles('test/googleapis-oauth2-client-tests.js');
});
