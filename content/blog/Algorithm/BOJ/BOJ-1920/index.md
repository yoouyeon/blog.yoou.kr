---
title: "[백준] 1920번 수 찾기 (C++)"
date: 2021-11-05 22:23:30
category: Algorithm/BOJ
description: "[ 🤍 SILVER 4 ]"
---

[수 찾기](https://www.acmicpc.net/problem/1920)

## 🌟 문제
N개의 정수 A[1], A[2], …, A[N]이 주어져 있을 때, 이 안에 X라는 정수가 존재하는지 알아내는 프로그램을 작성하시오.

## 🌟 입력
첫째 줄에 자연수 N(1 ≤ N ≤ 100,000)이 주어진다. 다음 줄에는 N개의 정수 A[1], A[2], …, A[N]이 주어진다. 다음 줄에는 M(1 ≤ M ≤ 100,000)이 주어진다. 다음 줄에는 M개의 수들이 주어지는데, 이 수들이 A안에 존재하는지 알아내면 된다. 모든 정수의 범위는 -2^31 보다 크거나 같고 2^31보다 작다.

## 🌟 출력
M개의 줄에 답을 출력한다. 존재하면 1을, 존재하지 않으면 0을 출력한다.

## 🌟 풀이
`algorithm`헤더의 `find`함수는 시간복잡도가 O(n)이다. 처음에는 아무 생각 없이 간단한 문제인줄 알고 `find`함수를 써서 탐색했더니 단번에 시간초과가 났다. M번 반복하여 탐색을 해야 하는데 시간은 짧고 N과 M의 크기는 크기 때문에 시간초과가 날수도 있겠다는 생각을 하고 같은 `algorithm`헤더에 있는 `binary_search`함수를 사용해서 O(log2(n))으로 탐색 시간을 줄였다.

`binary_search`함수를 사용해야겠다고 생각한 사람이라면 알겠지만, 이진탐색 전에는 배열이 정렬되어있어야 하므로 `sort` 함수 사용해서 정렬해주었다.

이렇게 했는데도 시간초과가 나서 왜인지 봤더니
```cpp
ios::sync_with_stdio(0);
cin.tie(0);
cout.tie(0);
```
이 코드를 추가해주지 않아서 입출력 속도가 느렸기 때문이었다.

C++을 이용해서 알고리즘 문제를 풀기 때문에 그냥 습관적으로 속도 향상을 위해서 사용하곤 했었는데 이참에 정확한 원리와 사용 이유를 정리해보자면
```cpp
ios::sync_with_stdio(0);
```
이 라인은 C 표준 스트림과 C++ 표준 스트림의 동기화를 끊는 (false, 0) 부분이다. 먄약 동기화가 되어 있다면 `printf`, `scanf`와 같은 C의 표준 입출력을 혼용하더라도 순서가 잘 유지가 되는데,  사용하는 버퍼의 수가 늘어나서 입출력 시간이 느리다. 따라서 이 동기화를 끊어줌으로써 입출력 속도를 향상시키는 것이다.
```cpp
cin.tie(0);
```
`cin`을 `cout`으로부터 untie하는 라인이다. stream이 tie되어 있다면 다른 stream에서 입출력 요청이 오기 전에 stream을 flush한다. 따라서 untie하게되면 수동으로 flush하지 않는 이상 flush하지 않기 때문에 속도가 향상된다.

사실 C 표준 입출력보다는 C++ 표준 입출력이 더 사용하기 쉽기 때문에 이런 편법을 사용하면서도 C++ 표준 입출력을 사용하지만 안정성이 매우 낮아지기 때문에 가능하면 속도 제한이 있을 경우에는 C 표준 입출력을 사용하는것이 좋다고 한다.. 🥲

## 🌟 코드
```cpp
/*
2021-11-5
1920_수 찾기
https://www.acmicpc.net/problem/1920
*/

#include <iostream>
#include <vector>
#include <algorithm>

using namespace std;

int main(){
    ios::sync_with_stdio(0);
    cin.tie(0);
    
    int N, M, num, target;
    vector<int> arr;
    cin >> N;
    for (int i = 0; i < N; i++){
        cin >> num;
        arr.push_back(num);
    }
    sort(arr.begin(), arr.end());
    cin >> M;
    for (int i = 0; i < M; i++){
        cin >> target;
        if (binary_search(arr.begin(), arr.end(), target))
            cout << "1\n";
        else
            cout << "0\n";
    }

    return (0);
}
```

## 🌟 참고한 글
sync_with_stdio에 대하여 -> [https://eine.tistory.com/entry/CC-%EC%9E%85%EC%B6%9C%EB%A0%A5-%EB%B0%A9%EB%B2%95%EC%97%90-%EB%94%B0%EB%A5%B8-%EC%86%8D%EB%8F%84-%EC%A0%95%EB%A6%AC](https://eine.tistory.com/entry/CC-%EC%9E%85%EC%B6%9C%EB%A0%A5-%EB%B0%A9%EB%B2%95%EC%97%90-%EB%94%B0%EB%A5%B8-%EC%86%8D%EB%8F%84-%EC%A0%95%EB%A6%AC)

cin.tie에 대하여 -> [https://su-m.tistory.com/7](https://su-m.tistory.com/7)
