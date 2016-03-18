Package.describe({
  name: "manage:board",
  summary: "What this does",
  version: "1.0.0",
  git: "https://github.com/<username>/manage-board.git",
});

Package.onUse(function (api) {
  api.versionsFrom('0.9.0');

  api.use('ecmascript');

  var packages = [
    'iron:router',
    'templating',
    'mongo',
    'aldeed:simple-schema',
    'aldeed:collection2',
    'blaze-html-templates'
  ];

  api.use(packages);
  api.imply(packages);

  api.addFiles([
    'lib/manage-board.js',
    'lib/routes.js',
    'lib/controllers/board_controller.js',
    'lib/controllers/board_show_controller.js',
    ],
    ['client', 'server']);
  api.addFiles([
    'client/manage-board.js',
    'client/templates/board/board.html',
    'client/templates/board/board_show.html',
    'client/templates/board/board_show.js',
    'client/templates/board/board.js',
    ],
    'client');
  api.addFiles('server/manage-board.js', 'server');

  api.export(['ManageBoard', 'BoardController', 'Board', 'BoardShowController', 'clientBoard']);
});

Package.onTest(function (api) {
  api.use('manage:board');
  api.use('ecmascript');
  api.use('tinytest@1.0.0');
  api.addFiles('test/manage:board.js', 'server');
});
