import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import './main.html';

Meteor.startup(function () {
    $(window).scroll(function () {
        windowPosition = $(window).scrollTop() + $(window).height();
        perc = windowPosition / $(document).height() * 100;
        if (perc > 25 && perc < 50) {
            Session.set("scrollPercentage", 25);
        }
        if (perc > 50 && perc < 75) {
            Session.set("scrollPercentage", 50);
        }
        if (perc > 75 && perc < 99) {
            Session.set("scrollPercentage", 75);
        }
        if (perc > 99) {
            Session.set("scrollPercentage", 100);
        }
    });
});

Template.shareTrainingHome.onRendered(function () {
    $('.parallax').parallax();
    $('select').material_select();
    $('.datepicker').pickadate({
        selectMonths: true, // Creates a dropdown to control month
        selectYears: 15 // Creates a dropdown of 15 years to control year
    });
    $('#contatoForm').hide();
    $('.scrollspy').scrollSpy();
    Tracker.autorun(function () {
        perc = Session.get("scrollPercentage");
        ga('send', 'event', {
            eventCategory: 'SiteTracking',
            eventAction: 'userScrollPage',
            eventValue: perc
        });
    });
});

Template.searchBar.events({
    'click #searchButton': function () {
        event.preventDefault();
        var addressSearch = $('#addressSearch').val();
        Meteor.call('getGeocodeFromAddress', addressSearch, function(err, res){
            if(err){
                console.log(err)
            } else{
                console.log(res);
                Session.set('searchResult', res);
                Router.go('searchResult');
            }
        })
        //Router.go('searchResults')
    }
})