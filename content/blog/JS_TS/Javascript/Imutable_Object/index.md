---
title: "자바스크립트에서 불변 객체 만들기"
date: 2023-04-17 15:22:38
category: Javascript
description: "자바스트립트에서 불변하는 객체를 만들기 위해 한 노력"
---

## const

`const`로 선언한 객체는 재할당은 불가능하지만, 객체 내의 속성의 추가/삭제나 속성 값의 변경은 가능합니다.

```js
const sample = {
	name: "sample",
	age: 50,
};

// 0. 속성 값 수정 시도
sample.name = "choonsik";
print("sample", sample);

// 1. 속성 추가 / 삭제 시도
sample.nickname = "goguma";
sample.address = "Seoul";
delete sample.address;
print("sample", sample);

// 2. 재할당
sample = {
	name: "Ryan",
	age: 20,
};
```

```
// 0. 속성 값 수정 시도 => 가능
=========== sample ===========
{ name: 'choonsik', age: 50 } 

// 1. 속성 추가 / 삭제 시도 => 가능
=========== sample ===========
{ name: 'choonsik', age: 50, nickname: 'goguma' } 

// 2. 재할당 => 불가
sample = {
       ^
TypeError: Assignment to constant variable.
```

## Object.freeze()

https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze

### 객체 동결

`Object.freeze()`는 객체를 동결시킵니다. 동결된 객체에는 속성을 추가하거나 삭제할 수 없으며 속성의 값을 변경할수도 없습니다. (속성 추가, 삭제, 변경의 시도는 무시되거나 TypeError를 발생시킵니다.)

하지만 객체가 담긴 변수의 재할당은 변수가 선언된 키워드에 따라 가능해지므로 `let`, `var`로 선언된 변수는 재할당이 가능하여 값이 바뀔 수 있습니다.

```js
let sample = {
	name: "sample",
	age: 50,
};

// 0. 속성 값 변경 시도
sample.name = "choonsik";
print("sample", sample);

// 1. 객체 동결
Object.freeze(sample);
console.log("++++++++++++", "Object.freeze(sample)", "++++++++++++\n");

// 2. 속성 값 변경, 속성 추가 시도 
sample.age = 20; // 속성 값 변경
sample.nickname = "goguma"; // 속성 추가
print("sample", sample);

// 3. 재할당
sample = {
	name: "Ryan",
	age: 20,
};
print("sample", sample);
```

```
// 0. 속성 값 변경 시도 => 변경 가능
=========== sample ===========
{ name: 'choonsik', age: 50 } 

++++++++++++ Object.freeze(sample) ++++++++++++

// 속성 값 변경, 속성 추가 시도 => 무시됨 (strict mode에선 TypeError)
=========== sample ===========
{ name: 'choonsik', age: 50 } 

// 3. 재할당 => 가능 (새로운 객체)
=========== sample ===========
{ name: 'Ryan', age: 20 } 
```

### 얕은 동결

`Object.freeze()` 메서드로 객체를 동결하면 그 동결의 대상은 직속 속성만이 됩니다. (바로 하위의 속성들) 따라서 만약 직속 속성의 값이 객체라면, 그 객체는 동결의 대상이 되지 않아서 속성의 추가, 삭제, 값이 변경이 가능합니다.

```js
let sample = {
	name: "choonsik",
	age: 50,
	address: {
		city: "Seoul",
		country: "Korea",
	},
};
print("sample", sample);

// 0. 동결
Object.freeze(sample);
console.log("++++++++++++", "Object.freeze(sample)", "++++++++++++\n");

// 1. 직속 속성 변경 시도
sample.name = "goguma";
print("sample", sample);

// 2. 직속 아닌 속성 변경 시도
sample.address.city = "Seongnam";
print("sample", sample);
```

```
=========== sample ===========
{
  name: 'choonsik',
  age: 50,
  address: { city: 'Seoul', country: 'Korea' }
} 

++++++++++++ Object.freeze(sample) ++++++++++++

// 1. 직속 속성 변경 시도 (name) => 무시됨
=========== sample ===========
{
  name: 'choonsik',
  age: 50,
  address: { city: 'Seoul', country: 'Korea' }
} 

// 2. 직속 아닌 속성 변경 시도 (address.city) => 변경됨
=========== sample ===========
{
  name: 'choonsik',
  age: 50,
  address: { city: 'Seongnam', country: 'Korea' }
} 
```

