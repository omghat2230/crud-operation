const express = require('express');
const {hadleBookStoreController,hadleBookListController,hadleBookDeleteController,hadleBookUpdateController} =require('../controller/book_controller')
const router = express.Router();

// https:localhost:8000/book/addbook
router.post('/addbook',hadleBookStoreController)
router.get('/booklists',hadleBookListController)
router.post('/deletebook',hadleBookDeleteController)

router.put('/updatebook',hadleBookUpdateController)

module.exports = router



