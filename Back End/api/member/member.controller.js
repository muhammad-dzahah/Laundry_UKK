const models = require("../../models/index");
const member = models.member;

module.exports = {
    controllerGetAll:(req,res)=>{
        member.findAll()
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
        const param = { id_member: req.params.id_member}
        member.findOne({where:param})
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
        const data = {
            nama: req.body.nama,
            alamat: req.body.alamat,
            jenis_kelamin: req.body.jenis_kelamin,
            tlp: req.body.tlp
        }
        member.create(data)
        .then(result => {
            res.json({
                message : "data berhasil ditambahkan",
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
    controllerEdit:(req,res)=>{
        const param = { id_member: req.body.id_member}
        const data = {
            id_member: req.body.id_member,
            nama: req.body.nama,
            alamat: req.body.alamat,
            jenis_kelamin: req.body.jenis_kelamin,
            tlp: req.body.tlp
        }
        member.update(data , {where: param})
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
        const param = { id_member: req.params.id_member}
        member.destroy({where: param})
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
