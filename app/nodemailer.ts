// 'use server'
// /* eslint-disable */
// const nodemailer = require('nodemailer');

// export const sendEmailServer = async (prevState: any, formData: FormData) => {

//     const emailTo = formData.get('email');
//     // if (typeof emailTo === 'string') {
//     //   return {message: !emailTo.includes('mail')}
//     // }
//     if (emailTo === null) {
//         return {message: 'email is empty'}
//     } else if (typeof emailTo === 'string' && (emailTo.length < 15 || !emailTo.includes('@') || !emailTo.includes('mail'))) {
//         return {message: 'not a valid email'}
//     }
//     const nameTo = formData.get('name');
//     const messageTo = formData.get('message');

//     const transporter = nodemailer.createTransport({
//         service: "gmail",
//         auth: {
//         user: process.env.NODEMAILER_USER,
//         pass: process.env.NODEMAILER_PASS
//         },
//         // tls: {
//         //   rejectUnauthorized: false
//         // }
//     });
//     await transporter.sendMail({
//       from: 'kevinsetiabudi20@gmail.com',
//       subject: 'Contact from portofolio website',
//       html: `email from: ${emailTo}
//       name: ${nameTo}
//       message: ${messageTo}`,
//       to: 'kevinsetiabudi20@gmail.com',
//     });
//     return {message: 'success'}
// }