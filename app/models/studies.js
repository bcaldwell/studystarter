var mongoose = require('mongoose');

module.exports = mongoose.model('studies', {
    text:{type:String,default:'Not Provided'},
    studyName:{type:String,default:'Not Provided'},
    gender:{type:String,default:'Not Provided'},    
    longDescription:{type:String,default:'Not Provided'},
    shortDescription:{type:String,default:'Not Provided'},
    startDate:{type:String,default:'Not Provided'},
    endDate:{type:String,default:'Not Provided'},
    studyLength:{type:String,default:'Not Provided'},
    compensation:{type:String,default:'Not Provided'},
    phone:{type:String,default:'Not Provided'},
    email:{type:String,default:'Not Provided'}
});