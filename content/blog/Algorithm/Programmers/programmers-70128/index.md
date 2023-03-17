---
title: "[프로그래머스] 내적 (C++)"
date: 2021-04-02 01:58:05
category: Algorithm/Programmers
description: "[ ⭐️ LV.1 ]"
---

[내적](https://programmers.co.kr/learn/courses/30/lessons/70128)

## 🌟 문제
길이가 같은 두 1차원 정수 배열 a, b가 매개변수로 주어집니다. a와 b의 내적을 return 하도록 solution 함수를 완성해주세요.

이때, a와 b의 내적은 `a[0]*b[0] + a[1]*b[1] + ... + a[n-1]*b[n-1]` 입니다. (n은 a, b의 길이)
## 🌟 풀이
문제에 주어진 내적 설명 [링크](https://en.wikipedia.org/wiki/Dot_product)에 의하면 내적이란 **같은 인덱스에 해당하는 원소들의 곱의 합**을 의미한다.
주어지는 벡터는 길이가 같다고 했으므로 길이가 다를 걱정없이 같은 인덱스의 곱들을 구해서 차근차근 더해주면 문제가 해결된다.

## 🌟 코드
```cpp
#include <string>
#include <vector>

using namespace std;

int solution(vector<int> a, vector<int> b) {
    int answer = 1234567890;
    answer = 0;

    for(int i = 0; i < a.size(); i++)
        answer += (a[i] * b[i]);
    return answer;
}
```
