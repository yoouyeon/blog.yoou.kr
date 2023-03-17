---
title: "CPP Module 02"
date: 2022-07-15 17:07:17
category: 42Curcus/CPP_Module
description: "CPP Module 02 과제를 하면서 공부한 내용들"
---

## 🌟 Orthodox Canonical Form

표준 클래스 형식 (Orthodox Canonical Class Form)

CPP 02부터는 표준 클래스 형식을 지켜서 서브젝트에 명시된 4가지 항목을 클래스마다 명시적으로 표현해주어야 한다.

- `Default constructor` : 기본 생성자
- `Copy constructor` : 복사 생성자
- `Copy assignment operator` : 복사 대입 연산자
- `Destructor` : 소멸자

사실 복사 생성자와 복사 대입 연산자는 디폴트로 정의되어 있는 내용이 있는데 문제는 얕은 복사를 한다는 점이다. 얕은 복사로 복사된 객체를 사용하는 데에는 문제가 발생할 요소가 많기 때문에 여기서 말하는 복사 생성자와 복사 대입 연산자는 모두 깊은 복사로 객체를 복사해줘야 한다. 깊은 복사와 얕은 복사에 대해서는 아래에 자세히 정리해보려고 한다.

### ✨ 참고

- https://tsi.kr/entry/C-Orthodox-Canonical-Class-Form-OCCF
- https://en.cppreference.com/w/cpp/language/copy_constructor
- https://en.cppreference.com/w/cpp/language/copy_assignment

## 🌟 얕은 복사 / 깊은 복사

디폴트 복사 생성자는 멤버 변수의 **"값"**을 일대일로 대입할 뿐이기 때문에 포인터 멤버 변수의 경우에도 그 포인터 멤버 변수에 들어있는 값, 즉 주소값을 그대로 복사한다 .따라서 복사된 객체의 포인터타입 멤버변수 또한 복사한 쪽 객체의 포인터 변수가 가리키고 있는 값을 가리키게 된다. 이렇게 단순히 **"값"**  만 복사하는 복사를 얕은 복사라고 한다.

그러니까 단순히 포인터 변수 내의 값을 복사하는 것이 아니라 포인터 변수가 가리키고 있는 값을 복사해서, 그 내용을 새로 복사되는 객체의 포인터변수에 넣어주는 (이렇게 하려면 메모리 재할당이 필요하겠지?) 복사가 바로 깊은복사라는 것이다.

기본적인 복사 생성자는 같은 타입의 다른 객체의 레퍼런스를 받는다.

```cpp
class-name ( const class-name & )
```

이런 타입으로 기본 복사 생성자가 구현되어 있으므로 이걸 오버라이딩(?) (이 상황에서 쓰이는게 맞는지 모르겠다) 해서 깊은 복사를 구현해주면 된다.

기본적인 복사 대입 연산자는 아래와 같은 형식으로 되어 있으므로, 역시 오버라이딩해서 깊은 복사를 구현해주면 된다.

```cpp
class-name & class-name :: operator= ( const class-name & )
```

CPP02에서는 단순 value만 갖는 멤버변수만 다루고 있어서 깊은 복사가 의미가 있나 싶긴 한데;;; 일단 ex00에서 복사 생성자와 복사 대입 연산자를 아래와 같이 구현해주었다.

```cpp
Fixed::Fixed(const Fixed &fixed)
{
	std::cout << "Copy constructor called" << std::endl;
	*this = fixed;	// 아래의 복사 대입 연산자로 감.
}

Fixed&  Fixed::operator =(const Fixed& fixed)
{
	std::cout << "Copy assignment operator called" << std::endl;
  // lvalue가 this가 된다. (새로 생성되든, 원래 있던거든 상관 x)
	_fix_value = fixed.getRawBits();	// this의 _fix_value를 fixed의 _fix_value와 동일하게 해줬다.
	return *this;	// this는 포인터이므로 역참조한 값을 반환해줘야 반환타입에 맞는다.
}
```

### ✨ 참고

- https://younggwan.tistory.com/39
- https://tech-interview.tistory.com/77
- https://leemoney93.tistory.com/33
- https://brightwon.tistory.com/9
- https://velog.io/@sjongyuuu/C-%EB%B3%B5%EC%82%AC-%EC%83%9D%EC%84%B1%EC%9E%90Copy-Constructor

