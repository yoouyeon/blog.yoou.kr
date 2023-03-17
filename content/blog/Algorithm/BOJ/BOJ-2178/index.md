---
title: "[백준] 2178번 미로 탐색 (C++)"
date: 2022-09-30 22:36:03
category: Algorithm/BOJ
description: "[ 🤍 SILVER 1 ]"
---

[미로 탐색](https://www.acmicpc.net/problem/2178)

- - -

## 🌟 문제

N×M크기의 배열로 표현되는 미로가 있다.

미로에서 1은 이동할 수 있는 칸을 나타내고, 0은 이동할 수 없는 칸을 나타낸다. 이러한 미로가 주어졌을 때, (1, 1)에서 출발하여 (N, M)의 위치로 이동할 때 지나야 하는 최소의 칸 수를 구하는 프로그램을 작성하시오. 한 칸에서 다른 칸으로 이동할 때, 서로 인접한 칸으로만 이동할 수 있다.

위의 예에서는 15칸을 지나야 (N, M)의 위치로 이동할 수 있다. 칸을 셀 때에는 시작 위치와 도착 위치도 포함한다.

## 🌟 입력

첫째 줄에 두 정수 N, M(2 ≤ N, M ≤ 100)이 주어진다. 다음 N개의 줄에는 M개의 정수로 미로가 주어진다. 각각의 수들은 **붙어서** 입력으로 주어진다.

## 🌟 출력

첫째 줄에 지나야 하는 최소의 칸 수를 출력한다. 항상 도착위치로 이동할 수 있는 경우만 입력으로 주어진다.

## 🌟 풀이

문제 자체는 이해하기 어렵지 않고 간단했다. 미로가 주어지고, (1, 1) 지점에서 (N, M) 지점까지 가기까지의 최단 경로를 구하는 문제이다.

미로의 모든 부분을 돌면서 가능한 모든 경우의 수를 찾아야 하기 때문에 완전탐색을 하면 될 것 같았고, 요새 계속 BFS로만 문제를 풀었던 것 같아서 이번엔 DFS로 풀어 보았다.

근데 **시간초과**가 났다.

왜 DFS로 풀었을 때에만 시간초과가 나는 것인지 이해가 안되어서 찾아봤는데 질문 게시판에 올라온 글을 보고 힌트를 얻었다. (참고 : https://www.acmicpc.net/board/view/5233)

DFS는 **무조건** 그래프를 모두 돌면서 모든 경우의 수를 비교해서 최단 길이를 찾아야 하는 반면에, BFS는 **가장 처음 (N, M) 지점에 도달하는 시점의 경로의 길이가 최소 길이**임이 보장되기 때문에 이 문제를 BFS로 접근한다면 모든 경우의 수를 찾을 필요는 없었다.

이런 차이가 벽이 많은 (이 문제에서는 맵에 0이 많은 경우)에서는 크게 느껴지지 않을 수도 있지만, 맵이 엄청 큰데, 벽이 거의 없어서 움직일 수 있는 경우의 수가 엄청 많을 경우에는 무시 못할 시간차이가 발생할 수 있을 것 같기도 했다.

그래서 BFS로 바꾸어서 문제를 풀었더니 무난하게 통과할 수 있었다.

… 사실 무난하진 않았고 런타임 에러 (OutOfBounds) 문제가 있긴 했었는데 바보같이 현재(그러니까 상하좌우로 이동하기 전)위치에서만 범위 검사를 하고, 상하좌우로 움직일 때 visited 배열을 접근하는 부분에서는 범위를 검사하지 않았던 것이다… 너무 초보적인 실수였는데 최댓값을 테스트케이스로 넣어보지 않아서 한참을 고민했었다. 바보… 이 문제를 푸는 다른 분들은 꼭 이동한 지점의 좌표의 범위를 잘 검사하시길 바랍니다…

## 🌟 코드

```cpp
#include <iostream>
#include <tuple>
#include <queue>
#include <string>
#include <cstring>
#include <climits>
using namespace std;

int N, M;
int ans;
string map[100];
bool visited[100][100];
queue<tuple<int, int, int> > q;
int dir_y[4] = {-1, 0, 1, 0};
int dir_x[4] = {0, 1, 0, -1};

int main(void)
{
	ios::sync_with_stdio(false);
	cin.tie(0);
	cout.tie(0);

	cin >> N >> M;
	memset(visited, false, sizeof(visited));
	for(int i = 0; i < N; i++)
		cin >> map[i];
	q.push(make_tuple(0, 0, 1));
	int pos_y, pos_x, cnt;
	while (!q.empty())
	{
		pos_y = get<0>(q.front());
		pos_x = get<1>(q.front());
		cnt = get<2>(q.front());
		q.pop();
		if (pos_y == N - 1 && pos_x == M - 1)
		{
			cout << cnt;
			exit(0);
		}
		for(int i = 0; i < 4; i++)
		{
			int new_y = pos_y + dir_y[i];
			int new_x = pos_x + dir_x[i];
			if (new_y < 0 || new_y >= N || new_x < 0 || new_x >= M \
				|| map[new_y][new_x] == '0' || visited[new_y][new_x])
					continue;
			visited[pos_y + dir_y[i]][pos_x + dir_x[i]] = true;
			q.push(make_tuple(pos_y + dir_y[i], pos_x + dir_x[i], cnt + 1));
		}
	}
	return (0);
}
```

