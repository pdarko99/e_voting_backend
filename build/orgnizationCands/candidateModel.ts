import mongoose from 'mongoose';
const {Schema} = mongoose

const candidateModel = new Schema({
        firstname: {type: String, required: true},
        lastname: {type: String, required: true},
        pic: {type: String, required: true},
        position: {type: String, required: true},
        id: {type: String, required: true}

})


export default mongoose.model('candidates', candidateModel)