---
title: "[프로그래머스] 로또의 최고 순위와 최저 순위 (C++)"
date: 2022-05-01 01:04:26
category: Algorithm/Programmers
description: "[ ⭐️ LV.1 ]"
---

[로또의 최고 순위와 최저 순위](https://programmers.co.kr/learn/courses/30/lessons/77484%}

## 🌟 문제

`로또 6/45`(이하 '로또'로 표기)는 1부터 45까지의 숫자 중 6개를 찍어서 맞히는 대표적인 복권입니다. 아래는 로또의 순위를 정하는 방식입니다.

| 순위 | 당첨 내용 |
| --- | --- |
| 1 | 6개 번호가 모두 일치 |
| 2 | 5개 번호가 일치 |
| 3 | 4개 번호가 일치 |
| 4 | 3개 번호가 일치 |
| 5 | 2개 번호가 일치 |
| 6(낙첨) | 그 외 |

로또를 구매한 민우는 당첨 번호 발표일을 학수고대하고 있었습니다. 하지만, 민우의 동생이 로또에 낙서를 하여, 일부 번호를 알아볼 수 없게 되었습니다. 당첨 번호 발표 후, 민우는 자신이 구매했던 로또로 당첨이 가능했던 최고 순위와 최저 순위를 알아보고 싶어 졌습니다.

민우가 구매한 로또 번호를 담은 배열 lottos, 당첨 번호를 담은 배열 win_nums가 매개변수로 주어집니다. 이때, 당첨 가능한 최고 순위와 최저 순위를 차례대로 배열에 담아서 return 하도록 solution 함수를 완성해주세요.

## 🌟 풀이

일부 번호를 알아볼 수 없게 된 로또 번호 목록을 입력받고, (알아볼 수 없는 일부 번호는 0으로 표시되어 있다.) 당첨 번호를 받았을 때 받을 수 있는 최고 순위 (그러니까 최대로 많은 숫자를 일치시킬 수 있는 경우) 와 최저 순위를 구하는 문제이다.

**(1)** 일단 0의 개수를 구해야 한다. 이 녀석은 조커와 비슷한 느낌으로 어떤 숫자도 될 수 있다. (`zero` 변수)

**(2)** 그리고 `lottos`를 돌면서 현재 `win_nums`에 해당 숫자가 있는지 확인하고 (feat. find 함수) 숫자가 있으면 `yes` 변수를 증가시키고, 없으면 `no` 변수를 증가시킨다.

**(3)** 가장 높은 순위를 받을 수 있는 경우는 `zero`에 해당하는 숫자들이 모두 `win_nums`에 있는 경우기 때문에 `yes+zero`개의 숫자가 일치하는 순위가 될 것이고

가장 낮은 순위를 받을 수 있는 경우는 반대로 `zero`에 해당하는 숫자들이 모두 `win_nums`에 없는 경우일 것이기 때문에 `yes`개의 숫자가 모두 일치하는 순위일 것이다.

**(4)** 그 숫자대로 순위를 나누어서 `answer` 벡터에 넣어주면 문제 해결 완료!

## 🌟 코드

```cpp
#include <string>
#include <vector>
#include <algorithm>

using namespace std;

vector<int> solution(vector<int> lottos, vector<int> win_nums) {
    vector<int> answer;
    int zero = 0, yes = 0, no = 0;
    
    // 1. zero, yes, no 변수의 값 정하기
    for(int i = 0; i < 6; i++)
    {
        if (lottos[i] == 0)
            zero++;
        else if (find(win_nums.begin(), win_nums.end(), lottos[i]) == win_nums.end())
            no++;
        else
            yes++;
    }
    
    // 2. 최대 순위 결정
    if (yes + zero >= 2)
        answer.push_back(7 - (yes + zero));
    else
        answer.push_back(6);
    
    // 3. 최소 순위 결정
    if (yes >= 2)
        answer.push_back(7 - yes);
    else
        answer.push_back(6);
    
    return answer;
}
```