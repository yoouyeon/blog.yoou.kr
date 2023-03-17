---
title: "[백준] 1062번 가르침 (C++)"
date: 2021-07-20 23:49:27
category: Algorithm/BOJ
description: "[ 💛 GOLD 4 ]"
---

[가르침](https://www.acmicpc.net/problem/1062)

## 🌟 문제
남극에 사는 김지민 선생님은 학생들이 되도록이면 많은 단어를 읽을 수 있도록 하려고 한다. 그러나 지구온난화로 인해 얼음이 녹아서 곧 학교가 무너지기 때문에, 김지민은 K개의 글자를 가르칠 시간 밖에 없다. 김지민이 가르치고 난 후에는, 학생들은 그 K개의 글자로만 이루어진 단어만을 읽을 수 있다. 김지민은 어떤 K개의 글자를 가르쳐야 학생들이 읽을 수 있는 단어의 개수가 최대가 되는지 고민에 빠졌다.
남극언어의 모든 단어는 "anta"로 시작되고, "tica"로 끝난다. 남극언어에 단어는 N개 밖에 없다고 가정한다. 학생들이 읽을 수 있는 단어의 최댓값을 구하는 프로그램을 작성하시오.

## 🌟 입력
첫째 줄에 단어의 개수 N과 K가 주어진다. N은 50보다 작거나 같은 자연수이고, K는 26보다 작거나 같은 자연수 또는 0이다. 둘째 줄부터 N개의 줄에 남극 언어의 단어가 주어진다. 단어는 영어 소문자로만 이루어져 있고, 길이가 8보다 크거나 같고, 15보다 작거나 같다. 모든 단어는 중복되지 않는다.
## 🌟 출력
첫째 줄에 김지민이 K개의 글자를 가르칠 때, 학생들이 읽을 수 있는 단어 개수의 최댓값을 출력한다.
## 🌟 풀이
모든 남극 단어는 "anta"와 "tica"로 시작하기 때문에 'a', 'n', 't', 'i', 'c' 이 적어도 5개의 알파벳을 모르면 어떤 남극 단어도 읽을 수가 없다.
따라서 K는 적어도 5 이상이어야 하고, 만약 5 미만이라면 0을 출력하도록 했다.
그 이후에는 know_alpha 배열에 아는 알파벳들을 체크해주고, 체크한 알파벳의 개수가 K개가 되면 (a, n, t, i, c를 포함해서 세어줘야 한다는 것에 주의하기) 주어진 단어들을 순회하며 아는 알파벳들로 읽을 수 있는 단어를 체크하는 DFS로 문제를 풀어주었다.
dfs를 이용할 줄만 알면 별로 까다로운 부분 없이 풀 수 있는 문제였던 것 같다.
물론 나는 k-5 부분 빼먹어서 몇번 고생하긴 했지만...;;

## 🌟 코드
```cpp
#include <iostream>
#include <string>
#include <vector>
#include <cstring>
using namespace std;

vector<string> word_list;
bool know_alpha[26];
int n, k, answer;
bool check_alpha[26];

void init_alpha();
void dfs(int idx, int cnt);
int get_can_read();

int main(){
    string word, sub;
    cin >> n >> k;
    
    if (k < 5){
        cout << 0;
        return (0);
    }
    for(int i = 0; i < n; i++){
        cin >> word;
        // anta 와 tica 가 매번 중복되기 때문에 그 부분을 빼고 저장해줌
        sub = word.substr(4, word.length() - 8);
        word_list.push_back(sub);
    }
    init_alpha();
    dfs(0, 0);
    cout << answer;
    return (0);
}

void init_alpha(){
    memset(know_alpha, false, 26);
    know_alpha['a' - 'a'] = true;
    know_alpha['n' - 'a'] = true;
    know_alpha['t' - 'a'] = true;
    know_alpha['i' - 'a'] = true;
    know_alpha['c' - 'a'] = true;
    k -= 5;
}

void dfs(int idx, int cnt){
    if (cnt == k){
        int cnt_can_read = get_can_read();
        answer = max(answer, cnt_can_read);
        for(int i = 0; i < 26; i++){
            check_alpha[i] = know_alpha[i];
        }
        return;
    }
    for(int i = idx; i < 26; i++){
        if(know_alpha[i] == true)
            continue;
        know_alpha[i] = true;
        dfs(i, cnt + 1);
        know_alpha[i] = false;
    }
}

int get_can_read(){
    int cnt = 0;
    bool can_read;
    string word;
    for(int i = 0; i < word_list.size(); i++){
        word = word_list[i];
        can_read = true;
        for(int j = 0; j < word.length(); j++){
            if(know_alpha[word[j] - 'a'] == false){
                can_read = false;
                break;
            }
        }
        if(can_read == true)
            cnt++;
    }
    return (cnt);
}
```
