const { User } = require("../model/User");

/*
    미들웨어 : 스프링부트에 preHandle같은 기능, 라우트에서 중간에 미들웨어를 넣어주면 무조건 여기를 탄다
*/
let auth = (req, res, next) => {
    // 인증처리를 하는곳

    // 1. 클라이언트에서 쿠키에셔 토큰을 가져온다.
    let token = req.cookies.x_auth;

    // 2. 토큰을 복호화하고 유저를 찾는다.
    // 3. 유저가 있으면 인증O, 없으면 인증X
    User.findByToken(token, function(err, user) {
        if(err) throw err;
        if(!user) return res.json({isAuth:false, error:true});

        req.token = token;
        req.user = user;

        next();
    })
}



module.exports = {auth}