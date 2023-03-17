---
title: "[백준] 1012번 유기농 배추 (C++)"
date: 2022-02-09 12:40:36
category: Algorithm/BOJ
description: "[ 🤍 SILVER 2 ]"
---
  
[유기농 배추](https://www.acmicpc.net/problem/1012)

- - -

## 🌟 문제

차세대 영농인 한나는 강원도 고랭지에서 유기농 배추를 재배하기로 하였다. 농약을 쓰지 않고 배추를 재배하려면 배추를 해충으로부터 보호하는 것이 중요하기 때문에, 한나는 해충 방지에 효과적인 배추흰지렁이를 구입하기로 결심한다. 이 지렁이는 배추근처에 서식하며 해충을 잡아 먹음으로써 배추를 보호한다. 특히, 어떤 배추에 배추흰지렁이가 한 마리라도 살고 있으면 이 지렁이는 인접한 다른 배추로 이동할 수 있어, 그 배추들 역시 해충으로부터 보호받을 수 있다. 한 배추의 상하좌우 네 방향에 다른 배추가 위치한 경우에 서로 인접해있는 것이다.

한나가 배추를 재배하는 땅은 고르지 못해서 배추를 군데군데 심어 놓았다. 배추들이 모여있는 곳에는 배추흰지렁이가 한 마리만 있으면 되므로 서로 인접해있는 배추들이 몇 군데에 퍼져있는지 조사하면 총 몇 마리의 지렁이가 필요한지 알 수 있다.

## 🌟 입력

입력의 첫 줄에는 테스트 케이스의 개수 T가 주어진다. 그 다음 줄부터 각각의 테스트 케이스에 대해 첫째 줄에는 배추를 심은 배추밭의 가로길이 M(1 ≤ M ≤ 50)과 세로길이 N(1 ≤ N ≤ 50), 그리고 배추가 심어져 있는 위치의 개수 K(1 ≤ K ≤ 2500)이 주어진다. 그 다음 K줄에는 배추의 위치 X(0 ≤ X ≤ M-1), Y(0 ≤ Y ≤ N-1)가 주어진다. 두 배추의 위치가 같은 경우는 없다.

## 🌟 출력

각 테스트 케이스에 대해 필요한 최소의 배추흰지렁이 마리 수를 출력한다.

## 🌟 풀이

옛날에 첫 BFS문제를 이 문제로 풀었었던 것 같은데 .. (아련) 아무튼 이 문제는 BFS로 풀어줬다.

예전에는 어떤 문제를 BFS로 풀어야 할 지 몰라서 많이 헤맸었던 기억이 있는데 이 문제처럼 뭔가 넓은 구역을 돌아다니면서 인접한 구역을 찾아다니는 문제는 BFS로 푸는게 이해하기도 쉽고 깔끔한 것 같다.

bfs 함수 안에서 BFS를 진행해 줬는데... 간단히 bfs의 과정을 설명하면 아래와 같다.

- 시작 지점을 큐에 넣는다.
- 큐가 빌 때까지 아래의 과정을 반복한다.
	- 큐.pop()
	- 상하좌우 인접한 지점 중에 방문하지 않은 지점을 큐에 push
		(map의 범위 벗어나는지 확인!, 배추가 있는 지점인지 확인!)
	- 큐에 push한 지점을 방문했다고 표시한다.

이렇게 모든 맵을 돌아다니면서 인접한 배추 모음의 개수를 세어 주면 그 개수가 바로 필요한 배추흰지렁이의 최소 개수가 된다.

아 간혹 내가 실수하는 부분이라서 적어두는건데... 테스트 케이스가 주어지기 때문에 매 테스트케이스마다 밭의 정보, 방문기록을 초기화 해 두는것을 잊지 말자...ㅎ

## 🌟 코드
```cpp
/*
2022-2-9    
1012_유기농 배추
https://www.acmicpc.net/problem/1012
*/

#include <iostream>
#include <queue>
#include <cstring>  // memset
#include <utility>  // pair
using namespace std;


int map[51][51];
bool visited[51][51];
int m, n; // 밭의 가로길이, 세로길이
int dx[] = {0, 1, 0, -1};
int dy[] = {-1, 0, 1, 0};
queue<pair<int, int> > q;   // bfs

void bfs();

int main(){
    ios::sync_with_stdio(false);
    cin.tie(0);
    cout.tie(0);
    
    int t;  // test case
    int k;  // 배추의 개수
    int kx, ky;  // 배추의 위치
    int cnt;    // 배추흰지렁이의 수
    
    cin >> t;
    while (t--){
        cin >> m >> n >> k;
        for(int i = 0; i < n; i++){
            memset(map[i], 0, sizeof(map[i]));
            memset(visited[i], false, sizeof(visited[i]));
        }
        while (k--){
            cin >> kx >> ky;
            map[ky][kx] = 1;
        }
        cnt = 0;
        for (int y = 0; y < n; y++){
            for(int x = 0; x < m; x++){
                if (map[y][x] == 1 && visited[y][x] == false){
                    cnt++;
                    q.push(make_pair(x, y));
                    bfs();
                }
            }
        }
        cout << cnt << '\n';
    }
    
    return (0);
}

void bfs(){
    int x, y;
    while (!q.empty()){
        x = q.front().first;
        y = q.front().second;
        q.pop();
        for(int i = 0; i < 4; i++){
            if ((y + dy[i] < 0) || (y + dy[i] >= n) || (x + dx[i] < 0) || (x + dx[i] >= m))
                continue;
            else if (map[y + dy[i]][x + dx[i]] != 1 || visited[y + dy[i]][x + dx[i]] == true)
                continue;
            else {
                q.push(make_pair(x + dx[i], y + dy[i]));
                visited[y + dy[i]][x + dx[i]] = true;
            }
        }
    }
}
```