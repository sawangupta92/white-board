Template.Chat.helpers({
  users: function(){
    return Meteor.users.find().fetch();
  },
  chat: function(){
    return Chat.findOne({ _id: Session.get('chatId') });
  },
  friendId: function() {
    return Session.get('friendId')
  }
})

Template.Chat.events({
  'click .userList': function(event) {
    Meteor.subscribe('metoerUserChat', event.currentTarget.id, Meteor.userId(), {
      onReady: function(res, err) {
        chat = Chat.findOne({ $or: [{ firstUser: event.currentTarget.id, secondUser: Meteor.userId() }, { firstUser: Meteor.userId(), secondUser: event.currentTarget.id }]})
        Session.set('chatId', chat._id)
        Session.set('friendId', event.currentTarget.id)
      }
    })
  },
  'keyup .sendMsg': function(event) {
    if(event.keyCode == 13){
      Meteor.call('sendMsg', Session.get('chatId'), Meteor.userId(), event.currentTarget.id, event.currentTarget.value, function(err, res){
        event.currentTarget.value = ''
      })
    }
  }
})
