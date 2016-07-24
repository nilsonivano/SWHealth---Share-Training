Meteor.publish('ptEventAll', function(){
    return ptEvent.find()
});