# React Master Class

### 노마드코더 강의 내용 정리 및 복습을 위한 README 입니다.

<br>
<br>
<br>
<br>

### 220420

<br>
Styled-Components의 사용

<br>
설치 방법

```
$ npm i styled-components
```

<br>
<br>
기본 문법은

```
const Header = styled.div `
    color: white;
`;

function App() {
  return (
    <Header>
    </Header>
  );
}
```

형태로 사용이 되게 된다.

<br>
백틱 안에 css 형태의 스타일링을 하게 되면 되는데 Sass와 같은 문법 사용도 가능하다.

<br>
<br>
같은 컴포넌트지만 다른 props를 받아 사용할 수도 있다.

```
const Box = styled.div `
    color: white;
    width: 100px;
    height: 100px;
    backgroundColor: ${(props)=> props.bgColor}
`;

function App() {
  return (
    <Box bgColor="tomato" />
    <Box bgColor="blue" />
  );
}

같은 Box지만 다른 props를 인자로 받아 각각의 배경색을 출력한다.
```

<br>
<br>

기존 컴포넌트의 요소를 그대로 유지하면서 새로운 코드를 추가 할 수도 있다. (Extend)

<br>

```
const Box = styled.div `
    color: white;
    width: 100px;
    height: 100px;
    backgroundColor: ${(props)=> props.bgColor}
`;

const Circle = styled(Box)`
    border-radius: 50px;
`;

function App() {
  return (
    <Box bgColor="tomato" />
    <Circle bgColor="blue" />
  );
}
```

<br>
<br>
같은 컴포넌트지만 태그만 변경하고 싶을 때

```
as="원하는 태그"
```

를 사용할 수있다.

<br>
<br>

```
const Btn = styled.button`
    color: tomato;
`;

function App() {
  return (
    <Wrapper>
        <Btn>Log in</Btn>
        <Btn as="a">Go home</Btn>
    </Wrapper>
  );
}
```

<br>
<br>

html 속성이 반복되는 컴포넌트를 만들 때 attrs()를 사용해주면 된다.

```
const Input = styled.input.attrs(required: true, maxLength: 10)`
    backgroundColor: "tomato";
`;

function App() {
  return (
    <Wrapper>
        <Input />
        <Input />
        <Input />
        <Input />
        <Input />
        <Input />
    </Wrapper>
  );
}
```

<br>
<br>
애니메이션 효과는 CSS와 같다.

```
const Wrapper = styled.div`
    display: flex;
    height: 100vh;
    width: 100vw;
    justify-content: center;
    align-items: center;
`;

const anim= keyframes`
    form {
        color: tomato;
    }
    to {
        color: teal;
    }
`

const Btn = styled.button`
    animation: ${anim} 0.5s infinite;
`;

function App() {
  return (
    <Wrapper>
        <Btn>Hi !</Btn>
    </Wrapper>
  );
}
```

<br>
<br>
Pseudo Selector 사용도 가능하다.
<br>
이는 Sass의 사용법과 유사하다.

```
const Wrapper = styled.div`
    display: flex;
    height: 100vh;
    width: 100vw;
    justify-content: center;
    align-items: center;
    h1{
        color: tomato;
        &:hover{
        color: green;
    }
    }
`;

function App() {
  return (
    <Wrapper>
        <h1>Hello</h1>
    </Wrapper>
  );
}
```

<br>
<br>
Themes를 사용한 dark모드와 light모드를 구현

추가적인 구현으론 현재 시간을 가져와 오후 6시(18시)가 넘어가게 되면 dark모드로 오후 6시 전은 light모드로 바꿔지게끔 구현했음.

```
/// App.js


import styled from "styled-components";

const Title = styled.h1`
  color: ${(props) => props.theme.textColor};
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vh;
  height: 100vw;
  background-color: ${(props) => props.theme.backgroundColor};
`;

function App() {
  return (
    <Wrapper>
      <Title>Hello !</Title>
    </Wrapper>
  );
}

export default App;
```

```
/// index.js


import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { ThemeProvider } from "styled-components";

const darkTheme = {
  textColor: "whitesmoke",
  backgroundColor: "#111",
};

const lightTheme = {
  textColor: "111",
  backgroundColor: "#whitesmoke",
};

function themeSwitch() {
  let date = new Date();
  let hours = date.getHours();
  console.log(hours);
  if (hours < 18) {
    return lightTheme;
  } else {
    return darkTheme;
  }
}

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={themeSwitch()}>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

```

<br>
<br>
<br>
<br>

### 220421

<br>

