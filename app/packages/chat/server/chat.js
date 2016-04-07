Meteor.publish('usersList', function(id){
  return Meteor.users.find()
});

Meteor.publish('metoerUserChat', function(firstUserId, secondUserId){
  chat = Chat.findOne({ $or: [{ firstUser: firstUserId, secondUser: secondUserId }, { firstUser: secondUserId, secondUser: firstUserId }]})
  if(chat == undefined){
    Chat.insert({ firstUser: firstUserId, secondUser: secondUserId })
  }
  return Chat.find({ $or: [{ firstUser: firstUserId, secondUser: secondUserId }, { firstUser: secondUserId, secondUser: firstUserId }]});
});

Meteor.methods({
  sendMsg: function(chatId, firstUserId, secondUserId, msg){
    Chat.update(
      { _id: chatId },
      {
        $push: {
          history: { sender: firstUserId, reciever: secondUserId, msg: msg }
        }
      }
    )
  }
})
