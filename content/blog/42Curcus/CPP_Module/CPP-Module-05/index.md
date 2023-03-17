---
title: "CPP Module 05"
date: 2022-07-26 12:44:34
category: 42Curcus/CPP_Module
description: "CPP Module 05 과제를 하면서 공부한 내용들(을 엄청 대충 정리함)"
---

## 🌟 Exception

### ✨ C++의 예외처리

예외란 정상적인 실행을 방해하는 조건이나 상태를 의미한다.

예외를 점검하는 전통적인 방법은 if문인데 (반환값에 조건을 걸어 검사한다든지, 등) 점검해야 할 예외가 많아지면 다량의 if문이 필요하게 되고 보기가 좋지 않다. 는 문제와 , 예외처리와 실제 코드가 한데 엉켜 있게 되어서 코드의 핵심 동작을 파악하기가 어렵다는 문제가 있다.

따라서 C++에서는 언어 차원에서 예외 처리 문법을 제공하고, 예외 처리를 위해서 3가지 키워드를 제공한다.

- `try` : 예외가 발생할 가능성이 있는 코드를 감싼다. 예외가 발생했을 때 `throw` 로 예외를 **던져**준다.
- `throw` : 예외가 발생하면 예외를 던져서 `catch` 키워드로 이동한다. `throw()` 괄호 안에는 예외를 설명하는 값이나 객체가 들어간다.
- `catch` : 예외를 받아서 처리하는 핸들러. 받고자 하는 예외를 명시해줘야 한다. 이 블록 안에 예외처리 방식을 정의한다.

try 블록 안에서 예외가 발생하지 않으면 그 아래에 있던 catch 블록은 무시된다.

```cpp
try
{
  int a;
  ...
  throw(a)
}
catch (int a)
{
  std::cout << "에러 났어!!" << std::endl;
}
```

원칙적으로 throw는 try 블록에 있어야 하지만, 외부 함수에서도 throw를 할 수 있다. 이 경우에는 throw 예외를 함수를 호출한 쪽에서 처리한다.

```cpp
void error (void)
{
  ...
  if (...)
    throw(1);
}

int main(void)
{
  ...
  try
  {
    error();
  }
  catch (int a)
  {
    std::cout << "에러 났어!!" << std::endl;
    return;
  }
}
```

이런 식으로 error 함수에서 에러가 던져지면, **error 함수의 호출 스택을 정리하고** error 함수를 호출했던 try-catch 문으로 돌아와 catch 블록으로 들어간다.

### ✨ 커스텀 예외 클래스

catch로 잡을 수 있는 값은 뭐든,, 괜찮은 것 같지만 (뇌피셜임) 보다 편안한 예외처리를 위해서 exception 클래스를 상속받아서 커스텀 예외 객체를 만들수도 있다. 이렇게 커스텀 예외 객체를 사용하면 베이스 클래스인 exception 클래스 타입으로 프로그램 상의 다양한 예외들을 한번에 받을 수 있으므로 다형성을 활용하기가 쉬워지고, 에러에 대한 정보를 관리하기도 쉬워진다. (클래스니까!!)

exception class 는 이렇게 생겼다.

```cpp
class exception {
public:
  exception () throw();
  exception (const exception&) throw();
  exception& operator= (const exception&) throw();
  virtual ~exception() throw();
  virtual const char* what() const throw();
}
```

virtual로 선언되어 있는 what() 함수를 오버라이딩 해서 사용하면 되는데, 이 함수는 에러를 구분할 수 있는 메시지를 반환하는 함수이다. 커스텀 예외 클래스에 맞는 메시지를 반환하도록 오버라이딩 해 주면 된다.

함수가 좀 이상하게 생겼는데 `virtual const char* what() const throw()` 여기서 마지막에 붙은 throw()는 이 함수 안에서는 예외를 던지지 않겠다는 의미라고 한다. C++ 11 부터는 noexcept 이라는 표현으로 바뀐다.

### ✨ 참고

- [C++ 트레이닝](https://www.hanbit.co.kr/store/books/look.php?p_code=B7818919239)
- https://cplusplus.com/reference/exception/exception/?kw=exception
- https://bytes.com/topic/c/answers/725767-const-what-const-throw
- https://caniro.tistory.com/m/155

## 🌟 난수 생성하기 (진짜 대충 씀 주의...)

ex02에서 50% 확률을 만들어야 하기 때문에, 난수를 만들어야 한다.

그냥 생각하면 robot...form class의 execute 함수에서 srand로 시드를 설정한 뒤에, rand 함수로 랜덤한 값을 뽑아내면 되겠구나! 하는 생각이 드는데 실제로는 그렇게 안된다.

아무튼 결론은 프로그램 시작 후 첫 robot...form class의 execute 함수에서 srand로 시드 설정해주고, 그 이후에 다시 execute 함수를 호출하면 srand로 다시 시드를 설정하지 않고 그냥 rand 함수로 랜덤한 값을 가지고 와야 한다.

```cpp
#include <cstdlib>
#include <ctime>
#include <iostream>

int main(void)
{
	//srand(time(NULL)); // 1
	for(int i = 0; i < 10; i++)
	{
		srand(time(NULL)); // 2
		std::cout << rand() << std::endl;
	}
	return (0);
}
```

for문 밖에서 srand를 해 준 결과가 첫번째 결과이고, for문 안쪽에서 srand를 해 준 결과가 두번째 결과이다.

![](/rand_test.png)

참고 : https://kldp.org/node/135244>

srand 함수에서 rand에서 사용할 **첫** 값을 결정한 뒤에, rand에서 그 값을 계속 바꾸어가며 랜덤한 값을 설정하게 되는 것인데, for문 안쪽과 같이 반복이 1초가 되기 전에 돌아오는 이런 상황에서는 rand에 들어오는 시드값이 동일하게 된다. (time은 초단위임) 따라서 계속해서 첫 rand의 값과 동일한 결과가 나오게 되기 때문에 위와 같이 계속해서 동일한 rand 결과가 나오는 것이다.