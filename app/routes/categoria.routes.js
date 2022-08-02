
const {Router} = require('express')
const categoria=require('../controllers/categoria.controller.js');

const router = Router()

router.get('/categorias',categoria.findAll);
router.get('/categorias/:id',categoria.findOne);
router.post('/categorias',categoria.create);
router.put('/categorias/:id',categoria.update);
router.delete('/categorias/:id',categoria.delete);

module.exports = router