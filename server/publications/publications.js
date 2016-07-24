Meteor.publish('ptEventAll', function(){
    return ptEvent.find()
});

Meteor.publish('ptProfile', function(ptId){
    return Meteor.users.find({_id: ptId},{fields: {profile: 1}})
});

Meteor.publish('ptAll', function(){
    return Meteor.users.find({})
});