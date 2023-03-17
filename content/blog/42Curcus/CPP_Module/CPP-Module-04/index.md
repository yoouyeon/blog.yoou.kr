---
title: "CPP Module 04"
date: 2022-07-23 16:03:09
category: 42Curcus/CPP_Module
description: "CPP Module 04 과제를 하면서 공부한 내용들(을 엄청 대충 정리함)"
---

## 🌟 업 캐스팅/다운 캐스팅

자식 클래스의 객체를 부모 클래스 타입으로 캐스팅하거나 대입할 수 있다. 이 때 자식 클래스의 고유한 특성(상속받은 것이 아닌 추가한 특성들)은 잘리게 된다(슬라이싱 현상). 하지만 부모 클래스 타입의 포인터나 레퍼런스에 자식 클래스의 객체를 대입하는 경우는 슬라이싱 현상이 발생하지 않는다. 따라서 부모 클래스 타입으로 자식 클래스를 다뤄야 하는 경우에는 포인터나 레퍼런스를 사용하는 것이 좋다. 아무튼, 이렇게 부모 클래스 타입으로 자식 클래스를 참조하는 경우를 **업 캐스팅**이라고 한다.

반대로 자식 클래스의 타입으로 부모 클래스를 참조할수도 있는데 이 경우를 **다운 캐스팅**이라고 한다. 이때는 명시적으로 형변환을 해 줘야 한다. (형변환에 관해서는... CPP 06에서 공부해볼것임 ㅎㅎ) 업 캐스팅과는 달리 다운 캐스팅의 경우에는 확실하게 동작한다는 보장이 없기 때문에 잘 사용하지 않고, 사용 자체도 지양되는 것 같다. 꼭 필요한 경우에만 사용하자.

### ✨ 참고