만약에 객체를 완전히 불변하게 만들고 싶다면 재귀적으로 동결시키는 방법이 있습니다. (깊은 동결) 하지만 이 경우에는 순환을 포함하지 않는지, 동결하면 안되는 객체를 동결하는 경우가 없는지를 확인해야 합니다.

```js
const deepFreeze = (obj) => {
	// 객체가 아니라면 동결하지 않고 그대로 반환
	if (obj === null || typeof obj !== "object") return obj;
	// 객체 속성 각각을 동결
	Object.keys(obj).forEach((key) => {
		deepFreeze(obj[key]);
	});
	// 객체 동결
	return Object.freeze(obj);
};

const sample = {
	name: "choonsik",
	age: 50,
	address: {
		city: "Seoul",
		country: "Korea",
	},
};

print("sample", sample);

// 0. 동결
deepFreeze(sample);
console.log("++++++++++++", "deepFreeze(sample);", "++++++++++++\n");

// 1. 직속 속성 변경 시도
sample.name = "goguma";
print("sample", sample);

// 2. 직속 아닌 속성 변경 시도
sample.address.city = "Seongnam";
print("sample", sample);
```

```
=========== sample ===========
{
  name: 'choonsik',
  age: 50,
  address: { city: 'Seoul', country: 'Korea' }
} 

++++++++++++ deepFreeze(sample); ++++++++++++

// 1. 직속 속성 변경 시도 (name) => 무시됨
=========== sample ===========
{
  name: 'choonsik',
  age: 50,
  address: { city: 'Seoul', country: 'Korea' }
} 

// 2. 직속 아닌 속성 변경 시도 (address.city) => address도 동결객체이므로 무시됨
=========== sample ===========
{
  name: 'choonsik',
  age: 50,
  address: { city: 'Seoul', country: 'Korea' }
} 
```

## Object.seal()

https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Object/seal

`Object.seal()` 메서드는 객체를 "밀봉"합니다. 밀봉했으므로 새로운 속성을 추가하거나 삭제할 수 없습니다. 하지만 그 객체를 완전히 얼려서 값 또한 변경할 수 없게 만드는 `Object.freeze()` 메서드와는 달리 속성의 값은 변경할 수 있습니다.

```js
let sample = {
	name: "sample",
	age: 50,
};

// 0. 속성 값 변경, 속성 추가 시도
sample.name = "choonsik";
sample.nickname = "goguma";
print("sample", sample);

// 1. 객체 밀봉
Object.seal(sample);
console.log("++++++++++++", "Object.seal(sample)", "++++++++++++\n");

// 2. 속성 값 변경 시도
sample.age = 30;
print("sample", sample);

// 3. 속성 추가, 삭제 시도
sample.address = "seoul"; // 속성 추가
delete sample.nickname; // 속성 삭제
print("sample", sample);
```

```
// 0. 속성 값 변경, 속성 추가 시도 => 가능
=========== sample ===========
{ name: 'choonsik', age: 50, nickname: 'goguma' } 

++++++++++++ Object.seal(sample) ++++++++++++

// 2. 속성 값 변경 시도 => 가능
=========== sample ===========
{ name: 'choonsik', age: 30, nickname: 'goguma' } 

// 3. 속성 추가, 삭제 시도 => 불가능 (무시됨) (strict mode에서는 TypeError 발생)
=========== sample ===========
{ name: 'choonsik', age: 30, nickname: 'goguma' } 
```

## 활용(?)

불변 객체를 만드는 이유는 여러가지가 있겠지만 제가 불변 객체를 만들기 위한 방법을 찾아본 이유는  JavaScript에서 최대한 TypeScript의 리터럴 타입같은 것을 사용해보고 싶어서입니다. 따라서 `const`와 `Object.freeze()` 메서드의 조합으로 리터럴 타입 비슷한 것을 만들어서 사용해보았습니다..

```js
export const loginResultType = {
  SUCCESS: 'success',
  FAIL: 'fail',
};
Object.freeze(loginResultType);
```

`const`로 할당한 객체이므로 재할당이 불가능하고, 속성의 값이 객체가 아닌 객체이므로 `Object.freeze`만으로도 불변 객체를 만들 수 있었습니다. (타입스크립트...👍)

## 🙇 참고

- https://developer-talk.tistory.com/243
- https://yorr.tistory.com/21
- https://ui.toast.com/posts/ko_20220420
- https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze
- https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Object/seal