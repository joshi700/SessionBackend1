const express = require('express');
const cors = require('cors');
const axios = require('axios');
const crypto = require("crypto");

const app = express();
app.use(cors());
app.use(express.json()); // Add this line to parse JSON request bodies
const port = 3001;

app.get('/', async (req, res) => {
  try {
    const id = crypto.randomBytes(16).toString("hex");
    console.log(id);
    
    const postData = {
      "session": {
        "authenticationLimit": 25
      }
    };
  
    const postData1 = {
      "order": {
        "amount": "100.00",
        "currency": "USD"
      }
    };
  
    const axiosConfig = {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        "Access-Control-Allow-Origin": "*",
        'Authorization': 'bWVyY2hhbnQuVEVTVE1QR1NURVNUMDEwMToxMmFjYmQ5YWNjMjVjMmNjMWRjYTQ0YTFjMmJlMmE5Yw==',
        "Accept": "application/json" 
      }
    };
  
    const response = await axios.post('https://test-gateway.mastercard.com/api/rest/version/82/merchant/TESTMPGSTEST0101/session', postData, axiosConfig);
    console.log("RESPONSE RECEIVED Create: ", response.data.session.id);   
    const sessionId = response.data.session.id;
    console.log("RESPONSE RECEIVED Create of Str1: ", sessionId); 
    
    const response1 = await axios.post(`https://test-gateway.mastercard.com/api/rest/version/82/merchant/TESTMPGSTEST0101/session/${sessionId}`, postData1, axiosConfig);
    console.log("RESPONSE RECEIVED Create: ", response1.data.session.id); 
    
    //res.json({ sessionId: sessionId, secondResponseId: response1.data.session.id });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "An error occurred" });
  }
});

app.post('/', (req, res) => {
  console.log(req.headers);
  res.sendStatus(200);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});