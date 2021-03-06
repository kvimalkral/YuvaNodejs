const express = require("express");
const app = express();
const mongoose = require("mongoose");
const {myCluster} = require("./lib/cluster");
var cors = require('cors');
require("dotenv").config();

app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json())
mongoose
  .connect(process.env.DB_HOSt_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((sucess) => {
    console.log("connected sucussfully");
  })
  .catch((error) => {
    console.log(error);
  });
const customer = mongoose.model("customer", {
  salutation: {type:String},
  customerName: { type: String, required: true },
  phone: {type:Number, required: true, unique: true},
  email: {type:String, unique: true, required: true},
  address: { type: String},
  pinCode: {type: Number},
  age: {type: Number},
  vistedOn: {type: Date}
});
app.post("/users", (req, res) => {
    customer.create(req.body).
    then((success) => {
        res.json(success);
    })
    .catch( (error) => {
         res.send(error)
    })
    
});

app.get("/users", (req, res) => {
    customer.find({}).
    then((success) => {
      console.log(process.pid);
        res.json(success);
    })
    .catch( (error) => {
         res.send(error)
    })
   
});
app.get("/users/:id", (req, res) => {
  customer.findOne({_id: req.params.id}).
  then((success) => {
      res.json(success);
  })
  .catch( (error) => {
       res.send(error)
  })
 
});



app.put("/users/:id", (req, res) => {
    console.log(req.params);
    console.log(req.body);
    customer.updateOne({_id: req.params.id }, {$set: req.body}).
    then((success) => {
        res.json(success);
    })
    .catch( (error) => {
         res.send(error)
    })
   
});

app.delete("/users/:userName", (req,res) => {
  customer.deleteOne({_id: req.params.userName }).
    then((success) => {
        res.json(success);
    })
    .catch( (error) => {
         res.send(error)
    })
})

myCluster(app)




