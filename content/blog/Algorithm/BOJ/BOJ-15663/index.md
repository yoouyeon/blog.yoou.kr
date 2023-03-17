---
title: "[백준] 15663번 N과 M (9) (C++)"
date: 2022-10-19 16:01:26
category: Algorithm/BOJ
description: "[ 🤍 SLIVER 2 ] "
---

[N과 M (9)](https://www.acmicpc.net/problem/15663)

- - -

## 🌟 문제

N개의 자연수와 자연수 M이 주어졌을 때, 아래 조건을 만족하는 길이가 M인 수열을 모두 구하는 프로그램을 작성하시오.

- N개의 자연수 중에서 M개를 고른 수열

## 🌟 입력

첫째 줄에 N과 M이 주어진다. (1 ≤ M ≤ N ≤ 8)

둘째 줄에 N개의 수가 주어진다. 입력으로 주어지는 수는 10,000보다 작거나 같은 자연수이다.

## 🌟 출력

한 줄에 하나씩 문제의 조건을 만족하는 수열을 출력한다. 중복되는 수열을 여러 번 출력하면 안되며, 각 수열은 공백으로 구분해서 출력해야 한다.

수열은 사전 순으로 증가하는 순서로 출력해야 한다.

## 🌟 풀이

앞선 N과 M 문제들에 비해서 좀 까다로운데 이유는 `4 4 2` 이런 입력도 주어지기 때문이다.

예제 입력 1을 보면 4라는 숫자를 두번 뽑을 수 있지만 결과에는 4로만 이루어진 수열이 1개 뿐이다.

그렇다고 중복 숫자를 아예 무시하면 안되는 이유가 예제 입력 2번에 나오는데, 9 2개를 활용헤서도 수열을 만들어야 하기 때문이다.

아무튼 일단 입력된 숫자들로 수열을 만든 다음에 (dfs를 이용하면 된다!), 최종적으로 만들어진 수열이 이미 만든 적이 있는 수열인지를 확인하는 과정이 필요했다.

- - -

처음에는 출력해줄 수열 문자열을 저장하는 answer vector를 만들어 준 뒤에, find 함수를 이용해서 answer vector 안에 없는 경우에만 새로 vector에 추가해주는 방법을 생각했는데 너무 당연하게도 시간초과가 났다.

그래서 중복을 제외해줄 다른 방법을 이리저리 찾아보긴 했는데 조건을 어떻게 도출을 해 냈는지 잘 이해가 안가서 결론이 안났었는데, 생각해보니 answer들을 담는 컨테이너를 set으로 바꾸어 주면 해결될 문제 같았다.

그래서 set으로 바꾸어서 오름차순 자동 정렬과 중복 제거 2개의 효과를 꾀했는데, 생각대로 되지 않았다.

```
3 2
9 10 11
```

이런 입력이 들어왔을 때 문자열을 단순히 오름차순 정렬하는 set에서는 `9 10` 보다 `10 9` 를 더 앞으로 정렬한다.

그래서 set의 기본 문자열 정렬을 사용할 수 없었고, 공백을 기준으로 잘라서 숫자 자체를 비교하는 Compare 구조체를 만들어서 setd의 인자로 넣어 주었다.

```cpp
struct Compare{
    bool operator() (const string &a, const string &b) const
    {
        stringstream sa, sb;
        sa.str(a);
        sb.str(b);
        int na, nb;
        while (sa >> na && sb >> nb)
        {
            if (na != nb)
                break;
        }
        return (na < nb);
    }
};

set<string, Compare> answer;
```

끝. 어려웠다... 


## 🌟 코드
```cpp
#include <iostream>
#include <vector>
#include <cstring>
#include <algorithm>
#include <set>
#include <sstream>
using namespace std;

int N, M;
string str;
bool visited[8];
vector<int> arr;

struct Compare{
    bool operator() (const string &a, const string &b) const
    {
        stringstream sa, sb;
        sa.str(a);
        sb.str(b);
        int na, nb;
        while (sa >> na && sb >> nb)
        {
            if (na != nb)
                break;
        }
        return (na < nb);
    }
};

set<string, Compare> answer;

void input(void)
{
    ios::sync_with_stdio(false);
    cin.tie(0);
    cout.tie(0);
    int temp;
    cin >> N >> M;
    for(int i = 0; i < N; i++)
    {
        cin >> temp;
        arr.push_back(temp);
    }
}

void str_push_back(string num)
{
	for(int i = 0; i < num.length(); i++)
		str.push_back(num[i]);
	str.push_back(' ');
}

void str_pop_back(string num)
{
	str.pop_back();
	for(int i = 0; i < num.length(); i++)
		str.pop_back();
}

void pick(int cnt)
{
	if (cnt == M)
	{
		answer.insert(str);
        return;
	}
	for(int i = 0; i < N; i++)
	{
		if (visited[i])
			continue;
		visited[i] = true;
		str_push_back(to_string(arr[i]));
		pick(cnt + 1);
		str_pop_back(to_string(arr[i]));
		visited[i] = false;
	}
}

void print_all(void)
{
    auto iter = answer.begin();
    while (iter != answer.end())
    {
        cout << *iter << '\n';
        iter++;
    }
}

int main(void)
{
    input();
    sort(arr.begin(), arr.end());
    memset(visited, false, sizeof(visited));
    pick(0);
    print_all();
    return (0);
}
```