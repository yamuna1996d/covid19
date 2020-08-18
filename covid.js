var express =require('express');
var parser =require('body-parser');
var mongoose =require('mongoose');

var patientRouter =require('./routes/patient');
var testRouter =require('./routes/test');
var app =express()


app.use(parser.urlencoded({extended:false}));
app.get('/',(req,res)=>{
    res.send("i am root....");
});
app.use('/patient',patientRouter);
app.use('/test',testRouter);

mongoose.connect("mongodb+srv://dbuser:dbpass@cluster0.ftihc.mongodb.net/<dbname>?retryWrites=true&w=majority");
app.listen(process.env.PORT || 3000,()=>{
    console.log("server started");
})

