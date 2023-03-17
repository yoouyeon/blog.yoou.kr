---
title: "[백준] 2630번 색종이 만들기 (C++)"
date: 2022-02-02 21:13:31
category: Algorithm/BOJ
description: "[ 🤍 SILVER 3 ]"
---

[색종이 만들기](https://www.acmicpc.net/problem/2630)

## 🌟 문제

아래 \<그림 1\>과 같이 여러개의 정사각형칸들로 이루어진 정사각형 모양의 종이가 주어져 있고, 각 정사각형들은 하얀색으로 칠해져 있거나 파란색으로 칠해져 있다. 주어진 종이를 일정한 규칙에 따라 잘라서 다양한 크기를 가진 정사각형 모양의 하얀색 또는 파란색 색종이를 만들려고 한다.

![그림 1](https://www.acmicpc.net/upload/images/bwxBxc7ghGOedQfiT3p94KYj1y9aLR.png)

전체 종이의 크기가 N×N(N=2k, k는 1 이상 7 이하의 자연수) 이라면 종이를 자르는 규칙은 다음과 같다.

전체 종이가 모두 같은 색으로 칠해져 있지 않으면 가로와 세로로 중간 부분을 잘라서 \<그림 2\>의 I, II, III, IV와 같이 똑같은 크기의 네 개의 N/2 × N/2색종이로 나눈다. 나누어진 종이 I, II, III, IV 각각에 대해서도 앞에서와 마찬가지로 모두 같은 색으로 칠해져 있지 않으면 같은 방법으로 똑같은 크기의 네 개의 색종이로 나눈다. 이와 같은 과정을 잘라진 종이가 모두 하얀색 또는 모두 파란색으로 칠해져 있거나, 하나의 정사각형 칸이 되어 더 이상 자를 수 없을 때까지 반복한다.

위와 같은 규칙에 따라 잘랐을 때 \<그림 3\>은 \<그림 1\>의 종이를 처음 나눈 후의 상태를, \<그림 4\>는 두 번째 나눈 후의 상태를, \<그림 5\>는 최종적으로 만들어진 다양한 크기의 9장의 하얀색 색종이와 7장의 파란색 색종이를 보여주고 있다.

![그림2, 3, 4, 5](https://www.acmicpc.net/upload/images/VHJpKWQDv.png)

입력으로 주어진 종이의 한 변의 길이 N과 각 정사각형칸의 색(하얀색 또는 파란색)이 주어질 때 잘라진 하얀색 색종이와 파란색 색종이의 개수를 구하는 프로그램을 작성하시오.

## 🌟 입력

첫째 줄에는 전체 종이의 한 변의 길이 N이 주어져 있다. N은 2, 4, 8, 16, 32, 64, 128 중 하나이다. 색종이의 각 가로줄의 정사각형칸들의 색이 윗줄부터 차례로 둘째 줄부터 마지막 줄까지 주어진다. 하얀색으로 칠해진 칸은 0, 파란색으로 칠해진 칸은 1로 주어지며, 각 숫자 사이에는 빈칸이 하나씩 있다.

## 🌟 출력

첫째 줄에는 잘라진 햐얀색 색종이의 개수를 출력하고, 둘째 줄에는 파란색 색종이의 개수를 출력한다.

## 🌟 풀이

주어진 종이의 정사각형 칸의 색깔이 모두 같은 색이 아니라면 1/4로 나누어 줘야 한다.

그리고 원래 넓이의 1/4이 된 종이에서 다시 동일하게 정사각형 칸의 색이 모두 같은지 확인하고, 같지 않다면 다시 1/4를 해 주고, 반복하고,...

이렇게 생각해 보면 하나의 문제를 작은 단위 (여기서는 1/4)로 쪼개어서 다시 같은 문제로 반복하는 형태의 문제이기 때문에 Divide and Conquer (분할정복) 방식으로 풀어주면 되겠다.

가장 중심이 되는 (사실 이것밖에 없다고도 할 수 있음) cut_paper 함수의 흐름을 간략하게 정리해 봤는데 이해가 잘 되었으면 좋겠다...

![cut_paper_flow_chart](/cut_paper_flow_chart.jpg)

종이 하나를 갖고 쪼갤 수 있을 때 까지 쪼개본다고 생각하면 될 듯 하다.

재귀함수를 좀 오랜만에 짠 것 같은데 그러다보니 종료 조건 부분이 조금 애매하다. `temp != -1` 부분에서 `if - else` 구문보다는 그냥 바로 return 을 해버렸으면 좀 더 직관적이었을 것 같다는 생각이 든다...

## 🌟 코드

```cpp
/*
2022-2-2
2630_색종이 만들기
https://www.acmicpc.net/problem/2630
*/

#include <iostream>
using namespace std;

int map[128][128];
int N;
int ans[2] = {0, 0};

void cut_paper(int start_x, int start_y, int len);
int is_clear(int start_x, int start_y, int len);

int main(){
    ios::sync_with_stdio(false);
    cin.tie(0);
    cout.tie(0);
    
    cin >> N;
    for(int i = 0; i < N; i++){
        for(int j = 0; j < N; j++)
            cin >> map[i][j];
    }
    
    cut_paper(0, 0, N);
    
    cout << ans[0] << '\n' << ans[1];
    
    return (0);
}

void cut_paper(int start_x, int start_y, int len){
    int temp = is_clear(start_x, start_y, len);
    if (temp != -1)
        ans[temp]++;
    else{
        cut_paper(start_x, start_y, len/2);
        cut_paper(start_x, start_y + len/2, len/2);
        cut_paper(start_x + len/2, start_y, len/2);
        cut_paper(start_x + len/2, start_y + len/2, len/2);
    }
}

int is_clear(int start_x, int start_y, int len){
    for(int i = 0; i < len; i++){
        for(int j = 0; j < len; j++){
            if (map[start_y][start_x] != map[start_y + i][start_x + j])
                return (-1);
        }
    }
    return (map[start_y][start_x]);
}
```

