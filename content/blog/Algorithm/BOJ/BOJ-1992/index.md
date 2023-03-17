---
title: "[백준] 1992번 쿼드트리 (C++)"
date: 2022-09-27 22:50:26
category: Algorithm/BOJ
description: "[ 🤍 SILVER 1 ]"
---

[쿼드트리](https://www.acmicpc.net/problem/1992)

---

## 🌟 문제

흑백 영상을 압축하여 표현하는 데이터 구조로 쿼드 트리(Quad Tree)라는 방법이 있다. 흰 점을 나타내는 0과 검은 점을 나타내는 1로만 이루어진 영상(2차원 배열)에서 같은 숫자의 점들이 한 곳에 많이 몰려있으면, 쿼드 트리에서는 이를 압축하여 간단히 표현할 수 있다.

주어진 영상이 모두 0으로만 되어 있으면 압축 결과는 "0"이 되고, 모두 1로만 되어 있으면 압축 결과는 "1"이 된다. 만약 0과 1이 섞여 있으면 전체를 한 번에 나타내지를 못하고, 왼쪽 위, 오른쪽 위, 왼쪽 아래, 오른쪽 아래, 이렇게 4개의 영상으로 나누어 압축하게 되며, 이 4개의 영역을 압축한 결과를 차례대로 괄호 안에 묶어서 표현한다

![img](https://www.acmicpc.net/JudgeOnline/upload/201007/qq.png)

위 그림에서 왼쪽의 영상은 오른쪽의 배열과 같이 숫자로 주어지며, 이 영상을 쿼드 트리 구조를 이용하여 압축하면 "`(0(0011)(0(0111)01)1)`"로 표현된다. N ×N 크기의 영상이 주어질 때, 이 영상을 압축한 결과를 출력하는 프로그램을 작성하시오.

## 🌟 입력

첫째 줄에는 영상의 크기를 나타내는 숫자 N 이 주어진다. N 은 언제나 2의 제곱수로 주어지며, 1 ≤ N ≤ 64의 범위를 가진다. 두 번째 줄부터는 길이 N의 문자열이 N개 들어온다. 각 문자열은 0 또는 1의 숫자로 이루어져 있으며, 영상의 각 점들을 나타낸다.

## 🌟 출력

영상을 압축한 결과를 출력한다.

## 🌟 풀이

하나의 맵을 계속 1/4로 쪼개서 맵의 요소가 모두 같은 수인지를 확인해야 하므로 분할정복 문제이다.

사실 문제를 보자마자 최근에 엄청 고생해서 풀었던 [1074번 Z](https://www.acmicpc.net/problem/1074)가 생각나서 분할정복 문제 역시 좀 훈련을 해야겠구나.. 생각하고 정리를 시작했는데, 글을 쓰면서 보니까 올해 초에 약간 순한맛 분할정복 문제를 별로 어렵지 않게 풀었더라..? 알고리즘 문제 좀 안풀었다고 뇌가 퇴화한것일까.. 슬퍼졌다. (순한 맛 분할정복 : [2630번 색종이 만들기](https://www.acmicpc.net/problem/2630))

- - -

어떤 식으로 정답 문자열이 나오는건지 이해가 잘 안되었었는데 직접 나눠가면서 해 보니까 이해가 잘 되었다. 전체적인 흐름은 아래와 같다.

![map_example](/boj_1992_map_example.jpg)

1. 현재 범위(초깃값은 전체 맵)의 모든 요소들이 동일한 값을 가지고 있는지 확인한다.

   a. 만약 동일하다면 그 값을 정답 문자열에 넣고 함수를 종료한다.

   b. 동일하지 않다면 2번으로 진행한다.

2. 괄호를 연다.

3. 현재 범위를 4분할하여 (좌상, 우상, 좌하, 우하) 각각의 영역에서 1번부터 다시 진행한다. (**시작 지점 설정, 영역 크기 설정에 주의하자!**)

4. 괄호를 닫는다.

이 단계를 완료하면 아래와 같은 문자열이 만들어진다.

```
(0(0011)(0(0111)01)1)
```

처음부터 모든 요소들이 동일했더라면 괄호를 열지 않아도 되기 때문에 먼저 main문에서 맵의 요소가 모두 같은 값인지 확인을 해 주었고(`compress` 함수), 그 이후부터는 `make_quad_tree` 함수에서 2, 3, 4 단계를 처리해주었다.

## 🌟 코드

```cpp
#include <iostream>
using namespace std;

void make_quad_tree(int pos_y, int pos_x, int size);

int N;
string map[64];
string ret;

// 시작지점부터 한 변의 길이가 size 만큼의 영역이 모두 같은 값인지 확인.
// 만약에 모두 값이 같으면 그 값을 반환하고 (1 혹은 0)
// 만약에 하나라도 다른 값이 있으면 -1을 반환한다.
int	compress(int pos_y, int pos_x, int size)
{
	char start = map[pos_y][pos_x];
	for(int i = 0; i < size; i++)
	{
		for(int j = 0; j < size; j++)
		{
			if (map[pos_y + i][pos_x + j] != start)
				return (-1);
		}
	}
	return (start - '0');
}


// 맵 확인
// 함수 재귀 호출 (요소들이 동일하지 않은 경우) OR 문자 추가(요소들이 동일한 경우)
void divide_quad(int pos_y, int pos_x, int size)
{
	int temp = compress(pos_y, pos_x, size / 2);
	if (temp == -1)
		make_quad_tree(pos_y, pos_x, size / 2);
	else
		ret.push_back('0' + temp);
}

// 괄호 열고 영역을 나누어 좌상, 우상, 좌하, 우하 순서대로 divide_quad 함수 호출
void make_quad_tree(int pos_y, int pos_x, int size)
{
	int temp;
	ret.push_back('(');
	// 1. 왼쪽 위
	divide_quad(pos_y, pos_x, size);
	// 2. 오른쪽 위
	divide_quad(pos_y, pos_x + (size / 2), size);
	// 3. 왼쪽 아래
	divide_quad(pos_y + (size / 2), pos_x, size);
	// 4. 오른쪽 아래
	divide_quad(pos_y + (size / 2), pos_x + (size / 2), size);
	ret.push_back(')');
}

int main(void)
{
	ios::sync_with_stdio(false);
	cin.tie(0);
	cout.tie(0);

	cin >> N;
	for(int i = 0; i < N; i++)
		cin >> map[i];
	ret = to_string(compress(0, 0, N));
	if (ret == "-1")
	{
		ret = "";
		make_quad_tree(0, 0, N);
	}
	cout << ret;
	return (0);
}
```

