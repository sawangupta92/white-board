var Collections = {};

Meteor.isClient && Template.registerHelper("Collections", Collections);

Board = Collections.Board = new Mongo.Collection('boards');

Board.attachSchema(new SimpleSchema({
  title: {
    type: String,
    max: 50
  },
  description: {
    type: String
  },
  'changes.$': {
    type: Object,
    optional: true
  },
  'changes.$.position': {
    type: Number
  },
  'changes.$.character': {
    type: String
  }
}));
