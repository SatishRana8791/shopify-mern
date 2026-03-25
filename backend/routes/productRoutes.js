import express from 'express'

import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  createProductReview,
  getTopProducts,
} from '../controllers/productController.js'
import { protect } from '../middleware/authMiddleware.js'
import { admin } from '../middleware/authMiddleware.js'

const router = express.Router()

router.get('/top', getTopProducts)
router.get('/', getProducts)
router.get('/:id', getProductById)
router.post('/', protect, admin, createProduct)
router.put('/:id', protect, admin, updateProduct)
router.delete('/:id', protect, admin, deleteProduct)
router.post('/:id/reviews', protect, createProductReview)

export default router;