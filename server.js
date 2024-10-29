const express = require("express");
const mongoose = require("mongoose");
const TaskSchema = require("./model");
const cors = require('cors');

const app = express();

mongoose.connect("mongodb+srv://rajzuvr:IEze5ysIAhjyPgVQ@cluster1.fud1kae.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1").then(()=>{
    console.log('data base connected..')
}).catch(()=>{
    console.log('db not connected')
})

app.use(cors());
app.use(express.json());

app.get('/', (req, res)=>{
    res.send("Hello node js world---")
})

app.post('/addtask', async(req, res)=>{
    console.log('---->>>:', req.body)
    const {todo} = req.body;
    const newData = new TaskSchema({
        todo: todo
    })
    try{
        await newData.save()
        return res.json(await TaskSchema.find())

    }catch(e){
        console.log(e)
    }
})

app.get('/gettasks', async(req, res)=>{
    try{
        console.log('getttttt')
        return res.json(await TaskSchema.find())
    }catch(e){
        console.log(e)
    }

})

app.delete('/deletetask/:id', async(req, res)=>{
    try{
        await TaskSchema.findByIdAndDelete(req.params.id)
        return res.json(await TaskSchema.find())
    }catch(err){
        console.log(err)
    }
})

app.listen(5001, ()=>{
    console.log('server statrted')
})