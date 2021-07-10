const orderModel = require('../model/Order')
const { requestResponse } = require('../config')
const objectId = require('mongoose').Types.ObjectId

exports.insert = (data) =>
    new Promise((resolve, reject) => {
        try{
            orderModel.create(data)
            .then(() => resolve(requestResponse.sukses('Berhasil Memproses Transaksi')))
            .catch(() => reject(requestResponse.serverError))
        } catch (error) {
            console.log(error)
        }
    })

exports.getAllOrder = () =>
    new Promise((resolve, reject) => {
        orderModel.aggregate([
            {
                $lookup: {
                    from: "game",
                    localField: "idFilm",
                    foreignField: "_id",
                    as: "dataGame"
                }
            },
            {
            $lookup: {
                from: "users",
                localField: "idUser",
                foreignField: "_id",
                as: "dataUser"
            }
        }
        ]).then(res => {
            resolve(requestResponse.suksesWithData(res))
        }).catch(() => reject(requestResponse.serverError))
    })

exports.getOrderByUser = (id) =>
new Promise((resolve, reject) => {
    orderModel.aggregate([
            {
                $match: {
                    idUser: objectId(id)
                }
            },
            {
                $lookup: {
                    from: "games",
                    localField: "idFilm",
                    foreignField: "_id",
                    as: "dataGame"
                }
        }
        ]).then(res => {
            resolve(requestResponse.suksesWithData('res'))
        }).catch(() => reject(requestResponse.serverError))
    })
exports.konfirmasiOrder = (id) =>
    new Promise((resolve, reject) => {
        orderModel.updateOne({
            _id: objectId(id)
        },
        {
            status: 2
        }).then(() => resolve(requestResponse.sukses('Berhasil Mengkonfirmasi Order')))
        .catch(() => reject(requestResponse.serverError))
    }),

    exports.terimabarang = (id) =>
    new Promise((resolve, reject) => {
        orderModel.updateOne({
            _id: objectId(id)
        },
        {
            status: 3
        }).then(() => resolve(requestResponse.sukses('Berhasil Mengkonfirmasi Barang')))
        .catch(() => reject(requestResponse.serverError))
    })