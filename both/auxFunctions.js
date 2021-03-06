placeMarkerLead = function(PsicoLeads,map,markerImage, PsicoDatabase){
    var markersOld = [];
    var length = PsicoLeads.length;
    var bounds = new google.maps.LatLngBounds();
    for(i = 0; i<length; i++){
        var lat = PsicoLeads[i].addressGeocode.lat;
        var lng = PsicoLeads[i].addressGeocode.lng;
        if(lat && lng){
            var LatLng = {lat: lat, lng: lng};
            var address = PsicoLeads[i].addressGeocode.address;
            var name = PsicoLeads[i].name;
            var phone = PsicoLeads[i].phone;
            var email = PsicoLeads[i].email;
            var valoresRange = PsicoLeads[i].valoresRange;
            var atendimentoType = PsicoLeads[i].atendimentoType;
            var especializacaoType = PsicoLeads[i].especializacaoType;
            var haveConvenio = PsicoLeads[i].haveConvenio;
            var convenioName = PsicoLeads[i].convenioName;
            var haveContatar = PsicoLeads[i].haveContatar;
            var contatoType =  PsicoLeads[i].contatoType;
            var contatoHorario =  PsicoLeads[i].contatoHorario;
            var createdAt = PsicoLeads[i].createdAt;
            var contentString =
                '<div>' + '<b>Nome: </b>' + name + '</div>' +
                '<div style="max-width: 250px">' + '<b>Endereço: </b>' + address + '</div>' +
                '<div>' + '<b>Email: </b>' + email + '</div>' +
                '<div>' + '<b>Telefone: </b>' + phone + '</div>' +
                '<div>' + '<b>Valores Range: </b>' + valoresRange + '</div>' +
                '<div>' + '<b>Tipo de Atendimento: </b>' + atendimentoType + '</div>' +
                '<div>' + '<b>Tipo de Especializacao: </b>' + especializacaoType + '</div>' +
                '<div>' + '<b>Tem Convenio: </b>' + haveConvenio + '</div>' +
                '<div>' + '<b>Convenio: </b>' + convenioName + '</div>' +
                '<div>' + '<b>Contatar: </b>' + haveContatar + '</div>' +
                '<div>' + '<b>Tipo de Contato: </b>' + contatoType + '</div>' +
                '<div>' + '<b>Contato Horario: </b>' + contatoHorario + '</div>' +
                '<div>' + '<b>Data da requisição: </b>' + createdAt + '</div>';
            var infowindow = new google.maps.InfoWindow({
                content: contentString
            });
            var marker = new google.maps.Marker({
                map: map,
                position: LatLng,
                icon: markerImage,
                infowindow: infowindow
            });
            markersOld[i] = marker;
            google.maps.event.addListener(marker, 'click', function() {
                this.infowindow.open(map, this);
                console.log(this.position.lat());
                var markerLoc = {lat: this.position.lat(),lng: this.position.lng()};
                Session.set('userNearPsicosInfo',getNearPsicos(markerLoc, PsicoDatabase,6));
            });
            bounds.extend(marker.getPosition());
        }
    }
    map.fitBounds(bounds);
    return markersOld
};

