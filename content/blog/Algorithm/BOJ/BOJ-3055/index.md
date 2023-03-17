---
title: "[백준] 3055번 탈출 (C++)"
date: 2021-07-20 22:26:34
category: Algorithm/BOJ
description: "[ 💛 GOLD 4 ]"
---

[탈출](https://www.acmicpc.net/problem/3055)

## 🌟 문제
사악한 암흑의 군주 이민혁은 드디어 마법 구슬을 손에 넣었고, 그 능력을 실험해보기 위해 근처의 티떱숲에 홍수를 일으키려고 한다. 이 숲에는 고슴도치가 한 마리 살고 있다. 고슴도치는 제일 친한 친구인 비버의 굴로 가능한 빨리 도망가 홍수를 피하려고 한다.
티떱숲의 지도는 R행 C열로 이루어져 있다. 비어있는 곳은 '.'로 표시되어 있고, 물이 차있는 지역은 '\*', 돌은 'X'로 표시되어 있다. 비버의 굴은 'D'로, 고슴도치의 위치는 'S'로 나타내어져 있다.
매 분마다 고슴도치는 현재 있는 칸과 인접한 네 칸 중 하나로 이동할 수 있다. (위, 아래, 오른쪽, 왼쪽) 물도 매 분마다 비어있는 칸으로 확장한다. 물이 있는 칸과 인접해있는 비어있는 칸(적어도 한 변을 공유)은 물이 차게 된다. 물과 고슴도치는 돌을 통과할 수 없다. 또, 고슴도치는 물로 차있는 구역으로 이동할 수 없고, 물도 비버의 소굴로 이동할 수 없다.
티떱숲의 지도가 주어졌을 때, 고슴도치가 안전하게 비버의 굴로 이동하기 위해 필요한 최소 시간을 구하는 프로그램을 작성하시오.
고슴도치는 물이 찰 예정인 칸으로 이동할 수 없다. 즉, 다음 시간에 물이 찰 예정인 칸으로 고슴도치는 이동할 수 없다. 이동할 수 있으면 고슴도치가 물에 빠지기 때문이다.
## 🌟 입력
첫째 줄에 50보다 작거나 같은 자연수 R과 C가 주어진다.
다음 R개 줄에는 티떱숲의 지도가 주어지며, 문제에서 설명한 문자만 주어진다. 'D'와 'S'는 하나씩만 주어진다.
## 🌟 출력
첫째 줄에 고슴도치가 비버의 굴로 이동할 수 있는 가장 빠른 시간을 출력한다. 만약, 안전하게 비버의 굴로 이동할 수 없다면, "KAKTUS"를 출력한다.
## 🌟 풀이
무언가 **퍼지는** 느낌이고 (여기서는 물이) 여러 방향으로 가는 무언가가 (여기서는 고슴도치가) 목적지에 도달할 수 있는 최단 시간을 구하는 것이기 때문에 어렵지 않게 BFS를 떠올릴 수 있었다.
최단시간만 구하는 문제였다면 DFS를 사용해도 되었겠지만 여기서는 물도 함께 퍼지기 때문에 DFS로는 풀지 못하거나 풀 수 있더라도 복잡한 방법이 될 것 같다.
***
문제를 확인해 보면 매 초마다 물이 4방향으로 퍼지고, 고슴도치가 4방향으로 움직일 수 있다. 
물과 고슴도치의 움직임에 각각 BFS를 적용해서 물 먼저 움직인 후에, 고슴도치를 움직여주는 방법으로 문제를 해결했다.
물을 먼저 움직인 이유는 *고슴도치가 움직일 방향 물이 찰 예정인 경우* 일때는 그 쪽으로 움직일 수 없다고 해서 처리의 용이성을 위해서 물을 먼저 이동시켜주었다.
사실 같은 BFS이기 때문에 큐를 하나만 두고 움직이는 방법도 있는 듯 한데... 큐를 두개 두는 편이 좀 더 이해하기 쉬운 것 같아서 그냥 2개 두는 방법만 생각해 보았다.
## 🌟 코드
```cpp
#include <iostream>
#include <queue>
#include <utility>
#include <queue>
using namespace std;

//pair first: 행 second: 열
int cnt;
char map[50][50];
queue<pair<int, int>> s_queue;	// s(고슴도치) 큐
queue<pair<int, int>> water;	// 물 큐
int dy[] = {0, 1, 0, -1};
int dx[] = {1, 0, -1, 0};
int r, c;

void water_move(){
    pair<int, int> curr;
    pair<int, int> new_w;
    int size = water.size();
    for(int i = 0; i < size; i++){
        curr = water.front();
        water.pop();
        for(int dir = 0; dir < 4; dir++){
            new_w = {curr.first + dy[dir], curr.second + dx[dir]};
            if(new_w.first < 0 || new_w.second < 0 || new_w.first > r || new_w.second > c || map[new_w.first][new_w.second] != '.')
                continue;
            map[new_w.first][new_w.second] = '*';
            water.push(new_w);
        }
    }
}

void bfs(){
    pair<int, int> curr_s;
    pair<int, int> new_s;
    while (!s_queue.empty()){
        cnt++;
        water_move();
        int size = s_queue.size();
        for (int i = 0; i < size; i++){
            curr_s = s_queue.front();
            s_queue.pop();
            for(int dir = 0; dir < 4; dir++){
                new_s = {curr_s.first + dy[dir], curr_s.second + dx[dir]};
                if (map[new_s.first][new_s.second] == 'D'){
                    cout << cnt;
                    return;
                }
                if(new_s.first < 0 || new_s.second < 0 || new_s.first > r || new_s.second > c || map[new_s.first][new_s.second] != '.')
                    continue;
                map[new_s.first][new_s.second] = '*';
                s_queue.push(new_s);
            }
        }
    }
    cout << "KAKTUS";
    return;
}

int main(){
    cin >> r >> c;
    cnt = 0;
    for (int i = 0; i < r; i++){
        for (int j = 0; j < c; j++){
            cin >> map[i][j];
            if (map[i][j] == 'S')
                s_queue.push({i, j});
            else if (map[i][j] == '*')
                water.push({i, j});
        }
    }
    bfs();
}
```