## 🌟 연산자 오버로딩

오버로딩은 함수를 중복정의하는 것이다. 연산자도 어떤 의미에서는 parameter를 받아서 return을 하는 형태이므로 함수라고 할 수 있다. 따라서 연산자도 오버로딩을 할 수 있다.

정수형끼리 덧셈을 하면 정수형 결과가 나오고, 실수형끼리 덧셈을 하면 실수형 덧셈이 나온다. 이것은 `+` 연산자가 기본형 타입에 대해서 오버로딩이 되어있기 때문인데 만약에 내가 만든 객체에 대해서도 이렇게 `+` 연산을 해 주고 싶다면 `+` 연산자를 오버로딩 해주면 된다.

`+`, `-`, `*`, `/` 같은 연산자 기호는 명명 규칙상 함수명으로 사용해 줄 수 없기 때문에 `operator` 키워드를 붙이고 뒤에 정의할 연산자 기호를 붙여서 오버로딩해주면 된다.

![operator_function_format](/operator_function_format.png)

이런 형식이라는 것을 알면 연산자 오버로딩이 엄청 간단해진다.

### ✨ 참고

- [C++ 트레이닝](https://www.hanbit.co.kr/store/books/look.php?p_code=B7818919239)

## 🌟 고정소수점 / 부동소수점

### ✨ 실수의 2진수 표현 방식

컴퓨터에서 모든 수들은 2진수로 변환되어서 표현된다. 정수를 변환하는 방법은 명확한데, 실수 (특히 소수점 아래 소수부) 를 변환하는데는 조금 고민이 필요하다.

소수부를 2진수로 변환하는 방법은 정수부와 반대로 2를 곱해가면서 정수가 되는 1 또는 0을 뽑아내고 (정수부에서는 나누어서 몫이 되는 1 또는 0을 뽑아냄) 소수부가 0이 될때까지 계속해서 반복하면 된다.

![실수의 2진수 변환](/02_1.png)

정수부와 달리 소수부는 수에 따라서 길이가 엄청 길수도 있고, 무한히 길어질수도 있다. 컴퓨터의 한정된 비트수 조건 아래에서 실수의 소수부를 표현하는 방식 중 하나가 고정 소수점(Fixed Point) 방식이고 다른 하나가 부동 소수점(Float point) 방식이다.

### ✨ 고정 소수점 방식 (Fixed Point Number Representation)

소수점의 위치를 고정하는 방식이다. 컴퓨터에서 각각의 데이터 타입들은 최대 길이가 고정되어 있기 때문에, 그 길이(width of the number representation) 중에서 소수점 위치를 고정한 상태에서 그 아래에 소수부를 넣어주는 방식이다.

16비트 중에서 8비트를 소수부로 지정한 뒤 6.625를 표현하면

| 0    | 0    | 0    | 0    | 0    | 1    | 1    | 0    | 1    | 0    | 1    | 0    | 0    | 0    | 0    | 0    |
| ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- |

이렇게 표현된다.

필요한지는 모르겠지만... 음수를 표현할 때에는 2의 보수를 이용하여 표현한다. (산술 연산이 동일한 방식으로 되기 때문에) 2의 보수를 구하는 방식은 NOT 연산을 해 준 뒤에 1을 더해주면 된다. 이 방식은 고정소수점 방식에도 동일하게 적용된다.

고정 소수점 방식은 정수 표현과 비슷한 방식으로 소수점을 표현하기 때문에 간단하고 효율적이라는 장점이 있다.(빠르다.) 하지만 소수 부분의 위치가 고정되어 있기 때문에 소수점을 이리저리 옮길 수 있는 부동 소수점 방식과 비교해서 정밀도가 떨아진다는 단점이 있다.

C / C++에서는 고정 소수점을 사용하는 기본 자료형은 없지만 (float / double 타입은 부동 소수점 방식 사용) 고정 소수점 방식은 기본적으로 정수표현방식과 동일하기 때문에 int를 이용해서 구현해주면 된다.

### ✨ 참고

- https://gsmesie692.tistory.com/94

- https://inst.eecs.berkeley.edu//~cs61c/sp06/handout/fixedpt.html

- https://www.cprogramming.com/tutorial/floating_point/understanding_floating_point.html
- https://www.cprogramming.com/tutorial/floating_point/understanding_floating_point_representation.html
- https://www.cprogramming.com/tutorial/floating_point/understanding_floating_point_printing.html

## 🚀 ex00

Orthodox Canonical Form을 연습하는 문제이다.

Module 02부터는 클래스를 만들 때 Orthodox Canonical Form을 맞춰서 만들어줘야 한다. 따라서 아래의 함수들을 기본적으로 구현해줘야 한다.

- 기본 생성자
- 복사 생성자
- 복사 할당 연산자
- 소멸자

다른 부분은 간단한데 복사 생성자와 복사 할당 연산자 부분은 조금 고민을 해 줘야 한다. 기본적으로 구현되어 있는 복사 생성자 / 복사 할당 연산자는 얕은 복사를 해 주지만 Orthodox Canonical Form에서는 깊은 복사를 해 줘야 하기 때문이다.

### ✨ 얕은 복사 / 깊은 복사

얕은 복사는 단순히 값을 복사하는 복사이다. (?) 클래스의 멤버 변수가 값타입일 경우에는 이런 복사가 문제가 되지 않지만(사실 대부분의 경우에는 문제가 잘 생기지 않을 것이다.) 멤버 변수가 포인터, 레퍼런스와 같은 참조타입일 경우에는 문제가 발생할 수 있다.

```cpp
#include <iostream>

class test
{
	public:
		char *_temp;
};

int main(void)
{
	char *temp = new char[4];
	temp[0] = 'a';
	temp[1] = 'b';
	temp[2] = 'c';
	temp[3] = '\0';
	test t1;
	t1._temp = temp;
	test t2 = test(t1);
	test t3 = t1;

	std::cout << "------------------ Default ----------------" << std::endl;
	std::cout << "t1 : " << t1._temp << std::endl;
	std::cout << "t2 : " << t2._temp << std::endl;
	std::cout << "t3 : " << t3._temp << std::endl;

	std::cout << "\n----------------- t1 change ---------------" << std::endl;
	t1._temp[0] = 'Z';
	std::cout << "t1 : " << t1._temp << std::endl;
	std::cout << "t2 : " << t2._temp << std::endl;
	std::cout << "t3 : " << t3._temp << std::endl;
}
```

`temp`에는 `char` 배열의 주소가 들어있다. 이 때 단순히 값만 복사하는 얕은 복사로 새로운 객체를 생성하게 되면, 가리키는 배열의 내용이 아닌 배열의 주소가 복사되게 되므로 `t2`의 `_temp`도 `temp`가 가리키는 배열을 가리키게 되고, `t3`의 `_temp`도 `temp`가 가리키는 배열을 가리키게 된다. 즉 `t1`, `t2`, `t3`의 `_temp`는 모두 같은 것을 가리키고 있게 되므로 `t1`의 `_temp`만 수정하더라도 `t2`와 `t3`의 `_temp`도 모두 수정이 된다. 

![shallow_copy](./imgs/cpp_module_02_shallow_copy.png)

그렇기 때문에 복사생성자로 새로운 객체를 생성했을 때 완전히 독립된 새로운 멤버변수를 만들고 싶다면 완전히 새로운 인스턴스를 생성하는 깊은 복사 생성자를 직접 구현해주어야 한다.

```cpp
test::test(test const &src_test)
{
	*this = src_test;
}

test &test::operator=(const test &test)
{
	if (this != &test)
	{
		_temp = new char[4];
		for(int i = 0; i < 5; i++)
			_temp[i] = test._temp[i];
	}
	return (*this);
}
```

이런 식으로 (기존 메모리 해제하는 코드 추가해줘야 할 것 같음) 복사 생성자와 복사 할당 연산자를 구현해준 뒤에 동일한 main문을 돌려보면

![deep_copy](./imgs/cpp_module_02_deep_copy.png)

이런 식으로 값만 같고 다른 변수들이 생겨나 `t1`의 변화가 다른 객체들에게 영향을 미치지 않는다.

일단 02 과제에서 다루고 있는 클래스에는 오직 값 타입 밖에 없어서 깊은 복사를 구현하는 의미가 딱히 없긴 하지만 02의 rule에 모든 클래스를 Orthodox Canonical Form에 맞게 구현하라는 말이 있기 때문에 일단은 명시적으로 저 4개를 선언해두기만 하면 될 듯 하다.

## 🚀 ex01

00에서 단순히 고정 소수점 표현을 위한 클래스만 만들었다면, 01에서는 고정 소수점을 좀 사용해보기 위해서 이런저런 변환 함수들을 만들어본다. 구현해야 하는 것은

- int를 인자로 받아 고정소수점으로 저장하는 **생성자**
- float를 인자로 받아 고정소수점으로 저장하는 **생성자**
- 고정 소수점을 float로 반환하는 toFloat(void) 함수
- 고정 소수점을 int로 반환하는 toInt(void) 함수
- 고정 소수점을 float로 출력하도록 << 연산자 오버로딩

이다.

### ✨ 정수 ↔ 고정소수점

정수 → 고정소수점은 오른쪽의 소수점 비트 부분을 비워주면 된다. 서브젝트에 주어진대로 왼쪽으로 shift 8번 해주면 끝. 

고정소수점 → 정수는 비워줬던 오른쪽의 소수점 비트 부분을 다시 채워주면 된다. 생성할 때 shift했던 만큼 오른쪽으로 shift 8번 해주면 끝.

### ✨ float ↔ 고정소수점

Float → 고정소수점 역시 1의 위치를 왼쪽으로 8칸 밀어준다고 생각하면 간단하다. (이걸 이해를 못해서 3일을 날렸다...) 다만 float가 저장되어있는 부동소수점 방식은 고정소수점이나 int가 저장되어있는 방식과 다르기 때문에 비트를 shift한다고 해도 우리가 예상하고 있는 값이 나오지 않을 것이고, 무엇보다 float에는 비트연산이 불가능하기 때문에 간접적으로 비트를 옮겨줘야 한다. 왼쪽으로 N개의 비트를 shift하는 것은 2^N을 곱해주는 것과 동일하므로 float 타입으로 받은 값에 2^8을 곱해주면 된다.

그리고 raw bits 를 저장하는 멤버변수에 넣어주면 되는데 float 타입을 int 타입에 넣어주면 소수점 아래의 값이 단순히 버림이 된다. 오차를 최대한 줄여주기 위해서 roundf 함수로 가장 가까운 정수를 구해서 raw bits로 저장해주었다.

고정소수점 →  Float 는 반대로 곱해줬던 것을 나눠주면 된다. raw bits의 값을 float로 형변환해줘야 하는 것에 주의하자.

## 🚀 ex02

연산자 오버로딩 훈련(이 표현이 딱 맞는 것 같다.)을 하는 문제였다.

6개의 비교연산자, 4개의 산술연산자, 전위/후위 증감연산자, min, max 함수를 구현해주면 된다.

### ✨ 전위/후위 증감연산자

`a++` 과 `++a` 는 둘 다 인자를 하나만 갖는 단항연산자이다. 따라서 함수의 프로토타입 역시 `operator--(void)` 이런 식이 될 것이다. 하지만 둘은 동작이 다르기 때문에 어떻게든 구분을 해 줘야 하고, 그래서 전위 증감 연산자의 프로토타입은 `operator--(void)` 이런 모양으로, 전위 증감 연산자의 프로토타입은 `operator--(int)` 이런 모양으로 더미 인자를 받도록 약속을 해 두었다. 따라서 우리도 이 형태에 맞게 Fixed 클래스의 전위, 후위 증감 동작을 구현해주면 된다.

## 🚀 끝

블랙홀이 다급해져서 ex03은 안했다. 근데 평가받으면서 평가자분께 03에 대한 설명을 간단히 들었는데 웬걸 완전 쉽다. 블랙홀 여유로워지면(제발..) 리트하는걸 고려해봐야 할 것 같다.
~~뭔가 처음에 비해서 내용이 엄청 부실해지고 있는 것은 기분탓이 아니다. ... 생각보다도 너무 내용이 많아서 지금은 얼른 과제를 통과하는 것에 집중하고 있다. 08까지 얼른 끝내고 좀 깔끔하게 정리해야 할 것 같다..ㅜㅜ~~