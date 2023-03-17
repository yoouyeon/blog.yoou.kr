---
title: "[백준] 11047번 동전 0 (C++)"
date: 2022-02-05 16:37:41
category: Algorithm/BOJ
description: "[ 🤍 SILVER 3 ]"
---

[동전 0](https://www.acmicpc.net/problem/11047)

## 🌟 문제

준규가 가지고 있는 동전은 총 N종류이고, 각각의 동전을 매우 많이 가지고 있다.

동전을 적절히 사용해서 그 가치의 합을 K로 만들려고 한다. 이때 필요한 동전 개수의 최솟값을 구하는 프로그램을 작성하시오.

## 🌟 입력

첫째 줄에 N과 K가 주어진다. (1 ≤ N ≤ 10, 1 ≤ K ≤ 100,000,000)

둘째 줄부터 N개의 줄에 동전의 가치 A<sub>i</sub>가 오름차순으로 주어진다. (1 ≤ A<sub>i</sub> ≤ 1,000,000, A<sub>1</sub> = 1, i ≥ 2인 경우에 A<sub>i</sub>는 A<sub>i-1</sub>의 배수)

## 🌟 출력

첫째 줄에 K원을 만드는데 필요한 동전 개수의 최솟값을 출력한다.

## 🌟 풀이

대충 어떻게 풀어야 할 지 감은 오는데 방법에 확신이 없어서 예시를 넣고. 시뮬레이션을 돌려봤다.

### ✨ 시뮬레이션

동전이 1, 5, 10, 15, 20, 25, 30 이렇게 있고 목표 금액이 100이라고 하자.

1. 100 >= 30 이므로 목표 금액에서 30을 빼본다

   -> 남은 금액 70 (사용한 동전 개수 1)

2. 70 >= 30 이므로 목표 금액에서 30을 빼본다.

   -> 남은 금액 40 (사용한 동전 개수 2)

3. 40 >= 30 이므로 목표 금액에서 30을 빼본다.

   -> 남은 금액 10 (사용한 동전 개수 3)

4. 10 < 30, 10 < 25, 10 < 20, 10 < 15 이므로 넘어간다.

   -> 남은 금액 10 (사용한 동전 개수 3)

5. 10 >= 10 이므로 10을 빼본다.

   -> 남은 금액 0 (사용한 동전 개수 4)

6. 남은 금액이 0이므로 중단하고 사용한 동전 개수를 출력한다.

### ✨ 노트

위 시뮬레이션에 대한 내용을 굳이 재귀로 구현한 이유는 원래 이 문제가 완전탐색(...) 문제인줄 알았기 때문이다.

모든 가능한 조합을 구해서 최솟값을 이용하는 문제인줄 알았는데 일단 그렇게 풀면 함수호출이 너무 많아져서 런타임 에러가 걸리기도 하지만 애초에 그렇게 푸는 문제도 아니었다.

그와중에 효율성을 좀 높이겠다고 (완전탐색에 효율성..?) 내림차순 정렬을 해서 뺄 수 있는대로 다 빼줬는데 완전탐색의 시작부분으로 생각했던 그 부분이 의도치 않게 그리디 알고리즘으로 푼 꼴이 되었다.ㅋㅋ

이 문제에서는 재귀로 푸는 것에 대한 메리트가 별로 없어보여서 그낭 반복문 돌려서 구현하는게 쉽고 이해하기 쉽고 좋을 것 같다...ㅎ

## 🌟 코드

```cpp
/*
2022-2-5
11047_동전 0
https://www.acmicpc.net/problem/11047
*/

#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int N, K, A;
vector<int> coins;

void coin_coin(int curr_idx, int curr_value, int curr_cnt);

int main(){
    ios::sync_with_stdio(false);
    cin.tie(0);
    cout.tie(0);
    
    cin >> N >> K;
    
    for(int i = 0; i < N; i++){
        cin >> A;
        coins.push_back(A);
    }
    
    sort(coins.begin(), coins.end(), greater<int>());
    
    coin_coin(0, K, 0);
    
    return (0);
}

void coin_coin(int curr_idx, int curr_value, int curr_cnt){
    if (curr_value == 0){
        cout << curr_cnt;
        return;
    }
    if (coins[curr_idx] > curr_value){
        coin_coin(curr_idx + 1, curr_value, curr_cnt);
        return;
    }
    else{
        coin_coin(curr_idx, curr_value - coins[curr_idx], curr_cnt + 1);
        return;
    }
}
```

