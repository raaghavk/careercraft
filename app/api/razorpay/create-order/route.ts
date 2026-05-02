import { NextRequest, NextResponse } from 'next/server'
import { razorpay, PLANS } from '@/lib/razorpay'

export async function POST(req: NextRequest) {
  try {
    const { planId } = await req.json()
    const plan = PLANS[planId as keyof typeof PLANS]

    if (!plan) {
      return NextResponse.json({ error: 'Invalid plan' }, { status: 400 })
    }

    const order = await razorpay.orders.create({
      amount: plan.amount,
      currency: plan.currency,
      receipt: `receipt_${Date.now()}`,
      notes: {
        plan: planId,
        description: plan.description,
      },
    })

    return NextResponse.json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      keyId: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      planName: plan.name,
    })
  } catch (err: any) {
    console.error('Razorpay order error:', err)
    return NextResponse.json({ error: err.message || 'Order creation failed' }, { status: 500 })
  }
}
