Router.configure({
  layoutTemplate: 'MasterLayout',
  loadingTemplate: 'Loading',
  notFoundTemplate: 'NotFound'
});

Router.route('/chats', {
  name: 'Chat',
  controller: 'ChatController',
  where: 'client'
});
