const fs = require('fs')
const uuid = require('uuid/v4')
const path = require('path')

function getIndex() {
  const db = readDB()
  // We are going to return abbreviated content text to the client for the index.
  const index = db.map(post => {
    // Get first 10 words of post and add ellipsis to the end.
    let shortContent = post.content.split(' ', 10).join(' ') + '...'
    return { id: post.id, title: post.title, date: post.date, content: shortContent } 
  })
  return index
}

function getPost(id) {
  const db = readDB()
  let post = findPost(id, db)
  if (!post) return { error: "Blog entry not found." }
  return post
}

function createPost(title, content) {
  if (!title) return { error: "A title must be provided." }
  if (!content) return { error: "Content must be provided." }
  
  const post = {
    id: uuid(),
    title,
    content,
    date: new Date()
  }

  const db = readDB()
  db.unshift(post)
  writeDB(db)
  return post
}

function updatePost(id, title, content) {
  if (!id) return { error: "An ID must be provided." }
  if (!title && !content) return { error: "Either a title or content must be provided." }

  const db = readDB()
  let post = findPost(id, db)
  if (!post) return { error: "This is not a valid ID." }

  post.title = title || post.title
  post.content = content || post.content
  post.date = new Date()

  writeDB(db)
  return post
}

function deletePost(id) {
  if (!id) return { error: "An ID must be provided." }

  const db = readDB()
  const post = findPost(id, db)
  if (!post) return { error: "This is not a valid index." }

  const index = db.findIndex(item => item.id === id)
  db.splice(index, 1)
  writeDB(db)

  return post
}

function readDB() {
  return JSON.parse(fs.readFileSync(path.join(__dirname, '../db/database.json'), 'utf-8'))
}

function writeDB(data) {
  fs.writeFileSync(path.join(__dirname, '../db/database.json'), JSON.stringify(data))
}

function findPost(id, db) {
  return db.find(item => item.id === id)
}

module.exports = {
  getIndex,
  getPost,
  createPost,
  updatePost,
  deletePost
}