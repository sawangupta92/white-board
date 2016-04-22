var Collections = {};

Meteor.isClient && Template.registerHelper("Collections", Collections);

Chat = Collections.Chat = new Mongo.Collection('chats')

Chat.attachSchema(new SimpleSchema({
  firstUser: {
    type: String
  },
  secondUser: {
    type: String
  },
  firstUserUnreadCount: {
    type: Number,
    defaultValue: 0
  },
  secondUserUnreadCount: {
    type: Number,
    defaultValue: 0
  },
  'history.$': {
    type: Object,
    optional: true
  },
  'history.$.sender': {
    type: String,
    optional: true
  },
  'history.$.reciever': {
    type: String,
    optional: true
  },
  'history.$.msg': {
    type: String,
  }
}
));
