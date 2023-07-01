// const { ViewModule } = require('@mui/icons-material');
const axios=require('axios')
const twilio = require('twilio');
const express=require('express')
const bodyParser=require('body-parser')
// const generateRandomOTP=require('./generateRandomOTP')

class PaystackTransaction{
    constructor(secretkey,webhookSecret){
        this.secretkey=secretkey;
         this.apiUrl = 'https://api.paystack.co/';
         this.webhookSecret=webhookSecret;
         this.app=express();

         this.app.use(bodyParser.json())
         this.app.use(bodyParser.urlencoded({extended:true}))
         this.app.post('/webhook',this.handleWebhook.bind(this))
    }

startWebhookServer(port){
    this.app.listen(port,()=>{
        console.log(`Webhook is listening on port ${port}`)
    })
}

async handleWebhook(request,response){
    const signature=request.headers['x-paystack-signature'];
    const event=request.body;

    if (this.verifyWebhookSignature(signature, event)) {
        // Handle the webhook event
        this.processWebhookEvent(event);
        response.sendStatus(200);
      } else {
        response.sendStatus(400);
      }
}

verifyWebhookSignature(signature, event) {
    const hash = crypto.createHmac('sha512', this.webhookSecret)
      .update(JSON.stringify(event))
      .digest('hex');

    return signature === hash;
  }

  processWebhookEvent(event) {
    // Handle the webhook event based on the event type
    switch (event.event) {
      case 'charge.success':
        // Handle charge success event
        console.log('Charge success event received:', event.data);
        break;
      case 'subscription.create':
        // Handle subscription create event
        console.log('Subscription create event received:', event.data);
        break;
      case 'subscription.disable':
        // Handle subscription disable event
        console.log('Subscription disable event received:', event.data);
        break;
      // Add more cases for other webhook event types as needed
      default:
        // Handle unknown event types
        console.log('Unknown event type:', event.event);
    }
  }





async initializeTransaction(email,amount,reference,currency="GHS"){
try{
    const response=await axios.post(
        `${this.apiUrl}transaction/initialize`,{
            email,
            amount:amount* 100,
            reference,
            currency,
        },{
            headers:{
                Authorization:`Bearer ${this.secretkey}`,
                'Content-Type':'application/json',
            }
        }
    );
    return response.data;
}catch(err){
    throw new Error("Error initializing transaction"+ err.message)
}
}


async verifyTransaction(reference){
    try{
        const response=await axios.get(`${this.apiUrl}transaction/verify/${reference}`,{
            Headers:{
                Authorization:`Bearer ${this.secretkey}`,
                'Content-Type':'application/json'
            }
        });
        return response.data;

    }catch(err){
        throw new Error("error verifying transaction" +err.message)
    }
}

async initializeSubsription(email,amount,reference,currency="GHS",plan=null,interval=null){
    try{
        const payload={
            email,
            amount:amount*100,
            reference,
            currency,
        };
        if(plan && interval){
            payload.plan=plan;
            payload.interval=interval;
        }
        const response=await axios.post(
            `${this.apiUrl}transaction/initialize`,payload,
            {
                headers:{
                    Athorization:`Bearer ${this.secretkey}`,
                    'Content-Type':'application/json',
                }
            }
        );
        return response.data;

    }catch(err){
        throw new Error("Error initializing subsription"+err.message)
    }
}

// generateRandomOTP();

async verifyOPT(reference,opt){
    try{
        const response=await axios.post(
            `${this.apiUrl}transaction/verify_otp`,
            {
                reference,opt
            },{
                headers:{
                    Authorization:`Bearer ${this.secretkey}`,
                    'Content-Type':'application/json',
                }
            }
        );
        return response.data;

    }catch(err){
        throw new Error("Error verifying OTP",err.message)
    }
}

async initializePaymentChannel(email,amount,reference,currency="GHS",channel="card"){
    try{
        const payload={
            email,
            amount:amount*100,
            reference,
            currency,
            channel:[channel],
        };

        const response=await axios.post(
            `${this.apiUrl}transaction/initialize`,payload,
            {
                headers:{
                    Authorization:`Bearer ${this.secretkey}`,
                    'Content-Type':'application/json'
                }
            }
        )
        return response.data;

    }catch(err){
        throw new Error("Error initializing payment channels",err.message)
    }
}

async sendOTPViaSMS(phoneNumber,otp,twilioAccountStd,twilioAuthToken,twilioPhoneNumber){
    const client=twilio(twilioAccountStd,twilioAuthToken);

    try{
       const requestOtp= await client.message.create({
            body:`your OTP is ${otp}`,
            from:twilioPhoneNumber,
            to:phoneNumber,
        });
        return requestOtp.message;
        console.log('OTP sent successfully via sms');

    }catch(err){
        throw new Error("Error sending otp",err.message)
    }
}

async refundTransaction(transactionId,amount,currency="GHS",customer_note){
    try{
        const payload={
            transaction:transactionId,
            amount:amount*100,
            currency,
            customer_note:customer_note,
        };
        const response=await axios.post(
            `${this.apiUrl}refund`,payload,
            {
                headers:{
                    Authorization:`Bearer ${this.secretkey}`,
                    'Content-Type':'application/json',
                }
            }
        )
        return response.data;

    }catch(err){
        throw new Error("Error initializing refund",err.message)
    }
}

async initializeGooglePayPayment(amount,currency="GHS",customerEmail,customerPhone){
    try{
        const response=await axios.post(
            `${this.apiUrl}transaction/initialize`,{
                amount:amount * 100,
                currency,
                email:customerEmail,
                phone:customerPhone,
                payment_method:'paystack-googlepay',
            },{
                headers:{
                    Authorization:`Bearer ${this.secretkey}`,
                    'Content-Type':'application/json'
                }
            }
        )
        return response.data;

    }catch(err){
        throw new Error("Error initializing Google Pay payment",err.message)

    }
}

async initializeApplePayPayment(amount,currency="GHS",customerEmail,customerPhone){
    try{
        const response=await axios.post(
            `${this.apiUrl}transaction/initialize`,{
                amount:amount * 100,
                currency,
                email:customerEmail,
                phone:customerPhone,
                payment_method:'paystack-applepay',
            },{
                headers:{
                    Authorization:`Bearer ${this.secretkey}`,
                    'Content-Type':'application/json'
                }
            }
        )
        return response.data;

    }catch(err){
        throw new Error("Error initializing Google Pay payment",err.message)

    }
}

}

module.exports=PaystackTransaction;