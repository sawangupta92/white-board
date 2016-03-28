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
  createBoard: function(){
    Board.insert({ title: 'new' })
  },
  storeText: function(position, character, id, keyCode){
    var board = Board.findOne({_id: id});
    Board.update(
      { _id: id },
      {
        $set: {
          description: board.setDescription(position, 0, character)
        },
        $push: {
          changes: { position: position, character: keyCode }
        }
      }
    )
    return board.changes;
  },
  getBoard: function(id){
    return Board.findOne({_id: id});
  }
});
