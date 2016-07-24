Template.searchResult.helpers({
    mapEventResult: function() {
        if (GoogleMaps.loaded()) {
            // Map initialization options
            return {
                center: new google.maps.LatLng(-37.8136, 144.9631),
                zoom: 16
            };
        }
    },
    eventList: function () {
        var eventList = ptEvent.find().fetch();
        var listFinal = new Mongo.Collection(null);
        var searchResult = Session.get('searchResult');
        console.log(searchResult);
        var addressResult = searchResult[0].formattedAddress;
        var latUser = searchResult[0].latitude;
        var lngUser = searchResult[0].longitude;
        var eventListLength = eventList.length;
        for(i = 0; i < eventListLength; i++){
            var distance = getDistanceFromLatLonInKm(latUser, lngUser, eventList[i].addressGeocode.lat,eventList[i].addressGeocode.lng);
            var pt = Meteor.users.find({_id: eventList[i].addedBy}).fetch();
            var ptName = pt[0].profile.name;
            var ptCref = pt[0].profile.cref;
            eventList[i].distance = distance;
            eventList[i].ptName = ptName;
            eventList[i].ptCref = ptCref;
            listFinal.insert(eventList[i]);
        }
        console.log(listFinal.find({},{sort: {distance: 1}}).fetch());
        return listFinal.find({},{sort: {distance: 1}}).fetch();
    }
});

Template.searchResult.events({
    //add your events here
});

Template.searchResult.onCreated(function () {
    GoogleMaps.load({ v: '3', key: 'AIzaSyDVajHobXajARKLYLARt0pualrB5kvqG_8', libraries: 'geometry,places' });
});

Template.searchResult.onRendered(function () {
    Tracker.autorun(function(){
        if (GoogleMaps.loaded()) {
            var searchResult = Session.get('searchResult');
            console.log(searchResult);
            var addressResult = searchResult[0].formattedAddress;
            var lat = searchResult[0].latitude;
            var lng = searchResult[0].longitude;
            var map = GoogleMaps.maps.mapEventResult.instance;
            var markerImagePersonLocation = '/img/shareTrainingMarkerPersonLocation.png';
            map.setCenter({lat: lat, lng: lng});
            var marker = new google.maps.Marker({
                map: map,
                position: {lat: lat, lng: lng},
                icon: markerImagePersonLocation
            });
            var eventList = ptEvent.find().fetch();
            var markerImageEvents = '/img/shareTrainingMarker60.png';
            placeMarkerEvent(eventList,map,markerImageEvents);
        }
    });
});

Template.searchResult.onDestroyed(function () {
    //add your statement here
});

