const mongoose = require('mongoose');
const geocoder = require('../utills/geocoder');


const StoreSchema = new mongoose.Schema ({

storeID: {
type : String,
required: [true, 'Please enter a valid Store ID'],
unique : true,
trim : true,
maxlength:[5 , 'The Store ID should not be less than 5 elements']
},

address: {
type : String,
required : [true, "Please enter an address"]




},

location: {
    type: {
      type: String, 
      enum: ['Point'], 
    },

    coordinates: {
      type: [Number],
      index: '2dsphere'
    },

    formattedAddress: String
  },
  
  createdAt : {
    type : Date,
    default: Date.now
  }
}
);

// Create location 
StoreSchema.pre('save' , async function(next)
{
const loc = await geocoder.geocode(this.address);   
this.location = {
   type: 'Point',
   coordinates: [loc[0].longitude, loc[0].latitude],
   formattedAddress: loc[0].formattedAddress



}

 // Delete Entered Address
 this.address = undefined;
 next();

}
);

module.exports = mongoose.model('Store', StoreSchema);
