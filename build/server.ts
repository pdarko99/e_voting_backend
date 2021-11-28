import express from 'express'
import cors from 'cors'
import registerRouter from './registerStaff/registerStaffRoutes'
import loginRouter from './loginStaff/loginStaffRoute'
import OrgaRouter from './createOrganization/organizationRoute'
import candidates from './orgnizationCands/orgCandsRoutes'
import voters from './orgVoters/orgVotersRoutes'

 const app = express()
 app.use(express.json())
 app.use('/uploads', express.static('uploads'))
app.use(cors())
 

 app.use('/registerStaff', registerRouter)
 app.use('/loginStaff', loginRouter)
 app.use('/Organization', OrgaRouter)
 app.use('/candidates', candidates)
 app.use('/voters', voters)
 
// URL = mongodb+srv://Darko:gospel333@cluster0.xbklg.mongodb.net/zuri?retryWrites=true&w=majority
// https://defiant-ivy-beat.glitch.me


export {app}