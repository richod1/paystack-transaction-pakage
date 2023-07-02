const PaystackTransaction = require('paystack-transaction-pakage');

// Replace 'YOUR_PAYSTACK_SECRET_KEY' with your actual Paystack secret key
const PAYSTACK_SECRET_KEY = 'sk_test_07bcef2d3e5298b97aec0160c33fb34229f5c73a';

const paystack = new PaystackTransaction(PAYSTACK_SECRET_KEY);

async function makePayment() {
  try {
    const email = 'test@example.com';
    const amount = 10000; // 10000 Naira
    const reference = 'txn_123456789';

    const transaction = await paystack.initializeTransaction(email, amount, reference);
    console.log('Transaction initialized:', transaction);

    // Redirect user to transaction.authorization_url for payment

    // Example: Verification after the user completes the payment
    const verification = await paystack.verifyTransaction(reference);
    console.log('Transaction verified:', verification);
  } catch (error) {
    console.error('Payment error:', error.message);
  }
}

makePayment();
