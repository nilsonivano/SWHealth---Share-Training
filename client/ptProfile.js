Template.ptProfile.helpers({
    'user': function () {
        return Meteor.user()
    }
});

Template.ptProfile.events({
    'click #saveptInfo': function () {
        var currentUser = Meteor.userId();
        var name = $('#name').val();
        var cref = $('#cref').val();
        var email = $('#email').val();
        var phone = $('#phone').val();
        var description = $('#description').val();
        var miniCV = $('#miniCV').val();
        Meteor.users.update(currentUser, {$set:{
            "profile.name": name,
            "profile.cref" : cref,
            "profile.contacts.email": email,
            "profile.contacts.phone": phone,
            "profile.description": description,
            "profile.miniCV": miniCV
        }}, function (err, res) {
            if(res){
                Materialize.toast("Perfil salvo com sucesso", 2000)
            }
        })
    }
});

Template.ptProfile.onCreated(function () {
    //add your statement here
});

Template.ptProfile.onRendered(function () {
    //add your statement here
});

Template.ptProfile.onDestroyed(function () {
    //add your statement here
});

