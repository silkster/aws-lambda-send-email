// Load the AWS SDK for Node.js
const AWS = require('aws-sdk');

// Set the region for SES
AWS.config.update({region: 'us-east-2'});

// Create SES service object
const ses = new AWS.SES();

const config = {
  recipient: 'recipient@example.com',
  sender: 'sender@example.com',
};

exports.handler = async (event) => {
  // Construct email parameters
  const params = {
    Destination: {
      ToAddresses: [config.recipient] // Email address of the recipient
    },
    Message: {
      Body: {
        Text: {
          Data: 'This is the body of the email.' // Body of the email
        }
      },
      Subject: {
        Data: 'Test email' // Subject of the email
      }
    },
    Source: config.sender // Email address of the sender
  };
  
  try {
    // Send the email using SES
    const result = await ses.sendEmail(params).promise();
    console.log(result);
    
    // Return a success message
    return {
      statusCode: 200,
      body: JSON.stringify('Email sent successfully')
    };
  } catch (error) {
    // Return an error message if there is a problem sending the email
    return {
      statusCode: 500,
      body: JSON.stringify('Error sending email: ' + error)
    };
  }
};
