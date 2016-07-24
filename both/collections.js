import { Mongo } from 'meteor/mongo';

ptEvent = new Mongo.Collection('ptEvent');

contactsSchema = new SimpleSchema({
    email: {
        type: String,
        optional: true,
        defaultValue: ""
    },
    phone: {
        type: String,
        optional: true,
        defaultValue: ""
    },
    facebook: {
        type: String,
        optional: true,
        defaultValue: ""
    },
    instagram: {
        type: String,
        optional: true,
        defaultValue: ""
    },
    twitter: {
        type: String,
        optional: true,
        defaultValue: ""
    },
    website: {
        type: String,
        optional: true,
        defaultValue: ""
    }
});

addressGeocodeSchema = new SimpleSchema({
    lat:{
        type: Number,
        decimal: true,
        optional: true
    },
    lng:{
        type: Number,
        decimal: true,
        optional: true
    },
    address:{
        type: String,
        optional: true
    },
    zipcode:{
        type: String,
        optional: true
    },
    city:{
        type: String,
        optional: true
    }
});

psicoRequestSchema = new SimpleSchema({
    name: {
        type: String,
        label: "User Name"

    },
    email:{
        type: String,
        label: "User email"

    },
    address: {
        type: String,
        label: "User Address",
        optional: true
    },
    addressGeocode:{
        type: addressGeocodeSchema,
        label: "Geocoded Address",
        optional: true
    },
    phone:{
        type: String,
        label: "User Phone",
        optional: true
    },
    valoresRange: {
        type: String,
        optional: true
    },
    atendimentoType:{
        type: String,
        optional: true
    },
    especializacaoType:{
        type: String,
        optional: true
    },
    abordagemType:{
        type: String,
        optional: true
    },
    haveConvenio: {
        type: Boolean
    },
    convenioName: {
        type: String,
        optional: true
    },
    haveContatar: {
        type: Boolean
    },
    contatoHorario: {
        type: [String],
        optional: true
    },
    contatoType: {
        type: [String],
        optional: true
    },
    createdAt: {
        type: Date,
        autoValue: function() {
            if (this.isInsert) {
                return new Date;
            } else if (this.isUpsert) {
                return {$setOnInsert: new Date};
            } else {
                this.unset();  // Prevent user from supplying their own value
            }
        }
    }
});

PTprofileSchema = new SimpleSchema({
    name:{
        type: String,
        optional: true
    },
    cref: {
        type: String,
        optional: true
    },
    imgProfile:{
        type: String,
        optional: true
    },
    imgList:{
        type: [String],
        optional: true
    },
    addressGeocode:{
        type: addressGeocodeSchema,
        optional: true
    },
    contacts: {
        type: contactsSchema,
        optional: true
    },
    description: {
        type: String,
        optional: true
    },
    miniCV: {
        type: String,
        optional: true
    },
    specialities: {
        type: [String],
        optional: true
    }
});

PTuserSchema = new SimpleSchema({
    username: {
        type: String,
        // For accounts-password, either emails or username is required, but not both. It is OK to make this
        // optional here because the accounts-password package does its own validation.
        // Third-party login packages may not require either. Adjust this schema as necessary for your usage.
        optional: true
    },
    emails: {
        type: Array,
        // For accounts-password, either emails or username is required, but not both. It is OK to make this
        // optional here because the accounts-password package does its own validation.
        // Third-party login packages may not require either. Adjust this schema as necessary for your usage.
        optional: true
    },
    "emails.$": {
        type: Object
    },
    "emails.$.address": {
        type: String,
        regEx: SimpleSchema.RegEx.Email
    },
    "emails.$.verified": {
        type: Boolean
    },
    createdAt: {
        type: Date
    },
    profile: {
        type: PTprofileSchema,
        optional: true
    },
    // Make sure this services field is in your schema if you're using any of the accounts packages
    services: {
        type: Object,
        optional: true,
        blackbox: true
    },
    // Option 2: [String] type
    // If you are sure you will never need to use role groups, then
    // you can specify [String] as the type
    roles: {
        type: [String],
        optional: true
    },
    // In order to avoid an 'Exception in setInterval callback' from Meteor
    heartbeat: {
        type: Date,
        optional: true
    }
});

PTeventSchema = new SimpleSchema({
    description: {
        type: String,
        label: "Descrição do treinamento",
        optional: true
    },
    personQuantity: {
        type: Number,
        label: "Quantidade de vagas",
        optional: true
    },
    classLevel:{
        type: String,
        label: "Intensidade da aula",
        optional: true
    },
    classType:{
        type: String,
        label: "Tipo da aula",
        optional: true
    },
    price:{
        type: Number,
        label: "Preço da aula",
        optional: true
    },
    dateStart: {
        type: Date,
        label: "Início da atividade"
    },
    dateEnd:{
        type: Date,
        label: "Fim da atividade"
    },
    address: {
        type: String,
        label:"Agenda Address",
        optional: true
    },
    addressGeocode:{
        type: addressGeocodeSchema,
        label: "Geocoded Address",
        optional: true
    },
    addressReference:{
        type: String,
        label:"Address Reference",
        optional: true
    },
    addedBy: {
        type: String,
        label: "User Author"
    },
    createdAt: {
        type: Date,
        autoValue: function() {
            if (this.isInsert) {
                return new Date;
            } else if (this.isUpsert) {
                return {$setOnInsert: new Date};
            } else {
                this.unset();  // Prevent user from supplying their own value
            }
        }
    }
});

Meteor.users.attachSchema(PTuserSchema);
ptEvent.attachSchema(PTeventSchema);
