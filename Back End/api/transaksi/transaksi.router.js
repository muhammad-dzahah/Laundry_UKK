const express = require('express');
const router = express.Router();
const {
    controllerGetAll,
    controllerGetId,
    controllerAdd,
    controllerEdit,
    controllerDelete,
    controllerAuth,
    } = require('./transaksi.controller');
const authorize = require('../auth/authorize');
const {IsKasir, IsAdmin, IsOwner} = require('../auth/role');

// routes
router.get('/',  controllerGetAll); //admin only
router.get('/:id_transaksi', controllerGetId); //admin only
router.post('/', controllerAdd); // all authenticated 
router.put('/', controllerEdit); //admin only
router.delete('/', controllerDelete); //admin only
module.exports = router;
