---
title: "[프로그래머스] JadenCase 문자열 만들기 (JavaScript)"
date: 2023-04-08 11:03:56
category: Algorithm/Programmers
description: "[ ⭐️ LV.2 ]"

---

[JadenCase 문자열 만들기](https://programmers.co.kr/learn/courses/30/lessons/12951)

## 🌟 문제

JadenCase란 모든 단어의 첫 문자가 대문자이고, 그 외의 알파벳은 소문자인 문자열입니다. 단, 첫 문자가 알파벳이 아닐 때에는 이어지는 알파벳은 소문자로 쓰면 됩니다. (첫 번째 입출력 예 참고)
문자열 s가 주어졌을 때, s를 JadenCase로 바꾼 문자열을 리턴하는 함수, solution을 완성해주세요.

## 🌟 풀이

문자열을 공백을 기준으로 단어로 자른 다음에, 단어의 첫번째 문자는 대문자로, 그 외에는 소문자로 바꾸어서 다시 공백으로 구분하여 연결해주면 되는 문제이다.

너무 간단한 문제라고 생각했는데 의외의 부분에서 살짝 헤매서 기록해두려고 한다... (자바스크립트 기초가 이렇게 중요하다🥲)

---

**문자열은 immutable하기 때문에 직접 수정할 수 없다.**

나같이 C나 C++을 오래 했던 사람이라면 문자열에서 특정 문자를 대소문자로 바꾸려 할 때 이런 식으로 하는 사람이 많을 것 같은데, 문자열은 Immutable하기 때문에 생성 이후에는 값을 바꿀 수 없다.

```js
s[0] = s[0].toUpperCase();	// Error!
```

이미 생성되어 인자로 주어진 s라는 문자열은 값을 바꿀 수 없으므로, 만약에 값을 바꾸고 싶다면 바꾸고자 하는 값 + 기존 값 을 연결하여 새로운 문자열을 만드는 방법... 밖에 없는 것 같다.

```js
const s = "aaa"
const newS = s[0].toUpperCase() + s.slice(1);
console.log(newS);	// Aaa
```

---

**구분자가 연속되어 있는 경우에 split 메소드는 빈 문자열을 반환한다.**

```js
const s = "   ";
const words = s.split(' ');
console.log(words);	// 	[ '', '', '', '' ]
```

`split`의 결과로는 유효한 구분(유의미한 구분...? 이라고 말하는게 더 어울릴수도 있겠다.)만 나오는줄 알았는데, 무조건 구분자의 개수 만큼 분할이 되었다.

문제 조건이 추가되면서 공백 문자가 연속해서 나올 수 있게 되었는데, 따라서 `split` 메소드로 공백으로 구분해 준 뒤에, 연속된 공백으로 `split` 결과가 `''` 이렇게 빈 문자일 경우에는 대문자로 변환하지 않고 그냥 반환해주는 예외처리를 해 줘야 했다.

```js
answer = s
  .toLowerCase()
  .split(" ")
  .map((word) => {
    if (word === "") return "";
    return word.at(0).toUpperCase() + word.slice(1);
  });
```

## 🌟 코드

```js
function solution(s) {
  let answer = "";
  answer = s
    .toLowerCase()
    .split(" ")
    .map((word) => {
      if (word === "") return "";
      return word.at(0).toUpperCase() + word.slice(1);
    });
  answer = answer.join(" ");
  return answer;
}
```

