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
