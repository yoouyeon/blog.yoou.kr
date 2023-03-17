---
title: "[프로그래머스] 키패드 누르기 (C++)"
date: 2022-05-02 16:13:55
category: Algorithm/Programmers
description: "[ ⭐️ LV.1 ]"
---

[키패드 누르기](https://programmers.co.kr/learn/courses/30/lessons/67256)

## 🌟 문제

순서대로 누를 번호가 담긴 배열 numbers, 왼손잡이인지 오른손잡이인 지를 나타내는 문자열 hand가 매개변수로 주어질 때, 각 번호를 누른 엄지손가락이 왼손인 지 오른손인 지를 나타내는 연속된 문자열 형태로 return 하도록 solution 함수를 완성해주세요.

## 🌟 풀이

예전에 한창 프로그래머스 LV.1을 도장깨기하던 시절(블로그 기록을 보니 딱 작년 이맘때 쯤 인 것 같다.)에 풀기를 시도했다가 관뒀던 문제이다.

코드가 저장되어있던 걸 아무 생각없이 지워버려서 어떤 부분에서 막혔었는지 정확히 기억은 안나지만 지금 기억을 더듬어보면 숫자 키패드 자체를 4 * 3 배열로 만들어서 손가락 위치를 이리저리 옮기는 방식으로 문제를 풀었었던 것 같다.

아무튼 지금 다시 문제를 풀 때에는 배열을 직접 선언하기 보다는 그냥 pair 형태의 좌표들로 숫자들과 손가락의 위치를 관리해 주는 방법을 사용했다.

오른쪽 엄지 위치의 초깃값 (`pos_right`)을 (3, 2)로 하고, 왼쪽 엄지 위치의 초깃값(`pos_left`)을 (3, 0)으로 한 다음에 `numbers` 배열을 돌아가면서 조건에 맞게 엄지의 위치를 바꾸어주고 (그냥 `pos_right/left` 값만 바꾸어주면 된다.) `answer` 문자열에 움직인 엄지의 종류를 추가해주었다.

아 숫자들의 위치 역시 pair\<int, int\> 타입의 배열 `pos_list`를 선언해서 인덱스에 해당하는 숫자의 위치를 저장해주었고, 엄지가 움직일때마다 그 도착 숫자의 값으로 엄지의 위치를 바꾸어주는 방식으로 이동해 준 것이다.

`1`, `4`, `7` 혹은 `3`, `6`, `9`인 경우에는 간단한데 `2`, `5`, `8`, `0`의 경우에는 거리의 계산이 필요했다. 한가지 간과했던 사실은 엄지손가락을 사용하는 규칙 1번인데 **엄지손가락은 상하좌우 4가지 방향으로만 이동할 수 있으며 키패드 이동 한 칸은 거리로 1에 해당합니다.** 그냥 내 마음대로 대각선 길이를 계산했다가... 일부 테스트케이스에서 틀렸다... 제발 좀 꼼꼼하게 확인 후에 신중하게 제출하는 습관을 기르자 제발. 아무튼 중간 열의 숫자들도 왼쪽 엄지와 오른쪽 엄지가 이동해야 하는 거리를 계산해서, 작은 것, 혹은 같을 때에는 hand 인자를 확인해서 엄지를 이동시켜주면 된다.

지금 생각하면 되게 간단한 문제인데 왜 작년에는 풀다가 놔버렸는지 이해가 안간다... 역시 처음 시작이 약간 잘못되어서 그랬던 건가?

## 🌟 코드

```cpp
#include <string>
#include <vector>
#include <utility>
#include <cstdlib>

using namespace std;

string solution(vector<int> numbers, string hand) {
    string answer = "";
    
    pair<int, int> pos_right = {3, 2};
    pair<int, int> pos_left = {3, 0};
    pair<int, int> pos_list[10] = {{3, 1}, {0, 0}, {0, 1}, {0, 2}, {1, 0}, {1, 1}, {1, 2}, {2, 0}, {2, 1}, {2, 2}};
    int dist_right, dist_left, target;
    
    for(int i = 0; i < numbers.size(); i++)
    {
        target = numbers[i];
        if (target == 1 || target == 4 || target == 7)
        {
            answer.push_back('L');
            pos_left = pos_list[target];
        }
        else if (target == 3 || target == 6 || target == 9)
        {
            answer.push_back('R');
            pos_right = pos_list[target];
        }
        else
        {
            dist_right = abs(pos_right.first - pos_list[target].first) + abs(pos_right.second - pos_list[target].second);
            dist_left = abs(pos_left.first - pos_list[target].first) + abs(pos_left.second - pos_list[target].second);
            if (dist_right < dist_left || (dist_right == dist_left && hand == "right"))
            {
                answer.push_back('R');
                pos_right = pos_list[target];
            }
            else
            {
                answer.push_back('L');
                pos_left = pos_list[target];
            }
        }  
    }
    
    return answer;
}
```

