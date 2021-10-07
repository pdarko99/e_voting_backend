import mongoose from 'mongoose';
const {Schema} = mongoose

const Organization = new Schema({
        name: {type: String, required: true},
        id: {type: String, required: true},
        pic: {type:String, required: true}

})


export default mongoose.model('orgaDetails', Organization)