var express= require('express');
var {testModel}=require('../models/test');

const testRouter=express.Router();

testRouter.get('/',(req,res)=>{
    res.send("test router.....");
});
testRouter.post('/add',async(req,res)=>{
    try {
        var testData= new testModel(req.body);
        var result= await testData.save();
        res.json(result);
        
    } catch (error) {
        console.log(error);
        res.status(500).send(error);        
    }
});
testRouter.post('/delete', (req, res) => {

    try {
       
            testModel.findByIdAndDelete(req.body._id, (error, data) => {

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
testRouter.post('/update', (req, res) => {

    try {

        testModel.findOneAndUpdate({
                _id: req.body._id
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

module.exports= testRouter