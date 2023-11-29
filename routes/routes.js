const express = require('express');
const controller = require('../controller/controller.js');
const roleCheck = require('../controller/roleCheck.js')

const router = express.Router();

router.post('/register', controller.register);
router.post('/login', controller.login);
router.post('/verifyToken', controller.verifyToken);

router.post('/addData', controller.verifyToken, roleCheck('admin'), controller.addData);
router.get('/getAll', controller.verifyToken, controller.getAll);
router.get('/getById/:id', controller.verifyToken, controller.getHotelById);
router.put('/updateById/:id', controller.verifyToken, roleCheck('admin'), controller.update);
router.delete('/deleteById/:id', controller.verifyToken, roleCheck('admin'), controller.delete);

module.exports = router;