---
title: "[백준] 3425번 고스택 (C++)"
date: 2021-07-19 23:24:48
category: Algorithm/BOJ
description: "[ 💛 GOLD 3 ]"
---

[고스택](https://www.acmicpc.net/problem/3425)

## 🌟 문제
고창영은 스택을 조금 변형해서 고스택을 만들었다.
고스택은 숫자만을 저장할 수 있고, 다음과 같은 10가지 연산을 수행할 수 있다.
편의상 스택의 가장 위에 저장된 수를 첫 번째 수라고 하고, 그 다음은 차례대로 두 번째 수, 세 번째 수라고 한다.
- NUM X: X를 스택의 가장 위에 저장한다. (0 ≤ X ≤ 109)
- POP: 스택 가장 위의 숫자를 제거한다.
- INV: 첫 번째 수의 부호를 바꾼다. (42 -> -42)
- DUP: 첫 번째 숫자를 하나 더 스택의 가장 위에 저장한다.
- SWP: 첫 번째 숫자와 두 번째 숫자의 위치를 서로 바꾼다.
- ADD: 첫 번째 숫자와 두 번째 숫자를 더한다.
- SUB: 첫 번째 숫자와 두 번째 숫자를 뺀다. (두 번째 - 첫 번째)
- MUL: 첫 번째 숫자와 두 번째 숫자를 곱한다.
- DIV: 첫 번째 숫자로 두 번째 숫자를 나눈 몫을 저장한다. 두 번째 숫자가 피제수, 첫 번째 숫자가 제수이다.
- MOD: 첫 번째 숫자로 두 번째 숫자를 나눈 나머지를 저장한다. 두 번째 숫자가 피제수, 첫 번째 숫자가 제수이다.

자세한 문제 내용은 위의 문제 링크에서..
## 🌟 입력
입력은 기계 여러 대의 설명으로 이루어져 있다. 각 기계의 설명은 프로그램과 입력영역으로 나누어져 있다.
프로그램은 명령어로 이루어져 있고, 명령어는 한 줄에 하나씩 있다. 각 명령은 문제 설명에 나와있는 대문자 알파벳 3글자이고, 다른 글자는 주어지지 않는다. NUM의 경우에는 명령어 다음에 숫자가 주어지며, 이 숫자는 0보다 크거나 같고, 109보다 작거나 같은 정수이다. NUM과 숫자는 공백으로 구분되어져 있다. 각 프로그램은 END가 나오면 끝난다.
입력영역은 첫째 줄에 프로그램 수행 횟수 N이 있다. (0 ≤ N ≤ 10,000) 다음 N개의 줄에는 한 줄에 하나씩 입력값 Vi가 있다. (0 ≤ Vi ≤ 109) 각 입력값에 대해서 프로그램을 한 번씩 수행해야 하고, 이 수행은 모두 독립적이다. 매번 프로그램을 수행할 때, 스택에 들어있는 값은 입력값 Vi 하나이다.
각각의 기계 설명은 빈 줄로 구분되어져 있다. QUIT이 나오면 다음 기계 설명이 없다는 뜻이다. 명령어가 100,000개를 넘어가는 경우와 스택이 수행될 때, 1,000개 이상의 숫자를 저장하는 경우는 없다.
## 🌟 출력
각각의 입력값에 대해서, 해당하는 프로그램을 수행한 뒤, 출력값을 출력하면 된다. 출력값이란 스택에 저장되어 있는 숫자이다.
만약, 프로그램 에러가 발생하거나, 모든 수행이 종료됐을 때 스택에 저장되어 있는 숫자가 1개가 아니라면, "ERROR"를 출력한다.
각 기계에 대한 출력값을 모두 출력한 뒤에는 빈 줄을 하나 출력해야 한다.
## 🌟 풀이
문제가 길고 어려워 보이지만 그냥 주어진 연산자의 기능들을 그대로 구현해 주는 비교적 단순한 문제이다.
다른 블로그에서는 주어지는 오류에 관한 예외처리들에 신경을 써 주는 것이 핵심이라고 많이 적혀있었지만...
사실 나는 오류 처리보다는 문제 이해에 더 많은 시간을 쏟았다.
문제 입력 부분을 자세히 읽었어야 했다.;;
***
입력 설명에 보면 명령어 정보가 주어진 뒤에 입력되는 숫자가 **프로그램 실행 횟수**이다.
나는 멋대로 스택 내부의 숫자의 개수라고 생각해서 스택에 입력되는 숫자들을 모두 넣고 명령어를 실행하는 바람에 결과가 완전히 이상하게 나와 디버깅 하는데 시간이 엄청 들었다...
그러니까 입력영역에
```
3
1
10
50
```
이렇게 주어진다면 입력된 명령어 벡터를 총 3번을 실행시켜야 하는데 그 초깃값들이 각각 1, 10, 50인 것이다.
그리고 출력될 결괏값들은 스택에 원소가 딱 1개 있을때만 정상적으로 프로그램이 종료된 것으로 생각하고 그 원소의 값이 되는 것이다.
스택의 값을 출력해야 한다는 것만 읽고 비어있지 않은 한 스택의 모든 원소들을 출력하는 바람에... 또 디버깅 열심히 했다..
그리고 잊을 수도 있는 부분인데 (나는 이것때문에 제출을 3번이나 더 했다. 신중하게 제출하자...) 출력 설명에 *각 기계에 대한 출력값을 모두 출력한 뒤에는 빈 줄을 하나 출력해야 한다.* 라는 말이 있는데,
이 말은 각 프로그램, 즉 각 명령어 벡터에 해당되는 값들을 모드 실행시키고, 출력한 후에 다음 명령어로 넘어가기 전에 개행을 하나 출력하라는 뜻이었다..
역시 문제 이해부터가 시작이라는 것을 뼈저리게 느꼈고 앞으로는 좀 더 신중히 보기로 다짐했다.
***
이렇게 문제 중간중간 세세하게 신경써줘야 하는 부분 외에는 정말 단순 구현 문제라.. 문제를 찬찬히 읽고 그대로 구현해 보면 어렵지 않게 해결할 수 있을 것이다.

## 🌟 코드

[****전체 코드 (깃허브)****](https://github.com/yoouyeon/Problem_solving/blob/21df4a8c3cce530ab5366520a3abef1569eda424/BOJ/BOJ_3425_%EA%B3%A0%EC%8A%A4%ED%83%9D.cpp)

```cpp
#include <iostream>
#include <string>
#include <stack>
#include <utility>
#include <vector>
using namespace std;

vector<pair<string, long long>> commands;
stack<long long> num_stack;

//abs 함수가 int만 사용할 수 있는 줄 알고 따로 abs 함수를 구현해서 사용했는데 long long 범위에서도 사용할 수 있는 듯 하다;;
long long labs(long long num){
    if (num < 0)
        return (num * (-1));
    return (num);
}

// commands에 operator를 넣는 함수.
int input_op(){
    string operation;
    long long x;
    cin >> operation;
    while (operation != "END"){
        x = 0;
        if (operation == "QUIT")
            return (0);
        if (operation == "NUM")
            cin >> x;
        commands.push_back(make_pair(operation, x));
        cin >> operation;
    }
    return (1);
}

// 여기서부터 각각의 연산자들에 대한 함수를 구현했다.
// 코드가 너무 길어져서 전체 코드는 깃허브를 참고해 주세요..
bool num(long long x);
bool pop();
bool inv();
bool dup();
bool swp();
bool add();
bool sub();
bool mul();
bool div();
bool mod();
// 에러가 발생했을 경우
void error(){
    while (!num_stack.empty())
        num_stack.pop();
    cout << "ERROR" << '\n';
}
// commands의 연산들이 모두 완료된 경우
void print_result(){
    if (num_stack.size() != 1)
        error();
    else{
        cout << num_stack.top() << '\n';
        num_stack.pop();
    }
}
// 각 명령어에 맞춰서 연산자 함수를 호출하는 함수
void prog(){
    for(int i = 0; i < commands.size(); i++){
        if (commands[i].first == "NUM"){
            if (num(commands[i].second) == false){
                error();
                return;
            }
        }
        else if (commands[i].first == "POP"){
            if (pop() == false){
                error();
                return;
            }
        }
        else if (commands[i].first == "INV"){
            if (inv() == false){
                error();
                return;
            }
        }
        else if (commands[i].first == "DUP"){
            if (dup() == false){
                error();
                return;
            }
        }
        else if (commands[i].first == "SWP"){
            if (swp() == false){
                error();
                return;
            }
        }
        else if (commands[i].first == "ADD"){
            if (add() == false){
                error();
                return;
            }
        }
        else if (commands[i].first == "SUB"){
            if (sub() == false){
                error();
                return;
            }
        }
        else if (commands[i].first == "MUL"){
            if (mul() == false){
                error();
                return;
            }
        }
        else if (commands[i].first == "DIV"){
            if (div() == false){
                error();
                return;
            }
        }
        else if (commands[i].first == "MOD"){
            if (mod() == false){
                error();
                return;
            }
        }
    }
    print_result();
}

int main(){
    int temp, n;
    long long templ;
    while (1){
        temp = input_op();
        if (temp == 0)
            break;;
        cin >> n;
        for (int i = 0; i < n; i++){
            cin >> templ;
            num_stack.push(templ);
            prog();
        }
        commands.clear();
        cout << '\n';
    }
    return (0);
}
```