TypeScript 설치 및 활용
<br>
<br>
자바스크립트는 타입화 된 프로그래밍 언어들과 달리 코드 실행 전 타입에 대한 정의가 존재하지 않는다.
<br>
<br>
타입스크립트는 타입에 대해 엄격하게 판단하여 코드가 실행되기 전에 실수를 파악해주며, 수정 전까지 코드를 실행하지 않는다.
<br>
<br>
기본적인 형태는 :(콜론)을 사용하여 타입을 적는 것이다.

```
const plus = (a:number, b:number) => a + b;
```

<br>

하지만 위의 형태로 사용하는 것보다 컴포넌트를 만들어 사용하는 것이 대부분이다.
<br>
interface를 사용하여 컴포넌트를 생성하고 : (콜롬)을 사용하며, 컴포넌트에 있는 요소는 꼭 사용해야한다.
<br>
만약 선택적(optional)으로 사용하길 원한다면 prop에 ? 를 붙이면 된다.

```
interface DummyProps {
  text: string;
  active?: boolean;
  // boolean |(or) undefined
}

function Dummy({text, active}: DummyProps) {
  return <H1>{text}</H1>
};
```

<br>

또한 prop에 default값을 줄 수도 있다.
<br>

```
interface DummyProps {
  text: string;
  active?: boolean;
}

function Dummy({text, active=false}: DummyProps) {
  return <H1>{text}</H1>
  // Dummy에 default 값 주기1
};

function App() {
  return (
    <div>
      <Container>
        <Dummy active={true} text="hello" />
        // Dummy에 default 값 주기2
      </Container>
    </div>
  );
}
```

<br>

event에 타입을 정하는 것도 가능하다.
<br>
React의 event 사용법은 자바스크립트와 달라 SyntheticEvent를 검색해 이벤트 가이드를 보며 원하는 이벤트를 찾아야한다.

```
function App() {
  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event
  }

  return (
    <div>
      <Container>
          <button onClick={onClick}>click me</button>
      </Container>
    </div>
  );
```

<br>
타입을 가지고 있지 않은 라이브러리를 사용할 때 에러가 발생할 수 있다.
<br>
라이브러리를 install할 때 @types/를 붙여 install을 하면 몇몇 라이브러리는 타입을 가진 채로 다운될 것이다.

<br>
<br>
<br>
<br>

### 220422

<br>

react-router-dom을 설치

```
$ npm i react-router-dom react-query
$ npm i --save-dev @types/react-router-dom
```

<br>
설치를 마치고 구현할 Page를 tsx파일로 만든다.
<br>
Coin의 리스트를 보여줄 Coins.tsx와 해당 코인의 디테일을 보여줄 Coin.tsx를 생성한다.
<br>
이후 이 두 개의 tsx파일을 Router.tsx파일을 만들고 렌더링한다.
<br>
react-router-dom에 BrowserRouter, Route, Routes를 import한다.
<br>
<br>
* react-router-dom 이 6.0.0 버전부턴 Switch 컴포넌트를 Routes로 변경함.
<br>
<br>
이후 Styled Component의 GlobalStyle로 전역 스타일을 처리해준다.
<br>
전역 스타일로 css를 reset 시킨다.
<br>
<br>
Coins.tsx파일에 CoinList를 만들어준다.
<br>
Coin의 Object 중 name을 map함수로 가져와 List에 Coin의 이름을 적어놓는다.
<br>
이후 Coin을 클릭 시 Coin의 디테일 창으로 넘어가기 위해 아래와 같이 Link를 사용한다.

<br>

\*a 태그의 href를 사용하지 않는 이유는 페이지가 새로고침이 되기 때문이다.

<br>

```
<Link to={`/${coin.id}`}></Link>
```

<br>
<br>
<br>
Coin의 API를 가져오기 전 interface를 만들어 Coin의 object에 type을 정해준다.
<br>
useState와 useEffect과 fetch를 통해 Coin의 API를 가져온다.

```
const [coins, setCoins] = useState([]);
useEffect(()=> {
  (async()=>{
    await(await const json = fetch(`API주소`)).json()
  })()
  // ()는 함수를 바로 실행하기 위해서 이다.
}, []);
setCoins(json.slice(0, 100))
// 9000개가 넘는 코인을 다 가져올 수 없어서 100개만 가져옴.
```

<br>
<br>
다음으로 Coin.tsx 파일에서 Coin의 디테일을 만든다.
<br>
앞서 만들었던 Link를 통해 다른 화면에 정보를 보낼 수 있는데 Link에 state를 추가하여 정보를 보낸다.

\*react-router-dom 6.0.0 버전 이후론 Link의 to={} prop에 모든 정보를 담지 않는다.

```
<Link to={`/${coin.id}`} state={{name:coin.name}}>
```

<br>

Coin.tsx 파일로 넘어가 useLocation을 통해 state 정보를 받아온다.

