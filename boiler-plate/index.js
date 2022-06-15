// express import or 포트설정
const express = require('express')          // expressJS import
const app = express()                       // expressJS 전역변수
const port = 5000                           // 포트설정
const bodyParser = require("body-parser");  // 바디파서 import
const { User } = require("./model/User");   // 몽고DB import
const config = require('./config/key')



// application 유니코드 설정
app.use(bodyParser.urlencoded({extentded: true}))

// application json
app.use(bodyParser.json());


// 몽고db 연결
const mongoose = require('mongoose')
mongoose.connect(config.mongoURI)
.then(() => console.log('MongoDB Connect...'))
.catch(err => console.log(err))

// '/' 접속시 최초 실행
app.get('/', (req, res) => {
    res.send('Hello World! ㅎㅇ')
})

// register 로 접속할때 보낸 api로 mongoDB에 저장
app.post('/register', (req, res) => {
/*
    // 이렇게 보내면 mongoDB에 저 데이터에 맞게 저장되어있다.
{
    "name":"ponyo",
    "email":"ponyosushi@gmail.com",
    "password":"1234"
}

*/
    // 회원가입 할때 필요한 정보들을 client에서 가져오면
    // 그것들을 데이터 베이스에 넣어준다.
    const user = new User(req.body) // {json 형식으로 들어가있음}

    user.save((err, userInfo) => {
        if(err) return res.json({success: false, err})
        return res.status(200).json({
            success: true
        })
    })
})




app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})