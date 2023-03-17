---
title: "[백준] 2920번 음계 (C++)"
date: 2021-10-29 23:40:18
category: Algorithm/BOJ
description: "[ 🤎 BRONZE 2 ]"
---

[음계](https://www.acmicpc.net/problem/2920)

## 🌟 문제
다장조는 c d e f g a b C, 총 8개 음으로 이루어져있다. 이 문제에서 8개 음은 다음과 같이 숫자로 바꾸어 표현한다. c는 1로, d는 2로, ..., C를 8로 바꾼다.

1부터 8까지 차례대로 연주한다면 ascending, 8부터 1까지 차례대로 연주한다면 descending, 둘 다 아니라면 mixed 이다.

연주한 순서가 주어졌을 때, 이것이 ascending인지, descending인지, 아니면 mixed인지 판별하는 프로그램을 작성하시오.

## 🌟 입력
첫째 줄에 8개 숫자가 주어진다. 이 숫자는 문제 설명에서 설명한 음이며, 1부터 8까지 숫자가 한 번씩 등장한다.

## 🌟 출력
첫째 줄에 ascending, descending, mixed 중 하나를 출력한다.

## 🌟 풀이
문제에서는 음계라고 표현하긴 했지만 결론적으로 문제에서 요구하는 바는 1부터 8까지의 숫자를 입력받고, 그 순서가 1. 오름차순인지(`ascending`), 2. 내림차순인지(`descending`), 3. 임의의 순서인지(`mixed`)를 구분하라는 것이다.

무조건 8개의 숫자가 입력되고, 그 구성도 1부터 8까지의 숫자임을 이용해서, 가장 첫번째로 입력된 값이 1이면 나머지 입력들이 오름차순인지 확인하고, 8이면 나머지 입력들이 내림차순인지 확인했다.

만약에 가장 첫번째로 입력된 값이 1과 8 모두 아니라면 해당 배열은 오름차순도, 내림차순도 될 수 없으므로 임의의 순서 라고 출력해주었다.

## 🌟 코드
```cpp
/*
2021-10-29
2920_음계
https://www.acmicpc.net/problem/2920
*/

# include <iostream>
using namespace std;

int main(){
    int input[8];
    int status;  // 0: ascending, 1: descending
    for(int i = 0; i < 8; i++)
        cin >> input[i];
    if (input[0] != 1 && input[0] != 8){
        cout << "mixed";
        return (0);
    }
    for (int i = 0; i < 7; i++){
        if (i == 0 && input[i] == 1)
            status = 0;
        else if (i == 0 && input[i] == 8)
            status = 1;
        // 증가하는 상황인데 조건에 맞지 않는 경우
        if (status == 0 && (input[i] > input[i + 1])){
            cout << "mixed";
            return (0);
        }
        // 감소하는 상황인데 조건에 맞지 않는 경우
        else if (status == 1 && (input[i] < input[i + 1])){
            cout << "mixed";
            return (0);
        }
    }
    if (status == 0)
        cout << "ascending";
    else
        cout << "descending";

    return (0);
}
```