- https://cafemocamoca.tistory.com/94
- [전문가를 위한 C++](https://www.hanbit.co.kr/media/books/book_view.html?p_code=B3215427289)

## 🌟 Subtype polymorphism

02에 Ad-hoc polymorphism 이 언급되었었는데... 흐린 눈으로 넘어갔었다. 이참에 다시보자

### ✨ polymorphism (다형성)

> 똑같은 호출이라도 상황에 따라, 호출하는 객체에 따라 다른 동작을 할 수 있게 한다. 실제 내부 구현은 다르더라도 개념적으로 동일한 동작을 하는 함수를 하나의 인터페이스로 일관되게 호출할 수 있다. ([C++ 트레이닝](https://hanbit.co.kr/store/books/look.php?p_code=B7818919239) 20p)

`Animal`이라는 클래스에 `makeSound`가 있고, `Animal`이라는 클래스를 상속받은 `Dog`나 `Cat` 클래스가 있다면, 그리고 `makeSound` 함수를 각각의 클래스에 맞게 오버라이딩 해 뒀다면 `Dog`이든 `Cat`이든 상관없이 `makeSound`를 호출해주면 클래스에 맞는 소리가 나온다.

[위키피디아](https://en.wikipedia.org/wiki/Polymorphism_(computer_science))

- 하나의 인터페이스를 가지고 다양한 기능을 구현하거나 (오버라이딩)
- 다양한 타입의 파라미터를 지원하는 동일한 기능의 함수를 만들거나 (오버로딩)

### ✨ Ad-hoc polymorphism

[위키피디아 - polymorphism (Ad-hoc)](https://en.wikipedia.org/wiki/Polymorphism_(computer_science)#Ad_hoc_polymorphism)

[위키피디아 - Ad-hoc polymorphism (안읽어봄)](https://en.wikipedia.org/wiki/Ad_hoc_polymorphism)

> polymorphic functions that can be applied to arguments of different types, but that behave differently depending on the type of the argument to which they are applied
> 
> 다른 자료형의 인자를 받았을 때, 그 타입에 맞는 작업을 할 수 있는 함수.


`+` 연산자를 예로 들면, `int + int` 는 `int`의 결과가 나오고, `string + string`은 앞 `string`에 뒤 `string`을 append 한 결과가 나온다. 이런 타입의 다형성을 애드혹 다형성... 이라고 하는 것 같다.

### ✨ Subtype polymorphism

[위키피디아 - polymorphism (Subtyping)](https://en.wikipedia.org/wiki/Polymorphism_(computer_science)#Subtyping)

[위키피디아 - Subtyping (안읽어봄)](https://en.wikipedia.org/wiki/Subtyping)

아까 위에서 Animal과 makeSound 함수로 예를 들었던 다형성이 Subtype polymorphism이다. 같은 부모 클래스를 상속받은 형제 클래스에서 (형제 클래스라는 명칭이 바른 말인지는 모르겠다.) 같은 부모클래스의 함수를 오버라이딩 했을 때, 나중에 Animal이라는 객체 포인터에 담아서 일괄적으로 같은 함수를 호출했을 때, 각각의 자식클래스에 맞는 함수들이 호출되는 것을 의미하는 것 같다. (CPP 04에서 계속 하게 되는 것이다.)

구구절절 적었는데 사실 코드를 보는 편이 더 이해가 잘 되는 것 같다. (출처 : [위키피디아 - polymorphism (Subtyping)](https://en.wikipedia.org/wiki/Polymorphism_(computer_science)#Subtyping))

```cpp
abstract class Animal {
    abstract String talk();
}

class Cat extends Animal {
    String talk() {
        return "Meow!";
    }
}

class Dog extends Animal {
    String talk() {
        return "Woof!";
    }
}

static void letsHear(final Animal a) {
    println(a.talk());
}

static void main(String[] args) {
    letsHear(new Cat());
    letsHear(new Dog());
}
```

`letsHear` 함수에서는 `Animal` 객체를 받아와서 `talk` 함수를 호출한다. 만약 Subtype polymorphism이 잘 구현되어 있다면, `letsHear(new Cat())`로 `Cat` 객체를 `letsHear` 함수에 전달하면 "Meow!" 가 출력이 될 것이고, `letsHear(new Dog())`로 `Dog` 객체를 `letsHear` 함수에 전달하면 "Woof!" 가 출력이 될 것이다.

이런 동작이 가능하게 하기 위해서는 동적 바인딩 (late binding)이 가능하게 해야 하고, C++에서는 가상함수 테이블을 이용해서 동적 바인딩을 하게 한다. 관련 내용은 CPP 03에서 공부했었다. (CPP Module 03 note - virtual 참고)

## 🌟 abstract classes

### ✨ 순수 가상 함수 (Pure virtual method)

클래스 정의 때 선언만 되고 구현은 되지 않는 함수를 말한다. 함수를 순수 가상 함수로 선언하면 컴파일러가 컴파일 시에 함수의 구현 부분을 찾지 않는다.

순수 가상 함수를 선언하기 위해서는 함수 선언 뒤에 `=0` 을 붙여주면 된다. (문법임.)

### ✨ 추상 클래스 (추상 베이스 클래스) (Abstract class)

순수 가상 함수를 하나라도 가지고 있는 클래스라면, 그 클래스는 추상 클래스이다. 추상 클래스는 객체를 만들 수 없고, 상속만 해 줄 수 있다. (그래서 베이스 클래스라고 하는 것 같다.) 만약 추상 클래스의 객체를 만드려고 시도를 해도, 컴파일 단계에서 오류가 생긴다.

하지만 자식 클래스를 생성할 때 부모 클래스의 생성자가 호출되므로, 역시 추상 클래스에서도 생성자와 소멸자가 모두 존재한다. (단독으로 쓰지 못할 뿐) 따라서 우리 과제에서 요구하는 Canonical Form 을 추상 클래스에서도 맞춰주는 것이 좋을 듯 하다. 

추상 클래스를 상속받아서 인스턴스화 하고 싶다면, 추상 클래스 내의 모든 순수 가상 함수를 구체화해야 한다. 만약에 일부만 구체화 한다면 그 자식클래스 역시 또 다른 추상 클래스가 된다. 

### ✨ 참고

- [전문가를 위한 C++](https://www.hanbit.co.kr/media/books/book_view.html?p_code=B3215427289)