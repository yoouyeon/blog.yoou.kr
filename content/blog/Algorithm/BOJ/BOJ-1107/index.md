---
title: "[백준] 1107번 리모컨 (C++)"
date: 2022-04-01 21:31:41
category: Algorithm/BOJ
description: "[ 💛 GOLD 5 ]"
---

[리모컨](https://www.acmicpc.net/problem/1107)

## 🌟 문제

수빈이는 TV를 보고 있다. 수빈이는 채널을 돌리려고 했지만, 버튼을 너무 세게 누르는 바람에, 일부 숫자 버튼이 고장났다.

리모컨에는 버튼이 0부터 9까지 숫자, +와 -가 있다. +를 누르면 현재 보고있는 채널에서 +1된 채널로 이동하고, -를 누르면 -1된 채널로 이동한다. 채널 0에서 -를 누른 경우에는 채널이 변하지 않고, 채널은 무한대 만큼 있다.

수빈이가 지금 이동하려고 하는 채널은 N이다. 어떤 버튼이 고장났는지 주어졌을 때, 채널 N으로 이동하기 위해서 버튼을 최소 몇 번 눌러야하는지 구하는 프로그램을 작성하시오. 

수빈이가 지금 보고 있는 채널은 100번이다.

## 🌟 입력

첫째 줄에 수빈이가 이동하려고 하는 채널 N (0 ≤ N ≤ 500,000)이 주어진다. 둘째 줄에는 고장난 버튼의 개수 M (0 ≤ M ≤ 10)이 주어진다. 고장난 버튼이 있는 경우에는 셋째 줄에는 고장난 버튼이 주어지며, 같은 버튼이 여러 번 주어지는 경우는 없다.

## 🌟 출력

첫째 줄에 채널 N으로 이동하기 위해 버튼을 최소 몇 번 눌러야 하는지를 출력한다.

## 🌟 풀이

원하는 채널로 가기 위한 최소로 누를 버튼의 수를 구하는 문제이다.

일일이 경우를 따져보려면 아무래도 너무 많기 때문에 일일이 다 눌러보면서 적절한 방법을 찾아보는 브루트포스 문제라고 판단했다.

어차피 숫자 버튼과 +, - 버튼을 섞어서 쓰면 최소로 버튼을 눌러야 하기 때문에 별로 의미가 없다. 따라서 가고자 하는 채널이 주어졌을 때,

1. -와 +버튼만 눌러서 목표 채널로 가는 방법
2. 어떤 채널로 이동한 뒤에 -와 +버튼을 눌러 목표 채널로 가는 방법

두가지 방법이 있다. 

그래서 초기 답 (`ans` 변수) 을 현재 위치인 100에서 오직 +와 -버튼만을 이용하여 목표 채널로 갈 수 있는 횟수로 설정해 준 뒤에, 1부터 999,999까지 모든 채널을 돌아가면서 해당 채널로 이동한 뒤에, +, -버튼으로 목표 채널로 가는 경우의 버튼을 누르는 횟수를 구해 주고, 기존 `ans`와 비교해가면서 최솟값을 구해줬다.

이때 버튼이 고장나는 경우가 있을 수 있으므로, `can_go()` 라는 함수에서 해당 채널을 이루고 있는 숫자들 중에서 고장난 버튼이 없는지를 확인해주었다.

## 🌟 코드

```cpp
/*
2022-4-1
1107_리모컨
https://www.acmicpc.net/problem/1107
*/

#include <iostream>
#include <cstring>
#include <string>
using namespace std;

int n, m, ans;
bool button[10];

int can_go(int num)
{
	string temp = to_string(num);
	for(int i = 0; i < temp.length(); i++)
	{
		if (button[temp[i] - '0'] == false)
			return (-1);
	}
	return (temp.length());
}

void go()
{
	int temp;
	if (n < 100)
		ans = 100 - n;
	else
		ans = n - 100;
	for(int i = 0; i <= 999999; i++)
	{
		temp = can_go(i);
		if (temp == -1)
			continue;
		if (i < n)
			temp += (n - i);
		else if (i > n)
			temp += (i - n);
		if (temp < ans)
			ans = temp;
	}
}

int main()
{
	ios::sync_with_stdio(false);
	cin.tie(0);
	cout.tie(0);

	int input;
	memset(button, true, sizeof(button));
	cin >> n;
	cin >> m;
	if (m != 0)
	{
		for(int i = 0; i < m; i++)
		{
			cin >> input;
			button[input] = false;
		}
	}
	if (n == 100)
	{
		cout << 0;
		return (0);
	}
	go();
	cout << ans;
	
	return (0);
}
```