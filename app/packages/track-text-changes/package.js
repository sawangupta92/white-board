Package.describe({
  name: "track-text-changes",
  summary: "What this does",
  version: "1.0.0",
  git: "https://github.com/<username>/track-text-changes.git",
});

Package.onUse(function (api) {
  api.versionsFrom('0.9.0');

  api.use('ecmascript');

  var packages = [
    'iron:router'
  ];

  api.use(packages);
  api.imply(packages);

  api.addFiles('client/trackbox-tracker.js', 'client');

  api.export('TextBoxTracker');
});

Package.onTest(function (api) {
  api.use('track-text-changes');
  api.use('ecmascript');
  api.use('tinytest@1.0.0');
  api.addFiles('test/track-text-changes.js', 'server');
});
