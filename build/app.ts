import mongoose from 'mongoose';
import { isOperationalError, logError, returnError } from './error/baseError';
import {app} from './server'


const url = process.env.URL! ||  'mongodb://localhost/evotes'
const PORT = process.env.PORT || 3000

    mongoose.connect(url).then((data) => {
       console.log('we connected to database')

    })

app.use(logError)
app.use(returnError)

process.on('unhandledRejection', err => {
    throw err
})

process.on('uncaughtException', err =>{
    logError(err)

    if(!isOperationalError(err)){
        process.exit(1)
    }
})

app.listen(PORT, () => console.log('we connected', PORT))




