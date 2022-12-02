// express import or 포트설정
const express = require('express')          // expressJS import
const app = express()                       // expressJS 전역변수
const port = 5000                           // 포트설정
const bodyParser = require("body-parser");  // 바디파서 import
const { User } = require("./model/User");   // 몽고DB import
const config = require('./config/key')
const cookieParser = require('cookie-parser');
const {auth} = require('./middleware/auth');



// application 유니코드 설정
app.use(bodyParser.urlencoded({extentded: true}))

// application json
app.use(bodyParser.json());
app.use(cookieParser());


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
app.post('/api/users/register', (req, res) => {
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
    const user = new User(req.query) // {json 형식으로 들어가있음}

    user.save((err, userInfo) => {
        if(err) return res.json({success: false, err})
        return res.status(200).json({
            success: true
        })
    })
})


// 로그인 페이지
app.post('/api/users/login', (req, res) => {
    // 1. 요청된 이메일을 데이터베이스에서 있는지 찾는다.
    User.findOne({email:req.query.email}, (err, user) => {
        if(!user) {
            return res.json({
                loginSuccess: false,
                message: "제공된 이메일에 해당하는 유저가 없습니다."
            })
        }
        
        // 2. 요청한 이메일이 데이터베이스에 있다면 비밀번호가 맞는 비밀번호 인지 확인
        user.comparePassword(req.query.password, (err, isMatch) => {
            if(!isMatch) return res.json({loginSuccess: false, message: "비밀번호가 틀렸습니다"});
            // 3. 비밀번호 까지 맞다면 토큰을 생성하기
            user.generateToken((err, user)=>{
                console.log(123123)
                if(err) return res.status(400).send(err);
                // 토큰을 저장한다. 쿠키, 로컬스토리지, 세션등 있지만 쿠키로 넣어본다.
                res.cookie("x_auth", user.token)
                .status(200)
                .json({loginSuccess: true, userId: user._id});
            })
        })
    })
})


// 권한 검증
app.get('/api/users/auth', auth, (req, res) => {
    // 여기까지 미들웨어를 통과해 왔다는 얘기는 Authentication 이 True 라는 말
    res.status(200).json({
        _id: req.user._id,
        isAdmin: req.user.role === 0 ? false : true,
        isAuth: true,
        email: req.user.email,
        name: req.user.name,
        lastname: req.user.lastname,
        role: req.user.role,
        Image: req.user.Image
    })
})


// 로그아웃
app.get('/api/users/logout', auth, (req, res) => {
    User.findOneAndUpdate({_id:req.user._id}, {token:""}, (err, user) => {
        if(err) return res.json({success:false, err});
        return res.status(200).send({
            success: true
        })
    })
})



app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})