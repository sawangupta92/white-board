String.prototype.splice = function(idx, rem, str) {
  return this.slice(0, idx) + str + this.slice(idx + Math.abs(rem));
};

var Collections = {};

Meteor.isClient && Template.registerHelper("Collections", Collections);

Board = Collections.Board = new Mongo.Collection('boards', {
  transform: function(doc) {
    doc.setDescription = function(position, start_position, character) {
      if(doc.description == undefined){
        return character
      } else {
        return doc.description.splice(position, start_position, character)
      }
    }
    return doc;
  }
});

// Board.attachSchema(new SimpleSchema({
//   title: {
//     type: String,
//     max: 50,
//     optional: true,
//     trim: false
//   },
//   description: {
//     type: String,
//     optional: true
//   },
//   'changes.$': {
//     type: Object,
//     optional: true
//   },
//   'changes.$.position': {
//     type: Number
//   },
//   'changes.$.character': {
//     type: String,
//     optional: true,
//     trim: false
//   }
// }
// ));

// Board.

Board.allow({
  insert: function () {
    console.log(8932048902384)
    return true;
  }
});

if(Meteor.isClient){
  clientBoard = Collections.clientBoard = new Mongo.Collection('clientBoards');

  clientBoard.attachSchema(new SimpleSchema({
    title: {
      type: String,
      max: 50,
      trim: false
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
      optional: true,
      trim: false
    }
  }));

}
