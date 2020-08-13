const express = require("express");
const router = express.Router();
const nodemailer = require('nodemailer')
const sendgridTransport = require('nodemailer-sendgrid-transport')

const transporter = nodemailer.createTransport(sendgridTransport({
  auth: {
    api_key: process.env.NODEMAILER_KEY,
  }
}))

router.post("/api/email", (req, res, next) => {
  console.log(req.body)
  const { from, to, subject, html } = req.body
  
  transporter.sendMail({
    to,
    from,
    subject, 
    html,
  }).then(response => res.send(response))
})

module.exports = router