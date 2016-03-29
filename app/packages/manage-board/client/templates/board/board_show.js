String.prototype.splice = function(idx, rem, str) {
  if(rem == -1){
    return this.slice(0, idx) + this.slice(idx + Math.abs(rem));
  } else {
    return this.slice(0, idx) + str + this.slice(idx + Math.abs(rem));
  }
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
    Meteor.call('storeText', event.currentTarget.selectionStart, String.fromCharCode(event.keyCode), event.currentTarget.id, event.keyCode, 0, function(err, res){
    })
  },
  'keyup .boardDescription': function(event){
    if(event.keyCode == 8) {
      Meteor.call('storeText', event.currentTarget.selectionStart, '', event.currentTarget.id, '', -1, function(err, res){
      })
    }
  }
})

Template.BoardShow.onRendered(function(){
  Meteor.call('getBoard', this.data, function(err, res){
    clientBoard._collection.upsert({ _id: res._id }, { $set: { title: res.title, description: res.description } })

    Deps.autorun(function () {
      board = Board.findOne();
      response = board.changes[board.changes.length - 1];
      if(board != undefined && response != undefined && res.check != undefined){
        if(res.description == undefined){
          String.fromCharCode(response.character)
        } else {
          res.description = res.description.splice(response.position, response.remainder, String.fromCharCode(response.character));
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
      res.check = true
    })
  })

});
