const express = require("express");
const router = express.Router();
const { Op } = require("sequelize");
const { ContactForm } = require("../models");
const { Users } = require("../models");
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config();
const e = require("express");
const axios = require('axios');

//For SMTP Mail Sending
let transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// Creates a new Contact request on database
router.post("/contactus", async (req, res) => {
  const bodyData = req.body;

  message1 = {
    from: "greencurve.securities@gmail.com",
    to: "greencurve.securities@gmail.com",
    subject: `GCS contact us request from ${bodyData.Name}`,
    html: `<p>You got a new message from:<p><br><p>Name : ${bodyData.Name}</p><br><p>Phone Number : ${bodyData.PhoneNumber}</p><br><p>Email : ${bodyData.Email}</p><br><p>Subject : ${bodyData.Subject}</p><br><p>Message : ${bodyData.Message}</p><br><p>Best wishes, GCS</p>`,
  };
  message2 = {
    from: "greencurve.securities@gmail.com",
    to: "greencurve.securities@gmail.com",
    subject: `GCS Website Lead form Reply from ${bodyData.Name}}`,
    html: `<p>You got a new message from ${bodyData.Name}:</p><br><p>Name : ${bodyData.Name}</p><br><p>Phone Number : ${bodyData.PhoneNumber}</p><br><p>Email : ${bodyData.Email}</p><br><p>PreferredMethodOfContact : ${bodyData.PreferredMethodOfContact}</p><br><p>InterestedServices : ${bodyData.InterestedServices}</p><br><p>InvestmentExperience : ${bodyData.InvestmentExperience}</p><br><p>City : ${bodyData.City}</p><br><p>Best wishes, GCS</p>`,
  };
  if (bodyData.isContactForm) {
    transporter.sendMail(message1, function (err, info) {
      if (err) {
        console.log(err);
      } else {
        // console.log(info);
      }
    });
  } else {
    transporter.sendMail(message2, function (err, info) {
      if (err) {
        console.log(err);
      } else {
        // console.log(info);
      }
    });
  }

  const createResponse = await ContactForm.create(bodyData);
  res.header({
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
    "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token",
  });
  res.json(createResponse);
});

// Creates a new PMS request on database
router.post("/pms", async (req, res) => {
  const bodyData = req.body;

  const pmsMessage = {
    from: "greencurve.securities@gmail.com",
    to: "greencurve.securities@gmail.com",
    subject: `GCS PMS Request from ${bodyData.name}`,
    html: `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>GCS PMS Request</title>
      </head>
      <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
          <h1 style="color: white; margin: 0; font-size: 28px; font-weight: bold;">Green Curve Securities</h1>
          <p style="color: #f0fdf4; margin: 10px 0 0 0; font-size: 16px;">Portfolio Management Services Request</p>
        </div>
        
        <div style="background-color: #f0fdf4; padding: 30px; border-radius: 0 0 10px 10px; border: 2px solid #22c55e;">
          <h2 style="color: #15803d; margin-top: 0; font-size: 24px; border-bottom: 2px solid #83E11B; padding-bottom: 10px;">New PMS Inquiry</h2>
          
          <div style="background-color: white; padding: 25px; border-radius: 8px; box-shadow: 0 2px 10px rgba(34, 197, 94, 0.1); margin: 20px 0;">
            <h3 style="color: #15803d; margin-top: 0; font-size: 18px; border-left: 4px solid #83E11B; padding-left: 15px;">Client Information</h3>
            
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 12px; border-bottom: 1px solid #dcfce7; font-weight: bold; color: #166534; width: 40%;">Full Name:</td>
                <td style="padding: 12px; border-bottom: 1px solid #dcfce7; color: #14532d;">${bodyData.name}</td>
              </tr>
              <tr>
                <td style="padding: 12px; border-bottom: 1px solid #dcfce7; font-weight: bold; color: #166534;">Email Address:</td>
                <td style="padding: 12px; border-bottom: 1px solid #dcfce7; color: #14532d;">${bodyData.email}</td>
              </tr>
              <tr>
                <td style="padding: 12px; border-bottom: 1px solid #dcfce7; font-weight: bold; color: #166534;">Phone Number:</td>
                <td style="padding: 12px; border-bottom: 1px solid #dcfce7; color: #14532d;">${bodyData.phone}</td>
              </tr>
              <tr>
                <td style="padding: 12px; border-bottom: 1px solid #dcfce7; font-weight: bold; color: #166534;">City:</td>
                <td style="padding: 12px; border-bottom: 1px solid #dcfce7; color: #14532d;">${bodyData.city}</td>
              </tr>
            </table>
          </div>
          
          <div style="background-color: white; padding: 25px; border-radius: 8px; box-shadow: 0 2px 10px rgba(34, 197, 94, 0.1); margin: 20px 0;">
            <h3 style="color: #15803d; margin-top: 0; font-size: 18px; border-left: 4px solid #83E11B; padding-left: 15px;">Investment Details</h3>
            
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 12px; border-bottom: 1px solid #dcfce7; font-weight: bold; color: #166534; width: 40%;">Investment Amount:</td>
                <td style="padding: 12px; border-bottom: 1px solid #dcfce7; color: #14532d; font-weight: bold; font-size: 16px;">${bodyData.investmentAmount}</td>
              </tr>
              <tr>
                <td style="padding: 12px; border-bottom: 1px solid #dcfce7; font-weight: bold; color: #166534;">Preferred Contact Time:</td>
                <td style="padding: 12px; border-bottom: 1px solid #dcfce7; color: #14532d;">${bodyData.preferredContactTime}</td>
              </tr>
              <tr>
                <td style="padding: 12px; font-weight: bold; color: #166534; vertical-align: top;">Investment Goals:</td>
                <td style="padding: 12px; color: #14532d;">${bodyData.message}</td>
              </tr>
            </table>
          </div>
          
          <div style="background: linear-gradient(135deg, #83E11B 0%, #22c55e 100%); padding: 20px; border-radius: 8px; text-align: center; margin-top: 30px;">
            <p style="color: white; margin: 0; font-size: 16px; font-weight: bold;">⚡ Priority Action Required</p>
            <p style="color: #f0fdf4; margin: 5px 0 0 0; font-size: 14px;">Please contact this client within 24 hours for optimal conversion</p>
          </div>
          
          <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 2px solid #dcfce7;">
            <p style="color: #166534; margin: 0; font-size: 14px;">
              Best regards,<br>
              <strong style="color: #15803d;">Green Curve Securities Team</strong>
            </p>
            <p style="color: #86efac; font-size: 12px; margin: 10px 0 0 0;">
              This is an automated notification from your PMS inquiry system
            </p>
          </div>
        </div>
      </body>
      </html>
    `,
  };

  transporter.sendMail(pmsMessage, function (err, info) {
    if (err) {
      console.log("Error sending PMS email:", err);
      res.status(500).header({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
        "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token",
      });
      res.json({ 
        success: false, 
        message: "Failed to send PMS inquiry email",
        error: err.message 
      });
    } else {
      // console.log("PMS email sent successfully:", info.messageId);
      res.status(200).header({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
        "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token",
      });
      res.json({ 
        success: true, 
        message: "PMS inquiry email sent successfully",
        messageId: info.messageId 
      });
    }
  });
});

