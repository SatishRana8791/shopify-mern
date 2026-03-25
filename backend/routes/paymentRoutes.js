import express from 'express'
import Razorpay from 'razorpay'
import crypto from 'crypto'
import Order from '../models/Order.js'
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()


// @desc    Create Razorpay order
// @route   POST /api/payment/order
// @access  Private
router.post('/order', protect, async (req, res) => {
  try {
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    })

    const { amount } = req.body
    console.log('Razorpay Key ID:', process.env.RAZORPAY_KEY_ID)
    console.log('Amount:', amount)

    const options = {
      amount: amount * 100,
      currency: 'INR',
      receipt: `receipt_${Date.now()}`,
    }
    const order = await razorpay.orders.create(options)
    res.json(order)
  } catch (error) {
    console.log('PAYMENT ERROR:', error)
    res.status(500).json({ message: error.message })
  }
})

// @desc    Verify payment
// @route   POST /api/payment/verify
// @access  Private
router.post('/verify', protect, async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      orderId,
    } = req.body

    // Verify signature
    const body = razorpay_order_id + '|' + razorpay_payment_id
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest('hex')

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({ message: 'Invalid payment signature' })
    }

    // Update order to paid
    const order = await Order.findById(orderId)
    order.isPaid = true
    order.paidAt = Date.now()
    order.paymentResult = {
      id: razorpay_payment_id,
      status: 'completed',
      update_time: Date.now(),
    }
    await order.save()

    res.json({ message: 'Payment verified successfully' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

export default router;