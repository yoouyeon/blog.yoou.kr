---
title: "[백준] 1927번 최소 힙 (C++)"
date: 2021-07-21 14:04:23
category: Algorithm/BOJ
description: "[ 🤍 SILVER 2 ]"
---

[최소 힙](https://www.acmicpc.net/problem/1927)

## 🌟 문제

널리 잘 알려진 자료구조 중 최소 힙이 있다. 최소 힙을 이용하여 다음과 같은 연산을 지원하는 프로그램을 작성하시오.

1. 배열에 자연수 x를 넣는다.
2. 배열에서 가장 작은 값을 출력하고, 그 값을 배열에서 제거한다.

프로그램은 처음에 비어있는 배열에서 시작하게 된다.

## 🌟 입력

첫째 줄에 연산의 개수 N(1 ≤ N ≤ 100,000)이 주어진다. 다음 N개의 줄에는 연산에 대한 정보를 나타내는 정수 x가 주어진다. 만약 x가 자연수라면 배열에 x라는 값을 넣는(추가하는) 연산이고, x가 0이라면 배열에서 가장 작은 값을 출력하고 그 값을 배열에서 제거하는 경우이다. 입력되는 자연수는 231보다 작다.

## 🌟 출력

입력에서 0이 주어진 회수만큼 답을 출력한다. 만약 배열이 비어 있는 경우인데 가장 작은 값을 출력하라고 한 경우에는 0을 출력하면 된다.

## 🌟 풀이

매번 입력이 들어올 때 마다 정렬해서 앞의 것을 제거해주기에는 배열에 들어올 수 있는 입력의 개수가 10만개로 많아서 시간초과가 날 것이다. 

그래서 heap 이나 이진트리 구조를 사용하는 자료구조를 사용하는 것이 좋은데... C++에는 다행히 priority_queue로 이 구조를 사용할 수 있게 해 두었다. 

따라서 일단은 priority_queue를 이용해서 간단하게 문제를 풀 수 있었다.

공부를 하는 입장이니... 시간이 된다면 min heap 구현해서 해결한 코드도 나중에 추가하겠다.

아, 입출력에 cin, cout을 사용한다면 priority_queue를 사용했더라도 시간초과가 날 것이다.

```cpp
ios::sync_with_stdio(0);
cin.tie(0);
cout.tie(0);
```

cin, cout을 사용했다면 위의 코드를 추가해서 속도를 높여주거나, 아니면 printf, scanf를 사용해야 시간 초과되지 않을 것이다

## 🌟 코드

### ✨ priority_queue 사용한 코드

```cpp
#include <iostream>
#include <queue>
using namespace std;

int main(){
    ios::sync_with_stdio(0);
    cin.tie(0);
    cout.tie(0);

    int n, x;
    priority_queue<int, vector<int>, greater<int>> pq;
    cin >> n;
    
    for (int i = 0; i < n; i++){
        cin >> x;
        if (x == 0){
            if (pq.empty())
                cout << 0 << '\n';
            else{
                cout << pq.top() << '\n';
                pq.pop();
            }
        }
        else
            pq.push(x);
    }
    return (0);
}
```

### ✨ Min Heap 구현한 코드

~~나중에 추가 예정~~

