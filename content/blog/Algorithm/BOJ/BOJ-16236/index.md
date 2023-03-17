---
title: "[백준] 16236번 아기 상어 (C++)"
date: 2022-10-09 20:54:44
category: Algorithm/BOJ
description: "[ 💛 GOLD 3 ]"
---

[아기 상어](https://www.acmicpc.net/problem/16236)

## 🌟 문제

N×N 크기의 공간에 물고기 M마리와 아기 상어 1마리가 있다. 공간은 1×1 크기의 정사각형 칸으로 나누어져 있다. 한 칸에는 물고기가 최대 1마리 존재한다.

아기 상어와 물고기는 모두 크기를 가지고 있고, 이 크기는 자연수이다. 가장 처음에 아기 상어의 크기는 2이고, 아기 상어는 1초에 상하좌우로 인접한 한 칸씩 이동한다.

아기 상어는 자신의 크기보다 큰 물고기가 있는 칸은 지나갈 수 없고, 나머지 칸은 모두 지나갈 수 있다. 아기 상어는 자신의 크기보다 작은 물고기만 먹을 수 있다. 따라서, 크기가 같은 물고기는 먹을 수 없지만, 그 물고기가 있는 칸은 지나갈 수 있다.

아기 상어가 어디로 이동할지 결정하는 방법은 아래와 같다.

- 더 이상 먹을 수 있는 물고기가 공간에 없다면 아기 상어는 엄마 상어에게 도움을 요청한다.
- 먹을 수 있는 물고기가 1마리라면, 그 물고기를 먹으러 간다.
- 먹을 수 있는 물고기가 1마리보다 많다면, 거리가 가장 가까운 물고기를 먹으러 간다.
  - 거리는 아기 상어가 있는 칸에서 물고기가 있는 칸으로 이동할 때, 지나야하는 칸의 개수의 최솟값이다.
  - 거리가 가까운 물고기가 많다면, 가장 위에 있는 물고기, 그러한 물고기가 여러마리라면, 가장 왼쪽에 있는 물고기를 먹는다.

아기 상어의 이동은 1초 걸리고, 물고기를 먹는데 걸리는 시간은 없다고 가정한다. 즉, 아기 상어가 먹을 수 있는 물고기가 있는 칸으로 이동했다면, 이동과 동시에 물고기를 먹는다. 물고기를 먹으면, 그 칸은 빈 칸이 된다.

아기 상어는 자신의 크기와 같은 수의 물고기를 먹을 때 마다 크기가 1 증가한다. 예를 들어, 크기가 2인 아기 상어는 물고기를 2마리 먹으면 크기가 3이 된다.

공간의 상태가 주어졌을 때, 아기 상어가 몇 초 동안 엄마 상어에게 도움을 요청하지 않고 물고기를 잡아먹을 수 있는지 구하는 프로그램을 작성하시오.

## 🌟 입력

첫째 줄에 공간의 크기 N(2 ≤ N ≤ 20)이 주어진다.

둘째 줄부터 N개의 줄에 공간의 상태가 주어진다. 공간의 상태는 0, 1, 2, 3, 4, 5, 6, 9로 이루어져 있고, 아래와 같은 의미를 가진다.

- 0: 빈 칸
- 1, 2, 3, 4, 5, 6: 칸에 있는 물고기의 크기
- 9: 아기 상어의 위치

아기 상어는 공간에 한 마리 있다.

## 🌟 출력

첫째 줄에 아기 상어가 엄마 상어에게 도움을 요청하지 않고 물고기를 잡아먹을 수 있는 시간을 출력한다.

## 🌟 풀이

간단한 BFS 문제겠거니 생각했었는데 문제 조건이 많아서 고생을 좀 한 문제였다. 문제를 이해하고 나니 BFS 이후에 약간의 처리만 해 주면 되는 문제였어서  BFS를 알고있다면, 문제만 잘 이해하면 그렇게 어려운 문제는 아니었겠다는 생각이 들었다.. ㅎㅎ

### ✨ 문제 조건 이해하기

문제 조건을 이해해보자. 문제는 아기 상어가 자신보다 작은 크기의 물고기들을 먹어가면서 몸집을 불려나가는 컨셉이다. (개인적인 경험이지만, 유튜브 광고에 이렇게 작은 물고기가 자기보다 작은 물고기들을 먹어가며 몸집을 불려가는 게임 광고가 지겹도록(...) 나와서 문제 컨셉 자체는 그렇게 어렵지 않았다... 하하)

아기 상어가 **지나갈 수 있는** 칸은 빈칸 (0) 혹은 자신보다 크기가 **작거나 같은** 물고기가 있는 칸이다. 아기 상어가 **먹을 수 있는** 물고기는 자신보다 크기가 **작은** 물고기이다. 아기 상어와 **크기가 같은 물고기는 지나갈 수만 있고 먹을 수는 없다**는 것에 주의하자.

아기 상어의 크기는 **지금까지 먹어온 물고기의 수와 현재 아기상어의 크기가 일치할 때 마다 1씩 증가**한다. (먹은 만큼 증가하는게 아니다!!!!) 아기 상어의 초기 크기가 2이므로 물고기를 2번 먹고서야 크기가 3이 되고, 그 다음에는 3마리를 먹어야 크기가 4가 되는 것이다.

아기 상어의 이동에는 1초가 걸린다. 3칸 이동하기 위해서는 3초가 걸린다는 뜻이다.

아기 상어가 먹을 수 있는 물고기가 2마리 이상 있을 경우에는 (본인 크기보다 작기만 하면 되니 후보가 여럿 있을 수도 있다.) 아래와 같은 우선순위로 먹을 물고기를 결정한다.

1. 일단 **가장 가까운 거리**의 물고기를 먹는다.
2. 거리가 같은 물고기가 여럿이라면 **가장 위쪽의 물고기(y좌표가 작은 물고기)** 를 먹는다.
3. y좌표도 모두 동일하다면 **가장 왼쪽의 물고기(x좌표가 작은 물고기)** 를 먹는다.

이렇게 먹을 수 있는 물고기가 없을 때까지 모두 물고기를 먹었을 때 걸리는 시간을 구하는 문제이다.

### ✨ 문제 풀기

BFS만으로 우선순위 1, 2, 3을 만족하는 물고기를 찾고 싶어서 탐색을 위, 왼, 오, 아래 순서로 하는 방법으로 해 보려고 했는데 결론은 이 방법으로는 안된다. 내가 모르는 것일수도 있지만 아직은 잘 모르겠어서 BFS로 모든 가능한 경우의 수를 탐색한 다음에 (`move` 함수) 그 경우의 수를 모두 돌면서 먹어야 하는 물고기를 찾아서 먹어주는 방법(`eat` 함수)으로 문제를 풀었다.

BFS로 현재 위치에서 먹을 수 있는 물고기를 탐색해준다. 현재 칸의 물고기를 먹을 수 있는 경우에는 그 물고기까지의 거리를 `dist` 배열에 저장해주고, 현재 칸을 지나갈 수 있는 경우에는 BFS 큐에 넣어 주었다.

```cpp
while (!Q.empty()) {
	size = Q.size();
	for (int k = 0; k < size; k++) {
		y = Q.front().first;
		x = Q.front().second;
		Q.pop();
    for (int d = 0; d < 4; d++) {
			new_y = y + dy[d];
			new_x = x + dx[d];
			if (new_y < 0 || new_x < 0 || new_y >= N || new_x >= N || visited[new_y][new_x])
				continue;
			visited[new_y][new_x] = true;
			if (map[new_y][new_x] == 0 || map[new_y][new_x] == S.size)	// 지나갈 수 있는 경우
				Q.push(make_pair(new_y, new_x));
			else if (map[new_y][new_x] < S.size)	// 먹을 수 있는 경우
			{
				dist[new_y][new_x] = curr_dist;
				eat_flag = true;
			}
		}
  }
	curr_dist++;
}
```

먹을 수 있는 물고기가 있는 경우에는 `eat_flag` 를 `true`로 바꿨다. BFS가 모두 끝나고, 하나라도 먹을 수 있는 물고기가 있었을 경우에는 먹어주었고, 그 외에는 아무것도 하지 않았다.

```cpp
if (eat_flag)
  eat();
return(eat_flag);
```

저장해둔 `dist`배열을 왼쪽 위부터 가로로 한줄 한줄 탐색하면서 최소 거리의 물고기를 구한다. 탐색 순서를 윗줄부터 아래로 내려가면서, 왼쪽부터 오른쪽으로 했기 때문에 동일한 거리의 물고기들 중에는 가장 먼저 보이는 물고기가 문제의 우선순위에 맞는 물고기라는 보장이 된다.

먹을 물고기를 고른 다음에, 그 거리만큼 정답을 늘려주고, 먹은 횟수를 증가시켜주고, 횟수와 현재 크기가 동일하다면 상어의 크기를 늘려주었다.

```cpp
void eat(void) {
	pair<int, int> fish_pos;
	int fish_dist = INT_MAX;
	for(int i = 0; i < N; i++) {
		for(int j = 0; j < N; j++) {
			if (dist[i][j] == -1 || fish_dist <= dist[i][j])
				continue;
			fish_dist = dist[i][j];
			fish_pos = make_pair(i, j);
		}
	}
	S.ans += fish_dist;
	S.eat_cnt++;
	if (S.eat_cnt == S.size) {
		S.eat_cnt = 0;
		S.size++;
	}
	map[fish_pos.first][fish_pos.second] = 0;
	S.pos = fish_pos;
	return;
}
```

결론적으론 BFS에 `eat` 함수의 내용이 추가된 문제였는데... 사실 `eat` 함수의 내용은 엄청 간단하다. 나는 그냥 문제 이해가 너무 어려웠다...ㅜㅜ

## 🌟 코드

```cpp
#include <iostream>
#include <queue>
#include <utility>
#include <climits>
using namespace std;

class BabyShark {
	public:
		int ans = 0;
		int size = 2;
		int eat_cnt = 0;
		pair<int, int> pos;
};

int N;
BabyShark S;
int map[20][20];
int dist[20][20];
bool visited[20][20];
int dy[4] = {-1, 0, 1, 0};
int dx[4] = {0, 1, 0, -1};
queue<pair<int, int> > Q;

void init_info(void) {
	for(int i = 0; i < N; i++) {
		for(int j = 0; j < N; j++) {
			dist[i][j] = -1;
			visited[i][j] = false;
		}
	}
}

void eat(void) {
	pair<int, int> fish_pos;
	int fish_dist = INT_MAX;
	for(int i = 0; i < N; i++) {
		for(int j = 0; j < N; j++) {
			if (dist[i][j] == -1 || fish_dist <= dist[i][j])
				continue;
			fish_dist = dist[i][j];
			fish_pos = make_pair(i, j);
		}
	}
	S.ans += fish_dist;
	S.eat_cnt++;
	if (S.eat_cnt == S.size) {
		S.eat_cnt = 0;
		S.size++;
	}
	map[fish_pos.first][fish_pos.second] = 0;
	S.pos = fish_pos;
	return;
}

bool move(void) {
	int size, y, x, new_y, new_x, curr_dist;
	bool eat_flag = false;
	curr_dist = 1;
	while (!Q.empty()) {
		size = Q.size();
		for (int k = 0; k < size; k++) {
			y = Q.front().first;
			x = Q.front().second;
			Q.pop();
			for (int d = 0; d < 4; d++) {
				new_y = y + dy[d];
				new_x = x + dx[d];
				if (new_y < 0 || new_x < 0 || new_y >= N || new_x >= N || visited[new_y][new_x])
					continue;
				visited[new_y][new_x] = true;
				if (map[new_y][new_x] == 0 || map[new_y][new_x] == S.size)
					Q.push(make_pair(new_y, new_x));
				else if (map[new_y][new_x] < S.size)
				{
					dist[new_y][new_x] = curr_dist;
					eat_flag = true;
				}
			}
		}
		curr_dist++;
	}
	if (eat_flag)
		eat();
	return(eat_flag);
}

int main(void) {
	ios::sync_with_stdio(false);
	cin.tie(0);
	cout.tie(0);
	
	cin >> N;
	init_info();
	for(int i = 0; i < N; i++) {
		for(int j = 0; j < N; j++) {
			cin >> map[i][j];
			if (map[i][j] == 9) {
				map[i][j] = 0;
				S.pos.first = i;
				S.pos.second = j;
			}
		}	
	}
	Q.push(S.pos);
	visited[S.pos.first][S.pos.second] = true;
	while (move()) {
		init_info();
		Q.push(S.pos);
		visited[S.pos.first][S.pos.second] = true;
	}
	cout << S.ans;
	return (0);
}
```

