import express from 'express'
import registerRouter from './registerStaff/registerStaffRoutes'
import loginRouter from './loginStaff/loginStaffRoute'
import OrgaRouter from './createOrganization/organizationRoute'
import candidates from './orgnizationCands/orgCandsRoutes'
import voters from './orgVoters/orgVotersRoutes'


 const app = express()
 app.use(express.json())

 
 app.use('/registerStaff', registerRouter)
 app.use('/loginStaff', loginRouter)
 app.use('/Organization', OrgaRouter)
 app.use('/candidates', candidates)
 app.use('/voters', voters)
 

export {app}