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
    Meteor.call('storeText', event.currentTarget.selectionStart, String.fromCharCode(event.keyCode), event.currentTarget.id, event.keyCode, function(err, res){
    })
  }
})

Template.BoardShow.onRendered(function(){
  Meteor.call('getBoard', this.data._id, function(err, res){
    clientBoard._collection.upsert({ _id: res._id }, { $set: { title: res.title, description: res.description } })

    Deps.autorun(function () {
      board = Board.findOne();
      response = board.changes[board.changes.length - 1];
      if(board != undefined && response != undefined){
        if(res.description == undefined){
          String.fromCharCode(response.character)
        } else {
          res.description = res.description.splice(response.position, 0, String.fromCharCode(response.character))
        }
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
