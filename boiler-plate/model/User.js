const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;  // 암호화 글자 갯수
const jwt = require('jsonwebtoken');

const userSchema = mongoose.Schema({
    name:{
        type: String,
        maxlength:50
    },
    email:{
        type: String,
        trim: true,
        unique: 1
    },
    password:{
        type: String,
        minlength: 5
    },
    lastname:{
        type: String,
        maxlength: 50
    },
    role:{
        type: Number,
        default: 0
    },
    Image: String,
    token: {
        type:String
    },
    tokenExp:{
        type:Number
    }
});

// 유저info 저장하기전에 들리는곳
userSchema.pre('save', function(next){
    var user = this;
    if(user.isModified('password')){    // 비밀번호가 변경일때
        // 비밀번호를 암호화 시킨다.
        // salt를 이용하여 비밀번호를 암호화시킨다.
        bcrypt.genSalt(saltRounds, function(err, salt) {
            if(err) return next(err);

            bcrypt.hash(user.password, salt, function(err, hash) {
                if(err) return next(err)
                user.password = hash;
                next();
            });
        });
    }else{
        next()
    }
});

// 비밀번호가 맞는지 확인한다 
userSchema.methods.comparePassword = function(plainPassword, cb) {
    // plainPassword 1234512345     암호화된 비밀번호 $2b$10$5KMNammOzeXM7Ja8c78gsOEaJjOF6S2ETkl1U/OrBqZI2kPhfZ7LC
    bcrypt.compare(plainPassword, this.password, function(err, isMatch) {
        if(err) return cb(err);
        cb(null, isMatch);
    })
}

// 토큰만들기
userSchema.methods.generateToken = function(cb){
    var user = this;
    // jsonwebtoken 을 이용해서 token 생성하기
    var token = jwt.sign(user._id.toHexString(), 'secretToken');
    user.token = token;
    user.save(function(err, user) {
        if(err) return cb(err);
        cb(null, user);
    })

}

// 토큰을 가져와서 복호화하고 db에서 유저정보를 가져온다.
userSchema.statics.findByToken = function(token, cb) {
    var user = this;

    // 토큰을 디코드한다.
    jwt.verify(token, 'secretToken', function(err, decoded){
        // 유저id를 이용해서 유저를 찾은 다음에
        // 클라이언트에서 가져온 token과 db에 보관된 토큰이 일치하는지 확인
        user.findOne({"_id":decoded, "token":token}, function(err, user){
            if(err) return cb(err)
            cb(null, user);
        })
        
    })
}


const User = mongoose.model('User', userSchema);

module.exports = {User};