let express = require('express')

let app = express()

app.use(express.static(__dirname + '/dist/dolar-front'));

app.get('/*', (req, res)=> {
    res.sendFile(__dirname + '/dist/dolar-front/index.html');
})

app.listen(process.env.PORT || 8080)