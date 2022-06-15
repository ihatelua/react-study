<span style="color:yellow">유효범위</span>

# nodeJS :green_book:

## :pencil2: nodeJS 시작하기 
* 자바스크립트를 서버에서도 사용할 수 있도록 만든 프로그램이다.
* V8이라는 자바스크립트 엔진 위에서 동작하는 런타임환경이다.
* 백단없이 프론트만으로도 서버환경을 만들 수 있다.

<br>

```
npm init 
```
> nodeJS 초기화 생성 명령어이다.

<br><br>


## :pencil2: expressJS 설치
* expressJS 는 node.js를 사용할 때 더 편하게 사용가능하도록 도와주는 프레임워크

<br>

```
npm install express --save
```
> 실행하면 해당경로안 'node_modules' 폴더가 생성되며 <span style="color:yellow">expressJS</span> 가 설치된다.


<br><br>


## :pencil2: HELLO WORLD!
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




