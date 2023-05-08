---
title: "Cypress로 E2E 테스트하기"
date: 2023-05-04 17:56:11
category: Web/Test
description: "테스트를 해 보자 - Cypress"
---

> 42gg 프로젝트에 Cypress 적용을 위해 공부한 내용을 정리한 것입니다.
> 당장 필요한 것 같아 보이는 내용들을 위주로 정리하여 빠진 내용도 많습니다. 😇

## 📍 cypress ?

프론트엔드 테스팅 툴. E2E 테스트와 Component 테스트에 사용할 수 있습니다.

테스트의 단계별로 결과를 확인할 수 있고, 테스트 중에 developer tools 도 사용할 수 있습니다.

## 📍 cypress 설치하고 실행하기

설치

```shell
npm install cypress
```

실행

```shell
npx cypress open
```

처음 실행 시에 e2e test와 component test 중 하나를 선택하면 설정 파일을 생성해 줍니다. (Cypress 폴더)

우리는 e2e 테스트를 할 것이므로 e2e 테스트를 선택하여 필요한 설정을 완료합니다.

[Testing Type에 대하여 (End-to-End or Component Test)](https://docs.cypress.io/guides/core-concepts/testing-types)

## 📍테스트를 생성하고 실행하기

[공식 가이드](https://docs.cypress.io/guides/end-to-end-testing/writing-your-first-end-to-end-test)

**Create new empty spec** 버튼을 선택하여 새로운 test file을 생성합니다.

`spec` 파일은 cypress에서만 사용하는 개념이 아니라 일반적인 자바스크립트 테스트 라이브러리에서 사용하는 형식이라고 이해했습니다. (https://stackoverflow.com/questions/40222751/what-does-spec-mean-in-javascript-testing) spec 파일 안에는 하나 이상의 **테스트** 가 들어갈 수 있습니다.

생성한 테스트는 Cypress Launchpad에서 확인할 수 있고, 클릭하여 실행할 수 있습니다.

## 📍 테스트 스크립트 작성하기

```ts
// Create new empty spec 버튼으로 생성한 spec.cy.ts 파일의 코드
describe('template spec', () => {
  it('passes', () => {
    cy.visit('https://example.cypress.io')
  })
})
```

일반적으로 `spec` 파일은 `describe` block으로 시작하고. `describe` block 안에는 여러 개의 `it` block이 있습니다.

`decribe` block은 관련된 테스트를 그룹화하는 역할을 하고, `it` block은 테스트 각각을 정의하기 위해 사용됩니다. (Inspired by https://mochajs.org/)

```typescript
describe([], []);
it([], []);
```

👉 [Cypress Command 정리](https://blog.yoouyeon.dev/Cypress_CheatSheet/) 👈

