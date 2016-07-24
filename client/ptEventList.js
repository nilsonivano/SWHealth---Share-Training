Template.ptEventList.helpers({
    eventList: function () {
        var userId = Meteor.userId();
        return ptEvent.find({addedBy: userId}).fetch()
    }
});

Template.ptEventList.events({
    //add your events here
});

Template.ptEventList.onCreated(function () {
    //add your statement here
});

Template.ptEventList.onRendered(function () {
});

Template.ptEventList.onDestroyed(function () {
    //add your statement here
});

