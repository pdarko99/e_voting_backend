import nodemailer from 'nodemailer'
require("dotenv").config();

function  sendEmails() {

    async function send(data: any,voter: any, password: string) {
            let transporter = nodemailer.createTransport({
            service: 'hotmail',
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD
            }
            });


            let info = {
            from: process.env.EMAIL, // sender address
            to: [voter.email], // list of receivers
            subject: `Evoting - ${data.name}`, // Subject line
            text: "reached out on voting credentials", // plain text body
            html: `
                <h2>hello ${voter.firstname.toUpperCase()}</h2>
                <p>you've been registered to take part in the ${data.name} voting exercise which
                 will take place on the ${data.startdate} at ${data.starttime} hours to ${data.endtime} hours</p>
                <p>Below are your voting credentials: </p>
                <ul>
                    <li>Email: ${voter.email} </li>
                    <li>Password: ${password}</li>
                </ul>
                <p>Now visit the web or download our mobile app, enter your organization name which happens to
                be <strong> ${data.name}</strong> then enter your credentails to begin voting!</p>
            `
            };
            try {
                 await transporter.sendMail(info)
                
            } catch (error) {
                throw(error)
            }
    }


    return {send}
    
}


export default sendEmails()