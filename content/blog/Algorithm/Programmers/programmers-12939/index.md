---
title: "[프로그래머스] 최댓값과 최솟값 (JavaScript, C++)"
date: 2023-04-07 22:40:25
category: Algorithm/Programmers
description: "[ ⭐️ LV.2 ]"

---

[최댓값과 최솟값](https://programmers.co.kr/learn/courses/30/lessons/12939)

## 🌟 문제

문자열 s에는 공백으로 구분된 숫자들이 저장되어 있습니다. str에 나타나는 숫자 중 최소값과 최대값을 찾아 이를 "(최소값) (최대값)"형태의 문자열을 반환하는 함수, solution을 완성하세요.
예를들어 s가 "1 2 3 4"라면 "1 4"를 리턴하고, "-1 -2 -3 -4"라면 "-4 -1"을 리턴하면 됩니다.

## 🌟 풀이

공백으로 구분되어 문자열로 입력되는 숫자들을 비교해서 가장 작은 수와 가장 큰 수를 다시 공백으로 구분하는 문자열로 만들어서 반환하는 문제이다.

예전에 C++로도 풀었던 문제인데 그때는 조금 파싱하느라 애를 썼던 것 같다... (과거의 코드를 보니 한숨만...) 지금 다시 보니까 좀 더 편하게 풀 수 있는 방법이 생각나서 아래에 간단히 코드랑 주석만 남겨둔다.

JavaScript에서는 특정 구분자로 String을 자를 수 있는 [split() 메서드](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/String/split)가 있으므로 간단히 문자열을 잘라 주었고, 

```javascript
const numbers = s.split(' ');   // 공백 단위로 문자열 나누기
```

잘린 배열을 하나씩 순회하면서 최댓값과 최솟값을 업데이트 해 주었다.

```js
let min = Number.POSITIVE_INFINITY; // 양의 무한대
let max = Number.NEGATIVE_INFINITY; // 음의 무한대
numbers.forEach((number) => {
    const num = parseInt(number);
    if (num < min) {
        min = num;
    }
    if (num > max) {
        max = num;
    }
});
```

나는 이렇게 풀었었는데 풀고 나서 다른 분들의 코드를 보니 `Math.max()`, `Math.min()` 메서드를 쓰신 분들이 많았다...

```js
answer = Math.min(...numbers) + " " + Math.max(...numbers);
```

내가 `min`, `max` 메서드를 쓸 생각을 못했던 것은 배열 각각의 원소마다 `parseInt` 메서드로 형변환을 해 줘야 한다는 생각이 가장 먼저 들었기 때문인 것 같은데 (근데 생각해보니 split 결과에 바로 `map` 을 써서 변환해주는 방법도 있었을 것 같다 ㅎㅎ)

다른 분들 코드를 봤을 때 무엇보다 파라미터에 숫자로 형변환 하지 않고 그대로 들어간다는 것이 좀 충격이었어가지고 간단히 결과를 확인해 봤는데

```js
console.log(Math.max("-1", "-2", "-3"));	//	-1
console.log(Math.max("a", "b", "c"));			//	Nan
```

위 출력 결과처럼 문자(혹은 문자열) 자체를 비교한다기보다는 문자열로 들어온 것을 숫자로 형변환해서 비교되는 것이 맞는 것 같다... 짱신기...

## 🌟 코드

### JavaScript (string -> number -> string)

```javascript
function solution(s) {
    let answer = '';
    const numbers = s.split(' ');   // 공백 단위로 문자열 나누기
    let min = Number.POSITIVE_INFINITY; // 양의 무한대
    let max = Number.NEGATIVE_INFINITY; // 음의 무한대
    numbers.forEach((number) => {
        const num = parseInt(number);
        if (num < min) {
            min = num;
        }
        if (num > max) {
            max = num;
        }
    });
    answer = min.toString() + " " + max.toString();
    return answer;
}
```

### JavaScript (Math.max/min)

```js
function solution(s) {
    let answer = '';
    const numbers = s.split(' ');
    answer = Math.min(...numbers) + " " + Math.max(...numbers);
    return answer;
}
```

### C++ (직접 파싱)

```cpp
#include <string>
#include <climits>

using namespace std;

string solution(string s) {
    string answer = "";
    int i = 0;
    int pos = 0;
    int ans_max = INT_MIN;
    int ans_min = INT_MAX;
    int num;
    while (i < s.length())
    {
        pos = i;
        while (i < s.length() && s[i] != ' '){
          // 문자열 끝이 아니고 공백이 아닐 때 까지 인덱스 이동
          i++;
        }   
      	// 인덱스 앞까지의 문자열을 잘라 숫자로 바꾸어준다.
        num = stoi(s.substr(pos, i - pos));
      	// 최댓값과 최솟값 업데이트
        if (num > ans_max)
            ans_max = num;
        if (num < ans_min)
            ans_min = num;
        i++;
    }
  	// 출력 형식 맞춰주기
    answer += to_string(ans_min);
    answer += " ";
    answer += to_string(ans_max);
    return answer;
}
```

### C++ (stringstream 사용)

```c++
#include <string>
#include <climits>
#include <sstream>

using namespace std;

string solution(string s) {
    string answer = "";
    int ans_max = INT_MIN;
    int ans_min = INT_MAX;
    int num;
    stringstream ss(s); // s 로 string stream 생성
    while (ss.good()) {
        ss >> num; // 공백 단위로 입력
        ans_max = max(ans_max, num);
        ans_min = min(ans_min, num);
    }
    answer = to_string(ans_min) + " " + to_string(ans_max);
    return answer;
}
```

