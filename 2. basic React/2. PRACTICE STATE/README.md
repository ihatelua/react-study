# :white_check_mark: PRACTICE STATE

## :large_orange_diamond: JSX
```javascript
<!--  error -->
const App = () => {
    return (<div>
        <h1 class="hi">Super Converter</h1>  
        <label for="minutes">Minutes</label>
        <input id="minutes" placeholder="Minutes" type="number"/>
        <label for="hours">Hours</label>
        <input id="hours"  placeholder="Hours" type="number"/>
    </div>)
};
const root = document.getElementById("root");
ReactDOM.render(<App/>, root);

<!-- Not error -->
const App = () => {
    return (<div>
        <h1 className="hi">Super Converter</h1>  
        <label htmlFor="minutes">Minutes</label>
        <input id="minutes" placeholder="Minutes" type="number"/>
        <label htmlFor="hours">Hours</label>
        <input id="hours"  placeholder="Hours" type="number"/>
    </div>)
};
const root = document.getElementById("root");
ReactDOM.render(<App/>, root);
```
JSX에서는 class와 for같은 예약어를 쓸 수 없다.  
class와 for 는 자바스크립트 언어이기때문에 html 언어라는것을 명시하기 위해서 class -> className, for -> htmlFor 처럼 써야 한다. 


<br><br>

