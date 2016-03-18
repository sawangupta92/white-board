var Collections = {};

Meteor.isClient && Template.registerHelper("Collections", Collections);

Board = Collections.Board = new Mongo.Collection('boards');

console.log(SimpleSchema.options)

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
}, {
  trimStrings: false
}));

if(Meteor.isClient){
  clientBoard = Collections.clientBoard = new Mongo.Collection('clientBoards');

  clientBoard.attachSchema(new SimpleSchema({
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
      type: String,
      optional: true
    }
  }));

}
