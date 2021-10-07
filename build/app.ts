import mongoose from 'mongoose';
import pino from 'pino';
import { isOperationalError, logError, returnError } from './error/baseError';
import {app} from './server'


const url = 'mongodb://localhost/evotes';
const logger = pino()

    mongoose.connect(url).then((data) => {
        logger.info({success: 'connected to database'})

    })

app.use(logError)
app.use(returnError)

process.on('unhandledRejection', err => {
    throw err
    // console.log(err)
})

process.on('uncaughtException', err =>{
    logError(err)

    if(!isOperationalError(err)){
        process.exit(1)
    }
})

app.listen(3000, () => logger.info({connected: 'we connected to server'}))




