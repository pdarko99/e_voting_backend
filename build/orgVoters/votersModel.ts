import mongoose from 'mongoose';
const {Schema} = mongoose

const votersModel = new Schema({
        id: {type:String, required: true},
        firstname: {type: String, required: true},
        lastname: {type: String, required: true},
        email: {type: String, required: true},
        password: {type: String}

})


export default mongoose.model('voters', votersModel)