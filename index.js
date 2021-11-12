const express = require('express');
const cors = require('cors')
require('dotenv').config();
const { MongoClient } = require('mongodb');
const app = express();
const ObjectId = require('mongodb').ObjectId;
const { response } = require('express');
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
        const usersCollection = database.collection("users");
        const revewCollection = database.collection("revew");
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
    
    //get orders
    app.get('/orders',async(req, res)=>{
        const cursor = ordersCollection.find({});
        const orders= await cursor.toArray();
        res.send(orders)
      })
      //delete order
      app.delete('/orders/:id',async(req, res)=>{
        const id = req.params.id;
        const query = {_id : ObjectId(id)}
        const result = await ordersCollection.deleteOne(query);
        response.json(result)
      })
       //add users
       app.post('/users', async (req, res)=>{
        const users = req.body;
        console.log(users)
        const result = await usersCollection.insertOne(users);
        res.json(result)
       })
       app.put('/users', async (req, res)=>{
        const user = req.body
        console.log('put', user)
        const filter = {email: user.email};
        const options = { upsert: true };
        const updateDoc = {$set: user}
        const result = await usersCollection.updateOne(filter, updateDoc, options)
        res.json(result)
       })
       //revew post
       app.post('/revew', async (req, res)=>{
        const revew = req.body;
        console.log(revew)
        const result = await revewCollection.insertOne(revew);
        res.json(result)
    })
        //get revew api
        app.get('/revew', async(req, res)=>{
          const cursor = revewCollection.find({})
          const revews= await cursor.toArray();
          res.send(revews)
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