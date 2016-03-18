String.prototype.splice = function(idx, rem, str) {
  return this.slice(0, idx) + str + this.slice(idx + Math.abs(rem));
};

Meteor.publish('boards', function(){
  return Board.find();
});

Meteor.publish('show-board', function(id){
  return Board.find({_id: id}, { fields: { changes: 1 } });
});

Meteor.publish('update-board-data', function(id){
  return Board.find({_id: id}, { changes: 1 });
});

Meteor.methods({
  storeText: function(position, character, id){
    var board = Board.findOne({_id: id});
    Board.update(
      { _id: id },
      {
        $set: {
          description: board.description.splice(position, 0, character)
        },
        $push: {
          changes: { position: position, character: character }
        }
      }
    )
    return board.changes;
  },
  getBoard: function(id){
    return Board.findOne({_id: id});
  }
});
