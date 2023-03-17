---
title: "[백준] 1916번 최소비용 구하기 (C++)"
date:  2022-11-16 03:27:12
category: Algorithm/BOJ
description: "[ 💛 GOLD 5 ]"
---

[최소비용 구하기](https://www.acmicpc.net/problem/1916)

- - -

## 🌟 문제

N개의 도시가 있다. 그리고 한 도시에서 출발하여 다른 도시에 도착하는 M개의 버스가 있다. 우리는 A번째 도시에서 B번째 도시까지 가는데 드는 버스 비용을 최소화 시키려고 한다. A번째 도시에서 B번째 도시까지 가는데 드는 최소비용을 출력하여라. 도시의 번호는 1부터 N까지이다.

## 🌟 입력

첫째 줄에 도시의 개수 N(1 ≤ N ≤ 1,000)이 주어지고 둘째 줄에는 버스의 개수 M(1 ≤ M ≤ 100,000)이 주어진다. 그리고 셋째 줄부터 M+2줄까지 다음과 같은 버스의 정보가 주어진다. 먼저 처음에는 그 버스의 출발 도시의 번호가 주어진다. 그리고 그 다음에는 도착지의 도시 번호가 주어지고 또 그 버스 비용이 주어진다. 버스 비용은 0보다 크거나 같고, 100,000보다 작은 정수이다.

그리고 M+3째 줄에는 우리가 구하고자 하는 구간 출발점의 도시번호와 도착점의 도시번호가 주어진다. 출발점에서 도착점을 갈 수 있는 경우만 입력으로 주어진다.

## 🌟 출력

첫째 줄에 출발 도시에서 도착 도시까지 가는데 드는 최소 비용을 출력한다.

## 🌟 풀이

무난한 다익스트라 문제라고 생각했는데 한번은 틀리고 한번은 시간초과가 났다. 같은 실수를 반복하지 않기 위해서 간단히 기록해둔다.

첫번째 틀린 이유는 방향이 없는 그래프라고 생각했기 때문이었다.

문제에서 방향에 대한 언급을 직접적으로 하진 않았지만 버스의 정보를 줄 때 "출발 도시"와 "도착 도시"의 정보를 줬기 때문에 방향이 있는 것으로 해석하는게 자연스러웠다.

두번째 시간 초과의 이유는 무작정 큐가 빌 때 까지 계속해서 업데이트를 해 줬기 때문이다.

queue에서 뽑아낸 거리가 기존에 저장해두었던 최단거리 배열의 값보다 "큰" 경우에는 아무리 더해도 최단거리 배열의 업데이트가 일어나지 않을 것이기 때문에 굳이 업데이트 해 줄 필요가 없었다.

운이 좋게 예전에 풀었던 다익스트라 문제에서는 시간 초과 문제는 발생하지 않았던 것 같은데 (아닐수도... 내 기억력의 문제일수도...) 잘 기억해둬야겠다.

## 🌟 코드

```cpp
// 백준 1916 최소비용 구하기
#include <iostream>
#include <vector>
#include <utility>
#include <queue>
#define INF 10000000000;
using namespace std;

int n, m;
int src, dest;
long shortest_dist[1001];
vector<pair<int, long> >connected[1001];

void input()
{
	ios::sync_with_stdio(false);
	cin.tie(0);
	cout.tie(0);

	cin >> n >> m;
	int s, d;
	long w;
	for (int i = 0; i < m; i++)
	{
		cin >> s >> d >> w;
		connected[s].push_back(make_pair(d, w));
	}
	for(int i = 1; i <= n; i++)
		shortest_dist[i] = INF;
	cin >> src >> dest;
}

void dijkstra()
{
	priority_queue<pair<long, int>, vector<pair<long, int> >, greater<pair<long, int> > > pq; // first : dist, second : point
	long curr_dist, temp_dist;
	int curr_point, temp_point;
	pq.push(make_pair(0, src));
	shortest_dist[src] = 0;
	while (!pq.empty())
	{
		curr_dist = pq.top().first;
		curr_point = pq.top().second;
		pq.pop();
		if (shortest_dist[curr_point] < curr_dist)
			continue;
		for (int i = 0; i < connected[curr_point].size(); i++)
		{
			temp_point = connected[curr_point][i].first;
			temp_dist = connected[curr_point][i].second;
			if (shortest_dist[temp_point] > curr_dist + temp_dist)
			{
				shortest_dist[temp_point] = curr_dist + temp_dist;
				pq.push(make_pair(shortest_dist[temp_point], temp_point));
			}
		}
	}
	
}

int main()
{
	input();
	dijkstra();
	cout << shortest_dist[dest];
	return (0);
}
```