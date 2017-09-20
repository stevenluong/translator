var Tesseract = require('tesseract.js')

var myImage = "./test2.jpg";
Tesseract.recognize(myImage,{
    lang: 'eng'
})
.catch(err => console.error(err))
    .then(function(result){
        console.log(result.text);
        process.exit(0);
    })
