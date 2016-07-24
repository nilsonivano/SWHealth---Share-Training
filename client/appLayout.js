Template.appLayout.helpers({
    'user': function(){
        console.log(Meteor.user());
        return Meteor.user();
    }
});

Template.appLayout.events({
    'click #userLogout': function () {
        Meteor.logout(function(err){
            if(err){
                console.log(err.reason);
            } else{
                Router.go('shareTrainingHome')
            }
        });
    },
    'click #loginButton': function (event) {
        event.preventDefault();
        $("#modalLogin").openModal();
    },
    'click #registerButton': function (event) {
        event.preventDefault();
        $("#modalRegister").openModal();
    }
});

Template.appLayout.onCreated(function () {
    //add your statement here
});

Template.appLayout.onRendered(function () {
    $(".button-collapse").sideNav();

});

Template.appLayout.onDestroyed(function () {
    //add your statement here
});

Template.login.events({
    'click #login':function(event){
        event.preventDefault();
        var email = $('#loginEmail').val();
        var password = $('#loginPassword').val();
        Meteor.loginWithPassword(email, password,function(error){
            if(error){
                toastr.error(error.reason);
            }else{
                $("#modalLogin").closeModal();
                Router.go('ptProfile');
            }
        });
    }
});

Template.register.events({
    'click #register':function(event){
        event.preventDefault();
        var email = $('#registerEmail').val();
        var password = $('#registerPassword').val();
        var passwordAgain = $('#registerPasswordAgain').val();
        if(password === passwordAgain){
            Meteor.call('userRegister',email,password, function(error,results){
                if (error){
                    console.log(error)
                } else{
                    // var html =
                    //     '<div>' + 'Olá, obrigado por realizar seu cadastro no Share Training.' + '</div>' +
                    //     '<div>' + 'Pedimos que você atualize todas suas informações de seu perfil em nossa plataforma.' + '</div>' +
                    //     '<div>' + 'Atualize regularmente seus treinos  no Share Training, para que seus clientes possam te encontrar de maneira mais fácil.' + '</div>' +
                    //     '<div>' + 'Se ainda tiver alguma dúvida, não existe em nos contatar no <b>contato@sharetraining.co</b>' + '</div>';
                    // Meteor.call('sendEmail',
                    //     email,
                    //     'contato@sharetraining.co',
                    //     'Bem vindo ao Share Training',
                    //     html);
                    Meteor.loginWithPassword(email,password,function(){
                        if(error){
                            console.log(error)
                        } else{
                            $("#modalRegister").closeModal();
                            Router.go('ptProfile');
                        }
                    })
                }
            });
        } else {
            Materialize.error("Confira novamente sua senha");
        }
    }
});
