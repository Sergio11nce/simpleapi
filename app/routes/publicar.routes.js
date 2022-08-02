const {Router} = require('express')
const publicar=require('../controllers/publicar.controller.js');

const router = Router()

router.get('/publicar',publicar.findAll);
router.get('/publicar/:id',publicar.findOne);
router.post('/publicar',publicar.create);
router.put('/publicar/:id',publicar.update);
router.delete('/publicar/:id',publicar.delete);

module.exports = router