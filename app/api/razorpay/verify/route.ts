import { NextRequest, NextResponse } from 'next/server'
import { verifyPaymentSignature } from '@/lib/razorpay'

export async function POST(req: NextRequest) {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, planId } = await req.json()

    const isValid = verifyPaymentSignature(razorpay_order_id, razorpay_payment_id, razorpay_signature)

    if (!isValid) {
      return NextResponse.json({ error: 'Payment verification failed' }, { status: 400 })
    }

    // TODO: Update user's plan in database (e.g. Supabase)
    // await supabase.from('users').update({ plan: planId, plan_expires_at: ... }).eq('id', userId)

    return NextResponse.json({
      success: true,
      message: `Payment verified. Your ${planId} plan is now active!`,
      paymentId: razorpay_payment_id,
    })
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Verification failed' }, { status: 500 })
  }
}
