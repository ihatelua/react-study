# :white_check_mark: nodeJS 

## :large_orange_diamond: nodeJS 시작하기 
* 자바스크립트를 서버에서도 사용할 수 있도록 만든 프로그램이다.
* V8이라는 자바스크립트 엔진 위에서 동작하는 런타임환경이다.
* 백단없이 프론트만으로도 서버환경을 만들 수 있다.

<br>

```
npm init 
```
> nodeJS 초기화 생성 명령어이다.

<br><br>


## :large_orange_diamond: expressJS 설치
expressJS 는 node.js를 사용할 때 더 편하게 사용가능하도록 도와주는 프레임워크

<br>

```
npm install express --save
```
> 실행하면 해당경로안 'node_modules' 폴더가 생성되며 <span style="color:yellow">expressJS</span> 가 설치된다.


<br><br>


## :large_orange_diamond: HELLO WORLD!
```javascript
// index.js

const app =  require('express')    // expressJS import   
const app = express()              // expressJS 전역변수
const port = 5000                  // 포트설정

// '/' 접속시 최초 실행
app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
```
> index.js 파일을 만들고 위 코드를 적어 저장한다.

<br>

```json
{
  "name": "boiler-plate",
  ...
  ...
  ...
  "scripts": {
    "start": "node index.js",   // 추가
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  ...
  ...
  ...
}
```
> package.json 'scripts' 키에 <span style="color:yellow">"start": "node index.js"</span> 값을 저장하면 서버를 실행할때 간편하게 실행이 가능하다.



<br>

```
npm run start
```
> 터미널에 실행하면 <span style="color:yellow">localhost:5000</span> 로 서버가 실행된다.



<br><br>


## :large_orange_diamond: mongoDB 연결하기
비필수 스키마와 함께 JSON과 같은 문서를 사용하여 대량의 데이터를 저장하는 NoSQL 데이터베이스이다

```
npm install mongoose --save
```
> 몽고DB를 편하게 쓸 수 있는  Object Modeling Tool 이다.

<br>

```javascript
const mongoose = require('mongoose')    // mongoDB import
mongoose.connect(URI)                   // uri set
.then(() => console.log('MongoDB Connect...'))  // success
.catch(err => console.log(err))                 // error
```
> mongoose를 import 하고 mongoDB 를 연결한다. 성공하면 .then(..) 안 코드가 실행되고, error가 난다면 catch() 안 error 를 실행된다.


<br><br>



## :large_orange_diamond: mongoDB 모델 생성
```javascript
// model.js
const mongoose = require('mongoose')    // mongoose import

// user스키마 생성
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
})

// 스키마를 User 라는 모델로 지정한다.
const User = mongoose.model('User', userSchema)

// 다른파일에서도 사용할 수 있도록 set
module.exports = {User}
```
> 테이블을 정의하고 그 테이블을 이용할 수 있는 변수생성과 참조할 수 있는 변수를 지정한다.


<br><br>

## :large_orange_diamond: BodyParser 와 PostMan 및 회원가입 기능

### :small_orange_diamond: BodyParser 설치하기

클라이언트가 서버에 데이터를 보냈을때, 서버가 클라이언트가 보낸 데이터를 확인해야한다.<br> 하지만 클라이언트가 준 데이터를 그대로 사용하기는 어렵고, 데이터를 정제하여 서버로 보내야하는데 그 때 필요한 라이브러리가 BodyParser 이다.

```
npm install body-parser --save
```

<br>

### :small_orange_diamond: PostMan 설치하기

클라이언트가 서버에 접속하면서 request(데이터) 를 보내야하는데 데이터를 쉽게 보낼수 있는 툴.<br>
구글에 검색하면 무료로 다운로드 가능하다.


<br>


### :small_orange_diamond: Route 만들기
```javascript
// register 로 접속할때 보낸 api로 mongoDB에 저장
app.post('/register', (req, res) => {
/*
    // 이렇게 보내면 mongoDB에 저 데이터에 맞게 저장되어있다.
{
    "name":"ponyo",
    "email":"ponyo@gmail.com",
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
```
> postMan툴에서 Body -> raw 탭에서 json 형식으로 데이터를 작성하고 post 형식으로 'localhost:5000/register' 으로 접속하게되면 결과값에 success : true 가 떨어지며 mongoDB를 확인하면 클라이언트가 보낸 데이터에 맞게 저장된것을 확인할 수 있다. 


<br><br>

## :large_orange_diamond: Nodemon 설치  
라이브서버로 서버를 실행하기위해 Nodemon이라는 것을 설치한다.

```
npm install nodemon --save-dev
```
<span style="color:yellow">--save</span>가 아니라 <span style="color:yellow">--save-dev</span>를 붙이는 이유는 install 하게되면 dependencies가 devDependencies로 들어가기때문에 개발용 dependencies라는것을 명시하기위해서 사용한다.  
  
   
### :small_orange_diamond: package.json 에서 라이브서버 스크립트 작성하기
```json
"scripts": {
    "start": "node index.js",
    "live": "nodemon index.js", // 여기에 작성한다.
    "test": "echo \"Error: no test specified\" && exit 1"
},
```
서버를 실행할때 'npm run live' 로 실행하면 서버가 변경될때 실시간으로 반영된다.


<br><br>


## :large_orange_diamond: 비밀 설정 정보 관리
깃허브에 파일을 저장하다보면 다른 사용자에게 보여주지말아야할 비밀키가 있다.  
예를들어 ssh키나 몽고db url 같은 키는 공개적으로 공유하게되면 문제되는경우가 생기기도 한다.  
그 문제를 해결하기위해 키가 저장되어있는 파일을 하나 만들고 그 파일을 gitignore 로 서버에 올라가지못하도록 막으면 가능해진다.

```javascript
// index.js
const config = require('./config/key')

const mongoose = require('mongoose')
mongoose.connect(config.mongoURI)
```
index 파일에서 mongoDB를 연결하는 URL부분에 키파일을 연결하여 url를 가져오도록 작성한다.

<br><br>

## :large_orange_diamond: Bcrypt 를 사용하여 비밀번호 암호화하기
register로 유저정보를 저장할때 db에 비밀번호가 그대로 저장되면 보안적으로 문제가 된다.  
그 문제를 해결하기위해 register로 유저정보가 저장하기전에 비밀번호를 암호화시켜 저장시키면된다.

``` javascript
// 암호화 라이브러리 설치
npm install bcrypt --save

// user.js
const bcrypt = require('bcrypt');
const saltRounds = 10;  // 암호화 글자 갯수

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
```
'userSchema.pre('save', ' 유저스키마에서 저장(save)이 되기전(pre) 실행된다는 문법이다.  
this로 현재 저장되는 유저정보를 가져오고, 오직 비밀번호가 변경일때만 저장되도록 체크하기위해 user.isModified를 사용했다.  
bcrypt에서 salt라는 함수를 이용하여 비밀번호를 암호화시키는데 이때 saltRounds 라는것이 있다.  
saltRounds 는 salt를 할 때 salt가 몇 글자인지 나타낸 변수이다. saltRounds 가 10이면 salt를 만들때 10글자인 salt를 만들어 비밀번호를 암호화시킨다는 뜻이다.

  
bcrypt.genSalt으로 salt를 만들고 bcrypt.hash로 사용자의 비밀번호를 암호화시킨다.  
암호화시킨 비밀번호는 사용자 비밀번호에 넣어 유저정보를 저장하도록 next함수를 실행시킨다.


<br><br>

