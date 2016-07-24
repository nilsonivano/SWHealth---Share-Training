import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

Meteor.methods({
    'userRegister': function(email,password) {
        Accounts.createUser({
            email: email,
            password: password
        });
    },
    'insertEvent': function(description, personQuantity, classLevel, classType, price, dateStart, dateEnd, address,
    addressGeocode, addressReference, addedBy){
        ptEvent.insert({
            description: description,
            personQuantity: personQuantity,
            classLevel: classLevel,
            classType: classType,
            price: price,
            dateStart: dateStart,
            dateEnd: dateEnd,
            address: address,
            addressGeocode:{
                lat: addressGeocode.lat,
                lng: addressGeocode.lng,
                city: addressGeocode.city,
                address: addressGeocode.address
            },
            addressReference: addressReference,
            addedBy: addedBy
        });
    },
    'getGeocodeFromAddress': function(address){
        var geo = new GeoCoder({
            geocoderProvider: "google",
            httpAdapter: "https",
        });
        var result = geo.geocode(address);
        if(result){
            return result
        } else{
            return "Achei nada...."
        }
    },
    'insertPsicoDatabase': function (psicoObject) {
        check(psicoObject, Object);
        return(psicoDatabase.insert({
            name: psicoObject.name,
            crp: psicoObject.crp,
            servicoType: psicoObject.servicoType,
            abordagemType: psicoObject.abordagemType,
            addressGeocode:{
                lat: psicoObject.addressGeocode.lat,
                lng: psicoObject.addressGeocode.lng,
                address: psicoObject.addressGeocode.address
            },
            contacts:{
                phone: psicoObject.contacts.phone,
                website: psicoObject.contacts.website,
                email: psicoObject.contacts.email
            },
            convenio: psicoObject.convenio
        })
        )
    }
});