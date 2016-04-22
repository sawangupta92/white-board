Package.describe({
  name: "chat",
  summary: "What this does",
  version: "1.0.0",
  git: "https://github.com/<username>/chat.git",
});

Npm.depends({
  'emojify.js': '1.1.0'
})

Package.onUse(function (api) {
  api.versionsFrom('0.9.0');

  api.use('ecmascript');

  var packages = [
    'iron:router',
    'templating',
    'mongo',
    'aldeed:simple-schema',
    'aldeed:collection2',
    'blaze-html-templates',
    'matb33:collection-hooks',
  ];

  api.use(packages);
  api.imply(packages);

  api.addFiles(
    ['lib/chat.js',
    'lib/routes.js',
    'lib/controllers/chat_controller.js'],
    ['client', 'server']);
  api.addFiles(
    ['client/chat.js',
     'client/templates/chat.html',
     'client/templates/chat.js',
    ],
    'client');
  api.addFiles('server/chat.js', 'server');
  api.addAssets('client/images/basic/smile.png', 'client');

  api.export(['Chat', 'ChatController', 'Emojify', 'Test']);
});

Package.onTest(function (api) {
  api.use('chat');
  api.use('ecmascript');
  api.use('tinytest@1.0.0');
  api.addFiles('test/chat.js', 'server');
});
