import Razorpay from 'razorpay'
import crypto from 'crypto'

export function isRazorpayConfigured(): boolean {
  return Boolean(process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET)
}

export function getRazorpayClient(): Razorpay | null {
  if (!isRazorpayConfigured()) {
    return null
  }

  return new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID!,
    key_secret: process.env.RAZORPAY_KEY_SECRET!,
  })
}

export const PLANS = {
  pro_monthly: {
    name: 'Pro Monthly',
    amount: 49900, // in paise (₹499)
    currency: 'INR',
    description: 'CareerCraft Pro - Monthly',
  },
  pro_annual: {
    name: 'Pro Annual',
    amount: 399900, // ₹3,999
    currency: 'INR',
    description: 'CareerCraft Pro - Annual',
  },
  elite_monthly: {
    name: 'Elite Monthly',
    amount: 149900, // ₹1,499
    currency: 'INR',
    description: 'CareerCraft Elite - Monthly',
  },
  elite_annual: {
    name: 'Elite Annual',
    amount: 1199900, // ₹11,999
    currency: 'INR',
    description: 'CareerCraft Elite - Annual',
  },
}

export function verifyPaymentSignature(
  orderId: string,
  paymentId: string,
  signature: string
): boolean {
  if (!process.env.RAZORPAY_KEY_SECRET) {
    return false
  }

  const body = `${orderId}|${paymentId}`
  const expectedSignature = crypto
    .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET!)
    .update(body)
    .digest('hex')
  return expectedSignature === signature
}
