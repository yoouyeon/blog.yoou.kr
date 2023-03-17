---
title: "CPP Module 00"
date: 2022-07-06 04:21:20
category: 42Curcus/CPP_Module
description: "CPP Module 00 과제를 하면서 공부한 내용들"
---

## 🌟 Namespaces

### ✨ 참고

- [C++ 트레이닝 책 참고](https://www.hanbit.co.kr/store/books/look.php?p_code=B7818919239)

명칭 충돌의 가능성을 피하기 위한 장치. 명칭 작성의 자유가 있고 명칭에 대한 중앙 통제 센터가 없기 때문에 같은 이름을 가진 것들이 발생해도 관리할 수 있는 방법이 없다. 언어 차원에서 이런 명칭 충돌 문제를 해결하기 위해서 네임스페이스라는 개념을 사용하게 되었다.

Namespace : 명칭이 저장되는 영역 (이름을 담는 통)

```cpp
namespace 이름
{
  이 네임스페이스 안에서 사용할 변수나 함수를 선언한다.
}
```

네임스페이스를 별도로 선언하지 않더라도 함수 바깥의 전역 네임스페이스는 항상 존재한다.

네임스페이스에 속한 명칭을 사용할 때에는 `::` 연산자 앞에 그 명칭의 소속 네임스페이스를 밝히면 된다. (`std::string` 이런 식으로)

- - -

`using namespace` : CPP Module 과제에서는 사용 불가

현재 영역에서 항상 std namespace의 내용을 쓴다고 했을 때 매번 `std::`를 명칭 앞에 붙여주면 가독성이 썩 좋지 않다. 이 때 지정한 네임스페이스의 모든 명칭을 현재 영역으로 가져와 `::` 연산자로 소속을 밝히지 않고도 명칭을 사용할 수 있게 하는 `using` 지시자를 사용할 수 있다.

`using` 지시자는 이 선언이 있는 **영역**에 효력을 발휘한다.

namespace라는 것을 사용하는 이유가 명칭의 소속을 분명히 해서 명칭 충돌을 막기 위해서인데 using 지시자를 사용하게 되면 namespace의 순기능이 흐려지게 된다. → 왠만하면 불편하지 않은 선에서 `using` 지시자를 적당하게 사용해야 하고, 무엇보다 우리 과제에서는 사용하면 안된다.

## 🌟 Class

### ✨ 참고

- [C++ 트레이닝 책 참고](https://www.hanbit.co.kr/store/books/look.php?p_code=B7818919239)

### ✨ member function

구조체에 포함된 함수를 멤버 함수라고 한다.

C에서 구조체에 함수를 넣고 싶을 때에는 함수 포인터를 넣는 방식으로 구조체에 함수를 포함시킬 수 있었는데 C++에서는 함수 그대로를 구조체의 멤버로 넣을 수 있다.

```cpp
struct Info
{
  char	name[10];
  int	age;
  void selfIntroduce()
  {
    std::cout << "My name is " << name << ". I'm " << age << " years old." << std::endl;
  }
};

int main()
{
  Info penguin = {"pingu", 43};
  penguin.selfIntroduce();
  return (0);
}
```

- 멤버 함수 내에서 같은 소속의 멤버 변수에 접근할 때에는 따로 소속을 명시해 줄 필요가 없다.
- main에서 멤버 함수를 호출할 때에는 멤버 변수에 접근하듯이 `[소속 구조체].[멤버 함수]` 이런 식으로 호출해주면 된다.

```cpp
struct Info
{
  char	name[10];
  int	age;
  void selfIntroduce();
};

void Info::selfIntroduce()
{
	std::cout << "My name is " << name << ". I'm " << age << " years old." << std::endl;
}

int main()
{
  Info penguin = {"pingu", 43};
  penguin.selfIntroduce();
  return (0);
}
```

이렇게 구조체 밖에서 함수를 정의하는 것도 가능하다. 일반 함수 선언과 방식은 동일하지만 함수의 이름 앞에 `::` 연산자를 붙여서 소속 구조체를 밝혀줘야 한다.

- 구조체 내에 함수를 정의하게 되면 인라인 속성을 가지게 된다. 따라서 실제로 함수가 호출되는 것이 아니라 멤버 함수를 호출하는 코드가 함수의 본체 코드와 대체되게 된다. (위의 예제를 예로 들면 `penguin.selfIntroduce();` 이 라인이 `std::cout << "My name is " << name << ". I'm " << age << " years old." << std::endl;` 이렇게 바뀐다는 것) 이렇게 되면 함수의 호출에 대한 부담이 사라져 시간이 빨라지지만 자주 호출하게 되면 실행 파일이 커지게 된다. 따라서 멤버 함수의 코드가 아주 짧을 경우에는 인라인으로 정의하는 것이 유리하다.
- 구조체 외부에 정의하게 되면 일반적인 함수 호출처럼 멤버 함수를 호출한다.
- CPP Module 과제에서는 헤더에 함수를 정의하는 것을 엄격하게 금지하고 있다. (0점사유...)

### ✨ 액세스 지정자

액세스 지정자를 사용해서 구조체 외부에서 구조체 멤버에 접근할 수 있는 권한을 설정할 수 있다.

- `private` : 내부적으로만 사용하는 멤버, 외부에서 읽고 쓰는것이 모두 안된다.
- `public` : 외부에서 자유롭게 사용 할 수 있는 멤버
- `protected` : 자식 클래스만 자유롭게 접근 할 수 있는 멤버

```cpp
struct Info
{
  private:
  	char	name[10];
  	int	age;
  public:
  	void selfIntroduce();
};

void Info::selfIntroduce()
{
 std::cout << "My name is " << name << ". I'm " << age << " years old." << std::endl;
}

int main()
{
  Info penguin = {"pingu", 43};
  penguin.age = 34;	//	에러 발생
  penguin.selfIntroduce();	// public이므로 가능
  return (0);
}
```

private으로 지정한 멤버들에 외부에서 직접적으로 접근하려 하면 에러가 발생한다. 따라서 public에다가 private 멤버 변수들에 접근할 수 있는 함수들을 선언해두는데 이런 함수들을 액세서(Accessor)라고 한다. (get / set 함수들)

### ✨ class

함수를 포함할 수 있는 C++의 확장된 구조체를 Class라고 한다.

확장된 구조체를 struct 키워드로 선언했을 경우에는 기본 액세스 지정자가 public이지만 class 키워드로 선언했을 경우에는 기본 액세스 지정자가 private이라는 차이점이 있다.

클래스도 타입과 동등한 자격을 가져서 기본 자료형과 거의 동일하게 포인터 연산, 배열 같은 것들을 사용하고 선언할 수 있다.

### ✨ 인스턴스

아주 간단하게 말하면 어떤 class 타입의 변수. 실제로 메모리에 구현된 그것을 말한다. 객체라고도 한다.

인스턴스의 크기는 클래스 내의 멤버변수 크기의 총합과 같다.

### ✨ 생성자

변수를 생성하듯 클래스의 인스턴스를 생성하면 그 안의 멤버변수들의 값에는 쓰레기값이 들어가기 때문에 당연하게도 그 멤버변수를 초기화하는 작업이 필요할 것이다. 이 선언과 멤버변수 초기화 작업을 동시에 하기 위해서 **생성자**라는 함수를 사용한다.

생성자는 컴파일러가 자동으로 호출하기 때문에 클래스와 이름이 같고 별도의 반환값이 필요하지 않기 때문에 반환형이 없다는 특징이 있다.

생성자 역시 함수이기 때문에 인수를 받아서 그 값으로 멤버변수를 초기화 할 수 있다. 인수 목록을 다르게 해서 다른 방식으로 생성자를 만들 수도 있다! (생성자 오버로딩)

### ✨ 소멸자

생성자로 생성한 인스턴스가 생성되기 전 상태로 돌려놓는 함수가 소멸자. 소멸자의 이름은 `~클래스명` 으로 정해져 있다.

생성자와 소멸자 모두 기본 생성자/소멸자가 있어서 정의하지 않으면 멤버변수를 초기화하지 않는 생성자와 소멸자를 컴파일러가 알아서 만든다.

## 🌟 입출력 스트림

### ✨ 참고

- [C++ 트레이닝 책 참고](https://www.hanbit.co.kr/store/books/look.php?p_code=B7818919239)
- https://www.geeksforgeeks.org/c-stream-classes-structure/
- https://cplusplus.com/reference/istream/istream/operator%3E%3E/
- https://cplusplus.com/reference/ostream/ostream/operator%3C%3C/
- https://cplusplus.com/reference/string/basic_string/operator%3E%3E/
- https://cplusplus.com/reference/string/basic_string/operator%3C%3C/

### ✨ 구조

![Input/Output library](/input:output_library.png)

### ✨ \<\<, \>\> 연산자

기본 타입에 대한 \<\<, \>\> 함수가 모두 정의되어 있고, 출력 후 자기 자신을 다시 리턴해서 `cout << "hello" << " world";` 이런 식으로 쓸 수 있다.

### ✨ 출력 스트림

표준 출력 객체 : cout

\<\< 연산자로 데이터를 보내서 출력한다. 기본 타입에 대해서 오버로딩되어있기 때문에 타입 상관없이 그냥 보내면 알아서 맞는 타입으로 출력해준다.

### ✨ 입력 스트림

표준 입력 객체 : cin

키보드의 입력을 \>\> 연산자로 cin 객체로 보낸다. 역시 기본 타입에 대해서 오버로딩되어있기 대문에 타입에 상관없이 알아서 맞는 타입으로 넣어준다.

- 공백은 기본적으로 구분자로 취급된다. 따라서 공백을 입력받을 수 없다.
- 무효한 입력을 만나면 즉시 입력을 중지한다. (정수는 숫자만 입력, 문자열은 공백에서 입력을 끊어버림)
- 읽지 못한 데이터는 버퍼에 남겨져서 다음 입력때 읽힌다. → 만약에 어떤 이유로 읽히지 못한 데이터가 있을 경우에는 버퍼를 비워줘야 한다.

입력 스트림의 에러 플래그

- failbit : 입력에 실패했을 경우 on (예: 정수를 입력받아야 하는데 문자가 입력된 경우)
- eofbit : EOF에 도달한 경우 on
- badbit : 스트림이 물리적으로 손상된 경우 on. 더 이상 읽을 수 없다.
- goodbit : 위의 세 비트가 on 되지 않은 경우 on. 일단 0으로 정의되어 있다.

위 4개의 플래그의 상태는 `fail()`, `eof()`, `bad()`, `good()` 함수로 확인할 수 있다.

## 🌟 initialization list

### ✨ 참고

- [C++ 트레이닝 책 참고](https://www.hanbit.co.kr/store/books/look.php?p_code=B7818919239)

생성자의 주 역할은 멤버 변수를 초기화하는 것. 그 일을 리스트로 간편하게 할 수 있는 것이 **initialization list** 이다.

```cpp
Account::Account( int initial_deposit ) : _accountIndex(_nbAccounts++), _amount(initial_deposit), _nbDeposits(0), _nbWithdrawals(0)
{
	_displayTimestamp();
	_totalAmount += initial_deposit;
	std::cout << "index:" << _accountIndex << ";";
	std::cout << "amount:" << _amount << ";";
	std::cout << "created\n";
}
```

이런 식으로 makefile의 defendency 처럼 : 오른쪽에 `멤버변수(초기화할 값)` 형식으로 표시한다.

쓸땐 편하긴 한데 가독성이 좀 떨어진다는 단점은 있다. Body가 시작되기 전에 (그러니까 쓰레기값이 담긴 멤버변수가 생성되기 전에) 멤버변수에 값을 할당하기 때문에 선언과 동시에 초기화하는 것과 비슷하다고 생각하고 있다.

```cpp
std::string str1;
str1 = "C++";

std::string str2 = "kkuljaem";
```

이런 차이? 그렇기 때문에 먼저 쓰레기값을 가지고 나중에 값을 변경할 수 없는, 혹은 애초에 쓰레기값을 값으로 가질 수 없는 멤버변수의 경우에는 이렇게 초기화 리스트를 사용하는 것이 필수적이다.

```cpp
class Some
{
  public:
		const int sangsu;
		int &ref;
}
```

이런 식으로 상수나, 레퍼런스 변수의 경우에는 초기화리스트로 생성과 동시에 멤버변수들을 초기화해줘야 한다. (정확한 동작 원리는 모르겠지만 리스트로 초기화시킬 값을 넘겨주면 `std::string str2 = "kkuljaem";` 이런 식으로 내부적으로 동작하지 않을까? 하는 생각이 든다. (뇌피셜!))

## 🌟 static (정적 멤버)

### ✨ 참고

- [C++ 트레이닝 책 참고](https://www.hanbit.co.kr/store/books/look.php?p_code=B7818919239)

### ✨ this

객체가 여러 개 있을 때 멤버 변수는 객체별로 따로 갖고 멤버 함수는 여러 객체들이 공유한다.

여러 객체들이 함수를 공유하는 것이기 때문에 함수 내에서 멤버 변수를 접근할 때에는 기본적으로 그 함수를 호출한 객체 자신을 참조하게 된다. 이때 그 함수를 호출한 객체 자신의 포인터가 `this` 인수이다.

멤버 함수 내에서 클래스의 멤버를 참조하는 모든 문장 앞에 `this->`가 암시적으로 적용된다.

암시적으로 적용되는 것이기 때문에 크게 신경쓸 필요는 없지만 함수 내에서 호출한 객체 자신을 칭해야 하는 경우 (다른 객체를 인자로 받는다거나) 혹은 지역변수와 멤버변수의 이름이 충돌할 경우에는 this 인수를 사용해줘야 한다.

### ✨ 정적 멤버 변수

정의 : 클래스에 소속되는 변수이지만 객체별로 할당되지 않고 모든 객체가 공유한다.

필요성? : 객체들이 모두 공유해야 하는 변수가 필요하다고 했을 때 단순히 전역변수로 그 변수를 선언했을 경우에는 객체지향이 지향하는 바와 맞지 않게 된다.

- 클래스와 관련된 정보가 외부에 선언됨 → 캡슐화 위반
- 전역변수는 접근 지정을 할 수 없기 때문에 외부에서 자유롭게 쓰거나 읽을 수 있다. → 정보 은폐가 안됨.

그래서 클래스 안에서 staic 키워드를 붙여서 정적 멤버임을 명시하고, 이 정적 멤버 변수는 클래스 밖에서 :: 키워드로 소속을 밝힌 뒤, 초기화해서 사용한다.

```cpp
// Account.hpp
class Account {
private:
	static int	_nbAccounts;
	static int	_totalAmount;
	static int	_totalNbDeposits;
	static int	_totalNbWithdrawals;
};

// Account.cpp
int	Account::_nbAccounts = 0;
int	Account::_totalAmount = 0;
int	Account::_totalNbDeposits = 0;
int	Account::_totalNbWithdrawals = 0;
```

이런 식으로 초기화한다. 그냥 공유 멤버라고 하는 편이 좀 더 이해하기 편할 듯?

이렇게 선언된 정적 멤버 변수는 객체가 생성되기 전에 먼저 생성되고, 객체가 생성될때마다 각 객체의 정적 멤버가 아닌 변수들만 새로 할당된다.

접근 지정도 일반 멤버 변수와 동일하게 할 수 있다. (private, public)

### ✨ 정적 멤버 함수

정적 멤버 함수의 적용 대상은 모든 객체이다. 모든 객체에 공통적인 작업을 처리해야 할 때 정적 멤버 함수를 정의하는 것 같다. ~~(잘 모르겠음..)~~

정적 멤버 함수에는 객체가 전달되지 않는다. (당연함. 적용 대상이 모든 객체이기 때문에?) 그래서 정적 멤버 함수에서는 정적 멤버 변수에만 접근할 수 있다.

그렇기 때문에 생성된 객체가 없더라도 정적 멤버 함수는 호출할 수 있다. (정적 멤버 변수는 최초의 객체 생성 전에도 존재하기 때문에)

정적 멤버 함수는 정적 멤버 변수에 어떤 액션을 취해야 할 때 사용하는 것 같다?!

## 🌟 const (상수 멤버)

### ✨ 참고

- [C++ 트레이닝 책 참고](https://www.hanbit.co.kr/store/books/look.php?p_code=B7818919239)

### ✨ 상수 멤버 변수

값이 결정되면 변경할 수 없는 멤버. 멤버 선언 앞에 const 지정자를 붙여서 상수 멤버를 선언한다.

```cpp
class Circle
{
	private:
		const double pi;
		int radius;
};
```

각각의 개체가 상수 멤버를 따로 가지기 때문에 객체별로 상수 멤버의 값이 달라도 상관없다. (실행 중에 변하지만 않으면 된다.)

열거형을 사용하는 방식도 있긴 한데 열거형은 객체 지향과 어울리지 않는다는 점에 유의하자. (왜?)

### ✨ 상수 멤버 함수

상수 멤버 함수는 객체의 상태를 읽기만 하는 함수이다.

선언한 함수가 객체의 상태를 변경하지 않고 읽기만 한다면 함수명 뒤에 const 지정자를 붙여준다.

만약에 상수 객체를 선언했다면, 그 객체는 내부의 멤버 변수들의 값을 변경할 수 없다. 따라서 상수 객체는 오직 상수 멤버 함수만 호출할 수 있다.

## 🌟 General rules

### ✨ 참고

- [C++ 트레이닝 책 참고](https://www.hanbit.co.kr/store/books/look.php?p_code=B7818919239)

- https://en.wikipedia.org/wiki/Pragma_once
- https://kldp.org/node/46662
- https://caniro.tistory.com/24
- http://doc.kldp.org/KoreanDoc/html/GNU-Make/GNU-Make-4.html

### ✨ friend

객체의 신뢰성 향상을 위해서 정보 은폐를 엄격히 지키라고는 하지만 엄격한 은폐는 불편할 때가 있기 때문에 예외를 두어서 특정 대상에 대해서는 모든 멤버를 공개할 수 있게 하는데 이거를 프렌드 지정이라고 한다. 

우리 과제에서는 사용하면 0점임

#### 프렌드 함수 (전역 함수)

클래스 밖의 전역 함수를 frend로 지정할 수 있다. 이렇게 friend로 지정된 함수는 클래스 밖의 함수이기 때문에 클래스의 멤버 함수는 아니지만 클래스의 모든 멤버에 자유롭게 접근할 수 있는 특권이 주어진다.

#### 프렌드 클래스

두 개의 클래스가 밀접한 관계 / 상대편을 참조해야 하는 일이 많다면 클래스를 통째로 프렌드로 지정해도 된다. 클래스 선언문에 friend 키워드를 붙이고 클래스 이름을 밝혀주면 해당 클래스는 우리 클래스의 모든 멤버에 자유롭게 접근할 수 있다.

#### 프렌드 멤버함수

특정 클래스의 멤버 함수만 프렌드로 지정할 수 있다. ... 방법과 개념은 위와 비슷하다. 프렌드 클래스를 지정했을 때 권한이 너무 크기 때문에 조금 좁은 범위의 권한을 주는 느낌.

암튼 쓰면 안된다.

### ✨ #pragma once

헤더의 중복 인클루드를 방지하기 위해서 사용하는 전처리기

기존에 사용하고 있던 include guards (`ifndef`) 는 한번 읽었던 헤더파일도 일단 다시 읽어봐야 하지만 `#pragma once`는 각 파일별로 프리프로세서(컴파일러)가 앞서 include 했음을 기억하면 되므로 이후에 동일한 헤더파일이 등장했을 때 include guards와 달리 다시 읽어보지 않아도 된다. → 그래서 `#pragma once`를 사용하게 되면 컴파일 시간이 단축된다는 장점이 있다.

근데 `#pragma once`는 표준이 아니기 때문에 컴파일러에서 `#pragma once`를 지원하는지를 먼저 알아봐야 하고 (c/c++/gcc에서는 `#pragma once`를 지원하긴 한다.) 경로가 다르지만 동일한 파일을 가리킨다거나 해서 (hard link, soft link 등) 오류가 발생할 수도 있다.

ex02의 Account.hpp에서 `#pragma once`를 사용해서 찾아본건데 우리 과제에서는 파일의 양이 많지 않기 때문에 굳이 비표준인 `#pragma once`를 사용할 필요는 없어보인다...

### ✨ Makefile

```makefile
CC = cc
NAME = minishell
CFLAGS	=	-Wall -Wextra -Werror
```

```makefile
NAME	=	megaphone
CXX	=	c++
CXXFLAGS	=	-std=c++98 -pedantic -Wall -Wextra -Werror
```

makefile에 대해선 좀 더 공부해봐야 할 것 같다.. 공부 좀 더 해서 TIL에 정리해야지.

아무튼 c++ 플래그는 CXXFLAGS고 c++ 컴파일러는 CXX이다. 그래서 원래 쓰던대로 CFLAGS를 사용하면 실제로 적용이 되지 않는 문제가 있다고 한다. (암묵적 / 묵시적 규칙. C++ 파일을 컴파일할때는 기본적으로 CXX 와 CXXFLAGS를 찾아서 컴파일한다.)

http://doc.kldp.org/KoreanDoc/html/GNU-Make/GNU-Make-4.html

## 🌟 ex00

### ✨ 참고

- [C++ 트레이닝 책 참고](https://www.hanbit.co.kr/store/books/look.php?p_code=B7818919239)
- https://cplusplus.com/reference/string/basic_string/
- https://cplusplus.com/reference/iterator/
- https://ko.wikipedia.org/wiki/%EB%B0%98%EB%B3%B5%EC%9E%90
- https://cplusplus.com/reference/cctype/toupper/?kw=toupper
- https://yechoi.tistory.com/48

### ✨ std::string

#### 문자열 클래스

기본적으론 C와 동일하게 배열로 문자의 집합을 표현하는 방식으로 문자열을 표현한다. 여기서 발전해서 Class를 이용해서 보다 편하게 문자열을 타입으로 사용할 수 있게 했다. (cstring의 함수들과 기능은 비슷하지만 string에는 메모리 할당 작업을 처리해주는 기능이 더 들어가있다)

std namespace에 정의되어 있고 string 헤더파일에 선언되어 있다. 

```cpp
typedef basic_string<char, char_traits<char>, allocator<char> > string;
```

클래스 템플릿으로 선언되어있는 basic_string으로 만든 string 클래스. 자세한건 나중에 템플릿 공부하면서 다시 보자.

클래스이기 때문에 다양한 방법으로 문자열 객체를 생성할 수 있다.

```cpp
#include <string>

std::string s1("string 1");	// s1 = "string 1"
std::string s2(s1);	// s2 = "string 1"
std::string s3;	// s3 = 
char *str = "hello world";
std::string s4(str, str + 5);	//s4 = "hello"
```

문자열 객체는 범위를 벗어날 때 소멸자가 메모리를 자동으로 정리한다.

주의해야 하는 것인지는 모르겠지만 basic_string 템플릿은 다양한 형태의 문자열을 제공하기 때문에 string 이 항상 널 종료 문자열이라고는 할 수 없다.

#### 입출력

string 헤더 파일에 cout 과 cin에 대해서 \<\< 연산자와 \>\> 연산자가 모두 오버로딩 되어있어 기본 자료형처럼 입출력받을 수 있다.

문자열의 개별 문자에 접근할 때에는 at 함수나 배열의 인덱스처럼 접근할 수 있다. 나는 그냥 배열의 인덱스처럼 접근하려고 한다. (at 함수를 이용하면 범위를 벗어난 접근을 시도했을 때 예외를 발생시켜서 좀 더 안전하다.)

이렇게 접근한 문자는 상수 문자열이 아닌 이상 변경도 가능하다.

### ✨ iterator

반복자. 배열과 같이 연속적으로 저장되어있는 자료구조의 각각의 요소에 반복적으로 접근할 수 있게 해 주는 객체. 아무튼 컨테이너에 저장되어 있는 요소에 순차적으로 접근할 수 있게 해 주는 객체이다.

C++에서는 다양한 컨테이너를 제공하는데 (문자열, vector, list, map, set...) 이 컨테이너의 종류에 상관 없이 특정 객체에 접근할 수 있는 함수가 있으면 편리하다! 해서 만들어진 클래스가 iterator고 ... 그냥 좀 더 편리하게 사용할 수 있게 만든 포인터 클래스라고 생각하고 있다.

08과제 까지는 STL 컨테이너를 쓰지 못하기 때문에 ... string 같은데서나 iterator를 사용할 수 있을 듯 하다.

[cplusplus의 예시 코드](https://m.cplusplus.com/reference/string/string/begin/) 를 보면 진짜 포인터랑 비슷한 방식이구나.. 하고 알 수 있다.

```cpp
// string::begin/end
#include <iostream>
#include <string>

int main ()
{
  std::string str ("Test string");
  for ( std::string::iterator it=str.begin(); it!=str.end(); ++it)
    std::cout << *it;
  std::cout << '\n';

  return 0;
}
```

- str.begin() : string의 첫번째 문자를 가리키는 이터레이터를 반환한다.
- str.end() : string의 *past-the-end* 문자를 가리키는 이터레이터를 반환한다. 여기서 *past-the-end* 문자라는 것은 string의 마지막 문자 바로 뒤의 문자를 의미한다. (theoretical character that would follow the last character in the string.) 어쨌든 string에 포함되는 영역이 아니기 때문에 iterator가 str.end()이 아닐 때까지 반복문을 돌려주면 string의 문자에 순차적으로 접근할 수 있다.

![valid expressions](/iterator.png)

가능한 iterator 연산자들. 증감연산자로 다음 요소에 접근할 수 있다.

### ✨ std::toupper

```cpp
int toupper ( int c );
```

**Convert lowercase letter to uppercase**

반환값은 char로 암묵적으로 캐스팅 될 수 있는 int 값이다. 걍 넣어주면 된다는 뜻.

참고로 : https://cplusplus.com/reference/locale/toupper/ (아직 이해가 잘 안되어서 사용하지는 못했음.)

### ✨ std::endl

입출력 매니퓰레이터 중 하나. 스트림에 개행문자를 넘겨주는 동시에 출력 버퍼를 비운다.

## 🌟 ex01

### ✨ 참고

- [C++ 트레이닝 책 참고](https://www.hanbit.co.kr/store/books/look.php?p_code=B7818919239)
- [전문가를 위한 C++ 책 참고](https://www.hanbit.co.kr/media/books/book_view.html?p_code=B3215427289)
- https://m.cplusplus.com/reference/sstream/stringstream/
- https://stackoverflow.com/questions/24504582/how-to-test-whether-stringstream-operator-has-parsed-a-bad-type-and-skip-it
- https://cplusplus.com/reference/string/string/getline/?kw=getline

### ✨ std::getline

cin 객체는 공백을 기준으로 입력을 받지만, getline 객체는 기본적으로 개행문자를 구분자로 입력을 받는다.

```cpp
#include <string>
istream& getline (istream& is, string& str, char delim);
istream& getline (istream& is, string& str);
```

getline은 구분자 입력 뒤에 구분자를 버퍼에서 제거하지만, cin은 개행문자를 버퍼에 그냥 둔다는 점을 기억해서 버퍼 관리를 해 주도록 하자.

### ✨ iomanip

IO Manipulators 가 모여있는 헤더파일. 매니퓰레이터 객체를 스트림에 넘겨서 입출력 스트림의 동작을 조정할 수 있다.

#### setw

```cpp
std::cout << std::setw(10) << "hello";
```

최소 출력 폭을 고정한다. 일시적인 효과를 주기 때문에 매번 출력 전에 출력 스트림에 넘겨줘야 한다.

### ✨ string stream

string에 스트림 개념을 추가한 것이다. 파일 입출력처럼 string 객체로부터 입력받고, string객체에 출력하는 것이다.

기본적으로 토큰화 기능을 제공하기 때문에 파싱도 간단하게 할 수 있다.

(istringstream 기준으로) 입력받은 string을 공백을 기준으로 자르고, 앞에서부터 차례대로 >> 오른쪽 변수의 자료형과 맞는 값을 찾아온다.

```cpp
#include <iostream>
#include <string>
#include <sstream>

void print_state (const std::ios& stream) {
  std::cout << " good()=" << stream.good();
  std::cout << " eof()=" << stream.eof();
  std::cout << " fail()=" << stream.fail();
  std::cout << " bad()=" << stream.bad() << std::endl;
}

int main()
{
  std::string input_str;
  std::getline(std::cin, input_str);
  std::stringstream ss(input_str);
  int a, b;
  ss >> a;
  std::cout << "a : " << a << '\n';
  print_state(ss);
  ss.clear();
  ss >> b;
  std::cout << "b : " << b << '\n';
  print_state(ss);
  return (0);
}
```

stringstream의 파싱이 어떻게 되는 것인지 궁금해서 테스트를 좀 해봤는데 흔히(?) 알려진 단순히 공백을 구분자로 자르는 식으로 파싱이 되는게 아닌 것 같다;

![stringstream_test](/stringstream_test.png)

가장 첫번째로 보이는 값이 int형이면 int형의 끝까지 받아오는 것 같다. 그리고 그 입력이 성공하면 다음 입력을 받아오는 것 같고, 그 입력이 실패하면 다음 입력으로 넘어가지 않는 것 같다.

스택오버플로우 답변을 보니까 잘못 읽은 것을 무시하기 위해서는 또 별도의 작업이 필요한 듯 한데 이 과제에서는 일단 첫번째 입력값만 확인해보면 되므로 나중에... 필요하면 찾아보는 걸로 하자...

### ✨ 오버로딩

같은 이름의 변수를 두 개 선언할 수는 없지만 함수는 파라미터가 다르면 같은 이름으로 중복으로 정의가 가능하다. 이걸 함수의 오버로딩이라고 한다.

파라미터의 목록을 보고 함수 구분이 가능하면 오버로딩이 가능한것이다. 반환 타입만 다른 경우에는 오버로딩이 불가능함! (어떤 함수를 "호출" 하는지가 문제기 때문에 반환 타입은 고려 요소가 아니다.)

## 🌟 ex02

### ✨ 참고

- https://m.cplusplus.com/reference/ctime/time/
- https://m.cplusplus.com/reference/ctime/localtime/
- https://m.cplusplus.com/reference/ctime/strftime/?kw=strftime
- https://skuld2000.tistory.com/137
- https://m.cplusplus.com/reference/ctime/tm/

### ✨ Timestamp 찍기

#### time 함수

현재 시간을 받아오는 함수이다. 

```cpp
time_t time (time_t* timer);
```

`time_t` 변수의 포인터를 넘겨주면, 1970년 1월 1일 0시 0분 부터 현재까지의 시간을 초 단위로 카운트해서 넘겨준다. `time_t`는 그냥 정수형 타입이다.

#### localtime 함수

`time_t` 타입의 값을 `tm` 구조체 타입으로 바꾸어준다.

```cpp
struct tm * localtime (const time_t * timer);
```

`time` 함수로 받아온 `time_t` 값은 초 단위이기 때문에 사용의 편의를 위해서 `tm` 구조체로 바꾸어주는 것이 좋다. 

```cpp
struct tm {
	int	tm_sec;		/* seconds after the minute [0-60] */
	int	tm_min;		/* minutes after the hour [0-59] */
	int	tm_hour;	/* hours since midnight [0-23] */
	int	tm_mday;	/* day of the month [1-31] */
	int	tm_mon;		/* months since January [0-11] */
	int	tm_year;	/* years since 1900 */
	int	tm_wday;	/* days since Sunday [0-6] */
	int	tm_yday;	/* days since January 1 [0-365] */
	int	tm_isdst;	/* Daylight Savings Time flag */
	long	tm_gmtoff;	/* offset from UTC in seconds */
	char	*tm_zone;	/* timezone abbreviation */
};
```

이런 식으로 변환되어서 필요에 따라서 골라서 쓸 수 있다.

#### strftime 함수

`tm` 구조체의 내용을 `format`대로 만들어서 char형 배열로 만들어주는 함수이다.

```cpp
size_t strftime (char* ptr, size_t maxsize, const char* format, const struct tm* timeptr );
```

- `ptr` : `format`대로 만들어진 문자열을 저장할 `char`형 배열을 가리키는 포인터
- `maxsize` : `null` 문자를 포함한 `ptr`에 들어갈 문자의 개수
- `format` : `ptr`에 들어갈 문자열의 포맷을 지정한다. `printf` 의 `format` 인자처럼 사용하면 된다.
  - `%Y` : 년 (4자리 숫자)
  - `%m` : 월 (2자리 숫자)
  - `%d` : 일 (2자리 숫자)
  - `%H` : 시 (2자리 숫자, 24시간 포맷)
  - `%M` : 분 (2자리 숫자)
  - `%S` : 초 (2자리 숫자)

- `timeptr` : `format`대로 출력해줄 `tm` 구조체 포인터

### ✨ Vector 생성자

https://cplusplus.com/reference/vector/vector/vector/

이 문제에서는 **range constructor** 를 사용했다.

## 🚀 ex00

표준 입출력, string 클래스, namespace, `toupper()` 함수에 대해서 공부할 수 있는 문제이다.

### ✨ 표준 입출력

표준 입력은 `cin` 객체, 표준 출력은 `cout` 객체를 이용한다. C와 다른 점은 객체를 이용하기 때문에 객체의 내장함수를 이용하여 보다 다양한 입출력 옵션을 줄 수 있다는 점이다.

`cin` 객체는 `istream` 클래스의 인스턴스(=객체)이고, `cout` 객체는 `ostream` 클래스의 인스턴스이다. 이 객체들에 오버로딩된 shift 연산자들 (`<<`, `>>`)로 데이터를 넘겨서 출력하는 방식이다. 이 때 오버로딩된 shift 연산자들은 기본 자료형 모두에 오버로딩되어있기 때문에 그냥 타입 상관없이 넘겨주면 알아서 적당한 타입으로 인식하여 출력하거나 입력해준다.

입출력을 위해서는 `iostream` 헤더파일을 인클루드해야 한다. `iostream`은 `istream` 클래스와 `ostream` 클래스를 모두 상속받은.. 클래스라고 한다. (상속에 대한 내용은 이후 모듈에서 다뤄 볼 수 있다. 일단은 그냥 상속 의미 그대로 받아들이고 있으면 될 듯 하다.)

### ✨ string 클래스

C나 C++이나 문자열은 문자(`char`)의 배열 형태로 다루고 있지만 C++에서는 `char` 배열을 다루는 `string` 클래스를 제공해서 보다 자유롭고 편하게 문자열을 다룰 수 있게 한다.

### ✨ namespace

변수명, 함수명 등의 명칭은 최소한의 규칙(키워드와 동일한 이름이면 안된다던가,,, 등)만 지켜주면 자유롭게 명명할 수 있다. 이 때문에 프로젝트가 커지고, 많은 헤더파일들을 사용하게 되면 명칭이 충돌하는 문제가 발생할 가능성이 있게 된다. 이런 문제는 단순히 규칙을 엄격하게 만든다고 해서 해결할 수 있는 문제가 아닐 것이므로 언어 차원에서 명칭 충돌 방지 대책을 마련한 것이 `namespace`이다.

`namespace`는 쉽게 말해서 명칭을 담는 영역으로 명칭들에 소속을 부여해서 구분할 수 있게 하는 것이다.

C++에서는 모든 표준 요소들을 `std namespace`에 정의해두었다. 따라서 표준 요소들을 사용할 때에는 앞에 `std::` 를 붙여서 소속을 표시해 주는 것이다.

### ✨ toupper()

```cpp
#include <ctype.h>
int toupper ( int c );
```

주어진 문자를 대문자로 바꿔주는 함수이다. 실질적으로는 문자를 받아서 문자를 반환하는 함수이기 때문에 인자와 반환값 모두 `char` 형으로 암시적으로 형변환 될 수 있는 `int`가 될 것이다.

반환값이 `int`이기 때문에 만약에 이 함수의 반환값을 그대로 이용하기 위해서는 `char` 타입으로 형변환을 해 줘야 할텐데 그 때 `char(toupper(c))` 이런 식으로 하는 것이 보다 C++스럽다고 할 수 있을 것 같다. 

### ✨ 문제 해결

문제의 요구사항은

1. 인자가 들어오지 않았을 경우에는 (`argv < 2`) 정해진 문자열을 출력한다.
2. 그 외에는 들어오는 인자를 띄어쓰기 없이 모두 대문자로 변환하여 출력한다.

이다.

1번 요구사항은 간단히 `argv`의 조건을 검사해서 `std::cout`으로 출력해주면 되고, 조금 고민이 필요한 부분은 2번이다.

서브젝트 아래에

> Solve the exercises in a C++ manner.

이런 문구가 적혀있는 바람에 for문을 사용하는 것이 과연 C++ manner와 맞나... `iterator`를 사용해야 하는 것인가... 하고 실제로 `iterator` 공부도 조금 해두긴 했는데 내가 알기로는 이후 CPP 과제에서 `iterator`에 대해서 제대로 공부하는 부분이 있는 것 같아서 ex00 과제에서는 그냥 C++의 `string`을 사용했다는 것으로 C++ manner 로 문제를 해결했다고 해 보려고 한다.

```cpp
for(int i = 1; i < argc; i++)
	{
		std::string new_str = argv[i];
		for(unsigned int j = 0; j < new_str.length(); j++)
			new_str[j] = std::toupper(new_str[j]);
		std::cout << new_str;
	}
	std::cout << std::endl;
```

3번째 라인처럼 `char` 배열 → `string` 객체 변환을 단순히 대입연산자로 해 주는 것이 지금까지는 그냥 상식적으로 (?) 썼지만 막상 설명하려니 진짜 이게 맞나 싶어서 걱정했는데 `string` 클래스에 대입 연산자 오버로딩이 되어있어서 저렇게 대입해주는 것이 가능했다. 다행이다. 😩 C++ 짱@!

```cpp
string& operator= (const string& str);
string& operator= (const char* s);
string& operator= (char c);
```

### ✨ 참고

- <https://cplusplus.com/reference/iostream/>
- <https://modoocode.com/213>

- <https://www.geeksforgeeks.org/c-stream-classes-structure/>
- <https://m.cplusplus.com/reference/string/string/>

- <https://m.cplusplus.com/reference/string/string/operator=/>
- <https://cplusplus.com/doc/oldtutorial/namespaces/>
- <https://cplusplus.com/reference/cctype/toupper/?kw=toupper>

## 🚀 ex01

클래스와 생성자, 접근 지정자, 입출력 (`getline`), `iomanip` 헤더파일, initialization lists, `const` 에 관련된 내용을 공부할 수 있는 문제이다.

### ✨ 클래스

#### 클래스

C의 구조체는 변수의 집합이다. 따라서 C의 구조체에서 함수를 다루고 싶다면 함수 포인터를 변수에 넣어줘야만 했었다.

하지만 C++에서는 구조체에 함수를 넣을 수 있다. 함수 선언과 정의를 동시에 해도 되고, 구조체 안에서 함수 선언만 하고 정의는 밖에서 해 줘도 된다. 이렇게 함수를 넣을 수 있게 된 C++ 구조체를 Class라고 부른다.

#### 생성자

C++에서는 클래스를 타입(자료형)으로 다루기 때문에 단순히 Class 타입의 변수를 만드는 것으로 객체를 생성할 수 있다. 하지만 그 안의 멤버들(클래스 내용물)의 값에는 쓰레기 값이 들어있을 것이기 때문에 거의 필수적으로 변수 생성 뒤에 멤버 변수들의 값을 초기화하는 과정이 필요하다. 이 연속적인 동작을 한번에 함수 하나로 할 수 있게 하는 것이 클래스의 생성자이다.

```cpp
class PhoneBook
{
  private:
  	int size_;
  public:
  	PhoneBook(void);
}
```

이렇게 클래스명과 동일한 이름의 함수가 생성자 함수인데, 반환값이 전혀 필요하지 않으므로 반환형이 없다는 특징이 있다. 생성자 함수도 함수이므로 인자를 받아서 그 함수 안에서 활용할수도 있다.

#### initialization lists

```cpp
PhoneBook::PhoneBook(void) : size_(0)
{
}
```

이렇게 생성자 함수의 body 앞에 멤버변수(초기화값) 형식으로 적어두는 것이 initialization lists 이다.

initialization lists를 사용하면 멤버변수의 선언과 동시에 초기화를 할 수 있다. 반드시 필요한 것은 아니지만, 쓰레기값을 가질 수 없는 상수나 레퍼런스 변수의 경우에는 initialization lists를 사용해서 선언과 동시에 초기화를 해 주는 것이 필수적이다.

#### 접근 지정자

객체지향의 중요한 개념 중 하나가 정보 은닉 / 캡슐화이다. 클래스 밖에서 사용해야만 하는 멤버들만 밖으로 공개하고, 그 외의 것들은 클래스 내부에서만 직접적으로 접근할 수 있게 해야 한다. 이것을 가능하게 하는 것이 접근 지정자이다.

- `public` : 클래스 외부에서 자유롭게 접근할 수 있는 멤버들
- `private` : 클래스 내부에서만 접근할 수 있는 멤버들, 클래스 외부에서 접근하려면 get/set 함수와 같은 accessor 함수들을 `public`으로 정의해두고 간접적으로 접근해야 한다.
- `protected` : 이 클래스를 상속받은 자식 클래스에서 접근할 수 있는 멤버들

기본적으로 C++의 클래스에서 접근 지정자를 명시하지 않으면 모두 `private`으로 설정된다고 한다.

### ✨ std::getline

`std::cin` 객체로 입력을 받을 때에는 공백을 구분자로 사용해서 공백 앞까지의 값을 한번에 입력받을 수 있다. 그래서 공백을 포함하여 개행 직전까지 입력을 받고 싶을 경우에는 getline 함수를 사용해주면 좋다. (다른 방법이 있을지도?)

```cpp
#include <string>
istream& getline (istream& is, string& str, char delim);
istream& getline (istream& is, string& str);
```

- `is` : `istream` 객체이다. 표준 입력으로 받고 싶으면 `std::cin`을 전달해주면 된다 (`cin`은 `istream` 객체이다!)
- `str` : 입력받은 문자열이 저장될 `string` 객체이다.
- `delim` [option] : `delim` 직전까지의 내용을 `str`에 저장한다. 만약에 특별히 명시하지 않으면 구분자는 `'\n'`이다.

만약 `getline`과 `cin`을 함께 사용한다면 버퍼에 조금 주의를 기울여야 한다.

`cin`은 개행을 입력받으면 개행 전까지의 내용을 처리하고 버퍼에 개행문자를 그대로 두지만, `getline`은 개행 전까지의 내용을 처리한 뒤에 개행문자도 버퍼에서 꺼내온다.

둘이 같이 쓰게 된다면 `fflush(stdin)`, 혹은 `cin.ignore()` 과 같은 버퍼를 비우는 함수들을 사용해서 버퍼를 관리해줘야 할 것 같다. (나는 `getline`으로만 입력을 받아서 따로 고민해보진 않았다.)

### ✨ iomanip

**IO Manipulators** . 입출력 조정자이다. 입출력에 관한 이런저런 형식들을 조정할 수 있는 함수들을 제공한다.

매니퓰레이터 객체를 입출력 스트림에 전달해서 스트림의 동작을 변경할 수 있는데 이때 그냥 스트림의 동작만 변경할수도 있고, 스트림에 데이터를 전달하면서 동작을 변경할수도 있다.

지금까지 계속 사용해왔던 매니퓰레이터가 `std::endl`인데, 출력스트림에 개행문자를 전달하고 (스트림에 데이터를 전달하고) 출력 버퍼를 비우는 동작을 하는 (동작을 변경하는) 매니퓰레이터이다.

ex01에서는 출력 폭을 고정하는 작업이 필요한데 그 작업은 `setw` 매니퓰레이터로 할 수 있다.

`setw` 는 바로 다음 출력에만 적용되기 때문에 출력 폭을 고정할 필요가 있을 때마다 매번 스트림에 넘겨줘야 한다.

### ✨ const

상수 멤버 변수는 값을 한번 초기화하면 다시는 값을 변경할 수 없는 멤버변수이다. `static`하고 혼동할 수 있는데 `static` 멤버 변수는 같은 클래스의 인스턴스끼리 **공유**하는 변수이기 때문에 값의 변경은 자유로운 변수이고, `const` 멤버 변수는 각각의 객체들이 자신만의 `const` 멤버 변수를 가질 수 있지만 값의 변경은 한번 초기화 된 이후에는 할 수 없는 변수이다.

상수 멤버 함수는 객체의 상태를 읽기만 하고 내부 멤버 변수의 값을 변화시키지는 않는 함수이다. 만약에 객체를 `const`로 생성했을 경우에는 그 객체는 상수 멤버 함수만 호출할 수 있다고 한다. `const`를 붙여주는 것이 필수적인 것은 아니지만 일반적으로 `getter` 함수에는 `const`를 붙여주는 편이고, 그 외에도 단순히 객체 상태 조회만 하는 함수에는 `const`를 붙여주는 습관을 들이는 것이 좋다고 한다. 

### ✨ 문제 해결

![phonebook(ADD)](./imgs/cpp_module_00_phonebook_1.png)
![phonebook(SEARCH)](./imgs/cpp_module_00_phonebook_2.png)

서브젝트 꼼꼼하게 읽고 요구사항들을 그대로 구현하면 되는 간단하면서도 간단하지 않은 문제이다. 다른 부분은 문제가 없는데 예외 처리는 평가 시에도 주관적으로 평가되는 부분이라 어떤 부분은 구현했고, 어떤 부분은 구현하지 않았는지 생각 정리를 잘 해 두면 좋을 것 같다. 나는 eof가 입력되는 부분만 예외로 처리해줬다.

### ✨ 참고

- <https://cplusplus.com/reference/string/string/getline/?kw=getline>
- <https://cplusplus.com/reference/iomanip/>

## 🚀 ex02

주어진 19920104_091532.log 파일과 tests.cpp 파일을 보고 출력 결과가 (timestamp 제외하고) 동일할 수 있도록 Account.hpp에 선언되어 있는 함수들의 내용을 채워주면 되는 문제이다. (여담인데 문제에 얽힌 스토리가 참 웃프다.)

### ✨ Account(void)

```
[19920104_091532] index:0;amount:42;created
[19920104_091532] index:1;amount:54;created
[19920104_091532] index:2;amount:957;created
[19920104_091532] index:3;amount:432;created
[19920104_091532] index:4;amount:1234;created
[19920104_091532] index:5;amount:0;created
[19920104_091532] index:6;amount:754;created
[19920104_091532] index:7;amount:16576;created
```

```cpp
typedef std::vector<Account::t>							  accounts_t;
int	const				amounts[]	= { 42, 54, 957, 432, 1234, 0, 754, 16576 };
size_t const			amounts_size( sizeof(amounts) / sizeof(int) );
accounts_t				accounts( amounts, amounts + amounts_size );
```

1. `accounts_t` 는 `Account` 객체를 담는 vector이다.

2. 각 객체의 `amount` 값으로 넣어줄 값 배열 `amounts`

3. `amounts` 배열의 원소 개수 세어 줌.

4. `accounts_t` 벡터 초기화

   벡터 생성자가 여러 개 있는데 그 중에서 범위 생성자(?) (range constructor) 를 이용한 것이다. 

   `amounts` 배열의 원소들을 하나씩 생성자의 인자로 넣어서 `Account` 객체를 만든 다음에 vector의 원소로 넣어주는 흐름이다.

그러니까 결론적으로 위의 19920104_091532.log의 내용은 `Account` 클래스에서 인자 1개를 받는 생성자를 8번 호출한 결과이다.

```cpp
Account::Account( int initial_deposit ) : _accountIndex(_nbAccounts++), _amount(initial_deposit), _nbDeposits(0), _nbWithdrawals(0)
{
	_displayTimestamp();
	_totalAmount += initial_deposit;
	std::cout << "index:" << _accountIndex << ";";
	std::cout << "amount:" << _amount << ";";
	std::cout << "created\n";
}
```

0. 멤버 변수들 초기화해주기.
1. timestamp 찍어주기.
2. 이후에 `displayAccountsInfos` 함수의 호출 내용을 보면 `total`에 20049라는 값이 들어가 있는데 이게 `amounts` 배열의 원소의 총 합과 일치한다. 따라서 `_totalAmount` 값에 `initial_deposit` 값을 계속해서 더해줬다.
3. 출력 결과대로 출력해주기.

### ✨ displayAccountsInfos(void)

```
[19920104_091532] accounts:8;total:20049;deposits:0;withdrawals:0
[19920104_091532] accounts:8;total:21524;deposits:8;withdrawals:0
[19920104_091532] accounts:8;total:12442;deposits:8;withdrawals:6
```

```cpp
Account::displayAccountsInfos();
```

출력 결과를 보면 1. 총 accounts의 개수, 2. 총 amounts의 합, 3. 총 deposit 횟수, 4. 총 withdrawal 횟수 라는 것을 유추할 수 있다. 

모든 객체들이 공유해야 하는 내용들이므로 `static`으로 선언되어 있는 변수 4개를 출력해주면 된다.

```cpp
private:
	static int	_nbAccounts;
  static int	_totalAmount;
  static int	_totalNbDeposits;
  static int	_totalNbWithdrawals;	
public:
  static int	getNbAccounts( void );
  static int	getTotalAmount( void );
  static int	getNbDeposits( void );
  static int	getNbWithdrawals( void );
```

`static`으로 선언된 변수들은 모든 클래스 객체들이 공유할 수 있는 값이다. 이 변수들은 `Account` 클래스 안에 `private`으로 선언되어 있기 때문에 getter 함수까지 같이 정의해주었다.

### ✨ displayStatus()

```
[19920104_091532] index:0;amount:42;deposits:0;withdrawals:0
[19920104_091532] index:1;amount:54;deposits:0;withdrawals:0
[19920104_091532] index:2;amount:957;deposits:0;withdrawals:0
[19920104_091532] index:3;amount:432;deposits:0;withdrawals:0
[19920104_091532] index:4;amount:1234;deposits:0;withdrawals:0
[19920104_091532] index:5;amount:0;deposits:0;withdrawals:0
[19920104_091532] index:6;amount:754;deposits:0;withdrawals:0
[19920104_091532] index:7;amount:16576;deposits:0;withdrawals:0
```

```cpp
std::for_each( acc_begin, acc_end, std::mem_fun_ref( &Account::displayStatus ) );
```

`for_each` 함수를 해석하면 첫번째 인자부터, 두번째 인자 직전까지 (열린 구간), 마지막 인자의 함수를 각각 적용한다는 뜻이다.

`acc_begin = accounts.begin()`, `acc_end = accounts.end()` 이기 때문에 저 말은 즉 `accounts` 벡터의 모든 요소, 모든 `Account` 객체에 마지막 인자인  `Account::displayStatus` 를 전달해주겠다는 것이다.

3번째 인자에 `mem_fun_ref` 라는 함수가 등장하는데, 어떤 객체의 멤버 함수를 함수 포인터로 사용할 수 있게 해 주는 함수..? 라는 것 같다. 사실 아직도 명확하게 이해하진 못했지만 위의 tests.cpp 내용이 각 `Account` 객체에서 `displayStatus` 함수를 호출하는 것이라는 건 문맥상 유추할 수 있고, 무엇보다 `mem_fun_ref` 계열의 함수들이 C++17부터는 지원하지 않는다고 해서... 안그래도 무슨 소린지 모르겠는데 더 공부 의지가 떨어졌다.

나중에 알고리즘 헤더의 함수들을 공부하면서 다시 보게 된다면 **함수 객체** 또는 **펑터**, **펑터 클래스** 에 대해서 공부해보도록 하자... (과연?)

아무튼 `displayStatus` 함수는 `Account` 객체의 멤버 변수들을 형식에 맞게 출력하는 함수이고, 주어진 형식에 맞게 잘 구현해주면 되겠다.

### ✨ makeDeposit()

```
[19920104_091532] index:0;p_amount:42;deposit:5;amount:47;nb_deposits:1
[19920104_091532] index:1;p_amount:54;deposit:765;amount:819;nb_deposits:1
[19920104_091532] index:2;p_amount:957;deposit:564;amount:1521;nb_deposits:1
[19920104_091532] index:3;p_amount:432;deposit:2;amount:434;nb_deposits:1
[19920104_091532] index:4;p_amount:1234;deposit:87;amount:1321;nb_deposits:1
[19920104_091532] index:5;p_amount:0;deposit:23;amount:23;nb_deposits:1
[19920104_091532] index:6;p_amount:754;deposit:9;amount:763;nb_deposits:1
[19920104_091532] index:7;p_amount:16576;deposit:20;amount:16596;nb_deposits:1
```

```cpp
typedef std::pair<accounts_t::iterator, ints_t::iterator> acc_int_t;

ints_t				deposits( d, d + d_size );
ints_t::iterator	dep_begin	= deposits.begin();
ints_t::iterator	dep_end		= deposits.end();


for ( acc_int_t it( acc_begin, dep_begin ); it.first != acc_end && it.second != dep_end; 
     ++(it.first), ++(it.second) ) {
	(*(it.first)).makeDeposit( *(it.second) );
}
```

^_^... 정말 번거롭다. 정말 이 과제 하다 보면 과제 스토리의 주인공인 불쌍한 신입사원이 된 것 같은 기분이 든다.

`acc_int_t` 는 `accounts_t` 의 원소들을 가리키는 이터레이터를 `first`로, `ints_t`, 즉 `int` 벡터의 원소들을 가리키는 이터레이터를 `second`로 갖는 `pair`를 alias 해 둔 것이다. `pair`는 서로 다른 타입의 자료형 2개를 묶어서 관리할 수 있게 하는 자료구조이고, 이터레이터는 포인터와 비슷하게 벡터나 리스트, 같은 C++ 컨테이너의 각각의 원소들에 접근할 수 있게 하는 반복자 객체이다. CPP Module 이후 과제에 등장하는 개념으로 알고 있어서 일단 간단하게만 정리해 보았다.

아무튼 , 위의 tests.cpp의 for반복문을 해석해보면, `accounts` 벡터를 처음부터 끝까지 돌면서, 각각의 `Account`객체의 멤버함수인 `makeDeposit` 함수를 `deposit` 배열의 원소를 순서대로 인자로 넣어 호출하겠다는 뜻이다. 19920104_091532.log 의 한줄 한줄이 `Account` 객체에서 순서대로 `makeDeposit` 함수를 호출한 결과라는 것.

결과를 보니 `p_amount` 가 기존의 `amount`이고, `deposit`이 `makeDeposit`의 인자로 들어온 `deposits` 벡터의 원소 하나, `amount` 가 `p_amount`에다 `deposit` 을 더한 값이고 마지막으로 `nb_deposits`이 `makeDeposit` 함수를 호출한 횟수라는 것을 알 수 있다. 그대로 구현해주면 된다.

### ✨ makeWithdrawal()

```
[19920104_091532] index:0;p_amount:47;withdrawal:refused
[19920104_091532] index:1;p_amount:819;withdrawal:34;amount:785;nb_withdrawals:1
[19920104_091532] index:2;p_amount:1521;withdrawal:657;amount:864;nb_withdrawals:1
[19920104_091532] index:3;p_amount:434;withdrawal:4;amount:430;nb_withdrawals:1
[19920104_091532] index:4;p_amount:1321;withdrawal:76;amount:1245;nb_withdrawals:1
[19920104_091532] index:5;p_amount:23;withdrawal:refused
[19920104_091532] index:6;p_amount:763;withdrawal:657;amount:106;nb_withdrawals:1
[19920104_091532] index:7;p_amount:16596;withdrawal:7654;amount:8942;nb_withdrawals:1
```

```cpp
for ( acc_int_t it( acc_begin, wit_begin ); it.first != acc_end && it.second != wit_end;
		  ++(it.first), ++(it.second) ) {
		(*(it.first)).makeWithdrawal( *(it.second) );
	}
```

위의 `makeDeposit` 와 완전히 동일한 방식으로 `makeWithdrawal` 함수를 호출하는 부분이다.

역시 로그를 보면 `p_amount` 가 기존의 `amount`, `withdrawal` 이 `makeWithdrawal`의 인자로 들어온 `withdrawals` 벡터의 원소 하나, `amount`가 `p_amount` 에서 `withdrawal`을 뺀 값, 마지막으로 `nb_withdrawals`는 `makeWithdrawal` 함수를 호출한 횟수라는 것을 알 수 있다.

`makeWithdrawal` 함수가 `makeDeposit` 과 다른 점이 index 0과 5에서 `withdrawal` 값이 출력되지 않고 refused 가 출력되고 다음 index로 넘어갔다는 점인데, `withdrawals` 벡터의 내용을 보면 ` { 321, 34, 657, 4, 76, 275, 657, 7654 }` 으로 0번째와 5번째 인덱스 값인 321과 275가 해당 인덱스의 `Account`의 `p_amount` 값보다 크다는 것을 알 수 있다. 상식적으로 기존 `amount` 보다 인출할 금액이 더 크면 인출이 거부될 것이므로.. 이 부분 예외처리를 추가해서 `makeDeposit`과 비슷하게 구현해주면 된다.

### ✨ ~Account()

```
[19920104_091532] index:0;amount:47;closed
[19920104_091532] index:1;amount:785;closed
[19920104_091532] index:2;amount:864;closed
[19920104_091532] index:3;amount:430;closed
[19920104_091532] index:4;amount:1245;closed
[19920104_091532] index:5;amount:23;closed
[19920104_091532] index:6;amount:106;closed
[19920104_091532] index:7;amount:8942;closed
```

```
~Account()
```

tests.cpp에서 소멸자가 따로 호출되는 부분은 없지만 main이 종료되면 운영체제가 메모리를 회수하고, 그 과정에서 자연스레 소멸자가 호출되게 된다.

인덱스와 남아있는 `amount`의 값을 출력해주면 된다.

출력과는 관계없긴 하지만 `static` 변수들의 값도 상황에 맞게 줄여주었다.

### ✨ 참고

- <https://cplusplus.com/reference/vector/vector/vector/>

- <https://cplusplus.com/reference/algorithm/for_each/>

## 🚀 끝

지금 이렇게 정리를 쭉 해보고 나니까 이 과제가 가장 첫번째 C++ 과제라서 아무래도 C++ 전반적인 내용에 대해서 확실하게 해 두고 넘어가야 하기 때문에 평가 준비에 시간이 더 걸린 것 같기도 하다. ㅎㅎ... 그래도 지금 이렇게 정리해두는 편이 이후 과제를 좀 더 확실하고 빠르게 하는데 더 도움이 되지 않을까..? 이것도 C++ 피씬이니까 C 피씬때처럼 겁먹지 말고 몸통박치기를 자주 해야 빨리 통과할 수 있을 것 같다. (제발..)