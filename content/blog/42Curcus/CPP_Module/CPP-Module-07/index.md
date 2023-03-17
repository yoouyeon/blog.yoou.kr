---
title: "CPP Module 07"
date: 2022-08-01 22:39:15
category: 42Curcus/CPP_Module
description: "CPP Module 07 과제를 하면서 공부한 내용들(을 엄청 대충 정리함)"
---

## 🌟 함수 템플릿

템플릿이란 어떤 틀을 말한다.

함수 템플릿이란, 함수를 만드는 틀이라고 할 수 있다. 비슷한 모양의 함수가 여러 개 필요하다면, 틀을 만들어놓고, 그 틀을 이용해서 필요한 형태로 함수를 찍어내는 것이다.

함수 템플릿 정의 형식은 `template` 키워드로 시작하고, `<>` 괄호 안에 타입 인수임을 의미하는 `typename` 키워드와 그 아래부터 사용할 타입 인수의 이름을 적는다. (보통 타입 인수의 이름은 `T`를 사용한다.)

![function_template_format](/function_template_format.png)

만약에 템플릿 함수를 호출할 때 `int`를 사용하면, 타입 인수인 `T`는 `int`가 된다. `std::string`을 사용하면, 타입인수 `T`는 `std::string` 타입이 된다.

---

템플릿을 통해서 진짜 함수를 만들어내는 과정을 인스턴스화 (구체화) 라고 한다. 단순히 템플릿을 정의한 내용은 메모리 상에 저장되지 않는다.

템플릿 함수를 호출하는 쪽에서 타입에 해당하는 인수를 전달하면 컴파일러는 그 인수와 템플릿을 이용해서 함수를 구체화한다.

구체화하는 방식은 `min((int 타입 인자), (int 타입 인자))` 이렇게 해서 컴파일러가 알아서 타입을 추론하도록 하는 방식과 `min<int>(int 타입 인자), (int 타입 인자)` 이런 식으로 명시적으로 타입을 밝혀주는 방식이 있다.

---

`<typename T>` 이런 식으로 타입을 한개만 사용했을 때 호출 시에 사용하는 인수의 타입이 다르면 에러이다. 따라서 다른 타입의 인수를 받게 하려면, 호출하고자 하는 템플릿 함수에서 어떤 타입으로 인수를 해석하면 좋을지 명시적으로 밝혀줘야 한다.

`max<int>(42, 42.4)` 이런 식으로 템플릿 함수 max를 호출하면, 42.4는 int로 변환되어 템플릿 함수의 인자로 들어가게 된다.

## 🌟 클래스 템플릿

클래스 템플릿은 구조나 알고리즘은 같지만 멤버의 타입이 다른 클래스들을 만들어낼 때 사용한다.

함수 템플릿과 비슷하게, 클래스 선언문 앞에 `template <typename T>` 를 붙여서 클래스 템플릿을 선언할 수 있고, 타입인수를 사용하고자 하는 멤버에 `T` 를 적어주면 된다.

```cpp
template <typename  T>
class myclass
{
	... T 사용
}
```

이렇게 적었을 때 `myclass`는 단순히 클래스 템플릿의 이름이다. 따라서 명확하게 클래스를 명시해야 하는 경우에는 이게 어떤 타입으로 만들어진 `myclass`인지를 알려줄 필요가 있다. 그래서 다른 곳에서 `myclass`를 사용할 때에는 어떤 타입의 myclass인지를 명시하기 위해서 `myclass<int>` 이런 식으로 항상 꺾쇠 안에 사용하고 있는 타입을 명시해주어야 한다. `myclass<int>` 이렇게 적어준 것이 비로소 클래스 이름이라고 할 수 있다고 하는 것 같다.

## 🌟 템플릿의 동작 방식

### ✨ 템플릿의 동작 방식

컴파일러는 템플릿 메소드를 정의하는 코드를 발견하면, 문법 검사만 하고 템플릿 코드를 실제로 컴파일하지 않는다. 단순히 선언만 보고는 실제로 어떤 타입을 사용할 지 알 수 없기 때문이다.

컴파일러가 템플릿을 인스턴스화(구체화) 하는 코드를 발견하면 (`myTemplate<int>` 이런 식으로) 템플릿의 타입인수였던 `T` 에 `int`를 대입해서 `int` 타입의 클래스를 생성한다. 다른 타입의 구체화 코드를 발견하면 또 만든다.

단순하게 생각하면 복사해서 붙여넣고 타입만 바꾸어서 여러 타입의 클래스를 만드는 단순반복 작업을 템플릿이라는 기능으로 편하게 만든 것이라고 생각하면 편하다.

클래스 템플릿을 정의하는 코드만 작성하고, 인스턴스화 코드를 작성하지 않으면, 클래스를 정의하는 코드는 컴파일되지 않는다.

### ✨ 템플릿 선언과 구현 모두 헤더파일에 하는 이유

템플릿 클래스는 단지 클래스를 찍어내기 위한 틀이다.

컴파일러는 파일 단위를 컴파일을 하는데, 그 대상은 오직 cpp파일이고, 템플릿 클래스를 cpp 파일에 넣어두면 컴파일러가 그 cpp 파일을 컴파일 하려고 할 때, T가 실제로 어떤 타입으로 변환되는지 알 수가 없어서 (구체화 코드를 찾을 수 없음) 에러가 나게 된다.

