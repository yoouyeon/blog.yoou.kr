---
title: "[백준] 9375번 패션왕 신해빈 (C++)"
date: 2022-02-04 22:45:02
category: Algorithm/BOJ
description: "[ 🤍 SILVER 3 ]"
---

[패션왕 신해빈](https://www.acmicpc.net/problem/9375)

## 🌟 문제

해빈이는 패션에 매우 민감해서 한번 입었던 옷들의 조합을 절대 다시 입지 않는다. 예를 들어 오늘 해빈이가 안경, 코트, 상의, 신발을 입었다면, 다음날은 바지를 추가로 입거나 안경대신 렌즈를 착용하거나 해야한다. 해빈이가 가진 의상들이 주어졌을때 과연 해빈이는 알몸이 아닌 상태로 며칠동안 밖에 돌아다닐 수 있을까?

## 🌟 입력

첫째 줄에 테스트 케이스가 주어진다. 테스트 케이스는 최대 100이다.

- 각 테스트 케이스의 첫째 줄에는 해빈이가 가진 의상의 수 n(0 ≤ n ≤ 30)이 주어진다.
- 다음 n개에는 해빈이가 가진 의상의 이름과 의상의 종류가 공백으로 구분되어 주어진다. 같은 종류의 의상은 하나만 입을 수 있다.

모든 문자열은 1이상 20이하의 알파벳 소문자로 이루어져있으며 같은 이름을 가진 의상은 존재하지 않는다.

## 🌟 출력

각 테스트 케이스에 대해 해빈이가 알몸이 아닌 상태로 의상을 입을 수 있는 경우를 출력하시오.

## 🌟 풀이

조금 이상하긴 한데; 뭐든 하나라도 걸치고 있으면 알몸이 아니라고 판단하고 밖에 돌아다닐 수 있다.

그렇다는 것은 종류를 기준으로 했을 때, 어떤 종류를 가지고 만들 수 있는 경우는 그 종류 옷을 안입거나, 그 종류 옷 중 하나를 (종류당 하나만 입을 수 있다고 했음) 입거나 하는 크게 2가지 경우를 만들 수 있다.

따라서 종류별로 가질 수 있는 경우의 수는 해당 종류 옷의 가짓 수 + 1이 된다.

이렇게 종류별로 가질 수 있는 경우의 수를 구해줬으면 이 경우로 만들 수 있는 조합의 개수는 각 종류별 경우의 수를 모두 곱해준 것이 되는데, 알몸으로는 외출을 할 수 없으므로 종류별로 모두 입지 않음을 선택했을 경우인 1가지 경우를 제외한 것이 바로 문제에서 요구하는 답이 된다.

여기까지가 `fashionista` 함수의 내용이었고 옷 정보 입력하는 부분은 좀 길어질 것 같아서 따로 `input`함수를 두었다.

옷 정보 저장하는 자료구조는 string(옷 종류)을 key로, vector(그 종류에 해당하는 옷의 목록)를 value로 하는 map을 이용했다.

해당 종류 (key) 가 없어서 그 key로 만들어진 vector가 없을 경우에는 vector를 만들어서 map에 삽입해 줬고, key가 존재할 경우에는 그냥 그대로 vector에 넣어 주었다.

근데 지금 생각해보니까 어차피 그 종류별 개수만 세어서 사용하기 때문에 굳이 value를 vector로 하지 말고 int로 해서 종류별 개수만 증가시켜주는 방법으로 하는게 좀 더 효율적이었을 것 같다.

## 🌟 코드

```cpp
/*
2022-2-4
9375_패션왕 신해빈
https://www.acmicpc.net/problem/9375
*/

#include <iostream>
#include <string>
#include <map>
#include <vector>

using namespace std;

int tc, n, ans;
string category, clothes;
vector<string> temp{""};
map<string, vector<string> > closet;
map<string, vector<string> >::iterator iter;

void input(int n);  // 옷 정보 입력
void fashionista(); // 옷 입어보기

int main(){
    ios::sync_with_stdio(false);
    cin.tie(0);
    cout.tie(0);
    
    cin >> tc;
    while (tc--){
        cin >> n;
        input(n);
        fashionista();
    }
    return (0);
}

void input(int n){
    if (!closet.empty())
        closet.clear();
    while(n--){
        cin >> clothes >> category;
        if (closet.find(category) == closet.end()){
            temp[0] = clothes;
            closet.insert(make_pair(category, temp));
        }
        else
            closet[category].push_back(clothes);
    }
}

void fashionista(){
    iter = closet.begin();
    ans = 1;
    while (iter != closet.end()){
        ans *= (*iter).second.size() + 1;
        iter++;
    }
    cout << --ans << '\n';
}
```
