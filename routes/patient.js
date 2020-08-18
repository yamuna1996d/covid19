var express= require('express');
var {patientModel}=require('../models/patientmd');
var {testModel} =require('../models/test');

const patientRouter=express.Router();

patientRouter.get('/',(req,res)=>{
    res.send("patient router.....");
});
patientRouter.post('/add',async(req,res)=>{
    try {
        var patientData= new patientModel(req.body);
        var result= await patientData.save();
        res.json(result);
        
    } catch (error) {
        console.log(error);
        res.status(500).send(error);        
    }
});
patientRouter.post('/delete', (req, res) => {

    try {
       
            patientModel.findByIdAndDelete(req.body._id, (error, data) => {

            if (error) {
                res.json({
                    "status": "error"
                });

            } else {

                if (data.length > 0) {

                    res.json({
                        "status": "deleted successfully"
                    });

                }



            }

        })

    } catch (error) {

    }

});
patientRouter.post('/update', (req, res) => {

    try {

        patientModel.findOneAndUpdate({
                userId: req.body.userId
            }, req.body,
            (error, data) => {

                if (error) {
                    res.json({
                        "status": "error"
                    });

                } else {
                    res.json({
                        "status": "success"
                    });

                }

            })

    } catch (error) {

    }

});

patientRouter.post("/searchpatient",(req,res)=>{
    patientModel.aggregate(
        [
            {
                $match:{
                    userId:req.body.userId,
                
            },

            },
            {
                $lookup :{
                    from:"tests",
                    localField:"_id",
                    foreignField:"patientId",
                    as :"patientdetails"
                }
            }
        ], (error,data)=>{
            return res.json(data);
        }
    )
})

module.exports = patientRouter