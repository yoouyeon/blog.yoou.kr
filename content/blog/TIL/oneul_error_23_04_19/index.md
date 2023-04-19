---
title: "[오늘의 에러] 23.04.19"
date:  2023-04-19 18:22:21
category: TIL
description: "오늘의 에러 | 국민 총 삽질 줄이기"
---

## Type 'Element' is not assignable to type 'NextPageWithLayout'.

NextJS + TypeScript 프로젝트에서 페이지별로 레이아웃을 적용하기 위해서 [공식문서의 Layouts](https://nextjs.org/docs/basic-features/layouts) 항목을 따라가던 중에 발생한 에러 (공식문서에는 문제가 없었다...)

### 문제 상황

```tsx
// NextPage 타입에 getLayout 함수 속성을 추가
export type NextPageWithLayout = NextPage & {
	getLayout?: (page: ReactElement) => ReactNode;
};

function LayoutTest(): NextPageWithLayout {
	return <p>hello world</p>; // ❗️ ts error ❗️
}
```

> ❗️ Type 'Element' is not assignable to type 'NextPageWithLayout'.

`function` keyword로 함수를 선언했는데 `NextPageWithLayout` 타입에 `Element`(`ReactElement`)을 할당할 수 없다는 에러가 났다.

근데 이상하게도 화살표 함수로 선언하면 에러가 나지 않았다.

```tsx
const LayoutTest: NextPageWithLayout = () => {
  return <p>hello world</p>; // ✅ PASS! ✅
};
```

### 해결

문제는 **`function` keyword로 선언한 함수와 화살표 함수의 반환 타입을 결정하는 방식이 달랐기 때문**인데, 아직 NextJS와 TypeScript에 대한 지식이 부족해서 (ㅜㅜ) 이해한 흐름대로 정리하면 아래와 같다...

타입스크립트에서 `function` keyword로 선언한 함수의 반환 타입을 지정하는 경우에는 명시적으로 지정한 것이고, 화살표 함수의 반환 타입을 지정한 경우에는 함수의 구현에 따라 반환 타입이 맞는지를 추론할 수 있다고 한다.

여기서 사용한 `NextPage` 타입(`NextPageWithLayout`의 베이스가 되는 타입)은 `NextComponentType` 인터페이스를 확장하여 만든 General Type인데, 화살표함수는 반환 타입을 추론할 수 있기 때문에 `ReactElement`를 반환한 경우에도 `NextPage`, 즉 `NextComponentType`의 조건에 맞는지를 추론할 수 있는데, `function` keyword로 선언한 함수의 경우에는 `ReactElement`라는 반환 타입에서 `NextPage`로의 추론이 불가능하기 때문에 type error가 나는 것이다.

...

그래서 **공식 문서에 있는 대로 화살표 함수로 선언해주면 문제가 발생하지 않고**, 만약에 `this`를 사용해야 한다던가 하는 `function` keyword로 함수를 선언해야만 하는 경우에는 type assertion을 한다던가 해서 타입을 `NextPage` 로 명시해줘야 한다고 한다.

나름 결론도 내리고 문제도 해결했는데 여기에 딸린 기술부채가 어마어마해져버렸다... 😫