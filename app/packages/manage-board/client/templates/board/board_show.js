String.prototype.splice = function(idx, rem, str) {
  return this.slice(0, idx) + str + this.slice(idx + Math.abs(rem));
};

Template.BoardShow.helpers({
  getclientBoard: function() {
    return clientBoard.findOne();
  },
  getBoard: function() {
    return Board.findOne();
  },
})

Template.BoardShow.events({
  'keypress .boardDescription': function(event){
    Meteor.call('storeText', event.currentTarget.selectionStart, String.fromCharCode(event.keyCode), event.currentTarget.id, function(err, res){
    })
  }
})

Template.BoardShow.onRendered(function(){
  Meteor.call('getBoard', 'NEpaLstZr6stDZBnA', function(err, res){
    clientBoard._collection.upsert({ _id: res._id }, { $set: { title: res.title, description: res.description } })

    Deps.autorun(function () {
      board = Board.findOne();
      if(board != undefined){
        response = board.changes[board.changes.length - 1]
        console.log(response)
        res.description = res.description.splice(response.position, 0, response.character)
        clientBoard._collection.update(
          { _id: board._id },
          {
            $set: {
              description: res.description
            },
          }
        )
      }
    })
  })

});
