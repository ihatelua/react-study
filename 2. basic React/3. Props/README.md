# :white_check_mark: Props

## :large_orange_diamond: Props
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

## :large_orange_diamond: memo
```javascript
 function Btn({text, onClick}){
    console.log(text, "was rendered")
    return (
        <button 
            onClick={onClick}
            style={{
                backgroundColor: "tomato",
                color:"white",
                padding:"10px 20px",
                border:0,
                borderRadius:10,
            }
        }>
            {text}
        </button>
    )
}

const MemorizedBtn = React.memo(Btn)

function App() {
    const [value, setValue] = React.useState("Save Changes")
    const changeValue = () => setValue("Revert Changes")
    return (
        <div>
            <MemorizedBtn text={value} onClick={changeValue}/>
            <MemorizedBtn text="Continue" />
        </div>
    )
};

const root = document.getElementById("root");
ReactDOM.render(<App/>, root);
```
부모컴포넌트에서 보낸 상태함수를 자식컴포넌트가 실행할 수 있다.
상태값이 업데이트되면서 리렌더링을 하게되는데 value 값이 있는 첫번째 버튼만 수정되는것이 아니라 두번째 버튼도 수정되는데 이때는 React.memo 로 실제로 수정되는 버튼만 수정되도록 바꿀 수 있다.


<br><br>

## :large_orange_diamond: propTypes
```javascript
<script src="https://unpkg.com/prop-types@15.7.2/prop-types.js"></script>

function Btn({text, fontSize = 16}){
    return (
        <button 
            style={{
                backgroundColor: "tomato",
                color:"white",
                padding:"10px 20px",
                border:0,
                borderRadius:10,
                fontSize
            }
        }>
            {text}
        </button>
    )
}
Btn.propTypes={
    text: PropTypes.string.isRequired,
    fontSize: PropTypes.number
}
function App() {
    return (
        <div>
            <Btn text="Save Changes" fontSize={18}/>
            <Btn text="Continue"/>
        </div>
    )
};

const root = document.getElementById("root");
ReactDOM.render(<App/>, root);
```
props를 타입체크나 필수값지정을 위해서는 prop-type 라이브러리로 체크할 수 있다.

