var mongoose = require('mongoose');

module.exports = mongoose.model('Studies', {
    text : {type : String, default: "Not Provided"},
    studyName:{type : String,  default: "Not Provided"},
    sex:{type : String,  default: "Not Provided"},
    age:{type : String,  default: "Not Provided"},
    summaryDescription:{type : String,  default: "Not Provided"},
    fullDescription:{type : String,  default: "Not Provided"},
    startDate:{type : String,  default: "Not Provided"},
    endDate:{type : String,  default: "Not Provided"},
    studyLength:{type : String,  default: 'Not Provided'},
    compensation:{type : String,  default: 'Not Provided'},
    phone:{type : String,  default: 'Not Provided'},
    email:{type : String,  default: 'Not Provided'},
    duration:{type : String,  default: 'Not Provided'},
    timeLength:{type : String,  default: 'Not Provided'},
    rank:{type:Number, defaults:"Not Provided"},
    areaOfInterest:{type:String, defaults:"Not Provided"},
    typeOfStudy:{type:String,defaults:"Not Provided"},
    researcher:{type:String,defaults:"Not Provided"}

});