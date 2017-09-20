var Tesseract = require('tesseract.js')
var myImage = "./test2.jpg";
var fs   = require('fs'),  
            data = fs.readFileSync(myImage);

//Tesseract.recognize(myImage,{
console.log(data.toString("base64"));
Tesseract.recognize(data.toString('base64'),{
    lang: 'eng'
})
.catch(err => console.error(err))
    .then(function(result){
        console.log(result.text);
        process.exit(0);
    })
