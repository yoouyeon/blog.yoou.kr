---
title: "업데이트한 데이터 실시간으로 바로 보여주기(feat. react-query)"
date: 2023-07-09 23:46:22
category: Web
description: "react-query를 사용하여 업데이트된 데이터를 실시간으로 보여주는 방법"
---

## 시작

업데이트 된 데이터를 실시간으로 보여준다는 말의 의미가 좀 모호할 수 있는데 생각보다도 많이 마주하는 상황인 것 같다.  
예를 들면

- 서버에서 계산된 플레이어의 위치를 바로 화면에 보여줘야 할 때
- 슬롯 예약을 하고 바로 슬롯의 상태를 화면에 보여줘야 할 때
- **댓글을 단 뒤에 새로 단 댓글을 바로 목록에 보여주고 싶을 때 (! 지금 나의 상황)**

React로 만들어진 페이지라면 임의로 새로고침을 시키지 않는다면 api를 재요청하지 않기 때문에 ,, 업데이트 된 내용을 바로 화면에서 확인해 볼 수 없다.

## 시도 1 (With Socket IO)

예전에 ft_transcendence 과제 할 때에 마주했던 상황이 첫번째 예시 (서버에서 계산된 데이터를 )였는데, 이때는 과제 제한조건 상 소켓을 사용했었으므로 실시간 처리가 필요한 페이지에 소켓 이벤트 핸들러를 등록시키고 핸들러에서 적용시켜주는 방식으로 문제를 해결했었다.

```Typescript
useEffect(() => {
  socket.on("startGame", () => {
    socket.off("startGame");
    // 서버에서 보내는 공 위치를 실시간으로 화면에 보여주기
    socket.on("ballPos", (data: types.gamePosInfo) => {
      setGame(data);
    });
  });
  // 서버에서 보낸 게임 종료 이벤트를 실시간으로 처리하기
  socket.on("endGame", (data: { winner: string }) => {
    socket.off("ballPos");
    socket.off("endGame");
    setWinner(data.winner);
  });
  return () => {
    socket.off("ballPos");
    socket.off("endGame");
    resetGame();
  };
}, []);
```

## 시도 2 (With State)

두번째 예시는 42gg 코드에서 본 예시인데, reload state를 하나 두는 방식으로 해결했다. (이 코드에서는 다른 컴포넌트에서 상태를 변경해야 했으므로 Recoil을 사용했다.) 업데이트를 해야 하는 경우에 state의 값을 true로 바꾸어 준 뒤에, 데이터를 fetch해오는 로직을 reload state가 true인 경우에만 실행하는 방법이었다.

```typescript
// 슬롯 등록 모달
const onEnroll = async () => {
  try {
    // 슬롯 등록 로직 (axios.post ...)
  } catch (e: any) {
    // 에러 처리 로직...
  }
  // recoil value 업데이트
  setReloadMatch(true);
};

// 현재 매치 정보를 fetch해오는 훅
useEffect(() => {
  if (reloadMatch) getMatchHandler();
}, [reloadMatch]);
```

## 더 멋진 방법..?

이번 프로젝트에서도 댓글을 새로 달면 하위 컴포넌트에서 바로 등록된 댓글 목록에 새로운 댓글이 추가되게 하고 싶었다. (세번째 예시)

위 두가지 방법도 괜찮은 방법이고, 실제로 잘 썼지만, 뭔가 좀 더 멋진 방법이 없을까 고민을 하게 되었는데, 첫번째 방법은 현재 프로젝트에선 Socket IO를 쓰지 않기에 적용할 수 없는 방법이었고, 두번째 방법은 실제로 적용할 수 있는 방법이긴 했지만,, 단순히 reload를 위해서 state를 (심지어 이 프로젝트에서도 데이터 로드와 업데이트 하는 컴포넌트가 달랐기에 전역 상태를 썼어야 했는데 전역 상태관리 라이브러리로 redux-toolkit을 사용하고 있었기에 더 들이는 품이 컸다.) 쓰는게 괜찮은 방법인가? 하는 생각이 계속 들었기 때문이었다.

그리고 최신 상태 유지..?라는 느낌에 꽂혀서 React-query에 관련된 기능이 있나 찾아봤는데 정말 있어서(!!) 시도해보았다.

## 시도 3 (With invalidateQueries)

> React-query 잘 모르는 사람이 쓴 글이므로 오류 주의 😂

일반적으로 React-query에서 refetch 여부를 결정하는 조건은 "오래된 데이터" 여부인데, `staleTime`이 지나면 오래된 데이터라고 판단한다고 한다. 하지만 지금처럼 댓글을 새로 달거나 하는 식의 "서버의 데이터가 오래됨이 확실한 상황"에는 `staleTime`을 기다리는 것이 비효율적일 수 있다. 따라서 React-query에는 임의로 캐시된 데이터를 만료시킬 수 있는 메소드가 있는데 그게 바로 `QueryClient`의 `invalidateQueries` 메소드이다.

```typescript
// Invalidate every query in the cache
queryClient.invalidateQueries();
// Invalidate every query with a key that starts with `todos`
queryClient.invalidateQueries({ queryKey: ["todos"] });
```

위처럼 캐시된 전체 데이터를 만료시킬수도 있고, 아래처럼 특정 키를 가진 데이터만 만료시킬수도 있다.

그리고 `invalidateQueries` 메소드로 데이터가 만료되면, `useQuery`나 관련된 hook으로 인해 랜더링된 쿼리들이 background에서 refetch된다고 한다...! 정말 내가 원했던 기능이다 앗싸

```typescript
const { isLoading, isError, data, error } = useQuery({
  queryKey: ["comments", postId, currentPage],
  queryFn: () => getComments(currentPage, postId),
});
```

따라서 댓글 목록을 가져오는 로직을 `useQuery` hook 내부에 넣어주고,

```typescript
postComment(commentForm, parseInt(postId))
  .then(() => {
    // ⭐️ 쿼리 만료시키기!
    queryClient.invalidateQueries({ queryKey: ["comments"] });
    // 등록 성공 로직
  })
  .catch(() => {
    // 등록 실패 로직
  });
```

댓글 등록 성공시에 `comments` 키를 가진 쿼리 (즉 댓글 목록 쿼리)를 만료시켜주었더니 댓글 등록 성공 시에 바로 다시 댓글 목록 refetch 가 일어나고 화면에 등록했던 댓글이 바로 보이게 되었다.

---

뭔가 React-query를 본격적으로 공부하지는 못하고 필요할때마다 필요한 기능을 찔끔찔끔 공부하고 있는데 생각보다도 강력해서 감탄하고 있다... 최고
