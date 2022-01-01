const mongoose =require("mongoose");
 
mongoose.connect("mongodb+srv://laxiy:sky123@cluster0.cainl.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",{
useNewUrlParser:true,
useUnifiedTopology:true,


}).then(()=>{

    console.log(`connection sussful`);

}).catch((e)=>{

    console.error(e);
})

