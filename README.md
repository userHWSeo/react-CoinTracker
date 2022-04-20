# React Master Class

###

노마드코더 강의 내용 정리를 위한 README 입니다.
<br>
<br>
<br>
<br>

#### 220420

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
