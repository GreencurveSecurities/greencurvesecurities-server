const express = require("express");
const router = express.Router();
const { Op } = require("sequelize");
const { ContactForm } = require("../models");
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
const e = require("express");

//For SMTP Mail Sending
let transporter = nodemailer.createTransport({
  host: dotenv.config().parsed.SMTP_HOST,
  port: dotenv.config().parsed.SMTP_PORT,
  auth: {
      user: dotenv.config().parsed.SMTP_USER,
      pass: dotenv.config().parsed.SMTP_PASS
  }
})

// Creates a new Contact request on database
router.post("/contactus", async (req, res) => {
  const bodyData = req.body;
  
  message1 = {
    from: "greencurve.securities@gmail.com",
    to: "savlavinay022@gmail.com",
    subject: `GCS contact us request from ${bodyData.Name}`,
    html: `<p>You got a new message from:<p><br><p>Name : ${bodyData.Name}</p><br><p>Phone Number : ${bodyData.PhoneNumber}</p><br><p>Email : ${bodyData.Email}</p><br><p>Subject : ${bodyData.Subject}</p><br><p>Message : ${bodyData.Message}</p><br><p>Best wishes, GCS</p>`
  }
  message2 = {
    from: "greencurve.securities@gmail.com",
    to: "savlavinay022@gmail.com",
    subject: `GCS Website Lead form Reply from ${bodyData.Name}}`,
    html: `<p>You got a new message from ${bodyData.Name}:</p><br><p>Name : ${bodyData.Name}</p><br><p>Phone Number : ${bodyData.PhoneNumber}</p><br><p>Email : ${bodyData.Email}</p><br><p>PreferredMethodOfContact : ${bodyData.PreferredMethodOfContact}</p><br><p>InterestedServices : ${bodyData.InterestedServices}</p><br><p>InvestmentExperience : ${bodyData.InvestmentExperience}</p><br><p>City : ${bodyData.City}</p><br><p>Best wishes, GCS</p>`
  }
  if(bodyData.isContactForm){
    transporter.sendMail(message1, function(err, info){
      if(err){
        console.log(err);
      }else{
        // console.log(info);
      }
    })
  }
  else{
    transporter.sendMail(message2, function(err, info){
      if(err){
        console.log(err);
      }else{
        // console.log(info);
      }
    })
  }

  const createResponse = await ContactForm.create(bodyData);
  res.json(createResponse);
});

// Creates a new contact request on database
router.post("/getintouch", async (req, res) => {
  const bodyData = req.body;
  const createResponse = await ContactForm.create(bodyData);
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
  res.json(contactData);
});

// Gets all the Contacts
router.get("/contact", async (req, res) => {
  const contactData = await ContactForm.findAll({
    //order condition
    order: [["TimeStamp", "DESC"]],
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
  res.json(contactData);
});



module.exports = router;