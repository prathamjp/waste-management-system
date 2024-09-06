const express = require("express");
const multer = require("multer");
const nodemailer = require("nodemailer");
// const bodyParser = require("body-parser");

const app = express();
const port = 3001;
const cors = require("cors");
app.use(cors());
app.use(express.static("public")); // Serve static files from the 'public' directory

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html"); // Serve the index.html file
});

// Set up multer for handling file uploads
const upload = multer({ dest: "uploads/" });

// Configure nodemailer
const transporter = nodemailer.createTransport({
  service: "Gmail", // Replace with your service if different
  auth: {
    user: "ronakadep@gmail.com",
    pass: "tjzb fcjm znbp fjoh",
  },
});

// Define a route to handle form submissions
app.post("/send", upload.single("attachment"), (req, res) => {
  console.log(req.body);
  const { predictionResult, latitude, longitude } = req.body;
  // console.log(predictionResult, latitude, longitude);
  const attachment = req.file;

  // Hardcoded values
  const name = "TRASHTREK";
  const email = "trashtrek@gmail.com";
  const message =
    "We have detected some trash in the area and wanted to bring it to your attention.Attached, you will find a file containing more information regarding the detected trash, including its location and any additional details that may be helpful for further action.";

  // Reverse geocode to get the location
  const apiURL =
    "https://nominatim.openstreetmap.org/reverse?format=json&lat=" +
    latitude +
    "&lon=" +
    longitude +
    "&zoom=18&addressdetails=1";
  console.log(apiURL);

  fetch(apiURL)
    .then((response) => response.json())
    .then((data) => {
      const location = data.display_name;
      console.log(predictionResult);
      console.log(location); 

      // Create email message
      const mailOptions = {
        from: email,
        to: "prathampanchal52@gmail.com", // Recipient email address
        subject: "GARBAGE IS DETECTED",
        text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}\nPrediction Result: ${predictionResult}\nLocation: ${location}`,
        attachments: attachment ? [{ path: attachment.path }] : [],
      };

      // Send email
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error("Error:", error);
          res.status(500).send("Error sending email");
        } else {
          console.log("Email sent:", info.response);
          res.send("Email sent successfully");
        }
      });
    })
    .catch((error) => {
      console.log("Error occurred during reverse geocoding:", error);
      res.status(500).send("Error getting location");
    });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
