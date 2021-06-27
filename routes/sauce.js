const express = require('express');
const router = express.Router();

const sauceCtrl = require('../controllers/sauce');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

// GET ALL
router.get('/', auth, sauceCtrl.getAllSauce);

// GET ONE
router.get('/:id', auth, sauceCtrl.getOneSauce);

// POST
router.post('/', auth, multer, sauceCtrl.createSauce);

// POST LIKE
router.post('/:id/like', auth, sauceCtrl.likeSauce);

// PUT
router.put('/:id', auth, multer, sauceCtrl.modifySauce);

// DELETE
router.delete('/:id', auth, sauceCtrl.deleteSauce);


module.exports = router;