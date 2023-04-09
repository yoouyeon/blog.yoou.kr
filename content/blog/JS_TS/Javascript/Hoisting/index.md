---
title: "JavaScript Hoisting"
date: 2023-04-09 16:35:13
category: Javascript
description: "자바스크립트의 변수 호이스팅과 함수 호이스팅"
---

## Hoisting

![meaning of hoist](./hoist.png)

'Hoist'란 '밧줄로 끌어올리다' 라는 뜻인데, 자바스크립트에서는 변수, 함수 등의 선언문을 선언되어있는 스코프 가장 위쪽으로 끌어올린 '듯이' 동작하는 자바스크립트 고유의 동작을 **호이스팅** 이라고 합니다.

자바스크립트는 스크립트의 실행 전에 소스 코드의 "평가" 과정을 거치는데, 이 과정에서 "실행 컨텍스트"를 생성하고, 소스 코드들 중 선언문만 먼저 실행하여 그 식별자들을 실행 컨텍스트가 관리하는 영역에 저장해 둡니다. 그리고 실제 실행 과정에서는 미리 저장되어있던 식별자들을 참조하여 실행하게 됩니다.

선언문이 실제로 어디에 위치하는지와는 상관없이, 전체 코드의 실행 전에 선언문이 먼저 실행되므로 마치 선언문을 스코프 가장 위쪽으로 끌어올린 듯이 동작하고, 이러한 동작을 **호이스팅** 이라고 하는 것입니다. (선언문이 실제로 올라간다든가 하는 것이 아님에 주의!!)

## 변수 호이스팅

변수 선언은 2단계에 걸쳐서 진행됩니다.

- 선언 단계 : 변수 이름을 등록해서 변수의 "존재"를 알림
- 초기화 단계 : 변수를 위한 메모리 공간을 할당하고 `undefined`를 기본값으로 초기화

```js
console.log(hi); // undefined

var hi = "안녕하세요용";

console.log(hi); // 안녕하세요용
```

`var` 키워드로 선언된 변수는 호이스팅 될 때 선언과 초기화 단계가 함께 이루어집니다.

이렇게 변수 선언 및 할당 전에 변수를 사용할 수 있다는 점이 코드의 가독성 면에서도 좋지 않고, 예기치 못한 에러를 발생시킬 수도 있고, 그 외에도 `var` 키워드의 단점이 있었기 때문에 이를 보완하기 위해서 만들어진 키워드가 `let` 과 `const` 키워드입니다.

```js
hi = "안녕하세요옹"; // ReferenceError: Cannot access 'hi' before initialization

let hi;

console.log(hi); // undefined

hi = "안녕하세요옹";

console.log(hi); // 안녕하세요용
```

`let`과 `const` 키워드로 선언된 변수는 호이스팅 시에 **선언** 단계만 이루어집니다. 그리고 실행 시에 선언문에 도달하면, 그 때 **초기화** 단계가 진행됩니다. 따라서 위 코드에서 `hi`에 값을 할당하려고 할 때 `ReferenceError`가 나는 것도 선언문 전이기 때문에 메모리가 할당되지 않았으므로 값을 할당하지 못해 참조 에러가 나는 것입니다. 이렇게 `let`으로 선언된 변수는 스코프의 시작부터 변수의 선언문 (변수의 초기화 시점) 전까지는 참조할 수 없는데 이 구간을 **일시적 사각지대 (Temporal Dead Zone, TDZ)** 라고 합니다.

선언문 이후에는 초기화 단계 이후이므로 변수의 값은 `undefined`가 되고, 값의 할당도 문제없이 할 수 있게 됩니다.

## 함수 호이스팅

함수를 정의하는 방법에는 2가지가 있습니다.

```js
// 함수 선언문
function add1 (x, y) {
    console.log(x + y);
}

// 함수 표현식
const add2 = function (x, y) {
    console.log(x + y);
};

var add3 = function foo(x, y) {
    console.log(x + y);
};
```

함수 선언문으로 정의된 함수는 역시 선언문이므로 호이스팅되어 선언문의 위치와 상관 없이 함수를 호출할 수 있습니다.

```js
add1(1, 2); // 3

function add1 (x, y) {
    console.log(x + y);
}
```

하지만 함수 표현식의 경우에는 할당연산자 오른쪽의 값은 함수 선언문이 아닌 함수 리터럴이므로 호이스팅의 대상이 아닙니다. 따라서 왼쪽의 변수만 호이스팅되어 변수 호이스팅과 같이 동작합니다.

```js
console.log(add3); // undefined

var add3 = function (x, y) {
    console.log(x + y);
};

console.log(add3); // [Function: add3]
```

## 참고

- [모던 자바스크립트 Deep Dive](https://wikibook.co.kr/mjs/)

- https://developer.mozilla.org/ko/docs/Glossary/Hoisting
- https://www.w3schools.com/js/js_hoisting.asp
- https://dev.to/lydiahallie/javascript-visualized-hoisting-478h