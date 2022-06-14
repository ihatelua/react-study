// express import or 포트설정
const express = require('express')
const app = express()
const port = 5000

// 몽고db 연결
const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://ponyosushi:12341234@boilerplate.vhzhe.mongodb.net/?retryWrites=true&w=majority')
.then(() => console.log('MongoDB Connect...'))
.catch(err => console.log(err))

// 접속시 최초 실행
app.get(`/`, (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})