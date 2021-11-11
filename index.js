const express = require('express');
const cors = require('cors')
require('dotenv').config();
const { MongoClient } = require('mongodb');
const app = express();
const ObjectId = require('mongodb').ObjectId;
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
        const database = client.db("watchDog");
        const ProductCollection = database.collection("product");
        const ordersCollection = database.collection("orders");
      //get products 
         app.get('/product',async(req, res)=>{
            const cursor = ProductCollection.find({});
            const product= await cursor.toArray();
            res.send(product)
          })
      //get single service
      app.get('/product/:id', async (req, res)=>{
        const id = req.params.id;
        const query = {_id: ObjectId(id)};
        const service = await ProductCollection.findOne(query);
        res.json(service)
     })
      //order service
      app.post('/Orders', async (req, res)=>{
        const order = req.body;
        console.log(order)
        const result = await ordersCollection.insertOne(order);
        res.json(result)
    })
         
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