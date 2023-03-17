---
title: "[백준] 2525번 오븐 시계 (JavaScript)"
date:  2023-03-05 02:27:30
category: Algorithm/BOJ
description: "[ 🤎 BRONZE 3 ]"
---

[오븐 시계](https://www.acmicpc.net/problem/2525)

## 🌟 문제

KOI 전자에서는 건강에 좋고 맛있는 훈제오리구이 요리를 간편하게 만드는 인공지능 오븐을 개발하려고 한다. 인공지능 오븐을 사용하는 방법은 적당한 양의 오리 훈제 재료를 인공지능 오븐에 넣으면 된다. 그러면 인공지능 오븐은 오븐구이가 끝나는 시간을 분 단위로 자동적으로 계산한다. 

또한, KOI 전자의 인공지능 오븐 앞면에는 사용자에게 훈제오리구이 요리가 끝나는 시각을 알려 주는 디지털 시계가 있다. 

훈제오리구이를 시작하는 시각과 오븐구이를 하는 데 필요한 시간이 분단위로 주어졌을 때, 오븐구이가 끝나는 시각을 계산하는 프로그램을 작성하시오.

## 🌟 입력

첫째 줄에는 현재 시각이 나온다. 현재 시각은 시 A (0 ≤ A ≤ 23) 와 분 B (0 ≤ B ≤ 59)가 정수로 빈칸을 사이에 두고 순서대로 주어진다. 두 번째 줄에는 요리하는 데 필요한 시간 C (0 ≤ C ≤ 1,000)가 분 단위로 주어진다. 

## 🌟 출력

첫째 줄에 종료되는 시각의 시와 분을 공백을 사이에 두고 출력한다. (단, 시는 0부터 23까지의 정수, 분은 0부터 59까지의 정수이다. 디지털 시계는 23시 59분에서 1분이 지나면 0시 0분이 된다.)

## 🌟 풀이

원래는 조건문을 이용하여 시간 계산을 구현하는 문제이지만... 나는 조건문을 써보는 것 보다는 Date 객체를 써 보는게 좋을 것 같아서 Date 객체를 활용해보았다.

```javascript
let date = new Date(2023, 2, 5, h, m);
```

이렇게 입력받은 시간을 나타내는 date 객체를 하나 만들고 (날짜는 상관 없음)

```javascript
date.setMinutes(date.getMinutes() + c);
```

`getMinutes` 메소드로 분을 받아와서 (근데 지금 생각해보니 그냥 `m`을 그대로 활용했었어도 되었을 것 같다.) `c`와 더한 후에 `setMinutes` 메소드로 새로운 분을 설정해준다.

[매뉴얼](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Date/setMinutes)에 따르면 `setMinutes`의 매개변수가 0~59 범위를 벗어나는 수일 경우에는 Date 객체를 직접 업데이트하기 때문에 범위에 대한 고민을 따로 더 할 필요는 없었다.



✏️ 참고

- https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Date
- https://ko.javascript.info/date

## 🌟 코드

```javascript
// Title : 오븐 시계

const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().split("\n");

const [h, m] = input[0].split(" ").map((v) => parseInt(v));
const c = parseInt(input[1]);

let date = new Date(2023, 2, 5, h, m);
date.setMinutes(date.getMinutes() + c);
console.log(date.getHours(), date.getMinutes());
```

