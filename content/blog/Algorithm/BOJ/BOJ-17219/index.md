---
title: "[백준] 17219번 비밀번호 찾기 (C++)"
date: 2022-02-01 03:18:18
category: Algorithm/BOJ
description: "[ 🤍 SILVER 4 ]"
---

[비밀번호 찾기](https://www.acmicpc.net/problem/17219)

## 🌟 문제

2019 HEPC - MAVEN League의 [비밀번호 만들기](https://www.acmicpc.net/problem/17218)와 같은 방식으로 비밀번호를 만든 경민이는 한 가지 문제점을 발견하였다. 비밀번호가 랜덤으로 만들어져서 기억을 못 한다는 것이었다! 그래서 경민이는 메모장에 사이트의 주소와 비밀번호를 저장해두기로 했다. 하지만 컴맹인 경민이는 메모장에서 찾기 기능을 활용하지 못하고 직접 눈으로 사이트의 주소와 비밀번호를 찾았다. 메모장에 저장된 사이트의 수가 늘어나면서 경민이는 비밀번호를 찾는 일에 시간을 너무 많이 쓰게 되었다. 이를 딱하게 여긴 문석이는 경민이를 위해 메모장에서 비밀번호를 찾는 프로그램을 만들기로 결심하였다! 문석이를 도와 경민이의 메모장에서 비밀번호를 찾아주는 프로그램을 만들어보자.

## 🌟 입력

첫째 줄에 저장된 사이트 주소의 수 N(1 ≤ N ≤ 100,000)과 비밀번호를 찾으려는 사이트 주소의 수 M(1 ≤ M ≤ 100,000)이 주어진다.

두번째 줄부터 N개의 줄에 걸쳐 각 줄에 사이트 주소와 비밀번호가 공백으로 구분되어 주어진다. 사이트 주소는 알파벳 소문자, 알파벳 대문자, 대시('-'), 마침표('.')로 이루어져 있고, 중복되지 않는다. 비밀번호는 알파벳 대문자로만 이루어져 있다. 모두 길이는 최대 20자이다.

N+2번째 줄부터 M개의 줄에 걸쳐 비밀번호를 찾으려는 사이트 주소가 한줄에 하나씩 입력된다. 이때, 반드시 이미 저장된 사이트 주소가 입력된다.

## 🌟 출력

첫 번째 줄부터 M개의 줄에 걸쳐 비밀번호를 찾으려는 사이트 주소의 비밀번호를 차례대로 각 줄에 하나씩 출력한다.

## 🌟 풀이

사이트 주소는 중복되지 않으므로 사이트 주소를 key, 비밀번호를 value로 하는 map을 이용해서 데이터를 저장해주었다.

검색의 횟수가 적지 않지만 map의 find 함수는 시간복잡도 O(log n)이 보장되므로 시간초과 문제도 없을 것이라고 생각했다.

다만, 문제 하단의 노트에도 있듯이 cin, cout을 사용한다면 이렇게 입출력의 횟수가 많을 경우에는 시간초과가 될 수 있으므로 main함수 상단에

```c
ios::sync_with_stdio(false);
cin.tie(0);
cout.tie(0);
```

코드를 추가하여 입출력 속도를 향상시켜주자.

(위 코드 세 줄에 대한 설명은 다른 문제를 풀면서 했으므로 생략... -> 그 문제 [링크](https://yoouyeon.github.io/2021/11/05/BOJ-1920/))

## 🌟 코드

```c
/*
2022-1-30
17219_비밀번호 찾기
https://www.acmicpc.net/problem/17219
*/

#include <iostream>
#include <map>
#include <string>
using namespace std;

int main(){
    ios::sync_with_stdio(false);
    cin.tie(0);
    cout.tie(0);

    int N, M;
    map<string, string> memo;
    string address, pw;

    cin >> N >> M;
    for(int i = 0; i < N; i++){
        cin >> address >> pw;
        memo.insert(make_pair(address, pw));
    }

    for(int i = 0; i < M; i++){
        cin >> address;
        cout << memo.find(address)->second << '\n'; 
    }

    return (0);
}
```

