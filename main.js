const express = require("express");
var https = require("https");


const app = express();


app.get("/", function (req, res) {

    const url = "https://doctoride-coding-test.ew.r.appspot.com/applicant/exercise/getList?apiKey=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2M2Y0ODMzZDRkYjRkMDAwMGEzZDRjMTciLCJyb2xlIjoiYXBwbGljYW50IiwiaWF0IjoxNjc2OTY4NzY2fQ.uisR78iNZTh_wdpeCgTfHlf-13968KoTVH0UpgnpuiU";

    https.get(url, function (res) {

        let rawData = ''
        const country = []

        res.on('data', chunk => {
            rawData += chunk
        })

        res.on('end', () => {
            const parsedData = JSON.parse(rawData)

            let sortCountry = [];
            let sortDate = []

            parsedData.partners.sort((a, b) => {
                if (a.country == b.country) {
                    if (country.includes(a.country)) {
                        let countryName = a.country
                        sortCountry[countryName].push(a)
                    } else {
                        let countryName = a.country
                        sortCountry[countryName] = []
                        sortCountry[countryName].push(a)
                        country.push(a.country)
                    }
                }
            });

            let result = [];
            let resultJson = [];
            let count = 0;
            let startDate;
            let emailList = []

            country.forEach(countryName => {
                
                sortArr[countryName].forEach(element => {
                    element.availableDates.forEach(el => {
                        sortDate.push(el)
                    });

                    sortDate.reduce((acc, el) => {
                        acc[el] = (acc[el] || 0) + 1;
                        return acc;
                    }, {})
        
                    sortDate.forEach(function (a) {
                        result[a] = result[a] + 1 || 1;
                    });
        
                    for (var key in result) {
                        if(count < result[key]){
                            count = result[key]
                            startDate = key
                        }
                    }
    
                    if(element.availableDates.includes(startDate)){
                        emailList.push(element.email)
                    }
                });
    
                resultJson.push({
                    startDate: startDate,
                    attendeeCount: 2,
                    attendees: emailList,
                    name: countryName
                })
            });
        })
    });
    res.send(JSON.stringify(resultJson));
})

const port = process.env.PORT || 8000;

app.listen(port, () => {
    console.log('Listening on port ' + port)
})