const express = require("express");
const router = express.Router();
const { Op } = require("sequelize");
const { ContactForm } = require("../models");

// Creates a new Contact request on database
router.post("/contactus", async (req, res) => {
  const bodyData = req.body;
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
  console.log(contactID);
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