---
title: "[백준] 17626번 Four Squares (C++)"
date: 2022-02-01 20:27:19
category: Algorithm/BOJ
description: "[ 🤍 SILVER 4 ]"
---

[Four Squares](https://www.acmicpc.net/problem/17626)

## 🌟 문제

라그랑주는 1770년에 모든 자연수는 넷 혹은 그 이하의 제곱수의 합으로 표현할 수 있다고 증명하였다. 어떤 자연수는 복수의 방법으로 표현된다. 예를 들면, 26은 5<sup>2</sup>과 1<sup>2</sup>의 합이다; 또한 4<sup>2</sup> + 3<sup>2</sup> + 1<sup>2</sup>으로 표현할 수도 있다. 역사적으로 암산의 명수들에게 공통적으로 주어지는 문제가 바로 자연수를 넷 혹은 그 이하의 제곱수 합으로 나타내라는 것이었다. 1900년대 초반에 한 암산가가 15663 = 125<sup>2</sup> + 6<sup>2</sup> + 1<sup>2</sup> + 1<sup>2</sup>라는 해를 구하는데 8초가 걸렸다는 보고가 있다. 좀 더 어려운 문제에 대해서는 56초가 걸렸다: 11339 = 105<sup>2</sup> + 15<sup>2</sup> + 8<sup>2</sup> + 5<sup>2</sup>.

자연수 *n*이 주어질 때, *n*을 최소 개수의 제곱수 합으로 표현하는 컴퓨터 프로그램을 작성하시오.

## 🌟 입력

입력은 표준입력을 사용한다. 입력은 자연수 *n*을 포함하는 한 줄로 구성된다. 여기서, 1 ≤ *n* ≤ 50,000이다.

## 🌟 출력

출력은 표준출력을 사용한다. 합이 *n*과 같게 되는 제곱수들의 최소 개수를 한 줄에 출력한다.

## 🌟 풀이

아무리 봐도 마땅한 풀이 방법이 생각나지 않아서 다른 분들의 풀이를 참고했다. 그래도 잘 모르겠어서 일단 DP 문제라는 힌트만 얻고 다시 정리해봤다.

일단 DP라고 했으니 1부터 차근차근 적어 보았다.

| n      | 제곱수의 합                                                  | 최소 개수 (DP[n]) |
| --- | ------------------------------------------------------------ | ----------------- |
| n = 1  | 1<sup>2</sup>                                                | 1                 |
| n = 2  | 1<sup>2</sup> + 1<sup>2</sup>                                | 2                 |
| n = 3  | 1<sup>2</sup> + 1<sup>2</sup> + 1<sup>2</sup>                | 3                 |
| n = 4  | 2<sup>2</sup>                                                | 1                 |
| n = 5  | 1<sup>2</sup> + 2<sup>2</sup>                                | 2                 |
| n = 6  | 1<sup>2</sup> + 1<sup>2</sup> + 2<sup>2</sup>                | 3                 |
| n = 7  | 1<sup>2</sup> + 1<sup>2</sup> + 1<sup>2</sup> + 2<sup>2</sup> | 4                 |
| n = 8  | 1<sup>2</sup> + 1<sup>2</sup> + 1<sup>2</sup> + 1<sup>2</sup> + 2<sup>2</sup>  (or)  2<sup>2</sup> + 2<sup>2</sup> | 2                 |
| n = 9  | 3<sup>2</sup>                                                | 1                 |
| n = 10 | 1<sup>2</sup> + 3<sup>2</sup>                                | 2                 |

기본적으로 제곱수는 1개의 제곱수의 합으로 나타낼 수 있으므로 n이 제곱수일 경우에는 DP[n]은 기본적으로 1이다.

그 외의 경우에는 이전 숫자에 1<sup>2</sup> 을 더해서 나타낼 수 있으므로 **DP[n] = DP[n-1] + 1** 이라는 식을 세울 수 있는데 n = 8인 경우와 같은 예외상황이 있었다.

n = 1부터 차근차근 DP 배열을 채워나가다 보면, 현재 n보다 앞에 채웠던 값들은 모두 최선의 결과(최소 개수)일 것이다.

따라서 n = a + b일 경우에 dp[n] = dp[a] + dp[b]가 성립할 수 있고, 이 값은 최선의 결과라고 할 수 있다.

그래서 기본값(DP[n-1] + 1)과 DP[(n보다 작은 제곱수)] + DP[(n - n보다 작은 그 제곱수)]를 비교해서 더 작은 값을 DP[n]에 할당해 주면 그것이 바로 최선의 값이 된다. (n보다 작은 제곱수인 이유는 제곱수일 경우의 DP[n]이 1이기 때문이다.)

예를 들어보면... n = 8일 경우에 DP[n]은

- DP[7] + DP[1] (기본값)
- DP[4] + DP[4]

이 두 개의 값을 비교해서 구할 수 있는 것이다.

이렇게 알게 된 점화식을 코드로 적어 보면 아래와 같이 된다.

```cpp
for(int i = 2; i <= n; i++){
  // 제곱수일 경우에는 그냥 넘어간다.
	if (dp[i] == 1)
		continue;
  // 기본값 넣어주기
	dp[i] = dp[i - 1] + 1;
	for(int j = 0; j*j <= i; j++)
		dp[i] = min(dp[i], dp[j*j] + dp[i - j*j]);
}
```

## 🌟 코드

```cpp
/*
2022-1-31
17626_Four Squares
https://www.acmicpc.net/problem/17626
*/

#include <iostream>
#include <cstring>
#include <cmath>
using namespace std;

int main(){
    ios::sync_with_stdio(false);
    cin.tie(0);
    cout.tie(0);
    
    int n;
    int dp[50001];
    
    memset(dp, 0, sizeof(dp));
    dp[0] = 0;
    cin >> n;
    for(int i = 1; i * i <= n; i++)
        dp[i * i] = 1;

    for(int i = 2; i <= n; i++){
        if (dp[i] == 1)
            continue;
		dp[i] = dp[i - 1] + 1;
        for(int j = 0; j*j <= i; j++)
            dp[i] = min(dp[i], dp[j*j] + dp[i - j*j]);
    }
    
    cout << dp[n];
        
    return (0);
}
```
