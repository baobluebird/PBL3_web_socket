const express = require('express');
const router = express.Router();
const ProductController = require('../../controllers/ProductController');
const { authMiddleware} = require('../../middleware/authMiddleware');

router.post('/create', authMiddleware, ProductController.createProduct);
router.put('/update/:id', authMiddleware, ProductController.updateProduct);
router.delete('/delete/:id',authMiddleware, ProductController.deleteProduct);

router.get('/get-details/:id', ProductController.getDetailsProduct);
router.get('/get-all',ProductController.getAllProduct);
router.get('/get-all-type', ProductController.getAllType)
router.get('/search', ProductController.searchProduct)
module.exports = router;