placeMarkerPsico = function(PsicoArray,map,markerImage){
    var markersOld = [];
    var length = PsicoArray.length;
    var bounds = new google.maps.LatLngBounds();
    for(i = 0; i<length; i++){
        var lat = PsicoArray[i].addressGeocode.lat;
        var lng = PsicoArray[i].addressGeocode.lng;
        var LatLng = {lat: lat, lng: lng};
        if(lat && lng){
            var address = PsicoArray[i].addressGeocode.address;
            var name = PsicoArray[i].name;
            var crp = PsicoArray[i].crp;
            var phone = PsicoArray[i].contacts.phone;
            var email = PsicoArray[i].contacts.email;
            var website = PsicoArray[i].contacts.website;
            var abordagemType = PsicoArray[i].abordagemType;
            var servicoType = PsicoArray[i].servicoType;
            var convenio = PsicoArray[i].convenio;
            var contentString =
                '<div>' + '<b>Nome: </b>' + name + '</div>' +
                '<div>' + '<b>CRP: </b>' + crp + '</div>' +
                '<div style="max-width: 250px">' + '<b>Endereço: </b>' + address + '</div>' +
                '<div>' + '<b>Email: </b>' + email + '</div>' +
                '<div>' + '<b>Telefone: </b>' + phone + '</div>' +
                '<div>' + '<b>Website: </b>' + website + '</div>' +
                '<div>' + '<b>Convênio: </b>' + convenio + '</div>' +
                '<div>' + '<b>Tipo de Serviço: </b>' + servicoType + '</div>' +
                '<div>' + '<b>Tipo de Abordagem: </b>' + abordagemType + '</div>';
            var infowindow = new google.maps.InfoWindow({
                content: contentString
            });
            var marker = new google.maps.Marker({
                map: map,
                position: LatLng,
                icon: markerImage,
                infowindow: infowindow
            });
            markersOld[i] = marker;
            google.maps.event.addListener(marker, 'click', function() {
                this.infowindow.open(map, this);
            });
            bounds.extend(marker.getPosition());
        }
    }
    map.fitBounds(bounds);
    return markersOld
};
//Calcular distância entre 2 lat lngs em km

placeMarkerEvent = function(eventList,map,markerImage){
    var markersOld = [];
    var length = eventList.length;
    var bounds = new google.maps.LatLngBounds();
    for(i = 0; i<length; i++){
        var lat = eventList[i].addressGeocode.lat;
        var lng = eventList[i].addressGeocode.lng;
        var LatLng = {lat: lat, lng: lng};
        if(lat && lng){
            var address = eventList[i].addressGeocode.address;
            var classLevel = eventList[i].classLevel;
            var classType = eventList[i].classType;
            var dateStart = eventList[i].dateStart;
            var dateEnd = eventList[i].dateEnd;
            var price = eventList[i].price;
            var personQuantity = eventList[i].personQuantity;
            var contentString =
                '<div>' + '<b>Endereço: </b>' + address + '</div>' +
                '<div>' + '<b>Tipo de atividade: </b>' + classType + '</div>' +
                '<div>' + '<b>Nível da atividade: </b>' + classLevel + '</div>' +
                '<div>' + '<b>Inicio da atividade : </b>' + dateStart + '</div>' +
                '<div>' + '<b>Fim da atividade: </b>' + dateEnd + '</div>' +
                '<div>' + '<b>Preço por vaga: </b>R$ ' + price + '</div>' +
                '<div>' + '<b>Quantidade de vagas: </b>' + personQuantity + '</div>';
            var infowindow = new google.maps.InfoWindow({
                content: contentString
            });
            var marker = new google.maps.Marker({
                map: map,
                position: LatLng,
                icon: markerImage,
                infowindow: infowindow
            });
            markersOld[i] = marker;
            google.maps.event.addListener(marker, 'click', function() {
                this.infowindow.open(map, this);
            });
            bounds.extend(marker.getPosition());
        }
    }
    map.fitBounds(bounds);
    return markersOld
};

deg2rad = function(deg) {
    return deg * (Math.PI/180)
};

getDistanceFromLatLonInKm = function(lat1,lon1,lat2,lon2) {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2-lat1);  // deg2rad below
    var dLon = deg2rad(lon2-lon1);
    var a =
            Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
            Math.sin(dLon/2) * Math.sin(dLon/2)
        ;
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    var d = R * c; // Distance in km
    return d;
};

getNearPsicos = function (userLoc, PsicoArray, quantityReturn) {
    var PsicoArrayMongo = new Mongo.Collection(null);
    for(i = 0; i < PsicoArray.length; i++){
        var distance = getDistanceFromLatLonInKm(PsicoArray[i].addressGeocode.lat, PsicoArray[i].addressGeocode.lng, userLoc.lat, userLoc.lng);
        PsicoArray[i].distance = distance;
        //Limitando distancias com problema
        if(distance >= 0.0001){
            PsicoArrayMongo.insert(PsicoArray[i]);
        }
    }
    return PsicoArrayMongo.find({},{sort: {distance: 1}, limit: quantityReturn}).fetch()
}