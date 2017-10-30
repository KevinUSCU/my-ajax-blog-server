const fs = require('fs')
const uuid = require('uuid/v4')
const path = require('path')

function getIndex() {
  const db = JSON.parse(fs.readFileSync(path.join(__dirname, '../db/database.json'), 'utf-8'))
  return db
}

function getPost(id) {

}

function createPost() {

}

function updatePost() {

}

function deletePost() {

}

module.exports = {
  getIndex,
  getPost,
  createPost,
  updatePost,
  deletePost
}