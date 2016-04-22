Meteor.publish('usersList', function(id){
  return Meteor.users.find({_id: { $ne: id }})
});

Meteor.publish('chatList', function(id){
  return Chat.find({$or: [{ firstUser: id }, { secondUser: id }]})
});

Meteor.publish('metoerUserChat', function(firstUserId, secondUserId){
  chat = Chat.findOne({ $or: [{ firstUser: firstUserId, secondUser: secondUserId }, { firstUser: secondUserId, secondUser: firstUserId }]})
  console.log(chat)
  if(chat == undefined){
    Chat.insert({ firstUser: firstUserId, secondUser: secondUserId })
  }
  return Chat.find({ $or: [{ firstUser: firstUserId, secondUser: secondUserId }, { firstUser: secondUserId, secondUser: firstUserId }]});
});

Meteor.methods({
  createChatId: function(firstUserId, secondUserId){
    chat = Chat.findOne({ $or: [{ firstUser: firstUserId, secondUser: secondUserId }, { firstUser: secondUserId, secondUser: firstUserId }]})
    if(chat == undefined){
      Chat.insert({ firstUser: firstUserId, secondUser: secondUserId })
      return Chat.findOne({ firstUser: firstUserId, secondUser: secondUserId })
    } else{
      return chat
    }
  },

  setChatId: function(chatId){
    Meteor.users.update({
      _id: Meteor.userId()
    },{
      $set: { chatId: chatId }
    }
    )
  },

  resetChatCounter: function(chatId, UserId){
    chat = Chat.findOne({_id: chatId})
    if(UserId == chat.firstUser){
      reciever = 'firstUserUnreadCount'
    } else{
      reciever = 'secondUserUnreadCount'
    }
    Chat.update({
      _id: chatId
    },{
      $set: { [reciever]: 0 }
    }
    )
  },

  sendMsg: function(chatId, firstUserId, secondUserId, msg){
    chat = Chat.findOne({_id: chatId})
    if(firstUserId == chat.firstUser){
      reciever = 'firstUserUnreadCount'
    } else{
      reciever = 'secondUserUnreadCount'
    }
    Chat.update(
      { _id: chatId },
      {
        $push: {
          history: { sender: secondUserId, reciever: firstUserId, msg: msg }
        },
        $set: {
          [reciever]: chat[reciever] + 1
        }
      }
    )
  }
})

