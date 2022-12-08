import http from 'http'
import fs, { appendFile } from 'fs'
import requests from 'requests'
import { Script } from 'vm';

const homeFile = fs.readFileSync("home.html","utf-8");

const replaceVal = (tempVal, orgVal) => {
    var a = ((orgVal.main.temp-32)*5)/9;
    var b = ((orgVal.main.temp_min-32)*5)/9;
    var c = ((orgVal.main.temp_max-32)*5)/9;
    let temperature = tempVal.replace("{%tempval%}", orgVal.main.temp);
    temperature = temperature.replace("{%tempmin%}", orgVal.main.temp_min);
    temperature = temperature.replace("{%tempmax%}", orgVal.main.temp_max);
    temperature = temperature.replace("{%location%}", orgVal.name);
    temperature = temperature.replace("{%country%}", orgVal.sys.country);
    // temperature = temperature.replace("{%country%}", orgVal.main.temp);
    return temperature;
}

const server = http.createServer((req,res) => {
    if(req.url == "/") {
        requests(
            "https://api.openweathermap.org/data/2.5/weather?q=Muzaffarpur&appid=a73fe230f18b345162c8deb0d876205d",
        )
        .on("data",(chunk) => {
            const objdata = JSON.parse(chunk);
            const arrdata = [objdata]
            
            const realTimeData = arrdata
            .map((val) => replaceVal(homeFile,val))
            .join("");
            // console.log(arrdata[0].main.temp);
            res.write(realTimeData);
            // console.log(realTimeData);
        })
        .on("end", (err) => {
            if(err) return console.log("connection closed due to errors",err);
            // console.log("end");
            res.end();
        });
    }
});

server.listen(8000,"127.0.0.1");


