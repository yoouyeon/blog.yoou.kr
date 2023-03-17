---
title: "CPP Module 01"
date: 2022-07-12 20:18:37
category: 42Curcus/CPP_Module
description: "CPP Module 01 과제를 하면서 공부한 내용들"
---

## 🌟 Memory allocation

```cpp
int i = 7;
```

위 방식으로 할당된 변수의 메모리는 스택에 저장된다. 이렇게 생성된 **자동변수**는 실행 흐름이 선언된 스코프를 벗어나면 할당되었던 메모리가 자동으로 회수된다.

```cpp
int *ptr = new int
```

C++에서는 new 키워드로 메모리를 동적할당할 수 있다. 이 때 할당된 메모리는 힙 영역에 저장된다.

- 메모리 동적 할당 → `new` 키워드
- 동적할당된 메모리 해제 → `delete` 키워드

---

기존에 C에서 메모리 동적할당시에 사용했던 malloc 함수도 C++에서 지원하긴 하지만 new, delete 키워드를 더 권장하는 이유는 객체를 동적할당할 때 생성자까지 호출해주기 때문이다.

- `malloc` : 단순히 주어진 크기의 메모리만 할당. 객체에 관련된 동작은 하지 않는다.
- `new` : 메모리를 할당하고, 생성자를 호출하여 객체를 생성한다.
- `free` : 단순 메모리 해제
- `delete` : 소멸자를 호출해서 동적으로 생성된 객체를 정상적으로 제거한다.

---

메모리 할당에 실패하는 경우에는 기본적으로는 프로그램이 종료된다. `new`의 버전에 따라서는 `nullptr`를 리턴하기도 한다고 함.

---

배열을 heap 공간에 동적으로 할당하기.

```cpp
int *myArray ptr = new int[5];

delete ptr;
```

`new` 로 할당한 메모리 공간은 delete로 해제하고, `new[]` 로 할당한 메모리 공간은 `delete[]` 로 한번에 제거한다.

### ✨ 참고

