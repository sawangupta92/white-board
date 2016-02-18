Router.configure({
  layoutTemplate: 'MasterLayout',
  loadingTemplate: 'Loading',
  notFoundTemplate: 'NotFound'
});

Router.route('/board', {
  name: 'board',
  controller: 'BoardController',
  where: 'client'
});

Router.route('/boards/:_id', {
  name: 'boardShow',
  controller: 'BoardShowController',
  where: 'client'
});
