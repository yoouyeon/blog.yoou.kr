---
title: "자바스크립트 2차원 배열"
date: 2022-07-02 22:04:29
category: Javascript
description: "자바스크립트에는 2차원배열 개념이 없다.."
---

## 🌟 문제

프로그래머스 [행렬의 덧셈](https://programmers.co.kr/learn/courses/30/lessons/12950)

## 🌟 해결

자바스크립트에는 2차원 배열이라는 개념이 없다고 한다(!!)

그래서 2차원 배열 모양이 필요한 경우에는 **배열의 원소가 배열** 이라는 느낌으로 선언해서 사용하는 것 같다.

```javascript
// 방법 1 : 선언과 동시에 초기화해주기
let arr = [[1, 2], [3, 4]];
// 방법 2 : 배열의 원소로 배열 넣어주기
let arr = [];
arr.push([1, 2]);
arr[1] = [3, 4];
arr[2] = [];	// 빈 배열
arr[3] = new Array(2);	// 빈 배열
// 방법 3 : ES6 문법
const arr = new Array(5).fill(0).map(() => new Array(4));
```

이렇게 2차원 배열을 만들어서 행렬의 덧셈 문제를 풀었다.

```javascript
function solution(arr1, arr2) {
    var answer = [[]];
    for(let i = 0; i < arr1.length; i++)
    {
        answer[i] = [];
        for(let j = 0; j < arr1[0].length; j++)
            answer[i].push(arr1[i][j] + arr2[i][j]);
    }
    return answer;
}
```

## 🌟 참고

- https://joonfluence.tistory.com/508
- https://gent.tistory.com/296