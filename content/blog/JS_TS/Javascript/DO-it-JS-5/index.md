---
title: "[Do it! 자바스크립트] Chapter 5. 함수와 이벤트"
date: 2021-05-25 10:44:54
category: Javascript
description: "Do it! 웹 프로그래밍을 위한 자바스크립트 기본 편을 읽고, 공부하고, 정리한 글"
---

**Do it! 웹 프로그래밍을 위한 자바스크립트 기본 편**을 읽고, 공부하고, 정리한 글 

- - -

[책 정보](http://www.easyspub.co.kr/20_Menu/BookView/A001/295/PUB)

> 공부한 내용을 정리하기 위한 목적의 글입니다. 
> 정확하고 자세한 내용 확인을 위해서는 책을 구입하셔서 공부하시는 것이 좋습니다.😀

*Chapter 4는 이미 알고 있는 내용이기 때문에... (제어문) 정리를 생략합니다.*

## 💛 함수

자주 실행해야 하는 기능에 포함된 명령이 여러 가지일 때 그 명령을 한 번에 실행할 수 있게 한 덩어리로 묶은 것을 함수(function)라고 한다.

### ✨ 함수 정의하고 실행하기

`function` 예약어를 사용하고, 중괄호로 내용을 묶어주면 된다.

```javascript
function showTotal(){
  originPrice = 3000;
  discount = 300;
  console.log(originPrice - discount);
}
```

   #### 📝 함수 선언과 실행 순서

자바스크립트 소스를 해석할 때 함수 선언 부분을 먼저 해석하기 때문에 함수를 어디에 선언했는지와 상관 없이 함수를 실행할 수 있다.

### ✨ 버튼을 눌렀을 때 함수를 실행하는 프로그램 만들기

실습한 코드는 [깃허브](https://github.com/yoouyeon/Do-it-JS/tree/main/Chapter05) 에 올려둠.

## 💛 함수 만들기

### ✨ 함수에 매개변수 지정하기

```javascript
function addNumber(a, b){
  let sum = a + b;
  console.log(sum);
}
```

이렇게 괄호 안에 매개변수가 2개 있고 그 이름은 각각 뭐다 이런 식으로 표시해주면 된다.

#### 📝 함수의 매개변수 기본 값 지정하기

ES6부터는 함수 선언 시에 매개변수의 기본 값을 지정할 수 있는 기능이 추가되었다. 

```js
function addNumber(a = 20, b = 30){
  return (a + b);
}

addNumber(10 + 1);	// 11 출력
addNumber(10);			// 40 출력
```

### ✨ 변수의 적용 범위 알아보기

- 지역변수를 선언하기 위해서는 `var` 예약어를 이용해서 선언해야 한다. 만약 `var` 가 없으면 함수 안에서 선언하더라도 전역변수로 취급된다.
- 즉, 전역변수를 선언하기 위해서는 앞에 예약어를 붙이지 않고 선언하면 된다.

#### 📝 블록 변수

ES6부터 블록 변수(Block Variable) 가 추가되었다.

`let` 예약어를 이용하여 선언하면 그 변수는 블록 변수가 된다.

`var` 로 선언한 변수는 **function scoped** 이고 `let` 으로 선언한 변수는 **block scoped**라는 점에서 차이가 있다.

### ✨ 익명함수와 즉시 실행 함수

#### 익명 함수

이름이 없는 함수

함수 자체가 식(Expression)이기 때문에 변수에 할당할 수도 있다.

```js
let add = function (a, b){
  return (a + b);
}

let sum = add(10, 20); 
```

변수에 넣어서 사용한다는 점 외에는 별로 차이점이 없어 보여서 익명함수를 왜 쓰는지 조금 더 조사해봤는데 익명함수는 런타임에 선언되는 함수이고 기존 함수(기명 함수)는 런타임 이전에 선언되는 함수라는 차이가 있었다. 아직은 정확히 어떤 효과로 차이가 드러나는지는 모르겠지만 이런 차이가 있다는 점은 알아두는 것이 좋을 것 같다.

**[도움을 받은 글]**

https://noogoonaa.tistory.com/75

#### 즉시 실행 함수

함수를 정의하는 동시에 실행하는 함수. 함수 선언 소스 전체를 괄호로 묶는다.

```javascript
(function(){
    ...
})();
    
(function(){
    ...
}());
```

즉시 실행 함수는 변수에 할당할 수 있고, 함수에서 반환하는 값을 변수에 할당할 수 있다.

```js
var result = (function(){
  return (10 + 20);
}());
console.log(result);	// 30	출력

var result = (function(a, b){
  return (a + b);
}(10, 20));
console.log(result);	// 30 출력
```

#### 📝 함수의 화살표 표기법

ES6버전 부터는  => 표기법을 사용해서 함수 표현을 할 수 있다.

```js
// 매개변수가 없는 경우
let hi = () => "안녕하세요!";
hi();
// 매개변수가 1개만 있는 경우
let greet = name => `${name}님, 안녕하세요!`;
greet("yoou");
// 매개변수가 있는 경우
let add = (a, b) => a + b;
add(a, b);
```

## 💛 이벤트 다루기

### ✨ 이벤트

이벤트(Event)란 웹 브라우저나 사용자가 행하는 어떤 동작이다.

#### 마우스 이벤트

| 속성      | 설명                                                   |
| --------- | ------------------------------------------------------ |
| click     | HTML 요소를 마우스로 눌렀을 때 발생하는 이벤트         |
| dbclick   | HTML 요소를 마우스로 더블클릭했을 때 발생하는 이벤트   |
| mousedown | 요소 위에서 마우스 버튼을 누르는 동안 발생하는 이벤트  |
| mousemove | 요소 위에서 마우스 포인터를 움직일 때 발생하는 이벤트  |
| mouseover | 요소 위로 마우스 포인터가 옮겨질 때 발생하는 이벤트    |
| mouseout  | 마우스 포인터가 요소 위를 벗어날 때 발생하는 이벤트    |
| mouseup   | 누르고 있던 마우스 버튼에서 손을 뗄 때 발생하는 이벤트 |

#### 문서 로딩 이벤트

| 속성   | 설명                                                         |
| ------ | ------------------------------------------------------------ |
| abort  | 웹 문서가 완전히 로딩되기 전에 불러오기를 멈췄을 때 발생하는 이벤트 |
| error  | 문서가 정확히 로딩되지 않았을 때 발생하는 이벤트             |
| load   | 문서 로딩이 끝났을 때 발생하는 이벤트                        |
| resize | 문서 화면 크기가 바뀌었을 때 발생하는 이벤트                 |
| scroll | 문서 화면이 스크롤되었을 때 발생하는 이벤트                  |
| unload | 문서를 벗어날 때 발생하는 이벤트                             |

#### 키보드 이벤트

| 속성     | 설명                                       |
| -------- | ------------------------------------------ |
| keypress | 사용자가 키를 눌렀을 때 발생하는 이벤트    |
| keydown  | 사용자가 키를 누르는 동안 발생하는 이벤트  |
| keyup    | 사용자가 키에서 손을 뗄 때 발생하는 이벤트 |

#### 폼 이벤트

폼(Form)이란 사용자가 데이터를 입력하는 모든 요소를 의미한다.

| 속성   | 설명                                                         |
| ------ | ------------------------------------------------------------ |
| blur   | 요소에 포커스를 잃었을 때 발생하는 이벤트                    |
| change | 목록이나 체크상태 등이 변경되었을 때 발생하는 이벤트. `input`, `select`, `textarea` 태그에서 사용한다. |
| focus  | 요소에 포커스가 놓였을 때 발생하는 이벤트. `label`, `select`, `textarea`, `button` 태그에서 사용한다. |
| reset  | 폼이 다시 시작했을 때 발생하는 이벤트                        |
| submit | submit 버튼을 눌렀을 때 발생하는 이벤트                      |

이벤트 목록 참고하기 : [링크](https://developer.mozilla.org/ko/docs/Web/Events)

### ✨ 이벤트 처리기

대부분 이벤트가 발생하면 연결 동작이 뒤따른다.

이를 위해서는 이벤트가 발생했을 때 어떤 함수를 실행해야 할 지 명시해주어야 한다. 이렇게 이벤트와 이벤트 처리 함수를 연결해 주는 것을 이벤트 처리기, 또는 이벤트 핸들러(Event handler)라고 한다.

이벤트 처리기는 이벤트 이름 앞에 on을 붙여서 사용한다. (click -> onclick, mouseover -> onmouseover) 

### ✨ 이벤트 활용해 보기

실습 코드는 [깃허브](https://github.com/yoouyeon/Do-it-JS/tree/main/Chapter05) 에 올려둠.

- - -

연습문제 코드는 [깃허브](https://github.com/yoouyeon/Do-it-JS/tree/main/Chapter05) 에 올려둠
