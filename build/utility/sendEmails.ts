import nodemailer from 'nodemailer'
require("dotenv").config();
import { google } from 'googleapis'
const OAuth2 = google.auth.OAuth2

const OAuth2_client = new OAuth2(process.env.CLIENTID, process.env.CLIENTSECRET, "https://developers.google.com/oauthplayground")
OAuth2_client.setCredentials({refresh_token: process.env.REFRESHTOKEN})

function  sendEmails() {

    async function send(data: any,voter: any, password: string) {
            let transporter = nodemailer.createTransport({
                service: 'gmail',
                auth:{
                    type: 'OAuth2',
                     user: 'padarko99@gmail.com',
                    clientId:process.env.CLIENTID,
                    clientSecret: process.env.CLIENTSECRET,
                    refreshToken: process.env.REFRESHTOKEN,
                    accessToken: process.env.ACCESSTOKEN,
                    expires: 1484314697599
                }
            });


            let info = {
            from: process.env.EMAIL, // sender address
            to: [voter.email], // list of receivers
            subject: `Evoting - ${data.name}`, // Subject line
            text: "reached out on voting credentials", // plain text body
            html: `
                <h2>hello ${voter.firstname}</h2>
                <p>you've been registered to take part in the ${data.name} voting exercise which
                 will take place on the ${data.startdate} at ${data.starttime} hours to ${data.endtime} hours</p>
                <p>Below are your voting credentials: </p>
                <ul>
                    <li>Email: ${voter.email} </li>
                    <li>Password: ${password}</li>
                </ul>
                <p>Now visit the web or download our mobile app, enter your organization name which happens to
                be <strong> ${data.name}</strong> then enter your credentails to begin voting!</p>
                <p>Happy Voting!</p>
            `
            };
            try {
                 await transporter.sendMail(info)
                
            } catch (error) {
                console.log(error, 'from error')
                throw(error)
            }
    }


    return {send}
    
}


export default sendEmails()