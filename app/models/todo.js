var mongoose = require('mongoose');

module.exports = mongoose.model('Studies', {
    studyName:{type : String,  default: "Not Provided"},
    sex:{type : String,  default: "Not Provided"},
    age:{type : String,  default: "Not Provided"},
    summaryDescription:{type : String,  default: "Not Provided"},
    fullDescription:{type : String,  default: "Not Provided"},
    startDate:{type : String,  default: "Not Provided"},
    endDate:{type : String,  default: "Not Provided"},
    compensation:{type : String,  default: 'Not Provided'},
    phoneNumber:{type : String,  default: 'Not Provided'},
    email:{type : String,  default: 'Not Provided'},
    duration:{type : String,  default: 'Not Provided'},
    timeLength:{type : String,  default: 'Not Provided'},
    rank:{type:Number, default:0},
    areaOfInterest:{type:String, default:"Not Provided"},
    studyType:{type:String,default:"Not Provided"},
    researcher:{type:String,default:"Not Provided"},
    location:{type:String,default:"Not Provided"},
    otherRequirements:{type:String,default:"Not Provided"}

});