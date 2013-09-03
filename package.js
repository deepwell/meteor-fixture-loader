Package.describe({
  summary: 'Loads fixtures in a set order'
});

Npm.depends({
});

Package.on_use(function (api, where) {
  api.add_files([
    'lib/fixture_loader.js',
    'lib/main.js'
  ], 'server');

  // for backward compat before Meteor linker changes
  if (typeof api.export !== 'undefined') {
    api.export([
      'registerFixture',
      'loadFixtures'
    ], 'server');
  }
});
