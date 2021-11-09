const express = require('express');
const cors = require('cors')
require('dotenv').config();
const { MongoClient } = require('mongodb');
const app = express();
const port = process.env.PORT|| 5000;

//WatchDog
//oV7eYAfVE5T6xHzW

//middlewars
app.use(cors());
app.use(express.json())
// mogodb connected
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@mydatabase.jdlyw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run(){
    try{
        await client.connect()
        console.log("mongo server connect successfully")
    }
    finally{

    }
}
run().catch(console.dir);

app.get('/',(req, res)=>{
    res.send('Assingment 12 server running this port')
})
app.listen(port,()=>{
    console.log('lisiting the port',port)
})