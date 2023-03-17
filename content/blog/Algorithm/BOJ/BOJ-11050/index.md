---
title: "[백준] 11050번 이항 계수 (C++)"
date: 2021-11-10 23:36:18
category: Algorithm/BOJ
description: "[ 🤎 BRONZE 1 ]"
---

[이항 계수](https://www.acmicpc.net/problem/11050)

## 🌟 문제
자연수 N과 정수 K가 주어졌을 때 이항 계수 (N, K)를 구하는 프로그램을 작성하시오.

## 🌟 입력
첫째 줄에 N과 K가 주어진다. (1 ≤ N ≤ 10, 0 ≤ K ≤ N)

## 🌟 출력
(N, K)를 출력한다.

## 🌟 풀이
이항 계수란 이항식을 이항 정리로 정리했을 때 각 항의 계수이지만, 쉽고 익숙한 표현으로는 nCk 이다. 자세한 설명은 [위키백과](https://ko.wikipedia.org/wiki/%EC%9D%B4%ED%95%AD_%EA%B3%84%EC%88%98)로 대신한다.

이항 계수를 구하는 방법은 정의를 이용한다거나 하는 다양한 방법이 있지만 나는 이항 계수를 구하는 문제가 있을 경우에는 파스칼의 삼각형을 이용한 DP로 푸는 편이다. (파스칼의 삼각형 [위키백과](https://ko.wikipedia.org/wiki/%ED%8C%8C%EC%8A%A4%EC%B9%BC%EC%9D%98_%EC%82%BC%EA%B0%81%ED%98%95)(위키백과 짱!))

위의 개념들을 토대로 나는 점화식 $nCk = n-1Ck + n-1Ck-1$ 을 재귀로 구현해 주었다. 그리고 무작정 재귀를 돌리게 되면 불필요한 반복이 너무 많아지게 되므로 2차원 배열을 할당해 준 뒤에 저장(메모)된 값이 있는 경우에는 계산과정을 거치지 않고 그 값을 바로 반환해 주고, 저장된 값이 없는 경우에만 점화식에 따라서 계산을 해 주었다.

## 🌟 코드
```cpp

#include <iostream>

using namespace std;

int memo[11][11];
int N, K;

int bi_coef(int n, int k){
    if (k == 0 || n == k)
        memo[n][k] = 1;
    else if (memo[n][k] == 0)
        memo[n][k] = bi_coef(n - 1, k) + bi_coef(n - 1, k - 1);
    return (memo[n][k]);

}

int main(){
    cin >> N >> K;
    cout << bi_coef(N, K);
}
```