import mongoose from 'mongoose';
const {Schema} = mongoose

const registerStaffModel = new Schema({
        firstname: {type: String, required: true},
        lastname: {type: String, required: true},
        email: {type: String, required: true},
        password: {type: String, required: true}

})


export default mongoose.model('staffDetails', registerStaffModel)