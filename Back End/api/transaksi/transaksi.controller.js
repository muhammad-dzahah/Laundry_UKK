const models = require("../../models/index");
const transaksi = models.transaksi;
const detail_transaksi = models.detail_transaksi;
const md5 = require('md5');
const jwt = require('jsonwebtoken');
const config = require('../auth/secret.json');

module.exports = {
    controllerGetAll: async (req, res) => {
        transaksi.findAll({ include: [{ all: true, nested: true }] })
        .then(result => {
            res.json({
                success : 1,
                data : result
            })
        })
        .catch(error => {
            res.json({
                message: error.message
            })
        })
    },
    controllerGetId:(req,res)=>{
        const param = { id_transaksi: req.params.id_transaksi}
        transaksi.findOne({where:param, include: [{ all: true, nested: true }] })
        .then(result => {
            res.json({
                success : 1,
                data : result
            })
        })
        .catch(error => {
            res.json({
                message: error.message
            })
        })
    },
    controllerAdd:(req,res)=>{
        console.log(req.body);
        const data = {
            id_member: req.body.id_member,
            tgl: req.body.tgl,
            batas_waktu: req.body.batas_waktu,
            tgl_bayar: req.body.tgl_bayar,
            status: req.body.status,
            dibayar: req.body.dibayar,
            id_user: req.body.id_user,
            id_outlet: req.body.id_outlet
        }
        transaksi.create(data)
        .then(result => {
            let lastID = result.id_transaksi
            detail_trans = req.body.detail
            detail_trans.forEach(element => {
                element.id_transaksi = lastID
            });
            detail_transaksi.bulkCreate(detail_trans)
            .then(result => {
                res.json({
                    message: "Data has been inserted"
                })
            })
            .catch(error => {
                res.json({
                    message: error.message
                })
            })
        })
        .catch(error => {
            res.json({
                message: error.message
            })
        })
    },
    controllerEdit:(req,res)=>{
        const param = { id_transaksi: req.body.id_transaksi}
        const data = {
            id_transaksi: req.body.id_transaksi,
            id_member: req.body.id_member,
            tgl: req.body.tgl,
            batas_waktu: req.body.batas_waktu,
            tgl_bayar: req.body.tgl_bayar,
            status: req.body.status,
            dibayar: req.body.dibayar,
            id_user: req.body.id_user,
            id_outlet: req.body.id_outlet
        }
        transaksi.update(data , {where: param})
        .then(result => {
            res.json({
                success : 1,
                data : result,data
            })
        })
        .catch(error => {
            res.json({
                message: error.message
            })
        })
    },
    controllerDelete: (req,res)=>{
        const param = { id_transaksi: req.body.id_transaksi}
        transaksi.destroy({where: param})
        .then(result => {
            res.json({
                success : 1,
                data : result
            })
        })
        .catch(error => {
            res.json({
                message: error.message
            })
        })
    }
}
