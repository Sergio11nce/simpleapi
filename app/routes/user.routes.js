const {Router} = require('express')
const user=require('../controllers/user.controller.js');

const router = Router()

router.get('/users',user.findAll);
router.get('/users/:id',user.findOne);
router.post('/users',user.create);
router.put('/users/:id',user.update);
router.delete('/users/:id',user.delete);

module.exports = router