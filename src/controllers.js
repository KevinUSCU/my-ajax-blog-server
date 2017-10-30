const model = require('./model')

function getIndex(req, res, next) {
  const result = model.getIndex()
  res.status(200).json({ data: result })
}

function getPost(req, res, next) {
  const id = req.params.id
  const result = model.getPost(id)

  if (result.errors) {
    return next(result.errors)
  }

  res.status(200).json({ data: result })
}

function createPost(req, res, next) {

}

function updatePost(req, res, next) {

}

function deletePost(req, res, next) {

}

module.exports = {
  getIndex,
  getPost,
  createPost,
  updatePost,
  deletePost
}