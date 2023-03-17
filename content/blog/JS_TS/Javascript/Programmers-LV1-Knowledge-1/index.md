---
title: "프로그래머스 LV.1을 풀면서 알게 된 지식들 (1)"
date: 2022-09-30 16:29:09
category: Javascript
description: "자바스크립트 초보자가 PS 문제풀이 중에 알게 된 것들 정리함"
---

## 🌟 정수임을 확인하는 방법

정수를 1로 나누었을때 나머지가 0인 점을 활용하자. (관련 문제 : [프로그래머스 정수 제곱근 판별](https://school.programmers.co.kr/learn/courses/30/lessons/12934?language=javascript))

```javascript
if (number % 1 !== 0)
	console.log("is not integer");
else
	console.log("is integer");
```

여담인데 예전에 C++로 이 문제를 풀었을 때는 이렇게 문제를 풀었더라? 형변환으로 소수점을 떼어낼 생각은 어떻게 했던거지 ㄷㄷ

```cpp
if(answer_d - (long long)answer_d == 0)
	cout << "is integer";
else
	cout << "is not integer";
```

## 🌟 Math 객체

매뉴얼 : https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Math

C/C++에서의 math.h/cmath 헤더와 비슷하게 사용하면 될 듯 하다.

유용해 보이는 메서드들 몇 개 가지고와봄

```javascript
// 절댓값
Math.abs(x)

// floor, ceil
Math.ceil(x)
Math.floor(x)

// max, min (0개 이상의 숫자 범위 사용 가능, 배열도 가능)
Math.max(값0, 값1, ... , 값N)
Math.min([value1[, value2[, ...]]])

// 제곱, 제곱근
Math.pow(base, exponent)
Math.sqrt(x)

// 난수 생성 (0 ~ 1 사이의 수)
Math.random()
```

## 🌟 String.prototype.split()

매뉴얼 : https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/String/split

String 객체를 지정한 구분자를 이용해서 여러 개의 문자열로 나눈다.

```javascript
// 원본 문자열 1개를 원소로 갖는 배열 반환
split();

// 구분자로 구분된 문자열들을 원소로 갖는 배열 반환.
split(separator);
split('');	// 각각의 문자가 배열의 원소로 변환됨.

// limit : 구분자로 잘린 문자열의 최대 개수
split(separator, limit);
```

## 🌟 Array.prototype.map()

매뉴얼 : https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/map

배열 내의 모든 요소 각각에 대해서 어떤 함수를 호출한 결과를 적용한 **새로운 배열**을 반환.

```javascript
arr.map(callback(currentValue[, index[, array]])[, thisArg])
// example
const array1 = [1, 4, 9, 16];
const map1 = array1.map(x => x * 2);
```

## 🌟 Array.prototype.reverse()

**배열**의 순서를 반전한다.

```javascript
a.reverse()
```

⚠️ 문자열을 반전하는 메서드는 따로 없어서, 보통은 이런 식으로 문자열을 반전하는 것 같다.

1. 각 문자를 분리해서 배열로 만든다.
2. 문자가 들어있는 배열의 순서를 반전한다.
3. join() 메서드로 배열의 요소를 결합해서 문자열로 만든다. (매뉴얼 : https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/join)

```javascript
s.split("").reverse().join("");
```
