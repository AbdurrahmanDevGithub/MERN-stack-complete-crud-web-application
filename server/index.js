const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const UserModel = require("./models/User");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/crud_mern");

app.post("/createUser", (req, res) => {
  UserModel.create(req.body)
    .then((user) => {
      res.json(user);
    })
    .catch((err) => res.json(err));
});

app.get("/showUser", async (req, res) => {
  try {
    let users = await UserModel.find({});
    res.send(users);
  } catch (err) {
    console.log(err);
  }
});

app.post("/deleteUser/:id", async (req, res) => {
  try {
    const name = req.body.name;
    const id=req.params.id;
    const deleteData = await UserModel.findOneAndDelete({_id:id});
    res.send(deleteData);
  } catch (err) {
    console.log(err);
  }
});

app.post("/getUser/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const updateUser=await UserModel.findById({_id:id})
    res.json(updateUser)
  } catch (err) {
    console.log(err);
  }
});

app.post('/updateUser',async(req,res)=>{
  try{
    const id=req.body.id
    const name=req.body.name
    const email=req.body.email
    const age=req.body.age

    const updateUser=await UserModel.findByIdAndUpdate(id,
      {$set:{name:name,email:email,age:age}}
    )
    res.json(updateUser)
    
  }catch(err){
    console.log(err);
    
  }
})

app.listen(3001, () => {
  console.log("Server conneced succefully");
});