- [전문가를 위한 C++](https://www.hanbit.co.kr/media/books/book_view.html?p_code=B3215427289)

## 🌟 references

레퍼런스란 일종의 변수에 대한 alias이다. 레퍼런스를 이용해서 수정한 내용은 그 레퍼런스가 가리키는 변수에 그대로 반영이 된다. (심볼릭 링크와 비슷한 느낌인 것 같다.) 책에서는 변수의 주소를 가져오거나 변수에 대한 역참조 연산을 수행하는 작업을 자동으로 처리하는 특수한 포인터라고 한다.

변수, 클래스의 멤버를 레퍼런스로 만들 수 있고, 함수나 멤버함수가 레퍼런스를 매개변수로 받거나, 레퍼런스를 리턴할수도 있다.

레퍼런스는 어쨌든 또 다른 이름이므로 코드가 저장되는 코드 영역에 저장될 수도 있는데, 경우에 따라서는 스택 영역에 저장되기도 한다. (평가받으면서 들은 지식 추가함)

### ✨ 레퍼런스 변수

레퍼런스 변수는 반드시 생성하자마자 초기화해야 한다. 만약에 레퍼런스 변수를 클래스 안에서는 선언만 하고, 초기화는 밖에서 한다면 컴파일 에러가 발생한다.

레퍼런스는 처음 초기화 할 때 지정한 변수만 가리킨다. 즉 **한번 생성되고 나면 가리키는 값을 바꿀 수 없다.** 만약에 레퍼런스 대상을 바꾸기 위해서 어떤 값을 다시 대입하면, 그 레퍼런스의 대상이 바뀌는 것이 아니라 레퍼런스가 가리키는 대상의 값이 바뀌게 되는 것이다.

클래스의 멤버를 레퍼런스로 선언하게 된다면, 선언과 동시에 초기화되어야 하므로 반드시 생성자의 본문이 아니라 생성자 이니셜라이저에서 초기화해야 한다. ([initialization list](https://github.com/yoouyeon/42Cursus/blob/main/CPP_Module/Note/Module_00.md#-initialization-list))

### ✨ 레퍼런스 매개변수

기본적으로 함수 매개변수는 call by value로 처리해서 매개변수로 받은 값은 인수의 복사본을 받게 된다. 하지만 매개변수를 레퍼런스 타입으로 선언하면 call by reference 로 처리해서 원본 인수의 값도 바꿔줄 수 있다. (마치 포인터를 전달하는 것처럼!)

### ✨ 레퍼런스 필요성?

레퍼런스로 할 수 있는 일을 모두 포인터로 처리할 수 있는데? 왜 또 필요하지? (라고 매번 평가다닐때마다 여쭤봤음ㅎㅎ)

레퍼런스를 사용하면 코드를 더 깔끔하고 읽기 쉽게 작성할 수 있다. 그리고 레퍼런스의 값은 절대 NULL이 될 수 없기 때문에 NULL에 접근할 위험성이 적어진다.

하지만 배열을 동적으로 할당하는 경우 / 주소를 바꿔야 하는 경우에는 레퍼런스를 사용하는 것이 좋지 않거나, 사용이 불가능하다.

- 포인터 : 메모리 소유권을 이어받아 / 넘겨받아 메모리를 해제해야 할 일이 있는 경우 → 포인터 타입의 매개변수 / 리턴값
- 레퍼런스 : 메모리 소유권을 넘길 일이 없는 경우 → 레퍼런스 타입의 매개변수 / 리턴값

### ✨ 참고

- [전문가를 위한 C++](https://www.hanbit.co.kr/media/books/book_view.html?p_code=B3215427289)

## 🌟 switch statement

조건으로 지정한 표현식의 결과에 따라 수행한 동작을 선택한다. 표현식은 결과가 반드시 정수타입, 정수 타입으로 변환할 수 있는 타입, 열거타입, 상수와 비교가능한 타입이어야 한다. (어쨌든 정수)

조건에 맞는 상수값을 case 문으로 지정한 뒤에, 조건에 맞는 경우에는 case 문 아래에 나오는 코드를 실행하고 break 가 나오면 종료한다. 만약에 이후의 case까지 모두 실행하고 싶은 경우에는 break를 걸어주지 않으면 된다! (이렇게 실행되는 것을 fallthrough라 부른다.) default 키워드를 넣어주면 앞선 모든 케이스와 일치하지 않는 경우의 동작을 지정해 줄 수 있다.

## 🌟 file stream

C++ 은 파일 입출력을 위해서 `std::ofstream`과 `std::ifstream` 클래스를 지원하고, 둘 다 `<fstream>` 헤더파일에 정의되어 있다. 파일 입출력 중 발생할 수 있는 에러상황의 경우에는 표준입출력 스트림에서와 동일하게 `good()`, `eof()`, `bad()`, `fail()` 함수를 이용해서 에러처리 해 주면 된다.

파일 스트림 생성자는 파일의 이름과 파일을 열 때 적용할 모드에 대한 인수를 받는다. C에서의 open 함수와 동일하게 모드들은 | 연산자로 조합해서 지정할수도 있다.

- `ios_base::app` : 파일을 열고 쓰기 연산을 수행하기 전에 파일 끝으로 간다.
- `ios_base::ate` : 파일을 열고 즉시 파일 끝으로 간다.
- `ios_base::binary` : 입출력을 기존 텍스트 모드에서 바이너리 모드로 실행한다.
- `ios_base::in` : 입력할 파일을 열고 시작 지점부터 읽는다. (`ifstream` 기본 모드)
- `ios_base::out` : 출력할 파일을 열고 시작 지점부터 쓴다. 기존 데이터가 있다면 덮어쓴다. (`ofstream` 기본 모드)
- `ios_base::trunc` : 출력할 파일을 열고 기존 데이터를 모두 삭제한다.

`ifstream` 과 `ofstream` 소멸자는 자동으로 열었던 파일을 닫기 때문에 `close()` 함수를 직접적으로 호출하지 않아도 된다.

### ✨ 참고

- [전문가를 위한 C++](https://www.hanbit.co.kr/media/books/book_view.html?p_code=B3215427289)

## 🌟 String method

[String Class](https://github.com/yoouyeon/42Cursus/blob/main/CPP_Module/Note/Module_00.md#-stdstring)

### ✨ 문자열 연산

string은 클래스이지만 string 헤더파일을 인클루드하면 연산자들이 오버로딩되어 있기 때문에 마치 기본타입처럼 사용할 수 있다.

```cpp
// + 연산 (연결(결합))
{
	std::string A = "test";
	std::string B = ".replace";
	std::string C = A + B;	// C는 "test.replace" 이다.
}

// += 연산 (append)
{
	std::string A = "test";
	std::string B = ".replace";
	A += B;	// A는 "test.replace" 이다.
}

// 비교 연산자 (일치, 사전식 나열 순서에 따른 비교)
{
	std::string A = "ab";
	std::string B = "cd";
	std::string C = "ab";
	if (A == B)
		std::cout << "A == B" << std::endl;
	else if (A > B)
		std::cout << "A > B" << std::endl;
	else
		std::cout << "A < B" << std::endl;
	if (A == C)
		std::cout << "A == B" << std::endl;
	else if (A > C)
		std::cout << "A > C" << std::endl;
	else
		std::cout << "A < C" << std::endl;
}
```

스트링을 할당하거나 크기를 조절하는 코드가 흩어져있어도 string 객체는 모두 스택 공간에 생성되기 때문에 scope를 벗어나는 즉시 할당된 메모리를 string 소멸자가 정리하기 때문에 메모리 누수 문제가 발생할 가능성이 적다. (string 내부에서는 계속해서 동적할당/해제가 반복되고 있기 때문에 string 내용을 저장하는 메모리는 힙에 할당이 되는 것 같다.)

### ✨ find

```cpp
size_t find (const string& str, size_t pos = 0) const;
size_t find (const char* s, size_t pos = 0) const;
size_t find (char c, size_t pos = 0) const;
```

문자열에서 문자열(char 배열 / 문자)를 찾아서 첫번째로 매칭되는 부분의 위치를 반환한다. 만약에 없으면 `std::npos`라는 상수를 반환한다. (cpluscplus 사이트에는 -1로 정의되어있다고 하는데 클러스터맥에선 좀 다른 것 같기도 하다. 아무튼 상수.)

첫번째 인자는 호출한 string에서 찾고자 하는 문자열(char 배열 / 문자)이고 두번째 인자는 search를 시작할 문자열 상에서의 위치이다. 기본값은 0이고 만약에 string.length() 보다 pos가 크면 찾지 못하고 std::npos를 반환하는 것 같다.

```cpp
int main(void)
{
	std::string A = "aaabbbcccdddeeecccfff";
	std::string B = "ccc";
	std::cout << A.find(B) << std::endl;
	std::cout << A.find("ccc") << std::endl;
	std::cout << A.find(B, 10) << std::endl;
	std::cout << A.find(B, 40) << std::endl;
	std::cout << A.find('z') << std::endl;
	return (0);
}
```

![string_find_test](/string_find_test.png)

### ✨ erase

```cpp
string& erase (size_t pos = 0, size_t len = npos);
```

호출한 string에서 `pos`지점부터 `len` 만큼의 문자를 지운다. 이렇게 지운 뒤에 길이 또한 조정해준다. 기본값은 `pos = 0`,`len = npos`이므로 문자열의 시작부터 끝.

```cpp
int main(void)
{
	std::string A = "aaabbbcccdddeee";
	std::cout << A << std::endl;
	std::cout << A.length() << std::endl;
	int idx = A.find("bbb");
	A.erase(idx, 3);
	std::cout << A << std::endl;
	std::cout << A.length() << std::endl;
	A.erase();
	std::cout << A << std::endl;
	std::cout << A.length() << std::endl;
	return (0);
}
```

![string_erase_test](/string_erase_test.png)

### ✨ insert

```cpp
string& insert (size_t pos, const string& str);
```

`pos` 위치 **앞**에 `str`을 삽입한다.(새로 삽입되는 문자열의 첫번째 문자 위치가 `pos`가 되는 것) 만약에 pos가 호출한 string의 length 보다 큰 경우에는 out_of_range 에러를 던진다.

```cpp
int main(void)
{
	std::string A = "aaabbbcccdddeee";
	std::cout << A << std::endl;
	std::cout << A.length() << std::endl;
	int idx = A.find("bbb");
	A.insert(idx, "zzz");
	std::cout << A << std::endl;
	std::cout << A.length() << std::endl;
	return (0);
}
```

![string_insert_test](/string_insert_test.png)

### ✨ 참고

- [전문가를 위한 C++](https://www.hanbit.co.kr/media/books/book_view.html?p_code=B3215427289)
- [C++ 트레이닝](https://www.hanbit.co.kr/store/books/look.php?p_code=B7818919239)
- https://cplusplus.com/reference/string/string/find/
- https://cplusplus.com/reference/string/string/insert/
- https://cplusplus.com/reference/string/string/erase/
- https://cplusplus.com/reference/string/string/npos/

## 🚀 ex00

객체를 동적할당해보는 문제이다. 객체의 포인터를 반환해야 하는 `newZombie` 함수와 객체를 함수 내에서만 사용하는 `randomChump` 함수를 만들어야 하는데 함수 내에서 단순히 지역변수 형태로 만든 객체는 함수 밖, 즉 변수가 선언된 scope를 벗어나면 소멸되게 되므로 함수 밖에서도 함수 내에서 생성했던 객체를 사용할 수 있어야 하는 `newZombie` 함수에서는 객체를 동적할당해줘야 할 것이다.

C++에서 일반적으로 메모리를 동적으로 관리할 때에는 `new`와 `delete` 키워드를 사용한다. `new` 키워드 뒤에 있는 자료형의 크기만큼 메모리 할당이 되고, 그 메모리를 가리키는 포인터가 다시 반환되는 것이다. 물론 C++에서도 `malloc`, `free` 함수를 지원하긴 하지만 `malloc`과 `new`, 그리고 `delete`와 `free`의 차이 중 하나는 객체를 생성하고, 해제할 때 있다고 한다.

객체에 대한 메모리를 동적할당 할 때 `malloc`은 단순히 그 객체의 크기 만큼의 메모리를 할당해주기만 하지만, `new` 는 메모리를 할당한 뒤에, 생성자를 호출한다고 한다. 비슷하게 동적할당한 메모리를 해제할 때 `free`는 단순히 동적할당되었던 메모리를 해제하기만 하지만 `delete` 는 소멸자를 함께 호출하여 보다 안전하게 객체를 삭제할 수 있다고 한다.

그래서 `newZombie` 함수에서는 `new` 키워드로 `Zombie` 객체를 하나 만들어주었고,

```cpp
Zombie* newZombie(std::string name)
{
	Zombie *new_zombie = new Zombie;
	new_zombie->set_name(name);
	return (new_zombie);
}
```

`randomChump` 함수에서는 그냥 할당연산자로 `Zombie` 객체를 만들어주었다.

```cpp
void randomChump(std::string name)
{
	Zombie new_zombie = Zombie(name);
	new_zombie.announce();
}
```

(사심 가득 담긴 `main`함수... 어벤저스 도라와...)

```cpp
int main(void)
{
	std::cout << "********** TEST Constructor ***********" << std::endl;
	Zombie z1 = Zombie();
	z1.announce();
	Zombie z2 = Zombie("Iron Man");
	z2.announce();

	std::cout << "\n******* TEST function newZombie *******" << std::endl;
	Zombie *z3 = newZombie("Natasha");
	z3->announce();
	z3->set_name("Black Widow");
	z3->announce();
	delete z3;

	std::cout << "\n****** TEST function randomChump ******" << std::endl;
	randomChump("Dr. Strange");

	return (0);
}
```

## 🚀 ex01

객체 배열을 동적할당해보는 문제이다. `new`로 객체 배열을 선언해주기 위해서는 일반 배열 선언하듯이 대괄호로 배열의 크기를 명시해주면 된다. 일반적으로 `new[]` 라고 표현하는 듯 하다. 이렇게 동적할당을 하게 되면 배열의 첫번째 원소의 포인터를 반환하게 된다. 

`new`로 할당한 객체를 `delete`로 해제하듯이, `new[]`로 할당한 객체는 `delete[]`로 해제하면 된다.

이 문제에서도 인자로 받아온 `N`만큼 `new`로 `Zombie` 배열을 만들어주고, 이름을 설정해서, 첫번째 주소를 반환해주었다. 필요한진 모르겠지만 `N`이 0보다 작거나 같을 경우의 예외처리도 추가해주었다.

```cpp
// zombieHorde.cpp
Zombie* zombieHorde( int N, std::string name )
{
	if (N <= 0)
	{
		std::cout << "Error : N must be greater than 0" << std::endl;
		return (NULL);
	}
	Zombie *zombies = new Zombie[N];
	for(int i = 0; i < N; i++)
		zombies[i].set_name(name);
	return (zombies);
}

// main.cpp
int main(void)
{
	int N = 4;
	Zombie *zombies = zombieHorde(N, "jeyoon");
	for(int i = 0; i < N; i++)
		zombies->announce();
	delete[] zombies;
	return (0);
}
```

## 🚀 ex02

레퍼런스를 사용하는 문제이다. 레퍼런스라는건 간단히 말하면 변수에 대한 별칭이다. 다른 이름을 가진 같은 변수이기 때문에 레퍼런스가 가지고 있는 메모리 주소와, 원본 변수가 가지고 있는 메모리 주소는 동일하고, 또 레퍼런스를 통해서 수정한 내용은 원본 변수에도 수정이 된다. 약간 심볼릭 링크와 비슷하다고 이해했다.

문제에서는 같은 스트링 객체를 가리키고 있는 포인터와, 레퍼런스를 가지고 주소와 값을 출력해보면서 비교했다. 이 때 같은 결과가 나오기 때문에 왜 레퍼런스를 사용하는지 의문이 들었다. 레퍼런스 변수는 반드시 생성하자마자 초기화해줘야 한다. 그렇기 때문에 포인터와 달리 `NULL`에 접근할 위험성이 적어진다. 또한 역참조 연산자를 쓰지 않아도 되기 때문에 코드가 좀 더 깔끔해진다는 장점도 있다. 하지만 한번 할당하면 값을 바꿀 수 없기 때문에 주소를 바꾼다던가, 메모리를 해제한다던가 하는 경우에는 포인터를 써야 한다.

## 🚀 ex03

레퍼런스와 포인터의 차이를 알고, 활용해보는 문제이다.

### ✨ Weapon Class - Value return vs Reference return

`Weapon` Class의 `getType` 함수는 멤버변수 `type`의 const reference를 반환한다. 단순히 값을 반환하는 경우에는 `const` 키워드를 붙이는 의미가 없다. 왜냐하면 값을 반환할 때에는 반환하고자 하는 것의 복사본을 반환하게 되는 것인데, 이때 반환받은 것을 수정한다고 하더라도 어차피 원본에는 영향이 없을 것이기 때문이다. 따라서 reference, 혹은 포인터를 반환하는 경우에 필요하다면 `const`를 붙여주는 것이 더 말이 된다. (저번 CPP Module 00에서 아무것도 모르고 Value 반환하는 getter 함수에 `const` 붙였었는데... 민망하다.)

반환 시에 복사본을 반환하게 되면 (Value return) 특히 큰 객체나, 구조체의 경우에는 효율성이 떨어지기에 reference를 반환하는 편이 좋다. 하지만 함수 내에서 선언된 변수를 반환하는 경우에는 reference를 쓰면 dangling reference 문제가 발생한다. 지역변수의 경우에는 함수 스코프를 벗어나게 되면 소멸된다. 하지만 반환된 reference는 여전히 소멸된 변수의 위치를 가리키고 있을 것이므로 문제가 생기게 되는 것이다. 따라서 지역변수를 반환하는 함수의 경우에는 Value를 반환해야 이후에 문제가 생기지 않는다고 한다.

### ✨ Human A / B Class - Reference vs Pointer

Human A는 항상 Weapon을 들고 있어야 하고, Human B는 Weapon이 있어도, 없어도 된다. 주어진 `main` 함수를 보니 클래스 외부에서 `Weapon`의 속성이 바뀌면 `Human` 클래스에서 접근했을 때에도 바뀐 값이 유지되어야 한다고 한다. 따라서 `Human` 클래스 내에서 `Weapon`은 pointer 혹은 reference로 존재해야 하는 것 같다. `Human A`는 항상 Weapon을 들고 있어야 한다고 했으므로 Weapon을 reference 로 갖고 있게 했고 (항상 초기화된 값을 가지고 있어야 함.) `Human B` 는 Weapon이 없어도 된다고 했으므로 pointer로 갖고 있게 했다.

`Human B`의 경우에는 `Weapon`이 비어있을 수 있으므로, `attack` 함수에서 예외처리를 해 줘야 하는 것에 주의하자.

### ✨ 참고

- <https://www.sandordargo.com/blog/2020/11/18/when-use-const-3-return-types>

- <https://lazymankook.tistory.com/11>



## 🚀 ex04

파일스트림과 `string` 내장함수들을 공부할 수 있는 문제이다.

`ifstream`으로 읽어들일 파일을 열어주고, `ofstream`으로 쓸 파일을 열어주면 된다. 이때 C의 `open` 함수처럼 옵션을 `|` 연산으로 같이 넣어줄 수 있는데 나는 기본 옵션인 `std::ios_base::out` 과 (열었을 때 파일의 처음부터 쓰게 하는 옵션) 이미 존재하는 파일일 경우 싹 지우고 적기 위해서 `std::ios_base::trunc` 옵션을 넣어 주었다.

`ifstream`과 `ofstream` 모두 소멸자에서 `close` 함수를 호출하기 때문에 굳이 close를 명시적으로 하지 않아도 괜찮다고 하는데 나는 확실하게 닫아주기 위해서 열어둔 파일을 모두 `close` 함수로 닫아주었다.

역시 입출력은 변수가 많아서 어렵다;; 개행을 구분자로 한줄씩 읽어주기 위해서 `getline` 함수로 읽어주었다. 만약에 빈 문자열이 들어온 경우에는 바로 종료했고, `fail` 비트와 `bad` 비트가 켜진 경우에도 (`string` 입력 중에 `bad` 비트가 켜지는 경우가 있을지는 모르겠다.) 에러 문구를 출력하고 종료했다.

이외의 정상적인 입력이 들어온 경우에는 반복문을 돌면서 `string`의 `find` 내장함수를 이용해서 읽어들인 각 줄마다 `s1`이 등장하는 부분을 찾았고, 그 부분부터 `s1`의 길이만큼을 `erase` 내장함수로 지워주고, `insert` 내장함수로 `s1`이 시작했던 위치부터 `s2`를 삽입해주었다. 이후에 `find`의 인자로 시작위치를 조정해 줄 수 있기 때문에 `find`의 시작 위치를 원래 위치에서 `s2`의 길이만큼 늘려주면 바뀐 값 이후부터 `s1`을 찾도록 할 수 있다. 만약에 이렇게 해 주지 않으면 `s1`보다 `s2`가 길 경우에 바뀐 `s2` 부분에서 `s1`을 다시 찾게 되므로 무한루프가 돌 수 있는 문제가 발생할 수 있다. 한 줄에서 `s1`을 찾아서 `s2`로 변환해주는 반복문은 `find` 함수의 반환값이 `std::string::npos` 인 경우까지 반복되게 되는데 `find`함수는 문자열에서 타겟 문자열을 찾지 못했을 경우에 `std::string::npos`을 반환하기 때문에 결론적으론 더 이상 한 줄에서 `s1`을 찾지 못할 때까지 계속 찾아서 바꿔준다는 뜻이다. `std::string::npos`는 상수이고 환경에 따라서 다양한 값으로 정의되어 있는 듯 하다.

모든 `s1`을 바꿔준 뒤에는 개행도 출력해줘야 하는데 (`getline`으로 읽어들인 문자열에는 개행문자가 없을 것이므로) 파일의 끝에 도달해서 `getline`이 반환된 경우와 구분해주기 위해서 `eof` 비트가 켜지지 않은 경우에만 개행문자를 출력해주었다.

서브젝트에 적혀 있듯이, 예외처리에 유의하자.

## 🚀 ex05

클래스 멤버 함수의 포인터를 사용하는 문제이다.

객체별로 각각 할당되는 클래스 멤버 변수와는 달리, 클래스 멤버 함수는 하나를 가지고 모든 객체들이 공유한다. 객체에 포함되어 있지 않기 때문에 반드시 객체를 통해서 호출해줘야 하고, 이 때 `this`라는 포인터를 사용하게 된다. `this`는 현재 이 함수를 호출한 객체를 가리키고 있는 포인터이다.

이 문제에서 `if`/`else if` /`else`를 사용하지 않고 어떻게 접근을 해야 할지 CPP Module에 들어가기 전에 평가를 다니면서 고민을 좀 했었는데 최근에 갔던 평가에서 엄청 깔끔하고 신박하고 좋은 방법을 알게 되어서 이번 과제에 사용했다.

```cpp
void Harl::complain(std::string level)
{
	int idx = ((level == "DEBUG") * 1 + (level == "INFO") * 2 + (level == "WARNING") * 3 + (level == "ERROR") * 4);
	if (idx == 0)
		std::cout << "[ Probably complaining about insignificant problems ]\n";
	else
		(this->*fp[idx - 1])();
}
```

## 🚀 ex06

ex05와 거의 동일한 문제인데, `switch`문을 사용해야 한다는 점이 다르다. 주의해야 할 점은 예시를 봤을 때 WARNING 이후에 그 아래 Level인 ERROR에 대한 메시지도 출력이 되기 때문에 break를 적절하게 걸어줘야 한다는 것이다.

switch문에서는 case에 정수형의 값만 들어갈 수 있기 때문에 어떻게 처리를 해야 할 지 고민이 있었는데 저번에 평가갔다가 좋은 방법을 알게 되어서 그 방법을 써 주었다. 역시 ex05에서 썼던 방법과 동일하다.

```cpp
void Harl::complain(std::string level)
{
	int idx = ((level == "DEBUG") * 1 + (level == "INFO") * 2 + (level == "WARNING") * 3 + (level == "ERROR") * 4);
	switch (idx)
	{
	case 1:
		(this->*fp[0])();
		std::cout << std::endl;
	// 생략
	default:
		std::cout << "[ Probably complaining about insignificant problems ]\n";
		break;
	}
}
```

## 🚀 끝

생각보다도 공부해야 하는 양이 많다... C 피신때보다 더 깊게 공부하게 되는 것 같다. 나 빨리 끝낼 수 있을까...?