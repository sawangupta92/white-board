Meteor.publish('boards', function(){
  return Board.find();
})

Meteor.publish('show-board', function(id){
  return Board.find({_id: id});
})
