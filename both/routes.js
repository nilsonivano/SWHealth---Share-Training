Router.route('/', {
    name: 'shareTrainingHome',
    layoutTemplate: 'appLayout',
    template: 'shareTrainingHome'
});

Router.route('/ptProfile', {
    name: 'ptProfile',
    layoutTemplate: 'appLayout',
    template: 'ptProfile'
});

Router.route('/ptEventAdd', {
    name: 'ptEventAdd',
    layoutTemplate: 'appLayout',
    template: 'ptEventAdd'
});

Router.route('/ptEventList', {
    name: 'ptEventList',
    layoutTemplate: 'appLayout',
    template: 'ptEventList',
    subscriptions: function () {
        if (Meteor.user()) {
            return Meteor.subscribe('ptEventAll')
        }
    },
    action: function () {
        if (this.ready()) {
            this.render();
        } else {
            this.render('loading');
        }
    }
});

Router.route('/searchResult', {
    name: 'searchResult',
    layoutTemplate: 'appLayout',
    template: 'searchResult',
    subscriptions: function () {
        return Meteor.subscribe('ptEventAll')
    },
    action: function () {
        if (this.ready()) {
            this.render();
        } else {
            this.render('loading');
        }
    }
});

Router.route('/userLeads', {
    name: 'adminUserLeads',
    template: 'adminUserLeads',
    subscriptions: function () {
        if (Meteor.user()) {
            return (Meteor.subscribe('userLeadsAll'),
                Meteor.subscribe('psicoDatabaseAll'));
        }
    },
    action: function () {
        if (this.ready()) {
            this.render();
        } else {
            this.render('loading');
        }
    }
});

Router.route('/psicoPanel', {
    name: 'adminPsicoPanel',
    template: 'adminPsicoPanel'
});

if (Meteor.isClient) {
    Router.plugin('seo',
        {
            defaults: {
                title: 'ShareTraining - Encontre agora o melhor treino para você',
                description: 'Encontre agora o melhor treino para você.',
                //image: 'http://lemeat.com/images/lemeat_launcher_icon.png',
                meta: {
                    keywords: ['treino', 'personal']
                },
                twitter: {
                    card: 'ShareTraining'
                },
                og: {
                    site_name: 'ShareTraining - Encontre agora o melhor treino para você',
                    title: 'ShareTraining - Encontre agora o melhor treino para você',
                    description: 'Encontre agora o melhor treino para você.',
                    //image: 'http://lemeat.com/images/lemeat_launcher_icon.png',
                    type: 'website'
                }
            }
        });
}