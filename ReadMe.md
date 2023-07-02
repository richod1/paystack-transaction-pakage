# Paystack-Transaction-Pakage Documentation

The `Paystack-Transaction-Pakage` class provides a set of methods for interacting with the Paystack API to perform various transaction-related operations. This documentation provides an overview of the available methods and their usage examples.

## Table of Contents

1. [Installation](#installation)
2. [Usage](#usage)
   - [Constructor](#constructor)
   - [startWebhookServer](#startwebhookserver)
   - [handleWebhook](#handlewebhook)
   - [verifyWebhookSignature](#verifywebhooksignature)
   - [processWebhookEvent](#processwebhookevent)
   - [initializeTransaction](#initializetransaction)
   - [verifyTransaction](#verifytransaction)
   - [initializeSubscription](#initializesubscription)
   - [verifyOTP](#verifyotp)
   - [initializePaymentChannel](#initializepaymentchannel)
   - [sendOTPViaSMS](#sendotpviasms)
   - [refundTransaction](#refundtransaction)
   - [initializeGooglePayPayment](#initializegooglepaypayment)
   - [initializeApplePayPayment](#initializeapplepaypayment)

## Installation<a name="installation"></a>

To use the `PaystackTransaction` class, you need to have the following dependencies installed:

- `axios`: HTTP client for making API requests
- `twilio`: Twilio API client for sending SMS messages
- `express`: Web framework for handling webhook requests
- `body-parser`: Middleware for parsing request bodies

You can install these dependencies using npm:

```
npm install axios twilio express body-parser
```

## Usage<a name="usage"></a>

To use the `PaystackTransaction` class, follow the steps below:

1. Import the required modules and instantiate the `PaystackTransaction` class with your Paystack API secret key and webhook secret.

```javascript
const PaystackTransaction = require('./PaystackTransaction');

const secretKey = 'your_secret_key';
const webhookSecret = 'your_webhook_secret';

const paystack = new PaystackTransaction(secretKey, webhookSecret);
```

### Constructor<a name="constructor"></a>

The `PaystackTransaction` class constructor initializes the `PaystackTransaction` object.

```javascript
const paystack = new PaystackTransaction(secretkey, webhookSecret);
```

#### Parameters

- `secretkey`: Paystack API secret key.
- `webhookSecret`: Secret key for verifying webhook signatures.

### startWebhookServer<a name="startwebhookserver"></a>

Starts the webhook server to receive webhook events from Paystack.

```javascript
paystack.startWebhookServer(port);
```

#### Parameters

- `port`: Port number on which the webhook server should listen.

### handleWebhook<a name="handlewebhook"></a>

Handles incoming webhook requests from Paystack.

```javascript
app.post('/webhook', paystack.handleWebhook.bind(paystack));
```

### verifyWebhookSignature<a name="verifywebhooksignature"></a>

Verifies the signature of a webhook event.

```javascript
const validSignature = paystack.verifyWebhookSignature(signature, event);
```

#### Parameters

- `signature`: Signature header value received in the webhook request.
- `event`: Webhook event payload.

### processWebhookEvent<a name="processwebhookevent"></a>

Processes the webhook event based on its type.

```javascript
paystack.processWebhookEvent(event);
```

#### Parameters

- `event`: Webhook event payload.

### initializeTransaction<a name="initializetransaction"></a>

Initializes a transaction.

```javascript
const response = await paystack.initializeTransaction(email, amount, reference, currency);
```

####

 Parameters

- `email`: Customer's email address.
- `amount`: Transaction amount.
- `reference`: Transaction reference.
- `currency` (optional): Transaction currency (default: GHS).

### verifyTransaction<a name="verifytransaction"></a>

Verifies a transaction.

```javascript
const response = await paystack.verifyTransaction(reference);
```

#### Parameters

- `reference`: Transaction reference.

### initializeSubscription<a name="initializesubscription"></a>

Initializes a subscription.

```javascript
const response = await paystack.initializeSubscription(email, amount, reference, currency, plan, interval);
```

#### Parameters

- `email`: Customer's email address.
- `amount`: Subscription amount.
- `reference`: Subscription reference.
- `currency` (optional): Subscription currency (default: GHS).
- `plan` (optional): Subscription plan.
- `interval` (optional): Subscription interval.

### verifyOTP<a name="verifyotp"></a>

Verifies an OTP (One-Time Password) for a transaction.

```javascript
const response = await paystack.verifyOTP(reference, otp);
```

#### Parameters

- `reference`: Transaction reference.
- `otp`: One-Time Password.

### initializePaymentChannel<a name="initializepaymentchannel"></a>

Initializes a payment channel.

```javascript
const response = await paystack.initializePaymentChannel(email, amount, reference, currency, channel);
```

#### Parameters

- `email`: Customer's email address.
- `amount`: Transaction amount.
- `reference`: Transaction reference.
- `currency` (optional): Transaction currency (default: GHS).
- `channel` (optional): Payment channel (default: 'card').

### sendOTPViaSMS<a name="sendotpviasms"></a>

Sends an OTP (One-Time Password) via SMS.

```javascript
const message = await paystack.sendOTPViaSMS(phoneNumber, otp, twilioAccountSid, twilioAuthToken, twilioPhoneNumber);
```

#### Parameters

- `phoneNumber`: Customer's phone number.
- `otp`: One-Time Password.
- `twilioAccountSid`: Twilio account SID.
- `twilioAuthToken`: Twilio auth token.
- `twilioPhoneNumber`: Twilio phone number.

### refundTransaction<a name="refundtransaction"></a>

Initiates a refund for a transaction.

```javascript
const response = await paystack.refundTransaction(transactionId, amount, currency, customer_note);
```

#### Parameters

- `transactionId`: ID of the transaction to be refunded.
- `amount`: Refund amount.
- `currency` (optional): Refund currency (default: GHS).
- `customer_note`: Note explaining the reason for the refund.

### initializeGooglePayPayment<a name="initializegooglepaypayment"></a>

Initializes a Google Pay payment.

```javascript
const response = await paystack.initializeGooglePayPayment(amount, currency, customerEmail, customerPhone);
```

#### Parameters

- `amount`: Payment amount.
- `currency` (optional): Payment currency (default: GHS).
- `customerEmail`: Customer's email address.
- `customerPhone`: Customer's phone number.

### initializeApplePayPayment<a name="initializeapplepaypayment"></a>

Initializes an Apple Pay payment.

```javascript
const response = await paystack.initializeApplePayPayment(amount, currency, customerEmail, customerPhone);
```

#### Parameters

- `amount`: Payment amount.
- `currency` (optional): Payment currency (default: GHS).
- `customerEmail`: Customer's email address.
- `customerPhone`: Customer's phone number.

This concludes the documentation for the `Paystack-Transaction-Pakage ` class. You can now use the methods provided by the class to interact with the

 Paystack API and perform various transaction-related operations.