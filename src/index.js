const express = require('express');
const bodyParser = require('body-parser');
const {PORT,SYNC_DB} = require('./config/server-config');
const apiRoutes = require('../src/routes/index');
const db = require('./models/index');


const app = express();

const startServer = () =>{
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended:true}));
    app.use('/api',apiRoutes);
    if(SYNC_DB){
        db.sequelize.sync({alter:true});
    }
    app.listen(PORT ,() =>{
        console.log(`server is running on port ${PORT}`);
    })
}

startServer();