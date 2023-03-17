---
title: "CPP Module 03"
date: 2022-07-21 22:35:06
category: 42Curcus/CPP_Module
description: "CPP Module 03 과제를 하면서 공부한 내용들"
---

## 🌟 상속

이미 정의한 클래스의 멤버를 물려받아서 새로운 클래스를 정의하는 것을 상속이라고 한다. 클래스는 저번에 구조체의 확장(?)이라고 했으니, 구조체 역시도 상속하고, 상속받을 수 있다. ([참고](https://blog.naver.com/PostView.nhn?isHttpsRedirect=true&blogId=ghostcbr954&logNo=110003736593&redirect=Dlog&widgetTypeCall=true))

상속을 하게 되면 기존 클래스를 재활용하고, 반복되는 부분을 상위 클래스에 통합할 수 있어 반복 작업을 줄일 수 있어 생산성이 높아지고, 공동의 조상을 가지는 클래스들의 계층을 형성해서 다형성을 구현할 수 있다는 장점이 있다.

상속하는 방법

```cpp
class 자식클래스 : public 부모클래스
{
	추가 멤버 선언
};
```
자식클래스에서는 부모 클래스의 `public`과 `protected` 멤버에 접근할 수 있고, 추가적인 멤버 선언도 가능하다.

부모의 `private` 멤버는 자식클래스에서도 접근할 수 없다. 따라서 자식클래스에서 상속받아서 사용해야 하는 부모의 멤버는 자식에서만 접근할 수 있도록 `protected`로 선언해줘야 한다.

### ✨ 상속 접근 지정자

상속받은 멤버들의 접근 레벨을 어떻게 할 지 지정하는 부분이다. 일반적으로는 `public`으로 상속하지만 기본값은 `private`이다. 당연한 이야기지만 부모 클래스에서 `private`이었던 것은 상속 접근 지정자와 상관 없이 무조건 `private`이 된다.

- `public` : 기반(부모) 클래스의 접근 속성이 그대로 유지된다.
- `private` : 기반(부모) 클래스에서 `public`, `protected` 속성이었던 것들이 모두 `private` 속성이 된다.
- `protected` : 기반(부모) 클래스에서 `public` 속성이었던 것들이 `protected` 속성이 된다. (기존 `protected` 속성은 그대로 유지)

### ✨ 멤버 함수 오버라이딩

- 생성자와 소멸자
- 대입연산자
- `static` 멤버
- `Friend` 관계 지정

위 4가지는 특정 클래스의 고유한 처리를 담당하기 때문에 상속이 되지 않는다. 이 외에는 모두 자식 클래스로 무조건 상속이 된다. (특정 멤버만 상속받을수는 없다.) 만약에 필요 없는 것이 상속된다면 자식에서는 2가지 선택지를 가질 수 있다.

- 무시한다. (안쓰면 된다.)
- 원형은 같지만 다른 방식으로 필요하다면 재정의 (오버라이딩)

부모의 멤버함수와 원형은 같지만 다른 내용의 함수를 선언해주면 된다.

이렇게 되면 부모의 멤버함수와 자식의 멤버함수 이렇게 2개의 함수를 자식이 갖게 되는데 이름이 중복되면 지역으로 선언된 자식의 멤버함수가 우선권을 갖게 되어 상속받은 부모의 멤버함수는 숨겨지게 된다. 만약에 오버라이딩 전 부모의 멤버함수를 호출하고 싶을 때에는 `::` 연산자(?)로 부모클래스 소속의 함수임을 표시해주면 된다.

### ✨ 참고

- [C++ 트레이닝](https://www.hanbit.co.kr/store/books/look.php?p_code=B7818919239)

## 🌟 virtual

### ✨ 상속과 대입

변수끼리 대입할때는 좌, 우변의 타입이 동일해야 하지만, 상속관계의 객체끼리는 타입이 다르더라도 어느정도 대입이 가능하다.

`Person` 클래스를 상속받아 `Student` 클래스를 만들었을 때, 아래와 같은 대입이 가능하다.

```cpp
Person p = Student("jeyoon", "42 Seoul");
```

`p` 내부에는 `Student` 내에서 상속받은 `Person`의 멤버만 들어있다. (이 경우에는 그냥 `Student` 생성자로 생성한 `Person` 객체라고 해도 괜찮을 것 같다.)

`Person` 은 `Student`의 멤버 일부만 들어있어도 완전한 `Person` 객체를 이룰 수 있지만, 반대의 경우는 온전한 `Student` 객체를 이룰 수 없기 때문에 자식의 객체 안에 부모 객체를 대입할수는 없다.

포인터도 마찬가지로 대입이 가능하다.

어찌 되었든, 부모는 자식을 대입받을 수 있고, 자식은 부모를 대입받을 수 없다.

### ✨ virtual 키워드의 필요성

```cpp
#include <iostream>
#include <string>
class Person
{
	protected:
		std::string _name;
	public:
		Person(void){};
		Person(std::string name){_name = name};
		void shout(void){std::cout << _name << " : 으아아아아아아아" << std::endl;};
};
class Student : public Person
{
	private:
		std::string _school;
	public:
		Student(std::string name, std::string school)
		{
			_name = name;
			_school = school;
		};
		void shout(void){std::cout << _name << " : 흐아아아아아아악" << std::endl;};
};
int main(void)
{
	Person *p = new Student("jeyoon", "42 Seoul");
	p->shout(); // ????
}
```

이런 상황이라면 마지막 `p->shout()`의 출력 결과는 뭐가 나올까? `p`가 가리키는 객체는 `Student` 객체임에도 불구하고, `p`에서 오버라이딩 된 함수를 호출하면 으아아아아아아 가 출력이 된다.

![](/cpp_module_03_non_virtual_function.png)

이는 컴파일시에 `p->shout()` 를 `p`에 담긴 객체에 따라서 함수를 불러오는 것이 아닌, p의 타입에 해당하는(`Person`) 클래스에 가서 함수를 불러왔기 때문이다. 이런 경우를 정적 바인딩이라고 한다.

이를 해결하기 위해서는 컴파일 시에 함수를 결정하는 것이 아닌 실행 중에 함수를 결정하는 동적 바인딩이 필요하고, 그것을 가능하게 하는 키워드가 `virtual` 키워드이다.

### ✨ 가상함수

앞에 `virtual` 키워드가 붙은 함수를 가상함수라고 한다.
동작 방식은 아래의 흐름을 따른다.

0. 클래스 내에 가상함수가 있는 객체가 생성되면 가상함수가 저장되어 있는 테이블을 생성하고, 그 테이블을 가리키는 포인터(이하 `vfptr`) 가 생성된다.

1. 컴파일 중
	- `virtual` 키워드가 없는 함수의 호출 : 정적바인딩
	- `virtual` 키워드의 함수 호출 : 넘어간다.
2. 실행 중
	- `virtual` 키워드가 없는 함수의 호출 : 정적바인딩되었던 함수를 불러온다.
	- `virtual` 키워드의 함수 호출
		- 재정의되지 않은 경우 : 가상함수 테이블에서 함수를 불러온다.
		- 재정의된 경우 : 재정의된 함수를 불러온다.

그래서 아까 위의 예시를 아래와 같이 수정해서 다시 실행해보면

```cpp
class Person
{
	protected:
		std::string _name;
	public:
		Person(void){};
		Person(std::string name){_name = name;};
		virtual void shout(void){std::cout << _name << " : 으아아아아아아아" << std::endl;};
};
```

![](/cpp_module_03_virtual_function.png)

Student의 shout인 흐아아아악이 출력이 된다.

### ✨ 가상 소멸자

소멸자는 오버라이딩되는 부분은 아니긴 하지만, 역시 비슷한 맥락에서 문제가 발생할 수 있어서 `virtual` 키워드를 붙여줘야 한다.

```cpp
class Person
{
	protected:
		std::string _name;
	public:
		Person(void){};
		Person(std::string name){_name = name;};
		~Person(void){std::cout << "Person Bye Bye ~" << std::endl;};
		virtual void shout(void){std::cout << _name << " : 으아아아아아아아" << std::endl;};
}; 
class Student : public Person
{
	private:
		std::string _school;
	public:
	Student(std::string name, std::string school)
	{
		_name = name;
		_school = school;
	};
	~Student(void){std::cout << "Student Bye Bye ~" << std::endl;};
	void shout(void){std::cout << _name << " : 흐아아아아아아악" << std::endl;};
};
int main(void)
{
	Person *p = new Student("jeyoon", "42 Seoul");
	p->shout();
	delete p;
}
```

이렇게 실행을 했을 때, 위와 동일한 흐름으로 `p`에는 `Student` 객체를 가리키는 값이 들어있지만, `delete p`를 했을 때에는 `Person`의 소멸자가 호출되게 된다.

![](/cpp_module_03_non_virtual_destructor.png)

따라서 이 경우에도 `Person`의 소멸자에 `virtual` 키워드를 붙여주면, `p`가 가리키는 객체에 맞게 `Student`의 소멸자가 호출이 되고, 뒤이어서 `Person`의 소멸자도 호출이 되어 깔끔하게 해제가 된다.

![](/cpp_module_03_virtual_destructor.png)

## 🌟 클래스와 메모리 (상속과 가상함수.. :ultra_fast_parrot:)

깊게 보지는 않고 아아아아아주 간단하게만 보려고 한다. (이해에 도움이 될 정도로만?)

### ✨ 빈 클래스

```cpp
class Person
{
};
int main(void)
{
	Person p;
	std::cout << "Person size : " << sizeof(p) << std::endl;

	return (0);
}
```

![](/cpp_module_03_empty_class_size.png)

빈 클래스인 `Person`의 크기를 출력해보면 1이 나온다. 빈 객체를 1개 이상 만들었을 때 크기가 0이면 주소의 변화를 확인할 수 없어서 표준으로 비어있는 클래스도 크기가 1이 되도록 정했다고 한다.

### ✨ 멤버함수가 없는 / 있는 클래스

```cpp
class Person
{
	public:
		int age;
};

class Person2
{
	public:
		int age;
		void shout(void){std::cout << "나는 사람이야!!!" << std::endl;};
};
```

![](/cpp_module_03_member_function_class_size.png)

멤버함수는 객체에 포함되긴 하지만 메모리 상에는 객체가 저장되는 공간(힙, 스택)과 다른 곳(아마도 코드영역)에 저장이 된다. 따라서 객체 자체의 크기에는 멤버 함수가 있든, 없든 차이가 없다.

### ✨ 상속받은 클래스

```cpp
class Person
{
	public:
		int age;
};

class Student : public Person
{
	public:
		int grade;
};

int main(void)
{
	Person p;
	Student s;

	std::cout << "Person size : " << sizeof(p) << std::endl;
	std::cout << "Student size : " << sizeof(s) << std::endl;

	std::cout << "Student age address : " << &(s.age) << std::endl;
	std::cout << "Student grade address : " << &(s.grade) << std::endl;

	return (0);
}
```

![](/cpp_module_03_inherited_class_size.png)

`Student` 객체 안에는 `Person` 객체가 완전히 복사되어 들어온다. 주소를 확인해보니 `Person` 내용이 앞에, 그 뒤에 `Student` 내용이 이어서 들어오는 것 같다.

### ✨ 가상함수가 있는 클래스

```cpp
class Person
{
	public:
		int age;
		void shout(void){std::cout << "나는 사람이야!!!" << std::endl;};
};

class Student : public Person
{
	public:
		int grade;
};

int main(void)
{
	Person p;
	Student s;

	std::cout << "Person size : " << sizeof(p) << std::endl;
	std::cout << "Student size : " << sizeof(s) << std::endl;

	std::cout << "Student age address : " << &(s.age) << std::endl;
	std::cout << "Student grade address : " << &(s.grade) << std::endl;

	return (0);
}
```

위에서 봤던대로, 일반적인 멤버함수는 객체와 함께 메모리에 저장되지 않기 때문에 상속받은 경우에도 멤버변수만 있었던 때와 결과가 동일하다.

```cpp
class Person
{
	public:
		double age;
		virtual void shout(void){std::cout << "나는 사람이야!!!" << std::endl;};
};

class Student : public Person
{
	public:
		double grade;
};

int main(void)
{
	Person p;
	Student s;

	std::cout << "Person size : " << sizeof(p) << std::endl;
	std::cout << "Student size : " << sizeof(s) << std::endl;

	return (0);
}
```

![](/cpp_module_03_inherited_class_virtual_function_size.png)

Person의 크기는 16이 되는데 아래의 내용으로 구성되어 있다.
- `double age` (8바이트)
- 가상함수 테이블 포인터 (`vfptr`) (8바이트)

Student의 크기는 24가 되는데 아래의 내용으로 구성되어 있다.
- `double age` (8바이트)
- `double grade` (8바이트)
- 가상함수 테이블 포인터 (`vfptr`) (8바이트)

근데 `age`와 `grade`를 `int` 타입으로 바꾸면 둘 다 16바이트가 되는데 정확하진 않지만 이유는 큰 자료형을 기준으로 기본값을 정하면서 생긴 4바이트 padding에 4바이트인 `Student`의 `grade`가 들어가면서 늘어나는 부분이 없어진 게 아닐까.. 하고 추정하고 있다. (정확히는 모르겠음)

### ✨ 참고

- https://www.sysnet.pe.kr/2/0/11164
- https://velog.io/@kwt0124/%EA%B0%80%EC%83%81-%ED%95%A8%EC%88%98-%ED%85%8C%EC%9D%B4%EB%B8%94

## 🚀 ex00

CPP Module 03이 상속에 대한 개념만 알고 있으면 ex03을 제외하고는 그렇게 어려운 내용은 아니다. 상속에 대한 전반적인 내용은 위의 Note에 정리해두었으니 이 글에서는 실제 문제에서 유의해야 할 것을 정리해보려고 한다.

.. 근데 딱히 유의해야 할 내용도 없다. 서브젝트를 **꼼꼼하게** 읽어보고 그에 따라서 맞게 구현만 하면 된다.

`ClapTrap` 이라는 클래스를 만들어야 하고, 멤버변수로는 `Name`, `Hit points` (10), `Energy points` (10), `Attack damage` (0) 가 있다. 각각의 멤버변수들은 괄호 안의 값으로 초기화가 되어야 한다.

`Hit points` 는 ClapTrap의 체력이다. 공격을 받거나 회복을 할 때에 변경되는 값이다.

`Energy points` 는 게임의 피로도(?) 혹은 행동포인트... 같은 개념이다. 공격, 회복 시에 1씩 깎이고 0이 되었을 때에는 아무것도 하지 못하는 값이다.

`Attack damage` 는 말 그대로 공격을 했을 때 공격 대상의 `Hit points` 가 차감되는 양인데, 이후에 나오는 ` attack` 함수의 프로토타입을 보면 알 수 있듯이 실제로 다른 객체를 받아서 공격할 수 있는 기능은 없어서 그냥 출력에만 사용되는 개념적인 값이라고 생각하면 이해가 쉬울 듯 하다.

여기까지가 멤버변수에 대한 이야기였고, 또 구현해야 하는 멤버함수들이 있다.

`void attack(const std::string& target)` 함수는 말 그대로 공격하는 함수이다. 인자로 주어지는 target을 공격하면 되는데, 앞서 말했듯이 실제 객체를 이름으로 찾아서 공격할수는 없어서 그냥 출력만 .. 해 주는 함수이다. 주의사항은 이미 죽은 경우(`Hit points` 가 0인 경우), 혹은 `Energy points` 가 0인 경우에는 아무것도 하지 말아야 한다는 것이다.

`void takeDamage(unsigned int amount)` 는 공격을 당하는 함수이다. 미지의 누군가에게 공격을 받는다고 이해했다. 이것 역시 죽은 경우에는 더 이상 공격을 받지 않게 처리했다. (서브젝트에 따로 언급이 없었기 때문에 `Energy points` 가 0인 경우에는 공격을 받을 수 있게 해 주었다.)

`void beRepaired(unsigned int amount)` 함수는 회복하는 함수이다. `attack` 함수와 거의 비슷한 조건을 두고 구현해주면 된다.

이후 과제의 base로 쓰일 클래스를 만드는 과제라 그냥 잘~ 만들어주면 되고, 테스트 가능한 경우에 대해서 main 함수를 잘 만들어 준다면 그렇게 어려운 문제는 아니라고 생각한다.

## 🚀 ex01

ex00에서 만들었던 `ClapTrap` 클래스를 상속받아 `ScavTrap` 이라는 클래스를 만들면 된다.

부모의 멤버들을 그대로 상속받지만 멤버변수의 초깃값이 기존 `ClapTrap` 과는 다르기 때문에 주의해야 하고, 상속받은 `attack()` 함수도 부모에서와 다른 메시지를 출력해줘야 하기 때문에 오버라이딩을 해 줘야 한다. (다른 함수들은 상속받은 그대로 사용해야 함에 주의하자.)

그리고 `ScavTrap` 만의 `void guardGate()` 멤버를 정의해주어야 한다. 별다른 기능은 없고 단지 출력을 해 주는 함수인데, 서브젝트에서는 언급이 없긴 했지만 내 경우에는 `guardGate` 함수에서도 `ScavTrap` 의 `Hit points` 와 `Energy points` 를 확인해주었다.

처음으로 상속이라는 개념이 나와서 이후 Module에 등장하는 `virtual` 키워드를 사용해야 하냐/마냐 에 대한 고민이 있긴 했는데, 나는 그 개념을 알고 있기 때문에 여기서도 부모 클래스에서 상속할/소멸자 함수에 `virtual` 키워드를 붙이긴 했지만 Module 03에서는 업캐스팅 관련 내용이 나오지 않기 때문에 가상화를 하지 않았다고 해서 평가 시에 Fail을 주는 것은 조금 억지가 아닌가 싶다. 알면 좋지만 몰라도 지금은 괜찮다는 게 내 개인적인 생각이다! 

아무튼 역시 이 문제도 ex03에 쓰일 클래스를 만드는 것이라 서브젝트만 꼼꼼하게 잘 읽으면 문제없이 잘 해결할 수 있는 문제였다.

## 🚀 ex02

ex01이랑 동일한 문제이다. 이번에는 `ClapTrap` 클래스를 상속받는 `FragTrap` 클래스를 만들면 된다.

역시 부모의 멤버들을 그대로 상속받고, 초깃값만 다르게 설정해주면 된다. 조금 다른 점은 이번에는 오버라이딩 할 부모 클래스의 함수가 없다는 점이고 (오히려 더 쉬워졌다.) `ScavTrap` 의 `guardGate` 함수처럼 `FragTrap` 에서는 `void highFivesGuys(void)` 함수를 만들어줘야 한다는 점이다. `highFivesGuys` 함수 역시 단순히 출력만 해 주는 함수이고, 내 경우에는 여기서도 `Hit points` 와 `Energy points` 를 확인해주었다.

## 🚀 ex03

사실 Module 03의 꽃(?)은 ex03이 아닐까 싶은데 문제는 내가 시간이 없어서 ex03을 하지 않았다는 점이다...

간단히 정리만 하면 같은 베이스 클래스에서 파생된 `ScavTrap` 과 `ClapTrap` 을 다시 상속받는 `DiamondTrap` 클래스를 만들어야 하는 문제이다.

파생 클래스의 생성자를 생성할 때에는 베이스 클래스의 생성자가 함께 호출이 되게 되는데 이렇게 같은 베이스 클래스를 갖는 파생클래스의 상속을 받는 다이아몬드 상속의 경우에는 베이스 클래스의 생성자가 중복되어 호출되는 (여기서는 `ClapTrap`의 생성자가 두번 호출된다.) 문제가 발생할 수 있다.

따라서 `ClapTrap`을 상속받는 `ScavTrap`과 `FragTrap` 에서 `virtual` 키워드를 붙여 가상상속을 해 주면 문제가 해결된다고 한다.... (제대로 공부하지 않아서 잘 모르겠지만 가상함수와 비슷한 방식으로 동작할 것 같다.)

## 🚀 끝

생각보다 Module 08까지 시간이 많이 걸려서 대충 개념정리만 후다닥 해두고 이렇게 글로 정리할 짬이 안났다... 그래도 Module 03의 경우에는 상속만 할 줄 알면 문제 자체는 어려운 편이 아니라 개념적인 부분만 잘 정리한다면 쉽게 해결할 수 있는 과제였던 것 같다. 허허...