\*react-router-dom 6.0.0 버전 이후론 제네릭을 지원하지 않는다.

```
interface RouteState {
    state :
    {
        name: string;
    }
}

/// 인터페이스로 타입 정한다.

const { state } = useLocation() as RouteState;

// as로 interface를 가져온다.
```

<br>
마지막으로 API에서 Coin의 정보와 Coin의 가격 정보를 받아오고 interface를 통해 type을 정해준다.
<br>
console.log로 각 API를 확인 한 후 API에서 key와 value의 typeof 로 손쉽게 interface를 만들 수 있다.
<br>
웹페이지 콘솔창에 API의 객체를 마우스 우클릭 후
<br>
Store object as global variable을 클릭하면 object 데이터를 temp1이라는 곳에 저장된다.

```
const [info, setInfo] = useState<IInfoData>();
    const [priceInfo, setPriceInfo] = useState<IPriceData>();
    useEffect(()=>{
        (async () => {
            const infoData = await (await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`)).json()
            console.log(infoData)
            const priceData = await (await fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`)).json()
            console.log(priceData)
            setInfo(infoData);
            setPriceInfo(priceData);
        })()
    }, [])
```

<br>
하나하나 type을 정하는 것이 까다롭지만 안정장치라고 생각하면 너무 큰 장점이긴하다.

<br>
<br>
<br>
<br>

### 220425

<br>
nested router를 사용하여 Outlet을 사용했다.
<br>
자식 라우트의 엘리멘트가 있는 경우 렌더링해주는데 Outlet은 부모 경로 요소에서 자식 경로 요소를 렌더링하는데 사용한다.
<br>
Outlet을 사용하면 하위 경로가 렌더링될 떄 중첩된 UI를 표시할 수 있다.
<br>
(예전 삼성 홈페이지 클론을 연습할 때 핸드폰의 색상에 따라 경로가 바뀌었는데 Outlet을 사용한거 같다.)
<br>
부모 라우트가 정확히 일치하면 자식 인덱스 라우트를 렌더링하거나 인덱스 라우터가 없으면 렌더링하지 않는다.
<br>

```
< Route path="/food" element={< Food / >} >
< Route path="pizza" element={< Pizza / >} / >
< Route path="cola" element={< Cola / >} / >

// Route가 상대경로도 지원하여 path를 path="cola"와 같이 사용 가능.

< /Route >

import { Outlet } from "react-router-dom";

function Food() {
return (
  < div >
    < h1 >Food< / h1 >
    < Outlet / > // 자식 엘리먼트를 넣고자 하는 곳에 위치
  < /div >
);
}
```

<br>
useMatch()는 () 안 경로로 위치해 있을 경우 지정된 경로에 대한 데이터를 반환한다.

```
const {coinId} = useParams();
const priceMatch = useMatch("/:coinId/price");
const chartMatch = useMatch("/:coinId/chart");

return (
  <Tabs>
    <Tab isActive={chartMatch !== null}>
      <Link to={`/${coinId}/chart`}>Chart</Link>
  </Tab>
  <Tab isActive={priceMatch !== null}>
      <Link to={`/${coinId}/price`}>Price</Link>
  </Tab>
  </Tabs>
 );

// isActive를 활용하여 chartMatch가 null이 아니면 true로 반환한다.
```

<br>
위와 같이 useMatch를 사용하여 해당 경로의 params(coinId)를 받아낸다.

<br>
<br>
<br>
React query를 사용하여 api.ts를 만들어 그 안에 fetcher 함수를 만들어 사용하였으며, useQuery의 기본 형태는 아래와 같다.

```
// useQuery의 기본 셋팅 - index.tsx

import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Home />
    </QueryClientProvider>
  );
}
```

```
// Coin.tsx



const {isLoading: infoLoading, data : infosData} = useQuery<IInfoData>(["info", coinId] , () => fetch함수(argument));
const {isLoading: tickersLoading, data : tickersData} = useQuery<IPriceData>(["tickers", coinId] , () => fetch함수(argument));




// isLoading은 리엑트 쿼리에서 지원해주는 기능이며, 이뿐만 아니라 isError, refetch 등도 기능해준다.
// const { data, isLoading, error } = useQuery(queryKey, queryFn, options) 와 같은 형태로 사용이 된다.
// isLoading과 data가 중복되어 사용할 수 없으니 'isLoading : 원하는 이름'과 같은 형태로 이름을 바꿔 사용한다.
// QueryKey에서 변수를 사용 해야하는 경우가 생기게 되면, 배열을 만들어 변수명을 넣어주면 된다. 여기서 우린 coinId를 사용하여 id에 맞는 코인의 데이터를 가져와야 하므로 coinId를 넣어준다.

```
