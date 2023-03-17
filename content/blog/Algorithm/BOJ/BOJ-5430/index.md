---
title: "[백준] 5430번 AC (C++)"
date: 2022-04-02 16:50:29
category: Algorithm/BOJ
description: "[ 💛 GOLD 5 ]"
---

[탈출](https://www.acmicpc.net/problem/5430)

## 🌟 문제

선영이는 주말에 할 일이 없어서 새로운 언어 AC를 만들었다. AC는 정수 배열에 연산을 하기 위해 만든 언어이다. 이 언어에는 두 가지 함수 R(뒤집기)과 D(버리기)가 있다.

함수 R은 배열에 있는 수의 순서를 뒤집는 함수이고, D는 첫 번째 수를 버리는 함수이다. 배열이 비어있는데 D를 사용한 경우에는 에러가 발생한다.

함수는 조합해서 한 번에 사용할 수 있다. 예를 들어, "AB"는 A를 수행한 다음에 바로 이어서 B를 수행하는 함수이다. 예를 들어, "RDD"는 배열을 뒤집은 다음 처음 두 수를 버리는 함수이다.

배열의 초기값과 수행할 함수가 주어졌을 때, 최종 결과를 구하는 프로그램을 작성하시오.

## 🌟 입력

첫째 줄에 테스트 케이스의 개수 T가 주어진다. T는 최대 100이다.

각 테스트 케이스의 첫째 줄에는 수행할 함수 p가 주어진다. p의 길이는 1보다 크거나 같고, 100,000보다 작거나 같다.

다음 줄에는 배열에 들어있는 수의 개수 n이 주어진다. (0 ≤ n ≤ 100,000)

다음 줄에는 [x<sub>1</sub>,...,x<sub>n</sub>]과 같은 형태로 배열에 들어있는 정수가 주어진다. (1 ≤ x<sub>i</sub> ≤ 100)

전체 테스트 케이스에 주어지는 p의 길이의 합과 n의 합은 70만을 넘지 않는다.

## 🌟 출력

각 테스트 케이스에 대해서, 입력으로 주어진 정수 배열에 함수를 수행한 결과를 출력한다. 만약, 에러가 발생한 경우에는 error를 출력한다.

## 🌟 풀이

이 문제에서 중요한 부분은 순서를 이리저리 바꾸는 배열을 다루는 부분과, 문자열 파싱하는 부분인 것 같다.

이리저리 순서를 바꾸고, 바뀐 순서에 따라서 앞뒤로 원소를 바꿀 수 있어야 하기 때문에 원소는 deque를 이용하여 저장했다. 그리고 `front_op` 변수를 이용해서 1일때는 front를 앞으로 하고, -1일때는 back을 앞으로 하도록 설정했다. 출력하는 부분 역시 `front_op` 변수의 값을 이용하여 front혹은 back부터 출력해줬다.

배열이 입력될 때 단순히 숫자만 입력되는 것이 아니라 '['와 ']', ','가 같이 입력되기 때문에 string 형태로 입력을 받아서 숫자부분만 잘라내는 문자열 파싱 작업이 필요하다. 입력받은 문자열을 처음부터 돌면서, 처음 숫자가 등장하는 부분부터 숫자가 아닌 부분까지의 길이를 구하여 `substr`을 이용하여 원하는 길이만큼 잘라낸 다음에 숫자로 변환해주는 방법으로 원소들을 deque에 넣어 주었다. (코드를 보는 게 더 설명이 잘 될 듯 하다. (`make_deque` 함수))

이렇게 만든 배열을 입력된 명령어대로 순서를 바꾸고 (R) 원소를 삭제하고 (D) 그 뒤에 문제에서 요구하는 형식대로 출력을 해 주면 된다. 나는 이 부분에서 자꾸 런타임 에러가 났었는데... 만약에 명령어를 모두 수행한 뒤에 deque가 비어 있다면 `[]` 를 출력해주면 된다. 내가 기존에 짠 출력함수에서는 원소가 적어도 1개는 있어야 출력이 정상적으로 되게 했었기 때문에... deque가 비어있을 경우를 따로 처리해서 오류를 해결해주었다.

## 🌟 코드

```cpp
/*
2022-4-2
5430_AC
https://www.acmicpc.net/problem/5430
*/

#include <iostream>
#include <string>
#include <deque>
using namespace std;

deque<int> q;

void make_deque(int n, string x)
{
	int i, j;
	i = 1;
	while(!q.empty())
	    q.pop_front();
	while (q.size() < n)
	{
		if (x[i] >= '0' && x[i] <= '9')
		{
			j = i + 1;
			while (x[j] >= '0' && x[j] <= '9' && j < x.length())
				j++;
			q.push_back(stoi(x.substr(i, j-i)));
			i = j;
		}
		i++;
	}
}

int do_ac(string p)
{
	int front_op = 1; // 1: 정방향, -1: 역방향

	for(int i = 0; i < p.length(); i++)
	{
		if (p[i] == 'R')
			front_op *= -1;
		else
		{
			if (q.empty())
			{
				cout << "error\n";
				return (0);
			}
			else if (front_op == 1)
				q.pop_front();
			else
				q.pop_back();
		}
	}
	return (front_op);
}

void print_deque(int front_op)
{
	cout << '[';
	if (q.empty())
	{
	    cout << "]\n";
	    return ;
	}
	if (front_op == 1)
	{
		while (q.size() > 1)
		{
			cout << q.front() << ',';
			q.pop_front();
		}
		cout << q.front() << "]\n";
		q.pop_front();
	}
	else
	{
		while (q.size() > 1)
		{
			cout << q.back() << ',';
			q.pop_back();
		}
		cout << q.back() << "]\n";
		q.pop_back();
	}
}

void AC()
{
	string p, x;
	int n, front_op;

	cin >> p;
	cin >> n;
	cin >> x;

	make_deque(n, x);

	front_op = do_ac(p);
	if (front_op == 0)
		return ;
	print_deque(front_op);
}

int main()
{
	int t;

	cin >> t;
	for(int i = 0; i < t; i++)
		AC();
	return (0);
}
```

