---
title: 플로이드 워셜 (Floyed Warshall) 알고리즘
date: 2022-09-26 20:27:29
category: Algorithm/Wiki
description: "최단 경로 알고리즘"
---

## 🌟 문제

[백준 1389 케빈 베이컨의 6단계 법칙](https://www.acmicpc.net/problem/1389)

## 🌟 플로이드 워셜 알고리즘 (feat. 다익스트라 알고리즘)

1389번 문제는 친구끼리의 마음의 거리(...)를 설정해두지 않았으므로 각 엣지의 가중치가 모두 1로 동일하게 설정되어 있다. 따라서 방문하게 되는 노드의 수만 세어주면 되므로 BFS로 간단하게 풀 수 있지만 만약에 비슷한 문제인데 엣지에 가중치가 다르다면 BFS로 풀기 어렵다고 한다. 이 때 활용할 수 있는 알고리즘이 플로이드 워셜 알고리즘이다.

그냥 그래프에서 최단 경로 알고리즘 하면 나는 먼저 다익스트라 알고리즘이 생각났는데 (언젠가 문제에 등장하면 정리해보는걸로...) 다익스트라 알고리즘은 어떤 시작 노드에서 다른 노드들까지의 최단 경로를 구하는 알고리즘인 반면에 플로이드 워셜 알고리즘은 모든 노드들에 대해서 각 노드에서 다른 노드들까지의 최단 경로를 구하는 알고리즘이다. 최단 경로 테이블을 채우는 것이라고 이해했다.

또 다른 차이로는 다익스트라 알고리즘은 음의 가중치를 가진 엣지는 사용할 수 없는 반면에 플로이드 워셜 알고리즘은 음의 가중치를 가진 엣지도 사용할 수 있다는 것이 있다.

- - -

기본적인 아이디어는 어떤 노드를 지나는 경로 중에서 가장 짧은 경로를 찾는 것이다.

계속해서 최적의 경로를 업데이트 하는 방식이기 때문에 재귀적으로 점화식을 호출하게 된다.

```cpp
// a에서 b까지의 p를 지나는 가장 짧은 경로
shortestPath(a, b) = min(shortestPath(a, b), shortestPath(a, p) + shortestPath(a, p))
```

## 🌟 플로이드 워셜 알고리즘 흐름

흐름을 그려보려고 했으나 표를 너무 많이 그려야함... 그래서 위키백과 표 긁어옴. 점화식도 상식적이고 다행히 그렇게 복잡한 흐름은 아니라서 단번에 이해가 잘 된다.

![](/Floyd-Warshall_example.png)

![](/Floyd-Warshall_example_table.png)

이런 식으로 계속 최적의 경로를 찾아가면 됨.

## 🌟 코드

백준 1389번. 모든 가중치가 1이다.

```cpp
/* ================= *
 *  Floyed Warshall
 * ================= */

#define INF_1389 500000;

int shortest_dist[101][101];
bool connected[101][101];
int N, M;

void init(void)
{
	int a, b;
	memset(connected, false, sizeof(connected));
	for(int i = 1; i <= M; i++)
	{
		cin >> a >> b;
		connected[a][b] = true;
		connected[b][a] = true;
	}
	for(int i = 1; i <= N; i++)
	{
		for (int j = 1; j <= N; j++)
		{
			if (i == j)
				shortest_dist[i][j] = 0;
			else if (connected[i][j])
				shortest_dist[i][j] = 1;
			else
				shortest_dist[i][j] = INF_1389;
		}
	}
}

int WFI(void)
{
	int ret, temp;
	int sum = INT_MAX;
	// a부터 b까지 p를 지나는 경로들
	for(int p = 1; p <= N; p++)
	{
		for(int a = 1; a <= N; a++)
		{
			for(int b = 1; b <= N; b++)
				shortest_dist[a][b] = min(shortest_dist[a][b], shortest_dist[a][p] + shortest_dist[p][b]);
		}
	}
	for(int i = 1; i <= N; i++)
	{
		temp = 0;
		for(int j = 1; j <= N; j++)
			temp += shortest_dist[i][j];
		if (sum > temp)
		{
			sum = temp;
			ret = i;
		}
	}
	return (ret);
}

int main(void)
{
	ios::sync_with_stdio(false);
	cin.tie(0);
	cout.tie(0);

	cin >> N >> M;
	init();
	cout << WFI();
	
	return (0);
}
```

## 🌟 참고

- https://ko.wikipedia.org/wiki/%ED%94%8C%EB%A1%9C%EC%9D%B4%EB%93%9C-%EC%9B%8C%EC%85%9C_%EC%95%8C%EA%B3%A0%EB%A6%AC%EC%A6%98

- https://velog.io/@kimdukbae/%ED%94%8C%EB%A1%9C%EC%9D%B4%EB%93%9C-%EC%9B%8C%EC%85%9C-%EC%95%8C%EA%B3%A0%EB%A6%AC%EC%A6%98-Floyd-Warshall-Algorithm