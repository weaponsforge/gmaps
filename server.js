const express = require('express')
const app = express()
const path = require('path')
const PORT = process.env.PORT || 3000

app.use(express.static('dist'))

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'dist', 'index.html'))
})

app.listen(PORT, () => {
  console.log(`listening on http://localhost:${PORT}`)
})