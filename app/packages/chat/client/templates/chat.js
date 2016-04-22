import emojify from 'emojify.js';
Template.Chat.helpers({
  users: function(){
    return Meteor.users.find({_id: { $ne: Meteor.userId() }}).fetch();
  },
  chat: function(){
    return Chat.findOne({ _id: Session.get('chatId') });
  },
  chatGetUnreadCount: function(userId){
    chat = Chat.findOne({secondUser: userId })
    if(chat != undefined){
      return chat.secondUserUnreadCount
    }
    return Chat.findOne({firstUser: userId }).firstUserUnreadCount
  },
  friendId: function() {
    return Session.get('friendId')
  }
})

Template.Chat.events({
  'click .userList': function(event) {
    // $(event.currentTarget).find('.count').html('')
    chat = Chat.findOne({ $or: [{ firstUser: event.currentTarget.id }, { secondUser: event.currentTarget.id }]})
    if(chat == undefined){
      Meteor.call('createChatId', event.currentTarget.id, Meteor.userId(), function(err, chat){
        Session.set('chatId', chat._id)
        Session.set('friendId', event.currentTarget.id)
      })
    } else {
      Session.set('chatId', chat._id)
      Session.set('friendId', event.currentTarget.id)
      Meteor.call('setChatId', chat._id)
      Meteor.call('resetChatCounter', Session.get('chatId'), event.currentTarget.id, function(err, res){

      })
    }
  },
  'keyup .sendMsg': function(event) {
    if(event.keyCode == 13){
      Meteor.call('sendMsg', Session.get('chatId'), Meteor.userId(), event.currentTarget.id, event.currentTarget.value, function(err, res){
        event.currentTarget.value = ''
      })
    }
  }
})

Template.Chat.onRendered(function(){
  Tracker.autorun(function() {
    Chat.find().observeChanges({
      changed: function(id, doc) {
        // Emojify.run();
        if(Session.get('chatId') == id) {
          Meteor.call('resetChatCounter', Session.get('chatId'), Session.get('friendId'), function(err, res){})
          // unreadCount = $('#' + doc.history[doc.history.length-1].reciever).find('.count')
          // unreadCount.html(Number(unreadCount.html()) + 1)
        }
      }
    })
  })
})