따라서 컴파일러에게 한방에 그 템플릿에 대한 모든 정보를 알려주기 위해서 헤더파일에다가 선언과 구현을 모두 하는 것이다.

근데 만약에 구현부가 너무 길어 가독성이 좋지 않다면, 파일을 나눈 것이 더 좋을 수 있는데 이때는 컴파일러가 컴파일을 시도하는 cpp 파일이 아닌 다른 확장자를 가지는 파일에 구현을 해 주면 되고, 일반적으로는 template의 구현을 하는 파일이라고 해서 tpp라는 확장자를 가지는 파일에 구현을 한다고 한다.

참고 : https://stackoverflow.com/questions/44774036/why-use-a-tpp-file-when-implementing-templated-functions-and-classes-defined-i

## 🌟 전반적인 내용 참고

- [C++ 트레이닝](https://www.hanbit.co.kr/store/books/look.php?p_code=B7818919239)
- [전문가를 위한 C++](https://www.hanbit.co.kr/media/books/book_view.html?p_code=B3215427289)

## 🌟 ETC

### ✨ `new T[0]`

```cpp
#include <iostream>
int main(void)
{
	int *arr = new int[0];
	if (arr == NULL)
		std::cout << "is null" << std::endl;
	else
		std::cout << "is not null" << std::endl; // 이게 출력된다.
	delete[] arr;
}
```

int *arr = new int[0] 이렇게 길이가 0인 배열을 할당하려고 시도했을 때 할당도 되고, arr에 들어있는 값도 NULL이 아니다. malloc으로 할당했을 때도 똑같이 처리가 되더라 (할당 오류가 아니고, 할당 결과도 NULL이 아님)

delete는 NULL pointer를 해제할 때 문제를 발생시키지 않으므로 사실 new의 결과가 NULL이든 아니든 상관은 없지만 (참고 : https://www.cpp-junkie.com/2020/11/c-is-it-safe-to-delete-null-pointer.html) 어쨌든 new T[0]으로 할당한 메모리는 해제도 잘 된다.

하지만 0으로 할당된 배열을 참조하려고 할 때에는 "정의되지 않은 동작"이 나온다고 한다.. (분명히 집에서 쓰는 m1맥에서는 abort가 났었는데, 클러스터맥에서는 잘 접근이 된다;;; 당황스러움)

```cpp
#include <iostream>

int main(void)
{
	int *arr = new int[0];
	std::cout << arr[0] << std::endl;
	int *marr = (int *)malloc(0);
	std::cout << marr[0] << std::endl;
	return 0;
}
```

참고
- https://hashcode.co.kr/questions/608/new-int0%EB%8A%94-%EB%A9%94%EB%AA%A8%EB%A6%AC%EB%A5%BC-%ED%95%A0%EB%8B%B9-%ED%95%98%EB%82%98%EC%9A%94
- https://stackoverflow.com/questions/1087042/c-new-int0-will-it-allocate-memory

표준에 의하면

>When the value of the expression in a direct-new-declarator is zero, the allocation function is called to allocate an array with no elements.

원소가 없는 배열을 할당한다고 되어 있고

>The effect of dereferencing a pointer returned as a request for zero size is undefined.

이렇게 인덱스로 접근했을 경우에 정의되지 않은 동작이 발생한다고 했으므로, 클러스터맥에서 뭔가 접근이 되는 것도 어쨌든 정의되지 동작 중 하나라고 생각하면 될 듯 하다. (그리고 과제에서 하란대로 [] 연산자를 잘 오버로딩 했으면 접근 시도시에 error throw될것이니까 상관없을 듯)

### ✨ typename 의 (보다 정확한) 의미

`typename` 은 template에서만 사용하는 키워드인줄 알았는데... 아니었다.

사실 template선언부에서 `typename`을 `class`로 지정해도 문제 없이 컴파일된다. (내 뇌피셜로는 자료형들도 클래스로 구현되어 있기 때문에... 그렇지 않을까 싶다.) 이 내용은 알고 있었는데 `typename`의 정확한 의미를 모르고 있었더니 평가 중에 관련된 질문을 받았을 때 굉장히 당황했었다ㅎㅎ..

아무튼 `typename`은 이 뒤에 오는 것이 **타입** 임을 알려주기 위한 키워드이다. 

```cpp
typedef T value_type;
typedef Allocator allocator_type;
typedef typename allocator_type::reference reference;
typedef typename allocator_type::const_reference const_reference;
typedef implementation-defined iterator;
typedef implementation-defined const_iterator;
typedef typename allocator_type::size_type size_type;
typedef typename allocator_type::difference_type difference_type;
typedef typename allocator_type::pointer pointer;
typedef typename allocator_type::const_pointer const_pointer;
typedef std::reverse_iterator<iterator> reverse_iterator;
typedef std::reverse_iterator<const_iterator> const_reverse_iterator;
```

벡터 헤더파일의 일부분인데 저렇게 typename 키워드가 붙어있는 것은 그 뒤에 있는 `allocator_type::reference` 같은 것들이 타입임을 알려주는 것이라고 한다.