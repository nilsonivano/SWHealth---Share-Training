Template.ptProfileOpen.helpers({
    ptProfile:function () {
        var ptProfile = Meteor.users.find().fetch();
        console.log(ptProfile[0].profile);
        return ptProfile[0].profile
    }
});

Template.ptProfileOpen.events({
    //add your events here
});

Template.ptProfileOpen.onCreated(function () {
    //add your statement here
});

Template.ptProfileOpen.onRendered(function () {
    //add your statement here
});

Template.ptProfileOpen.onDestroyed(function () {
    //add your statement here
});

