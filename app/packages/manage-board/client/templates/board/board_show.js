String.prototype.splice = function(idx, rem, str) {
  return this.slice(0, idx) + str + this.slice(idx + Math.abs(rem));
};

Template.BoardShow.helpers({
  board: function(){
    // debugger
    Meteor.call('getBoard', 'NEpaLstZr6stDZBnA', function(err, res){
      return res
    })
    // return Board.findOne();
  }
})

Template.BoardShow.events({
  'keypress .boardDescription': function(event){
    Meteor.call('storeText', event.currentTarget.selectionStart, String.fromCharCode(event.keyCode), event.currentTarget.id, function(){
    })
  }
})

Template.BoardShow.onRendered(function(){
  var currentValue = Board.find();
  var handle = currentValue.observeChanges({
    changed: function (id, currentValue) {
      var des = currentValue.description;
      recentElement = currentValue.changes[currentValue.changes.length - 1];
      console.log(des.splice(recentElement.position, 0, recentElement.character));
    }
  });
})
