---
title: "[백준] 1764번 듣보잡 (C++)"
date: 2022-02-01 03:05:33
category: Algorithm/BOJ
description: "[ 🤍 SILVER 4 ]"
---

[듣보잡](https://www.acmicpc.net/problem/1764)

## 🌟 문제

김진영이 듣도 못한 사람의 명단과, 보도 못한 사람의 명단이 주어질 때, 듣도 보도 못한 사람의 명단을 구하는 프로그램을 작성하시오.

## 🌟 입력

첫째 줄에 듣도 못한 사람의 수 N, 보도 못한 사람의 수 M이 주어진다. 이어서 둘째 줄부터 N개의 줄에 걸쳐 듣도 못한 사람의 이름과, N+2째 줄부터 보도 못한 사람의 이름이 순서대로 주어진다. 이름은 띄어쓰기 없이 알파벳 소문자로만 이루어지며, 그 길이는 20 이하이다. N, M은 500,000 이하의 자연수이다.

듣도 못한 사람의 명단에는 중복되는 이름이 없으며, 보도 못한 사람의 명단도 마찬가지이다.

## 🌟 출력

듣보잡의 수와 그 명단을 사전순으로 출력한다.

## 🌟 풀이

듣보잡은 듣도 보도 못한 사람이므로 듣도 못한 사람의 목록과 보도 못한 사람의 목록에 모두 포함되어 있는 사람을 구해야 한다.

어떤 한 목록을 순차적으로 돌면서 다른 한 목록에 포함되어 있는지 여부를 확인하고, 만약에 있으면 듣도 보도 못한 사람이므로 출력을 해 주는 방식으로 하면 될 듯 하다.

문제는 각 목록에 포함되어 있는 사람의 수가 500,000명으로 꽤 크기 때문에 일반적인 O(n)으로는 시간초과가 날 것이라고 생각했다.

그래서 중복되는 이름이 없다고 했으므로 검색 시간복잡도가 O(log n)인 set을 사용해서 사람들의 이름을 저장해주었다.

이렇게 하면 문제는 무난하게 풀 수 있었는데 미처 고려하지 못했던 조건이 하나 있었다. (문제를 꼼꼼하게 읽자)

조건 중에 사전 순으로 출력하는 조건이 있었는데 set을 삽입과 동시에 정렬되는 특징이 있으므로 다행히 set을 사용했을 때에는 굳이 이 조건을 고려해 줄 필요는 없었다. (하지만 역시 문제는 꼼꼼하게 읽자...ㅎ)

- - -

글을 쓰면서 다시 코드를 보니 변수명을 너무 대충 지은 것 같아서 주석을 추가했다. 비록 빠른 시간 안에, 나만 보기 위해서 짠 코드긴 하지만 그래도 변수명을 신경써서 짓는 버릇을 들이도록 하자.

## 🌟 코드

```c
/*
2022-1-30
1764_듣보잡
https://www.acmicpc.net/problem/1764
*/

#include <iostream>
#include <set>
#include <vector>
#include <string>
using namespace std;

int main(){
    ios::sync_with_stdio(false);
    cin.tie(0);
    cout.tie(0);

    set<string> hear;	// 듣도 못한 명단
    set<string> see;	// 보도 못한 명단
    set<string>:: iterator iter;
    vector<string> not_hear_not_see; // 듣보잡 명단
    int N, M;
    string input;

    cin >> N >> M;
    for(int i = 0; i < N; i++){
        cin >> input;
        hear.insert(input);
    }
    for(int i = 0; i < M; i++){
        cin >> input;
        see.insert(input);
    }

    // hear를 순차적으로 돌면서 see에 동일한 이름이 있는지 확인.
    for(iter = hear.begin(); iter != hear.end(); iter++){
        if (see.find(*iter) != see.end())
            not_hear_not_see.push_back(*iter);
    }

    // 답 출력
    cout << not_hear_not_see.size() << '\n';
    for(int i = 0; i < not_hear_not_see.size(); i++)
        cout << not_hear_not_see[i] << '\n';

    return (0);
}
```

