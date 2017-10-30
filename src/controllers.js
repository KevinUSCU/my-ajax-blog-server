const model = require('./model')

function getIndex(req, res, next) {
  const result = model.getIndex()
  res.status(200).json({ data: result })
}

function getPost(req, res, next) {
  const id = req.params.id
  const result = model.getPost(id)

  if (result.error) return next({ status: 404, error: result.error })

  res.status(200).json({ data: result })
}

function createPost(req, res, next) {
  const { title, content } = req.body
  const result = model.createPost(title, content)

  if (result.error) return next({ status: 400, error: result.error })

  res.status(201).json({ data: result })
}

function updatePost(req, res, next) {
  const id = req.params.id
  const { title, content } = req.body

  const result = model.updatePost(id, title, content)

  if (result.error) return next({ status: 400, error: result.error })

  res.status(202).json({ data: result })
}

function deletePost(req, res, next) {
  const id = req.params.id

  const result = model.deletePost(id)

  if (result.error) return next({ status: 400, error: result.error })

  res.status(204).send()
}

module.exports = {
  getIndex,
  getPost,
  createPost,
  updatePost,
  deletePost
}