// Creates a new contact request on database
router.post("/getintouch", async (req, res) => {
  const bodyData = req.body;
  const createResponse = await ContactForm.create(bodyData);
  res.header({
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
    "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token",
  });
  res.json(createResponse);
});

// Creates a new User on database
router.post("/signup", async (req, res) => {
  const bodyData = req.body;
  const createResponse = await Users.create(bodyData);
  res.header({
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
    "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token",
  });
  res.json(createResponse);
});

// Verify User on database
router.post("/signin", async (req, res) => {
  const bodyData = req.body;
  const createResponse = await Users.findOne({
    where: {
      Email: bodyData.Email,
      Password: bodyData.Password,
    },
  });
  res.header({
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
    "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token",
  });
  res.json(createResponse);
});

// Gets the Contact by id
router.get("/contact/:id", async (req, res) => {
  const contactID = req.params.id;
  // console.log(contactID);
  const contactData = await ContactForm.findByPk(contactID, {
    // include: [
    //   {
    //     model: User,
    //     as: "user",
    //   },
    //   {
    //     model: Status,
    //     as: "status",
    //   },
    // ],
  });
  res.header({
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
    "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token",
  });
  res.json(contactData);
});
// Delete the Contact by id
router.delete("/deleteContact/:id", async (req, res) => {
  const Id = req.params.id;
  // console.log(contactID);
  const contactData = await ContactForm.destroy({
    where: {
      Id: Id
    },
    // include: [
    //   {
    //     model: User,
    //     as: "user",
    //   },
    //   {
    //     model: Status,
    //     as: "status",
    //   },
    // ],
  });
  res.header({
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
    "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token",
  });
  res.json(contactData);
});

// Gets Google Reviews
router.get("/reviews", async (req, res) => {
  const apiKey = process.env.API_KEY;
  const reviewsResponse = await axios.get(
    `https://maps.googleapis.com/maps/api/place/details/json?place_id=ChIJizxli4-p5zsRYUVs6CKc2bU&fields=name,rating,reviews&key=${apiKey}`
  )

  const reviews = reviewsResponse.data.result.reviews;

  const existingReviewsResponse = await axios.get("https://admin.greencurvesecurities.com/items/GoogleReviews");
  const existingReviews = existingReviewsResponse.data.data;

  const newReviews = reviews.filter(review => {
    const existingReview = existingReviews.find(er => er.author_name === review.author_name);
    return !existingReview;
  });

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  for (const review of newReviews) {
    const postData = {
      author_name: review.author_name,
      profile_photo_url: review.profile_photo_url,
      rating: review.rating,
      text: review.text,
    };

    await axios.post("https://admin.greencurvesecurities.com/items/GoogleReviews", postData, config);
  }

  res.status(201).send(`New reviews posted successfully to Admin Portal`);
  // res.header({
  //   "Content-Type": "application/json",
  //   "Access-Control-Allow-Origin": "*",
  //   "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
  //   "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token",
  // });
  // res.json(Reviews.data);
});

// Gets all the Contacts
router.get("/contact", async (req, res) => {
  const contactData = await ContactForm.findAll({
    //order condition
    order: [["TimeStamp", "DESC"]],
  });
  res.header({
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
    "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token",
  });
  res.json(contactData);
});

// Updates Contacted value
router.put("/contacted/:id", async (req, res) => {
  const contactID = req.params.id;
  const contactData = await ContactForm.update(
    { isContacted: true },
    {
      where: {
        Id: contactID,
      },
    }
  );
  res.header({
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
    "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token",
  });
  res.json(contactData);
});

module.exports = router;
