---
title: "[백준] 2606번 바이러스 (C++)"
date: 2022-02-01 21:22:03
category: Algorithm/BOJ
description: "[ 🤍 SILVER 3 ]"
---

[바이러스](https://www.acmicpc.net/problem/2606)

## 🌟 문제

신종 바이러스인 웜 바이러스는 네트워크를 통해 전파된다. 한 컴퓨터가 웜 바이러스에 걸리면 그 컴퓨터와 네트워크 상에서 연결되어 있는 모든 컴퓨터는 웜 바이러스에 걸리게 된다.

예를 들어 7대의 컴퓨터가 \<그림 1\>과 같이 네트워크 상에서 연결되어 있다고 하자. 1번 컴퓨터가 웜 바이러스에 걸리면 웜 바이러스는 2번과 5번 컴퓨터를 거쳐 3번과 6번 컴퓨터까지 전파되어 2, 3, 5, 6 네 대의 컴퓨터는 웜 바이러스에 걸리게 된다. 하지만 4번과 7번 컴퓨터는 1번 컴퓨터와 네트워크상에서 연결되어 있지 않기 때문에 영향을 받지 않는다.

![그림 1](https://www.acmicpc.net/upload/images/zmMEZZ8ioN6rhCdHmcIT4a7.png)

어느 날 1번 컴퓨터가 웜 바이러스에 걸렸다. 컴퓨터의 수와 네트워크 상에서 서로 연결되어 있는 정보가 주어질 때, 1번 컴퓨터를 통해 웜 바이러스에 걸리게 되는 컴퓨터의 수를 출력하는 프로그램을 작성하시오.

## 🌟 입력

첫째 줄에는 컴퓨터의 수가 주어진다. 컴퓨터의 수는 100 이하이고 각 컴퓨터에는 1번 부터 차례대로 번호가 매겨진다. 둘째 줄에는 네트워크 상에서 직접 연결되어 있는 컴퓨터 쌍의 수가 주어진다. 이어서 그 수만큼 한 줄에 한 쌍씩 네트워크 상에서 직접 연결되어 있는 컴퓨터의 번호 쌍이 주어진다.

## 🌟 출력

1번 컴퓨터가 웜 바이러스에 걸렸을 때, 1번 컴퓨터를 통해 웜 바이러스에 걸리게 되는 컴퓨터의 수를 첫째 줄에 출력한다.

## 🌟 풀이

바이러스가 넓게 퍼져 나가는 느낌이다... 그래서 BFS로 풀기로 했다. 그런데 어찌 되었든 모두 탐색을 하기만 하면 되기 때문에 DFS로도 문제를 풀 수 있을 것 같다. (알고리즘 분류에도 깊이 우선 탐색이 있음) 하지만 나는 BFS가 좀 더 좋기 때문에 (ㅋㅋㅋ) 여기서는 BFS로만 문제를 풀었다.

BFS만 잘 구현한다면 다른 고민 없이 잘 해결할 수 있는 문제였다. (자세한 내용은 코드 주석 참고)

아, 나만 삽질한 것일수도 있지만... 출력값이 바이러스에 걸린 PC의 수가 아닌 1번 컴퓨터로 인해 감염된 PC의 수를 구하는 것이다. 방문 체크 배열로 감염된  PC의 개수를 구한다면 반드시 1번 PC는 빼 줘야 함에 주의하자...

## 🌟 코드

```cpp
/*
2022-2-1
2606_바이러스
https://www.acmicpc.net/problem/2606
*/

#include <iostream>
#include <vector>
#include <queue>
#include <cstring>
using namespace std;

int main(){
	ios::sync_with_stdio(false);
	cin.tie(0);
	cout.tie(0);

	int c, p;
	int pc1, pc2;
	int curr;
	int ans = 0;
	bool check[101]; // 바이러스 감염 여부 배열 (방문 체크)
	vector<vector<int> > info; // 연결 정보 저장 배열 (각 인덱스번 PC에 연결된 PC의 번호 목록)
	queue<int> q; // BFS를 위한 queue

	cin >> c;
	cin >> p;
	info.resize(c + 1);
	memset(check, false, sizeof(check));
	for(int i = 0; i < p; i++){
		cin >> pc1 >> pc2;
		// 쌍방향으로 연결해준다.
		info[pc1].push_back(pc2);
		info[pc2].push_back(pc1);
	}
	//BFS 시작
	q.push(1);
	while (!q.empty()){
		curr = q.front();
		// 감염 (방문 확인)
		check[curr] = true;
		// 연결된 PC들을 감염예정(...) PC로 queue에 넣어준다.
		for(int i = 0; i < info[curr].size(); i++){
		// 이미 체크해 준 PC인 경우 -> 다시 체크하지 않는다.
			if (check[info[curr][i]])
				continue;
			else
				q.push(info[curr][i]);
		}
		// 체크 완료했으니 queue에서 빼 주기.
		q.pop();
	}
	// 감염 PC 세어주기 (2번 PC부터!)
	for(int i = 2; i <= c; i++){
		if (check[i])
			ans++;
	}
	cout << ans;

	return (0);
}
```
