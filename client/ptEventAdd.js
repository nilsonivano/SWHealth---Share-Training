Template.ptEventAdd.helpers({
    aulaTypes: function () {
        return aulaTypes
    },
    nivelTypes: function () {
        return nivelTypes
    },
    mapEventAdd: function() {
        if (GoogleMaps.loaded()) {
            // Map initialization options
            return {
                center: new google.maps.LatLng(-37.8136, 144.9631),
                zoom: 16
            };
        }
    }
});

Template.ptEventAdd.events({
    'blur #eventAddress':function(event){
        var eventAddress = $('#eventAddress').val();
        console.log(eventAddress);
        //Geocoding
        var geocoder;
        geocoder = new google.maps.Geocoder();
        var address = eventAddress;
        var map = GoogleMaps.maps.mapEventAdd.instance;
        var markerImage = '/img/shareTrainingMarker60.png';
        geocoder.geocode( { 'address': address}, function(results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                map.setCenter(results[0].geometry.location);
                var marker = new google.maps.Marker({
                    map: map,
                    position: results[0].geometry.location,
                    icon: markerImage
                });
            } else {
                Materialize.toast("Nenhum endereço localizado. Inserir um endereço válido", 2000);
            }
        });
    },
    'click #eventPublish': function () {
        var address = $('#eventAddress').val();
        var addressReference = $('#eventAddressReference').val();
        var date = $('#date').val();
        var timeStart = $('#timeStart').val();
        var timeEnd = $('#timeEnd').val();
        var aulaType = $('#aulaType').val();
        var nivelType = $('#nivelType').val();
        var price = $('#price').val();
        var vagaQuantity = $('#vagaQuantity').val();
        var description = $('#description').val();
        if(address && date && timeStart && timeEnd){
            var AgendaDateStart = new Date(date + " " + timeStart);
            var AgendaDateEnd = new Date(date + " " + timeEnd);
            var ptName = Meteor.user().profile.name;
            var ptId = Meteor.userId();
            //Geocoding the address
            var geocoder;
            geocoder = new google.maps.Geocoder();
            geocoder.geocode( { 'address': address}, function(results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    var eventAddress = results[0].formatted_address;
                    var eventCity = results[0].address_components[4].long_name;
                    var lat = results[0].geometry.location.lat();
                    var lng = results[0].geometry.location.lng();
                    var addressGeocode = {
                        lat: lat,
                        lng: lng,
                        city: eventCity,
                        address: eventAddress
                    };
                    Meteor.call('insertEvent',description,vagaQuantity,nivelType, aulaType, price, AgendaDateStart, AgendaDateEnd,
                        address, addressGeocode, addressReference, ptId, function(err){
                            if (err){
                                console.log(err);
                                Materialize.toast("Algo de errado aconteceu", 2000)
                            }else{
                                $('#address').val("");
                                $('#date').val("");
                                $('#timeStart').val("");
                                $('#timeEnd').val("");
                                $('#aulaType').val("");
                                Materialize.toast("Aula publicada com sucesso", 2000);
                            }
                        });
                } else {
                    alert("Endereço não encontrado: " + status);
                }
            });
        } else{
            Materialize.toast("Completar todos os dados da aula", 2000)
        }
    }
});

Template.ptEventAdd.onCreated(function () {
    GoogleMaps.load({ v: '3', key: 'AIzaSyDVajHobXajARKLYLARt0pualrB5kvqG_8', libraries: 'geometry,places' });
});

Template.ptEventAdd.onRendered(function () {
    $('.datepicker').pickadate({
        selectMonths: true, // Creates a dropdown to control month
        selectYears: 15 // Creates a dropdown of 15 years to control year
    });
    $('select').material_select();
    Tracker.autorun(function(){
        if (GoogleMaps.loaded()) {
            $("#eventAddress").geocomplete();
        }
    });
});

Template.ptEventAdd.onDestroyed(function () {
    //add your statement here
});

