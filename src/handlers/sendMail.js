import AWS from 'aws-sdk';

const ses = new AWS.SES({region: 'us-west-1'});


async function sendMail(event, context) {
  const record = event.Records[0];

  const email = JSON.parse(record.body);
  const { subject, recipient, body } = email;

  const params = {
    Source: 'taylorfah@gmail.com',
    Destination: {
      ToAddresses: [recipient],
    },
    Message: {
      Body: body,
      Subject: {
        Data: subject,
      },
    },
  };

  try {
    const result = await ses.sendEmail(params).promise();
    return result;
  } catch (error) {
    console.error(error);
  };

}

export const handler = sendMail;


