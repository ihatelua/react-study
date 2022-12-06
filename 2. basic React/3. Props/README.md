# :white_check_mark: Props

## :large_orange_diamond: xxxxx
```javascript
function Btn({text, big}){
    return (
        <button style={{
            backgroundColor: "tomato",
            color:"white",
            padding:"10px 20px",
            border:0,
            borderRadius:10,
            fontSize: big ? 18 : 16,
        }}>
            {text}
        </button>
    )
}

function App() {
    return (
        <div>
            <Btn text="Save Changes" big={true}/>
            <Btn text="Continue"  big={false}/>
        </div>
    )
};

const root = document.getElementById("root");
ReactDOM.render(<App/>, root);
```
props 는 컴포넌트의 속성값이 인자로 들어간다.

<br><br>

