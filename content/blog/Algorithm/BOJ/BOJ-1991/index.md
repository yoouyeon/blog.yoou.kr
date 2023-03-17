---
title: "[백준] 1991번 트리 순회 (C++)"
date: 2022-10-21 11:58:24
category: Algorithm/BOJ
description: "[ 🤍 SILVER 1 ]"
---

[트리 순회](https://www.acmicpc.net/problem/1991)

## 🌟 문제

이진 트리를 입력받아 전위 순회(preorder traversal), 중위 순회(inorder traversal), 후위 순회(postorder traversal)한 결과를 출력하는 프로그램을 작성하시오.

![](https://www.acmicpc.net/JudgeOnline/upload/201007/trtr.png)

예를 들어 위와 같은 이진 트리가 입력되면,

전위 순회한 결과 : ABDCEFG // (루트) (왼쪽 자식) (오른쪽 자식)

중위 순회한 결과 : DBAECFG // (왼쪽 자식) (루트) (오른쪽 자식)

후위 순회한 결과 : DBEGFCA // (왼쪽 자식) (오른쪽 자식) (루트)

가 된다.

## 🌟 입력

첫째 줄에는 이진 트리의 노드의 개수 N(1 ≤ N ≤ 26)이 주어진다. 둘째 줄부터 N개의 줄에 걸쳐 각 노드와 그의 왼쪽 자식 노드, 오른쪽 자식 노드가 주어진다. 노드의 이름은 A부터 차례대로 알파벳 대문자로 매겨지며, 항상 A가 루트 노드가 된다. 자식 노드가 없는 경우에는 .으로 표현한다.

## 🌟 출력

첫째 줄에 전위 순회, 둘째 줄에 중위 순회, 셋째 줄에 후위 순회한 결과를 출력한다. 각 줄에 N개의 알파벳을 공백 없이 출력하면 된다.

## 🌟 풀이

트리 순회 방식이 기억이 안나서 찾아봤기 때문에... 다시는 찾아보지 않고 머릿속에 콱 집어넣어 버리겠다는 의미에서 기록합니다.

재귀로 짜면 되기 때문에 코드 자체는 매우매우 간단했는데 이제 순서가 문제...

### ✨ 전위순회 (preorder)

순서는 루트 ➡️ 왼쪽 자식(의 자식들) ➡️ 오른쪽 자식(의 자식들)

```cpp
void preorder(char curr)
{
	if (curr != '.')	// 연결되어 있으면
	{
		// 1. 루트 방문
		cout << curr;
		// 2. 왼쪽 자식을 루트로 하는 전위순회
		preorder(tree[curr - 'A'].first);
		// 3. 오른쪽 자식을 루트로 하는 전위순회
		preorder(tree[curr - 'A'].second);
	}
}
```

### ✨ 중위순회 (inorder)

순서는 왼쪽 자식(의 자식들) ➡️ 루트 ➡️ 오른쪽 자식(의 자식들)

```cpp
void inorder(char curr)
{
	if (curr != '.')
	{
		inorder(tree[curr - 'A'].first);
		cout << curr;
		inorder(tree[curr - 'A'].second);
	}
}
```

### ✨ 전위순회 (postorder)

순서는 왼쪽 자식(의 자식들)  ➡️ 오른쪽 자식(의 자식들) ➡️ 루트

```cpp
void postorder(char curr)
{
	if (curr != '.')
	{
		postorder(tree[curr - 'A'].first);
		postorder(tree[curr - 'A'].second);
		cout << curr;
	}
}
```

## 🌟 코드

```cpp
// 백준 1991 트리 순회
#include <iostream>
#include <utility>
using namespace std;

int N;
pair<char, char> tree[26];

void input(void)
{
	ios::sync_with_stdio(false);
	cin.tie(0);
	cout.tie(0);

	char node, left, right;
	cin >> N;
	for(int i = 0; i < N; i++)
	{
		cin >> node >> left >> right;
		tree[node - 'A'].first = left;
		tree[node - 'A'].second = right;
	}
}

void preorder(char curr)
{
	if (curr != '.')
	{
		cout << curr;
		preorder(tree[curr - 'A'].first);
		preorder(tree[curr - 'A'].second);
	}
}

void inorder(char curr)
{
	if (curr != '.')
	{
		inorder(tree[curr - 'A'].first);
		cout << curr;
		inorder(tree[curr - 'A'].second);
	}
}

void postorder(char curr)
{
	if (curr != '.')
	{
		postorder(tree[curr - 'A'].first);
		postorder(tree[curr - 'A'].second);
		cout << curr;
	}
}

int main(void)
{
	input();
	preorder('A');
	cout << endl;
	inorder('A');
	cout << endl;
	postorder('A');
	return (0);
}
```
