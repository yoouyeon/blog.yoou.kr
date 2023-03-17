---
title: "[백준] 7576번 토마토 (C++)"
date: 2022-04-03 18:44:17
category: Algorithm/BOJ
description: "[ 💛 GOLD 5 ]"
---

[토마토](https://www.acmicpc.net/problem/7576)

## 🌟 문제

철수의 토마토 농장에서는 토마토를 보관하는 큰 창고를 가지고 있다. 토마토는 아래의 그림과 같이 격자 모양 상자의 칸에 하나씩 넣어서 창고에 보관한다. 

![img](https://upload.acmicpc.net/de29c64f-dee7-4fe0-afa9-afd6fc4aad3a/-/preview/)

창고에 보관되는 토마토들 중에는 잘 익은 것도 있지만, 아직 익지 않은 토마토들도 있을 수 있다. 보관 후 하루가 지나면, 익은 토마토들의 인접한 곳에 있는 익지 않은 토마토들은 익은 토마토의 영향을 받아 익게 된다. 하나의 토마토의 인접한 곳은 왼쪽, 오른쪽, 앞, 뒤 네 방향에 있는 토마토를 의미한다. 대각선 방향에 있는 토마토들에게는 영향을 주지 못하며, 토마토가 혼자 저절로 익는 경우는 없다고 가정한다. 철수는 창고에 보관된 토마토들이 며칠이 지나면 다 익게 되는지, 그 최소 일수를 알고 싶어 한다.

토마토를 창고에 보관하는 격자모양의 상자들의 크기와 익은 토마토들과 익지 않은 토마토들의 정보가 주어졌을 때, 며칠이 지나면 토마토들이 모두 익는지, 그 최소 일수를 구하는 프로그램을 작성하라. 단, 상자의 일부 칸에는 토마토가 들어있지 않을 수도 있다.

## 🌟 입력

첫 줄에는 상자의 크기를 나타내는 두 정수 M,N이 주어진다. M은 상자의 가로 칸의 수, N은 상자의 세로 칸의 수를 나타낸다. 단, 2 ≤ M,N ≤ 1,000 이다. 둘째 줄부터는 하나의 상자에 저장된 토마토들의 정보가 주어진다. 즉, 둘째 줄부터 N개의 줄에는 상자에 담긴 토마토의 정보가 주어진다. 하나의 줄에는 상자 가로줄에 들어있는 토마토의 상태가 M개의 정수로 주어진다. 정수 1은 익은 토마토, 정수 0은 익지 않은 토마토, 정수 -1은 토마토가 들어있지 않은 칸을 나타낸다.

토마토가 하나 이상 있는 경우만 입력으로 주어진다.

## 🌟 출력

여러분은 토마토가 모두 익을 때까지의 최소 날짜를 출력해야 한다. 만약, 저장될 때부터 모든 토마토가 익어있는 상태이면 0을 출력해야 하고, 토마토가 모두 익지는 못하는 상황이면 -1을 출력해야 한다.

## 🌟 풀이

이미 익어있는 토마토들이 인접한 주변의 익지 않은 토마토들을 익게 하면서 익은 토마토들의 범위를 넓혀가는 느낌이다... => BFS!

토마토들의 정보를 입력받으면서 익은 토마토들을 큐에 넣어주었다. 그리고 그 큐를 돌아가면서 사방으로 인접해있는 익지 않은 토마토들을 익히고, 새로 익은 토마토들은 큐에 넣어주고 이런 기본적인 BFS 를 따라서 토마토들을 익혀 주었다. 

그리고 문제 조건에서 토마토가 모두 익지 못하는 상황을 걸러줘야 한다 했으므로 다른 토마토를 익힐 수 있는 토마토가 없는데 박스 상에는 덜익은 토마토가 있는 경우에는 더이상 덜익은 토마토들을 익힐 방법이 없으므로 -1을 출력해주었다.

## 🌟 코드

```cpp
/*
2022-4-3
7576_토마토
https://www.acmicpc.net/problem/7576
*/

#include <iostream>
#include <queue>
#include <utility>
using namespace std;

int n, m, day;
int box[1001][1001];

bool check_tomato()
{
	for(int i = 0; i < n; i++)
	{
		for(int j = 0; j < m; j++)
		{
			if (box[i][j] == 0)
				return (false);
		}
	}
	return (true);
}

int main()
{
	ios::sync_with_stdio(false);
	cin.tie(0);
	cout.tie(0);

	queue<pair<int, int> > q;
	pair<int, int> tomato;
	int dx[] = {1, 0, -1, 0};
	int dy[] = {0, -1, 0, 1};
	cin >> m >> n;
	for(int i = 0; i < n; i++)
	{
		for(int j = 0; j < m; j++)
		{
			cin >> box[i][j];
			if (box[i][j] == 1)
				q.push(make_pair(i, j));
		}
	}
	day = 0;
	while (!check_tomato())
	{
		if (q.empty())
		{
			cout << -1;
			return (0);
		}
		int size = q.size();
		for(int k = 0; k < size; k++)
		{
			tomato = q.front();
			q.pop();
			for(int i = 0; i < 4; i++)
			{
				int nx = tomato.second + dx[i];
				int ny = tomato.first + dy[i];
				if (ny < 0 || ny >= n || nx < 0 || nx >= m)
					continue;
				if (box[ny][nx] == 0)
				{
					box[ny][nx] = 1;
					q.push(make_pair(ny, nx));
				}
			}
		}
		day++;
	}
	cout << day;

	return (0);
}
```

