const {Router} = require('express')
const mascota=require('../controllers/mascota.controller.js');

const router = Router()

router.get('/mascotas',mascota.findAll);
router.get('/mascotas/:id',mascota.findOne);
router.post('/mascotas',mascota.create);
router.put('/mascotas/:id',mascota.update);
router.delete('/mascotas/:id',mascota.delete);

module.exports = router