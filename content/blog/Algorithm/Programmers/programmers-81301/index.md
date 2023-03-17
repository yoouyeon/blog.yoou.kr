---
title: "[프로그래머스] 숫자 문자열과 영단어 (C++)"
date: 2022-05-01 20:56:09
category: Algorithm/Programmers
description: "[ ⭐️ LV.1 ]"
---

[신고 결과 받기](https://programmers.co.kr/learn/courses/30/lessons/92334)

## 🌟 문제

네오와 프로도가 숫자놀이를 하고 있습니다. 네오가 프로도에게 숫자를 건넬 때 일부 자릿수를 영단어로 바꾼 카드를 건네주면 프로도는 원래 숫자를 찾는 게임입니다.

이렇게 숫자의 일부 자릿수가 영단어로 바뀌어졌거나, 혹은 바뀌지 않고 그대로인 문자열 `s`가 매개변수로 주어집니다. `s`가 의미하는 원래 숫자를 return 하도록 solution 함수를 완성해주세요.

## 🌟 풀이

숫자가 있는 부분은 그대로 넣어주고, 문자가 있는 부분은 문자 부분대로 잘라서 숫자로 변환해서 넣어주면 된다.

문제는 문자 부분을 어디까지 잘라야 하는지인데... 숫자가 등장할 때 까지 포인터를 옮기자니 seveneight 같은 경우에는 자르기가 곤란하다.

그래서 문자가 시작하는 시점부터, 영단어에 대응되는 숫자를 저장해둔 map `digit_list`에 해당하는 key가 있을 때 까지 반복해서 포인터를 옮겨주는 방법을 사용하기로 했다.

- - -

이렇게 해서 문제를 풀긴 했는데 풀고 나서 다른 분들의 코드를 구경하다가 `regex`라는 것을 발견하고 좀 찾아봤더니 정규 표현식을 지원하는 라이브러리였다...

regex 라이브러리의 `regex_replace` 함수를 사용하면 원하는 패턴의 문자열을 치환할 수 있다.

```cpp
#include <regex>
#include <string>
	...
	s = regex_replace(s, regex("zero"), "0");
	...
	answer = stoi(s);
	return (answer);
```

이러면 지정한 패턴에 맞게 s에 치환이 된다. 이 문제에서는 영단어들 중에서 어떤 단어에 포함되는 그런 영단어가 없어서 이런 식으로 풀어도 되나? 하고 생각했는데 또 생각해보니까 순서만 잘 조정해주면 포함되는 관계에 있는 패턴이라도 잘 치환이 될 것 같다. 

우와... 정규식을 사용할 수 있다는 것이 엄청 유용할 것 같아서 좀 더 자세히 읽어봐야겠다.

참고: https://modoocode.com/303

## 🌟 코드

```cpp
#include <string>
#include <vector>
#include <map>

using namespace std;

int solution(string s) {
    int answer = 0;
    
    map<string, int> digit_list = {{"zero", 0}, {"one", 1}, {"two", 2}, {"three", 3}, {"four", 4}, {"five", 5}, {"six", 6}, {"seven", 7}, {"eight", 8}, {"nine", 9}};
    int idx = 0, len = s.length();
    int start;
    string str;
    
    
    while (idx < len)
    {
        if (s[idx] >= '0' && s[idx] <= '9')
        {
            answer = answer * 10 + (s[idx] - '0');
            idx++;
            continue;
        }
        start = idx;
        idx++;
        while (idx < s.length() && (s[idx] >= 'a' && s[idx] <= 'z'))
        {
            idx++;
            str = s.substr(start, idx - start + 1);
            if (digit_list.find(str) != digit_list.end())
            {
                answer = answer * 10 + digit_list[str];
                break;
            }
        }
        idx++;
    }
    
    return answer;
}
```

