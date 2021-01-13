
const nodemailer = require("nodemailer");
const fs = require("fs");

// let datao = fs.readFileSync("abc.txt");
// datao=JSON.stringify(datao);
// datao=datao.toString();
// console.log(datao);
const path = require('path');
const { email, password } = require("./secrets");
process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;
async function sendEmail(sender) {
    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            host: "smtp.gmail.com",
            auth: {
                user: "shubhamsingh1840@gmail.com",
                pass: "ineqpbitqghrxoyi",
            },
        });

        let res = await transporter.sendMail({
            from: "shubhamsingh1840@gmail.com", // sender address
            to: sender, // list of receivers
            subject: "Resume for referral for 2021 Intern(6-Month Internship)/fulltime @ Dunzo ", // Subject line
            text: "Respected sir/ma'am,\nHope you are doing well,\nMy name is Shubham Singh .I am a Btech 4th year Computer Science student from Maharaja Agrasen Institute Of Technology(GGSIPU),New Delhi.\n \n I am a Competitive coder with 4 star rating on Codechef,5 star rating on Hackerrank ,1541 rating on hackerearth with more than 300+ questions on leetcode and GeeksforGeeks.Also as I loved teaching I started a startup TrainYrBrain(linkedin page also available) to teach Data Structures for free to college students and within 3 months it crossed 3000 students community.I write blogs on medium and my lectures are present on youtube.\n \nMoreover I am also into development and learning to mould algorithms into applications.I love visualizing active applications and create their clones.Some of them are mentioned in my resume.Also one of my development work have been deployed on heroku at : https://shubham-whiteboard.herokuapp.com/ .\n\n Key Skills :HTML,CSS,JavaScript,Node.js,JAVA,Data Structures\n\nGithub link:https://github.com/shubhsting\n\nI was looking for SDE intern/fresher opportunities and I encountered your profile and I couldn’t stop myself to ask for your mentorship and approach to get into your esteemed organization.Would you be open to submitting a referral for me to go with my application?\n \n Happy to chat more if you have the time as well. Looking forward to hearing from you.\n\nRegards\nShubham Singh\nPhone : 8076221840,9084810011",// plain text body
            attachments: [{
                filename: 'Shubham_Singh_2021.pdf',
                path: path.join(__dirname, '/Shubham_Singh_SDE.pdf'),
                contentType: 'application/pdf'
            }]
        });
        return res;
    } catch (error) {
        return error;
    }
}

//MOBIKWIK
function random() {
    let data = fs.readFileSync("emails.txt");
    data = JSON.parse(data);


    for (let i = 0; i < data.length; i++) {
        sendEmail(data[i]).then((mail) => {
            console.log("EMAIL SENT!!!", mail.accepted[0])
        });
    }
}
random();