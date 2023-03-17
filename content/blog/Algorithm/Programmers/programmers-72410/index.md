---
title: "[프로그래머스] 신규 아이디 추천 (C++)"
date: 2021-03-30 23:38:32
category: Algorithm/Programmers
description: "[ ⭐️ LV.1 ]"
---

[신규 아이디 추천](https://programmers.co.kr/learn/courses/30/lessons/72410)

## 🌟 문제
신규 유저가 입력한 아이디를 나타내는 new_id가 매개변수로 주어질 때, "네오"가 설계한 7단계의 처리 과정을 거친 후의 추천 아이디를 return 하도록 solution 함수를 완성해 주세요.

**[7단계의 처리 과정]**
- 1단계: new\_id의 모든 대문자를 대응되는 소문자로 치환합니다.
- 2단계: new\_id에서 알파벳 소문자, 숫자, 빼기(-), 밑줄(_), 마침표(.)를 제외한 모든 문자를 제거합니다.
- 3단계: new\_id에서 마침표(.)가 2번 이상 연속된 부분을 하나의 마침표(.)로 치환합니다.
- 4단계: new\_id에서 마침표(.)가 처음이나 끝에 위치한다면 제거합니다.
- 5단계: new\_id가 빈 문자열이라면, new_id에 "a"를 대입합니다.
- 6단계: new\_id의 길이가 16자 이상이면, new_id의 첫 15개의 문자를 제외한 나머지 문자들을 모두 제거합니다.
     만약 제거 후 마침표(.)가 new_id의 끝에 위치한다면 끝에 위치한 마침표(.) 문자를 제거합니다.
- 7단계: new\_id의 길이가 2자 이하라면, new_id의 마지막 문자를 new_id의 길이가 3이 될 때까지 반복해서 끝에 붙입니다.

## 🌟 풀이
string의 함수들을 잘 사용해서 문제의 조건들을 단계별로 구현해주면 되는 문제였다.
별도로 생각해 줄 것 없이 문제 그대로만 잘 구현하면 해결이 되는 문제라 string 관련 함수들만 잘 알고 있다면 무리없이 풀 수 있는 문제이다.
사용한 함수들이 궁금하다면 [여기](http://www.cplusplus.com/reference/string/basic_string/)
## 🌟 코드
```cpp
#include <string>
#include <vector>

using namespace std;

string solution(string new_id) {
    string answer = "";
    int i = 0;
    //step 1: 대문자를 소문자로 치환
    for(i = 0; i < new_id.length(); i++){
        if(new_id[i] >= 'A' && new_id[i] <= 'Z')
            new_id[i] = tolower(new_id[i]);
    }
    //step 2: 소문자, 숫자, 빼기, 밑줄, 마침표만 answer에 추가
    for(i = 0; i < new_id.length(); i++){
        if((new_id[i] >= 'a' && new_id[i] <= 'z') || (new_id[i] >= '0' && new_id[i] <= '9') || new_id[i] == '-' || new_id[i] == '_' || new_id[i] == '.')
            answer.push_back(new_id[i]);
    }
    //step 3: 마침표가 2번 이상 연속되면 하나 지우기
    i = 1;
    while (i < answer.length()){
        if (answer[i - 1] == '.' && answer[i] == '.'){
            answer.erase(answer.begin() + i);
            continue;
        }
        i++;
    }
    //step 4: 처음과 끝의 마침표 제거하기
    if(answer[0] == '.')
        answer.erase(answer.begin());
    if(answer[answer.length() - 1] == '.')
        answer.erase(answer.end() - 1);
    //step 5: 빈 문자열이라면 "a" 대입하기
    if(answer.length() == 0)
        answer.push_back('a');
    //step 6: 길이가 16 이상이면 16번째 문자부터 끝까지 제거하기 (제거 후 끝 마침표 제거)
    if(answer.length() >= 16){
        answer.erase(answer.begin() + 15, answer.end());
        if(answer[answer.length() - 1] == '.')
            answer.erase(answer.end() - 1);
    }
    //step 7: 길이가 2 이하라면 길이가 3이 될때까지 마지막 문자 붙이기
    if(answer.length() <= 2){
        char c = answer[answer.length() - 1];
        while(answer.length() != 3){
            answer.push_back(c);
        }
    }
    return answer;
}
```
