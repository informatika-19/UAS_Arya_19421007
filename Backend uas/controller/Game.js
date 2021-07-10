const gameModel = require('../model/Game')
const { requestResponse } = require('../config')
const objectId = require('mongoose').Types.ObjectId
const { deleteImage } = require('../uploadConfig')
exports.insertGame = (data) =>
  new Promise((resolve, reject) => {
    gameModel.create(data)
    .then(() => resolve(requestResponse.sukses('Berhasil Input data' )))
    .catch(() => reject(requestResponse.serverError))
  })

exports.getAllGame = () =>
  new Promise((resolve, reject) => {
    gameModel.find({})
     .then(game => resolve(requestResponse.suksesWithData(game)))
     .catch(error => reject(requestResponse.serverError))
  })

exports.getById = (id) =>
  new Promise((resolve, reject) => {
    gameModel.findOne({
      _id: objectId(id)
    }).then(game => resolve(requestResponse.suksesWithData(game)))
    .catch(error => reject(requestResponse.serverError))
  })

  exports.edit = (data, id, changeImage) =>
    new Promise((resolve, reject) => {
      gameModel.updateOne({
        _id: objectId(id)
      }, data)
        .then(() => {
          if (changeImage) {
            deleteImage(data.oldImage)
          }
          resolve(requestResponse.sukses('Berhasil Edit Data'))
        }).catch(() => reject(requestResponse.sukses('Berhasil Edit Data')))
    })

exports.delete = (id) =>
  new Promise((resolve, reject) => {
    gameModel.findOne({
      _id: objectId(id)
    }).then(movie => {
      console.log(movie)
      gameModel.deleteOne({
        _id: objectId(id)
      }).then(() => {
        //deleteImage(movie.image)
        resolve(requestResponse.sukses('Berhasil Delete data' )) 
      }).catch((err) => {
        console.log(err)
        reject(requestResponse.serverError)
      })
    })
  })