---
title: "[백준] 2407번 조합 (C++)"
date: 2022-10-11 03:03:40
category: Algorithm/BOJ
description: "[ 🤍 SILVER 4 ]"
---

[조합](https://www.acmicpc.net/problem/2407)

- - -

## 🌟 문제

nCm을 출력한다.

## 🌟 입력

n과 m이 주어진다. (5 ≤ n ≤ 100, 5 ≤ m ≤ 100, m ≤ n)

## 🌟 출력

nCm을 출력한다.

## 🌟 풀이

간만에 보는 실버 문제 + 조합이면 간단하게 조합의 성질 (`nCr = n-1Cr-1 + n-1Cr`) 을 이용해서 풀 수 있으니까 오늘은 거저먹는 날이군 (^_^) 하고 좋아했는데 생각보다 녹록치 않았다...

<sub>100</sub>C<sub>50</sub> 의 결과가 100,891,344,545,564,193,334,812,497,256 (계산기를 이용했다. 진짠지는 믿거나 말거나) 라고 한다. 이 값은 unsigned long long 의 최댓값인 18,446,744,073,709,551,615 보다 훨씬 큰 값이므로 이 문제에서 등장하는 수들은 정수 자료형의 범위로는 연산을 할 수 없다.

그래서 이 문제에서 필요한 점화식을 연산하기 위해서는 큰 수의 연산, 즉 string을 이용한 덧셈을 구현해야 했었는데.. 의외로 큰 수 연산 구현을 해 본적이 없었더라? 그래서 어떻게 하는지 좀 헤맸었다ㅎㅎ

아무튼, 이 문제는 Dynamic programming의 특징을 알고(점화식, 메모이제이션), 큰 수의 덧셈을 구현할 수 있다면 그렇게 어렵지 않은 문제였다!

- - -

아 이렇게 풀었는데 계속 Segfault가 나는 바람에 뭐가 문젠건지.. 또 이리저리 고쳐봤는데 결론은 `memo` 배열을 초기화 하기 위한 memset 함수가 문제였다. 내 뇌피셜로는 String 객체의 내용을 통째로 0으로 초기화하는 과정에서 문제가 생기지 않았을까.. (기본적으로 초깃값이 설정되어 있는 변수(npos?)가 있었다던가?!) 하고 생각하고 있다.

아무튼.  C++을 사용하는 이상 memset은 좀 신중히 사용해야 할 것 같다.

### ✨ 큰 수 덧셈 구현 (feat. string)

1의 자리부터 덧셈을 해 주고, 반환 직전에 reverse 함수로 순서를 반전시켜주는 아이디어이다.

1의 자리 (string이므로 가장 오른쪽, 가장 마지막, 즉 `back`) 부터 더할 수 있는 곳까지 더해준다. 올림이 있을 수 있으므로 한자리를 연산한 결과를 담아두는 `temp` 변수의 1의 자리만 반환할 문자열(`ret`)에 넣어주고, 10의 자리 부분은 남겨두어서 다음 자리 연산에 활용할 수 있게 했다.

```cpp
int temp = 0;
string ret;
while (!a.empty() && !b.empty())
{
	temp += (a.back() - '0') + (b.back() - '0');
	ret.push_back((temp % 10) + '0');
	a.pop_back();
	b.pop_back();
	temp /= 10;
}
```

그 다음에는 두 숫자의 길이가 같지 않을 경우에 더하지 않고 모두 `ret`에 넣어주었다. (당연히 두 반복문 중 하나만 실행된다.)

```cpp
while (!a.empty())
{
	temp += a.back() - '0';
	ret.push_back((temp % 10) + '0');
	a.pop_back();
	temp /= 10;
}
while (!b.empty())
{
	temp += b.back() - '0';
	ret.push_back((temp % 10) + '0');
	b.pop_back();
	temp /= 10;
}
```

마지막으로! 마지막 연산에서 올림이 있었을 수 있으므로 그 경우에도 빼놓지 않고 ret에 넣어주었다.

```cpp
while (temp != 0)
{
	ret.push_back((temp % 10) + '0');
	temp /= 10;
}
```

이렇게 짜놓고 보니 반복되는게 많아서 좀 거슬려서... 한방에 묶어서 아래와 같이 만들어주었다.

```cpp
string str_num_add(string a, string b)	// a + b
{
	int temp = 0;
	string ret;
	while (!a.empty() || !b.empty() || temp != 0)
	{
		if (!a.empty())
		{
			temp += a.back() - '0';
			a.pop_back();
		}
		if (!b.empty())
		{
			temp += b.back() - '0';
			b.pop_back();
		}
		ret.push_back((temp % 10) + '0');
		temp /= 10;
	}
	reverse(ret.begin(), ret.end());
	return (ret);
}
```

## 🌟 코드

```cpp
#include <iostream>
#include <string>
#include <algorithm>
using namespace std;

int n, m;
string memo[101][101];

string str_num_add(string a, string b)	// a + b
{
	int temp = 0;
	string ret;
	while (!a.empty() || !b.empty() || temp != 0)
	{
		if (!a.empty())
		{
			temp += a.back() - '0';
			a.pop_back();
		}
		if (!b.empty())
		{
			temp += b.back() - '0';
			b.pop_back();
		}
		ret.push_back((temp % 10) + '0');
		temp /= 10;
	}
	reverse(ret.begin(), ret.end());
	return (ret);
}

string combination(int a, int b) // a C b
{
	if (a == b || b == 0)
		return ("1");
	if (memo[a][b] != "")
		return (memo[a][b]);
	memo[a][b] = str_num_add(combination(a - 1, b - 1), combination(a - 1, b));
	return (memo[a][b]);
}

int main(void)
{
	ios::sync_with_stdio(false);
	cin.tie(0);
	cout.tie(0);
  //memset(memo, 0, sizeof(memo)); // segfault!!!!
	cin >> n >> m;
	cout << combination(n, m);
	return (0);
}
```

