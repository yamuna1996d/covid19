var mongoose =require('mongoose');

const testSchema = new mongoose.Schema(
    {
        testResults:String,
        date:String,
        patientId:{
            type:mongoose.Schema.Types.ObjectId,
        ref:'patients'},
        varifiedDoc:String
    }
);
const testModel =mongoose.model('tests',testSchema);
module.exports={testModel}