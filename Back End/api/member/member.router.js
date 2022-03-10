const express = require('express');
const router = express.Router();
const {
    controllerGetAll,
    controllerGetId,
    controllerAdd,
    controllerEdit,
    controllerDelete,
    } = require('./member.controller');
const authorize = require('../auth/authorize');
const {IsKasir, IsAdmin, IsOwner, IsAdminKasir} = require('../auth/role');

// routes
router.get('/', /*authorize, IsAdmin,*/ controllerGetAll); //admin only
router.get('/:id_member', /*IsAdmin, authorize,*/ controllerGetId); //admin only
router.post('/', /*authorize, IsAdminKasir,*/ controllerAdd); // kasir only
router.put('/', /*authorize, IsAdminKasir,*/ controllerEdit); //kasir only
router.delete('/:id_member', /*IsAdmin, authorize,*/ controllerDelete); //admin only
module.exports = router;
