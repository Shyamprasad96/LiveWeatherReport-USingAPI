const express=require("express");
const https=require("https");
const bodyParser=require("body-parser");

const app=express();

app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
   res.sendFile(__dirname+"/index.html"); 
});


app.post("/",function(req,res){
    const query=req.body.cityName;
    const apiKey="dda164e2ce6d99e71760e0437c500b48"
    const url="https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apiKey;

    https.get(url,function(response){
        console.log(response.statusCode);

    response.on("data",function(data){
        const WeatherData=JSON.parse(data)
        const temp=WeatherData.main.temp
        const WeatherDescription=WeatherData.weather[0].description
        res.write("<p>The Weather in "+ query+" is "+WeatherDescription+".</p>")
        res.write("<h1>The Temperature in " + query +" is "+temp+" degrees</h1>")
        res.send();

    })
    })

});





app.listen(3000);
