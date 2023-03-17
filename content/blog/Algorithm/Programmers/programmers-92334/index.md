---
title: "[프로그래머스] 신고 결과 받기 (C++)"
date: 2022-04-30 20:43:04
category: Algorithm/Programmers
description: "[ ⭐️ LV.1 ]"
---

[신고 결과 받기](https://programmers.co.kr/learn/courses/30/lessons/92334)

## 🌟 문제

신입사원 무지는 게시판 불량 이용자를 신고하고 처리 결과를 메일로 발송하는 시스템을 개발하려 합니다. 무지가 개발하려는 시스템은 다음과 같습니다.

- 각 유저는 한 번에 한 명의 유저를 신고할 수 있습니다.
	- 신고 횟수에 제한은 없습니다. 서로 다른 유저를 계속해서 신고할 수 있습니다.
	- 한 유저를 여러 번 신고할 수도 있지만, 동일한 유저에 대한 신고 횟수는 1회로 처리됩니다.
- k번 이상 신고된 유저는 게시판 이용이 정지되며, 해당 유저를 신고한 모든 유저에게 정지 사실을 메일로 발송합니다.
	- 유저가 신고한 모든 내용을 취합하여 마지막에 한꺼번에 게시판 이용 정지를 시키면서 정지 메일을 발송합니다.

이용자의 ID가 담긴 문자열 배열 `id_list`, 각 이용자가 신고한 이용자의 ID 정보가 담긴 문자열 배열 `report`, 정지 기준이 되는 신고 횟수 `k`가 매개변수로 주어질 때, 각 유저별로 처리 결과 메일을 받은 횟수를 배열에 담아 return 하도록 solution 함수를 완성해주세요.

## 🌟 풀이

프로그래머스 형식의 문제를 너무 안푼 것 같아서 도전해봤는데... 문제 자체는 그렇게 어렵진 않았지만 입력 형식이 헷갈려서 죽는 줄 알았다ㅋㅋ 가끔은 프로그래머스 문제도 좀 풀어야겠다..

입력되는 정보는 유저의 ID (ID는 string 형식)가 담긴 `id_list`, `"신고한 사람 ID" "신고당한 사람 ID"` 형식의 문자열 배열 `report`, 그리고 정지 기준이 되는 신고 횟수 k이다. 그리고 return 해야 할 vector `answer`는 `id_list`의 순서대로 그 유저가 받는 처리 결과 메일의 개수를 저장해야 한다.

**(1)** 해야 할 일 첫번째는 당연히 `answer` 배열을 0으로 초기화 하는 것.

```cpp
vector<int> answer(id_list.size(), 0);
```

이렇게 초기화 해 주면 된다.

**(2)** 다음에는 `"신고한 사람 ID" "신고당한 사람 ID"` 형식으로 입력되는 정보를 파싱하기 위해서 get_name 함수를 만들어줬다. 형식이 딱 정해져 있기 때문에 가운데 공백을 기준으로 앞쪽과 뒷쪽으로 나누어서 pair 형태로 반환해주었다.

**(3)** 그리고 유저의 ID를 key로, 해당 유저가 신고한 ID의 목록의 set을 value로 갖는 map `singo_list`, 유저 ID를 key로, 해당 유저가 신고당한 횟수를 value로 하는 map `singodang_cnt`를 선언해주었다. 네이밍 센스가 참 어디 선보이기 너무 민망한 수준이다... 

`singo_list`의 value가 되는 신고한 ID의 목록을 set으로 설정한 이유는 중복 신고를 허용하지 않기 때문이다! 사실 신고 목록을 저장하는 반복문에서 중복 신고의 경우에는 `singodang_cnt`의 내용을 변경하면 안되기 때문에 중복 신고의 경우를 걸러주는 부분이 있어서 내가 짠 코드 내에서는 set으로 굳이 안해도 되었을 것 같긴 하다. ㅎㅎ

**(4)** 다음에는 신고 목록을 저장해준다! 앞서 말했듯이 `report` 배열을 돌면서 `singo_list["신고자 ID"]` 에 `"신고당한 ID"`가 있는지 확인한 후에, 없다면 `singo_list["신고자 ID"]`에 추가하고 `singodang_cnt["신고당한 ID"]`를 증가시켜준다.

**(5)** 마지막으로는 id_list 내의 ID에 해당하는 singo_list를 또 돌면서 `singodang_cnt`의 값이 k보다 크거나 같은 경우가 있는지 확인하고, 있다면 그 신고자 ID에 해당하는 인덱스 (코드를 보면 알겠지만, `id_list`를 순차적으로 탐색하고 있기 때문에 굳이 ID ↔️ index로 변환하는 작업 없이 작업하고있는 인덱스 i를 그대로 써줘도 괜찮았다.)의 `answer` 값을 증가시켜줬다.

끝!

## 🌟 코드

```cpp
#include <string>
#include <vector>
#include <set>
#include <map>
#include <utility>

using namespace std;

pair<string, string>  get_name(string report)
{
	pair<string, string> ret;
	int idx = 0;	
	while (report[idx] != ' ')
		idx++;
	ret.first = report.substr(0, idx);
	idx++;
	ret.second = report.substr(idx, report.length() - idx);
	return (ret);
}

vector<int> solution(vector<string> id_list, vector<string> report, int k) {
	vector<int> answer(id_list.size(), 0);
	map<string, set<string> > singo_list;   // (유저 ID, 해당 유저가 신고한 ID의 목록)
	map<string, int> singodang_cnt; // (유저 ID, 해당 유저가 신고당한 횟수)
	pair<string, string> name;  // first: 이용자 ID, second: 신고한 ID	
	// 신고당한 횟수 초기화
	for(int i = 0; i < id_list.size(); i++)
		singodang_cnt[id_list[i]] = 0;
	// 신고 목록 저장
	for(int i = 0; i < report.size(); i++)
	{
		name = get_name(report[i]);
		// 앞선 신고 이력이 없을 경우 추가하고 신고 횟수를 늘린다.
		if (singo_list[name.first].find(name.second) == singo_list[name.first].end())
		{
			singo_list[name.first].insert(name.second);
			singodang_cnt[name.second]++;
		}
	}	
	// id list를 돌면서 자신이 신고한 ID 중 신고 횟수가 k가 넘는 경우에 answer의 값을 증가시킨다.
	for(int i = 0; i < id_list.size(); i++)
	{
		for(auto iter = singo_list[id_list[i]].begin(); iter != singo_list[id_list[i]].end(); iter++)
		{
			if (singodang_cnt[*iter] >= k)
				answer[i]++;
		}
	}	
	return answer;
}
```