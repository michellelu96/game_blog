const express = require('express');
const cors = require('cors');
const app = express();



app.use(cors());

app.use(express.json()); 

app.use(express.urlencoded({ extended: true })); 
app.use(express.static('images')) // saves images to this folder



require('./server/config/mongoose.config'); 

require('./server/routes/games.routes')(app);


app.listen(8000, () => {
    console.log("Listening at Port 8000")
})