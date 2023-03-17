---
title: "[목요특강] 처음 만난 리액트"
date: 2022-07-07 17:55:51
category: ETC
description: "42서울 목요특강 강의 노트"
---

BY. 이인제 멘토님

- - -

## 🌟 리액트란 무엇인가?

A JavaScript library for building user interfaces

라이브러리 : 자주 사용되는 기능을 묶어둔 것

## 🌟 웹 개발의 트렌드

기술에 기반되는 지식을 익히려고 노력, 새로운 기술이 나오면 사이드 플젝을 통해서 실제로 써 보자!

기술에 기반되는 지식 → 웹사이트의 작동 원리와 흐름을 먼저 익히자.

## 🌟 왜 리액트?

페이지가 많아지면 하나의 HTML 페이지를 만들어두고 요청이 있을 때마다 컨텐츠를 바꾸어 쓴다.

1. 빠른 업데이트
2. 빠른 랜더링 속도
3. Virtual DOM => Document Object Model (웹사이트의 정보를 담고 있는 객체)
	- 화면이 업데이트 된다는 것 = DOM이 수정된다는 것
	- Virtual DOM 이라는 하나의 층을 더 쌓아서 수정된 부분을 계산해서 다시 랜더링
4. Component-base
	- 레고블록 조립하듯 컴포넌트를 조립한다.
	- 재사용성이 높아짐 (의존성이 많아지면 재사용성이 떨어진다.)
		- 개발기간이 단축된다.
		- 유지보수가 용이하다.
	- 컴포넌트 기반이기 때문에 컴포넌트의 재사용이 가능하다 → 재사용성이 높다.
5. 든든한 지원군 : Meta
6. 활발한 지식공유 커뮤니티
7. React Native

단점

1. 방대한 학습량 (진입장벽이 높다)
2. 발전 속도가 너무 빠름 (장점이자 단점)
3. 높은 상태관리 복잡도

## 🌟 JSX

a syntax extension to JavaScript.

JS + XML + HTML => JSX

React + JSX 필수는 아니지만 권장된다.

1. 코드가 간결해지고
2. 가독성이 올라간다 → 버그를 발견하기 쉽다.

## 🌟 elements

The smallest Building Block. 리액트 앱을 구성하는 가장 작은 블록

화면에 나타나는 내용을 기술하는 자바스크립트 객체 : descriptor -> element

- React element : virtual DOM에 있는 element
- DOM element : Brower DOM에 있는 element

특징 : immutable (불변성)

- element 생성 후에는 children이나 attribute를 바꿀 수 없다.
- 붕어빵..
	- 붕어빵 틀 : Component
	- 붕어빵들 : elements

## 🌟 props

입력 (props) → react component → 출력 (element)

props : properties / 속성 / 특성

읽기 전용이다 → 바꿀 수 없음. 바꾸려면 새로운 값을 컴포넌트에 전달해야 한다.

## 🌟 Component
- pure : 입력값을 변경하지 않고, 같은 입력에 대해 동일한 출력을 낸다.

	리액트 컴포넌트는 pure함수와 비슷한 성격을 갖는다 (props를 변경하지 않고, 같은 props가 입력될 경우에 동일한 element를 만들어낸다.)

- 종류
	- class component
		- 생성자에서 state 정의
		- lifecycle에 따른 기능 구현 가능
	- functional component
		- state 사용 불가
		- lifecycle에 따른 기능 구현 불가
- 컴포넌트의 이름은 항상 대문자로 시작해야 한다.
- 컴포넌트 안에 컴포넌트가 들어갈 수 있다. -> 컴포넌트 추출로 큰 컴포넌트를 작은 컴포넌트의 조합으로 쪼갠다 -> 재사용성이 높아짐.

## 🌟 state

- Component의 변경 가능한 데이터
- Props는 컴포넌트 외부에서 주입되는 정보라면 State는 Component가 본래 가지고 있는 데이터이다.
- state는 직접적으로 수정하면 안되고 (가능은 하지만 이후의 상태관리에 문제가 생김) setState 함수로 수정해줘야 한다.

랜더링이 다시 되는것은 props가 변경되거나 state가 변경되는 때이다.

## 🌟 Hooks

functional component에서 갈고리를 걸어줌

- state 관련 함수들
- lifecycle 관련 함수들
- 최적화관련 함수들

=> Class Component의 특징을 hook을 이용해서 functional component에서도 사용할 수 있게 되었다!!!

규칙

1. 최상위 레벨에서 호출되어야 한다. (조건문 안 같은 곳에서 hook을 호출하면 안됨)
2. 매번 같은 순서로 호출되어야 한다.

## 🌟 🙃

마침 TIL 페이지 Gatsby + React로 만들고 싶어서 공부해야겠다고 생각하던 중에 42 Seoul 목요특강이 열려서 듣게 되었다. 2시간 안에 리액트의 모든 것을 공부하기에는 위에 정리되어있듯이 공부해야 할 것이 많아서 시간이 부족하긴 했지만 전반적인 내용을 훑기에는 너무너무 좋은 시간이었다고 생각한다... 과제 좀 해서 블랙홀 늘린다음에 얼른 TIL 페이지 만들어봐야지.. 날것의 md 파일로 보는게 너무 못생겨서 TIL 쓰는 맛이 안난다 흐긓ㄱ흐ㅡ흑흑...