---
title: "[프로그래머스] 문자열 내 마음대로 정렬하기 (C++)"
date: 2021-03-31 17:21:18
category: Algorithm/Programmers
description: "[ ⭐️ LV.1 ]"
---

[문자열 내 마음대로 정렬하기](https://programmers.co.kr/learn/courses/30/lessons/12915)

## 🌟 문제
문자열로 구성된 리스트 strings와, 정수 n이 주어졌을 때, 각 문자열의 인덱스 n번째 글자를 기준으로 오름차순 정렬하려 합니다. 예를 들어 strings가 ["sun", "bed", "car"]이고 n이 1이면 각 단어의 인덱스 1의 문자 "u", "e", "a"로 strings를 정렬합니다.
## 🌟 풀이
처음 문제를 봤을 때에는
- n번째 인덱스의 문자가 같을 경우
- 내림차순일 경우

이렇게 두가지의 경우로 나누어서 풀려고 그랬는데 코드가 뭔가 불필요하게 길어지고 이상하게 헷갈리고 그래서 다른 방법을 생각해보았다.

어떠한 특정한 **기준**이 주어지고, 그 기준을 갖고 **정렬**하는 문제이기 때문에 sort 함수를 사용하고 cmp 함수에다 그 기준을 구현해주면 간단하게 코드를 짤 수 있을 것 같았다.
```cpp
bool cmp(string a, string b){
    if(a[idx] == b[idx])
        return(a < b);
    return(a[idx] < b[idx]);
}
```
이렇게 n번째 인덱스가 같을 경우에는 사전 순서 기준으로 비교하고, 그 외의 경우에는 n번째 인덱스 순서 기준으로 비교하도록 cmp 함수를 구현해 준 다음에
```cpp
sort(answer.begin(), answer.end(), cmp);
```
sort 함수를 이용해서 정렬해주었다.
## 🌟 코드
```cpp
#include <string>
#include <vector>
#include <algorithm>

using namespace std;

int idx;

bool cmp(string a, string b){
    if(a[idx] == b[idx])
        return(a < b);
    return(a[idx] < b[idx]);
}

vector<string> solution(vector<string> strings, int n) {
    vector<string> answer;
    answer.assign(strings.begin(), strings.end());
    idx = n;
    sort(answer.begin(), answer.end(), cmp);
    return answer;
}
```
