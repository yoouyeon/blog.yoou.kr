---
title: "process.stdout.write()와 console.log()"
date:  2023-03-06 00:06:24
category: Javascript
description: "유명한 출력방법 비교하기"
---

## 🌟 Intro

출력을 위해서 흔히 쓰는 함수인 console.log() 함수는 기본적으로 출력 끝에 개행문자가 들어간다. 백준 문제를 풀다가 줄바꿈을 출력하지 말아야 하는 경우가 생겨서 줄바꿈을 출력하지 않는 process.stdout.write() 함수를 사용하려고 했으나 원인 모를 typeerror가 나서 제대로 사용하지 못했던 상황이 있었다. 알고보니 process.stdout.write() 함수는 string 타입만 사용할 수 있다는 점이 원인이었는데, 이참에 이 함수들에 대해서 좀 알고 써야겠다는 생각이 들어서 찾아보았다.

## 🌟 process.stdout.write() 와 console.log()

### ✨ process.stdout.write 

`process` 객체는 node.js 프로세스의 정보를 담고 있는 객체이다.

`process.stdout()` 메소드는 stdout (fd 1) 에 연결되어 있는 stream을 리턴하는 메소드이다. (Writable Stream)

writable stream 객체의 `write()` 메소드는 stream에다 인자로 주어지는 것들을 쓰는 메소드인데, `writable.write(chunk[, encoding][, callback])` 이런 형식으로 되어 있다. 여기서 `chunk`는 반드시 string이어야 한다는 조건이 있기 때문에 (매뉴얼 참고) string 타입이 아닌 number 타입 같은 것들을 넣었을 때 타입에러가 발생하는 것이었다.

### ✨ console.log()

console 객체는 브라우저의 콘솔에 접근할 수 있는 메서드를 제공하는 객체이다. (실제 작동 방식은 브라우저마다 다르다고 함.)

console 객체의 `log()` 메서드는 콘솔에 메시지를 출력하는 메서드이다.

```javascript
console.log(obj1 [, obj2, ..., objN]);
console.log(msg [, subst1, ..., substN]);
```

첫번째처럼 객체 목록을 나열해서 하나의 문자열로 출력할 수 있고,

두번째처럼 치환 문자열을 사용해서 출력할수도 있다.

- `%o`, `%O` : 객체 치환
- `%d`, `%i` : 정수 치환 (서식도 지원)
- `%s` : 문자열 치환
- `%f` : 부동소수점 수 치환 (서식도 지원)

## 🌟 참고

- https://nodejs.org/api/process.html
- https://nodejs.org/api/stream.html#writablewritechunk-encoding-callback
- https://developer.mozilla.org/ko/docs/Web/API/console
- https://developer.mozilla.org/ko/docs/Web/API/console#%ec%bd%98%ec%86%94%ec%97%90_%ed%85%8d%ec%8a%a4%ed%8a%b8_%ec%b6%9c%eb%a0%a5%ed%95%98%ea%b8%b0
- https://www.geeksforgeeks.org/difference-between-process-stdout-write-and-console-log-in-node-js/
