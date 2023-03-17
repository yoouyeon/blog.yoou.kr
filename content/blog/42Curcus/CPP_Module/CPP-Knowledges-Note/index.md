---
title: "CPP 관련해서 알게 된 잡다한 지식들 #1"
date: 2022-07-03 21:48:40
category: 42Curcus/CPP_Module
description: "cpp module 과제 하면서 / 평가 다니면서 알게된 것들."
---

## 🌟 내용

CPP에서 사용되는 `<<`, `>>` 연산자는 비트 이동 연산자를 오버로딩 한 것이다. 따라서 우선순위 역시 비트 이동 연산자의 우선순위를 따른다.

기본 자료형에만 오버로딩되어 있기 때문에 사용자 지정 자료형에 사용하기 위해서는 다시 오버로딩해줘야 한다.

- - -

`endl` 은 단순히 개행만 해주는게 아니고 출력 버퍼도 비워주는 역할을 했다. 그냥 개행이 아니고 **함수**였던 것임. 

이렇게 단순히 개행만 해주는게 아니었기 때문에 PS에서는 시간문제 때문에 endl 보다는 `cout << '\n'` 을 사용하는걸 권장했던 것이었다;; 몰랐다.

- - -

friend 키워드 : 기본적으로는 완전 남인 클래스의 private, protected 멤버에 접근 할 수 없지만 friend 로 선언된 다른 class는 private, protected 멤버에 접근할 수 있다. / 함수에도 동일하게 적용됨.

상속 관계가 아니라 그냥 수평적인 관계의 클래스들 사이에서 변수를 공유해야 하는 경우에 사용한다고 한다. (CPP Module에서는 사용하면 안됨...)

```cpp
class person
{
	private:
		std::string name;
	public:
		friend class myFriend;
}
```

이런 식으로 선언해주면 myFriend 클래스에서 person의 name에 접근할 수 있다고 한다.

- - -

**Member Initializer list** : 생성과 동시에 초기화 할 수 있음. Makefile의 dependency를 생각하면 쉬울 것 같다. 먼저 초기화 해 놓고 생성하는 느낌?

```cpp
Person(std::string name) : gender("female"), name(name)
```

이런 식으로 생성 시에 받아온 인자를 사용할수도 있다.

이렇게 하는 이유 ? → 중복된 생성을 막을 수 있다. + 멤버변수 중에서 reference가 있는 경우에는 반드시 이런 방식으로 생성해줘야 한다.

예를 들면 기본 생성자로 객체를 하나 만들었을 때 기본적으로 객체 안의 멤버 변수들에 대한 할당이 이루어짐. 그 생성자 안에서 다시 멤버변수를 초기화해주면 불필요한 할당이 한번 더 이루어질 수 있다.

참고 : 초기화 리스트라는 것을 찾으면 Braced-Init-list 도 같이 검색되는데 Member Initializer list 는 C++98에도 있던 방식이고 Braced-Init-list 는 C++11부터 추가된 방식이다. 따라서 Braced-Init-list는 우리 과제에서 사용 할 수 없음에 주의하자!!!

- - -

**reference** : 메모리 공간에 대한 **별칭**

```cpp
int num = 1;
int &ref_num = num;	// num이라는 공간을 가리키는 다른 이름이 ref_num
```

이런 식으로 사용한다.

사용 목적은 여러가지가 있을 수 있지만 내가 이해하기로는 메모리 공간 제한 아래에서 다른 이름을 가지고 동일한 "공간"을 다룰 수 있다는 이점이 있을 수 있고, 반드시 선언 시에 초기화되어야 하므로 쓰레기 값이 들어가 있을 위험성이 적다는 이점도 있을 수 있다.\

- - -

**canonical form** : 정식 클래스 형식 (?) 클래스를 정의할 때 지키면 "좋을" 형식이다. CPP Module 02부터는 클래스를 정의할 때 canonical form을 맞춰서 정의해줘야 한다고 한다.

- 기본 생성자
- 복사 생성자
- 할당 연산자 오버로딩
- 기본 소멸자

각각의 항목에 대한 자세한 내용은 CPP Module 02 할 때 공부해보자.

## 🌟 참고

- https://m.blog.naver.com/ruvendix/220953194013
- https://dhshin94.tistory.com/46
- https://velog.io/@hidaehyunlee/CPP-02-Canonical-%ED%81%B4%EB%9E%98%EC%8A%A4-%EB%B3%B5%EC%82%AC-%EC%83%9D%EC%84%B1%EC%9E%90%EC%99%80-%EB%8C%80%EC%9E%85-%EC%97%B0%EC%82%B0%EC%9E%90-%EC%98%A4%EB%B2%84%EB%A1%9C%EB%94%A9