---
title: "Vector Constructor 구현에 필요한 지식들"
date:  2022-12-23 21:50:06
category: 42Curcus/ft_container
description: "C++ Vector 구현하기"
---

## 🌟 explicit specifier

### ✨ explicit specifier

원치 않는 형변환이 일어나지 않게 하는 지정자 (specifier)

C++11 키워드 인 줄 알고 흐린눈했었는데 알고보니 생성자에는 (무조건?) explicit 키워드를 붙여줘야 C++98에 맞는 문법이었다.

`explicit` 지정자가 붙은 생성자는 “명백함”을 표현한다. 이 “명백함”이라는 것은 암시적 형변환과 복사 초기화 (Copy initialization)에 사용되지 않음을 의미한다.

`explicit` 지정자 없이 정의된 생성자는 Converting Constructor라고 하고, C++11부터 지원하고, 이 생성자는 복사 초기화에도 이용될 수 있다.

https://en.cppreference.com/w/cpp/language/explicit

https://en.cppreference.com/w/cpp/language/converting_constructor

```cpp
struct A
{
    A() { }         // converting constructor (since C++11)  
    A(int) { }      // converting constructor
    A(int, int) { } // converting constructor (since C++11)
};
 
struct B
{
    explicit B() { }
    explicit B(int) { }
    explicit B(int, int) { }
};
int main()
{
    A a1 = 1;      // OK: copy-initialization selects A::A(int)
    A a2(2);       // OK: direct-initialization selects A::A(int)
    A a3{4, 5};    // OK: direct-list-initialization selects A::A(int, int)
    A a4 = {4, 5}; // OK: copy-list-initialization selects A::A(int, int)
    A a5 = (A)1;   // OK: explicit cast performs static_cast, direct-initialization
 
//  B b1 = 1;      // error: copy-initialization does not consider B::B(int)
    B b2(2);       // OK: direct-initialization selects B::B(int)
    B b3{4, 5};    // OK: direct-list-initialization selects B::B(int, int)
//  B b4 = {4, 5}; // error: copy-list-initialization selected an explicit constructor
                   //        B::B(int, int)
    B b5 = (B)1;   // OK: explicit cast performs static_cast, direct-initialization
    B b6;          // OK, default-initialization
    B b7{};        // OK, direct-list-initialization
//  B b8 = {};     // error: copy-list-initialization selected an explicit constructor
                   //        B::B()
}
```

### ✨ copy-initialization vs direct-initialization

https://stackoverflow.com/questions/1051379/is-there-a-difference-between-copy-initialization-and-direct-initialization

https://heroine-day.tistory.com/20

```cpp
struct B;
struct A { 
  operator B();
};

struct B { 
  B() { }
  B(A const&) { std::cout << "<direct> "; }
};

A::operator B() { std::cout << "<copy> "; return B(); }

int main() { 
  A a;
  B b1(a);  // 1)
  B b2 = a; // 2)
}
// output: <direct> <copy>
```

1. b의 생성자를 바로 호출해서 b1을 생성할 수 있다.
2. a가 B타입이 아니기 때문에 “변환”이 필요하다.

→ `explicit` 키워드가 없는 경우에는 변환되어 초기화를 할 수 있고,

→ `explicit` 키워드가 있는 경우에는 변환되어 초기화를 할 수 없다.

C++ 11 이전에는 성능 개선을 이유로 직접 초기화가 권장되었다고 한다.

## 🌟 allocator

### ✨ allocator

Standard Library의 특정 부분에서 사용되는 메모리 모델을 정의하기 위한 클래스이다.

커스텀 allocator를 만들 수도 있는 것 같은데, 일단은 기본적인 allocator template에 대해서만 공부했다.

https://cplusplus.com/reference/memory/allocator/

https://en.cppreference.com/w/cpp/memory/allocator

```cpp
/*
	std::allocator::address
	- return the actual address of x
*/
pointer address( reference x ) const;
const_pointer address( const_reference x ) const;

/*
	std::allocator<T>::allocate
	- allocate n * sizeof(T) bytes memory that are not initialized
	- return pointer to the first element of array
	- throw std::bad_alloc if allocation fails
*/
pointer allocate( size_type n, const void * hint = 0 );

/*
	std::allocator<T>::deallocate
	- deallocates the storage referenced by the pointer p.
	- p는 반드시 전에 allocate() 함수로 얻어진 포인터여야 한다.
	- n은 반드시 전에 p를 얻기 위해 호출한 allocate() 함수의 인자 속 n과 동일해야 한다.
*/
void deallocate( T* p, std::size_t n );

/*
	std::allocator<T>::max_size
	- allocator(n, 0)을 성공적으로 호출할 수 있는 가장 큰 n 반환.
	- 대부분 std::numeric_limits<size_type>::max() / sizeof(value_type)
*/
size_type max_size() const throw();

/*
	std::allocator::construct
	- p가 가리키는 지점에 객체 생성
	- 메모리를 할당하지는 않기 때문에 p가 가리키는 지점은 사용가능한 메모리 공간이어야 한다.
*/
void construct ( pointer p, const_reference val );

/*
	std::allocator::destroy
	- p가 가리키는 지점의 객체를 파괴
	- 메모리를 해제하는 것이 아니므로 반드시 이후에 deallocate 과정이 필요함.
		- 같은 맥락에서 construct 이후에 destory를 하지 않고 deallocate를 한다면? 안될 것 같음.
*/
void destroy (pointer p);
```

### ✨ allocator vs new / delete

https://stackoverflow.com/questions/5628059/c-stl-allocator-vs-operator-new

allocator는 STL에서 메모리 관리를 위해서 사용하는 클래스라고 했다.

결론적으로는 allocator를 사용했을 때에는 좀 더 세부적인 제어 수준을 가질 수 있다는 차이가 있었다.
