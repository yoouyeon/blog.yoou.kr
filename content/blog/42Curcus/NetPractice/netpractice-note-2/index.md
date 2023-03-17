---
title: "Netpractice 과제 하면서 공부한 내용 (2)"
date: 2022-10-22 03:52:30
category: 42Curcus/NetPractice
description: "Network 연습하기"
---

⚠️ 그냥 공부한 것 모아둔 것이라 순서 엉망입니다..

## 🌟 스위치와 라우터

### ✨ 스위치

여러 대의 컴퓨터, 네트워크 장비를 연결하기 위해서 사용하는 장치이다.

뭔가를 받아서, 연결된 다른 쪽으로 넘겨주는 장치

어떤 주소를 가지고 다른 쪽으로 넘겨주냐 (스위칭 해 주냐)에 따라서 L1, L2, L3 스위치로 구분된다 한다.

- L1 스위치 (더미 허브)
    - 물리계층을 이용해서 스위칭하는 장비
    - 그냥 선으로 연결한 것과 동일한 동작을 하는 것 같다.
    - 여러 호스트가 연결되어 있을 때 1 대 1로 스위칭하는 것이 아닌 냅다 모든 호스트들에게 전송하기 때문에 충돌의 가능성이 높다는 단점이 있다.
- L2 스위치
    - 보통 그냥 스위치라고 하면 L2 스위치를 의미한다.
    - Link 계층에서 사용하는 주소인 MAC 주소를 알고, 디바이스 별로 1 대 1로 스위칭한다.
    - 1 대 1 이므로 충돌이 가능성이 적어서 속도 저하도 별로 없다.
    - collision domain이 분리되어 있기 때문에 같이 연결되어 있는 호스트들이 동시에 전송하는 것이 가능하다.
- L3 스위치
    - L2 스위치에 L3 라우팅 기능까지 같이 있는 스위치를 의미한다.
    - …? 스위치인데 MAC 주소도 알고 IP 주소도 알고 있다.
    - 라우터랑 비슷한 기능을 하지만 보다 하드웨어적인 개념이 큰 느낌으로 이해하고 있다. (포트가 더 많고, 확장성이 낮고, 처리 속도가 높고 이런 느낌)

스위치도 어떤 기능을 하긴 하지만, 각각의 호스트들은 스위치의 존재를 전혀 신경쓰지 않고 동작한다고 한다.

스위치에 연결되어 있는 호스트들을 찾아가는 것은 switch table을 참고해서 찾아가는데, 이 테이블은 self-learning 방식으로 채워나간다. (오는 패킷을 힌트로 얻어서 차차 채워나가는 방식)

### ✨ 라우터

라우터는 여러 네트워크를 연결하기 위한 목적으로 사용하는 장치이다.

라우터 안에는 여러 개의 인터페이스가 있고, 그 인터페이스는 라우터로 연결하려고 하는 네트워크들에 각각 속해 있다.

여러 개의 인터페이스가 있기 때문에 라우터 하나에는 여러 개의 IP가 할당된다. (IP 는 인터페이스별로 부여됨)

라우터의 중요한 기능 2가지는

1. 라우팅 테이블 (forwarding table) 을 채우고 (동적 라우팅의 경우)
2. 만들어진 라우팅 테이블을 보고 목적지를 결정하는 기능이다.

### ✨ 참고

[https://kkamagistory.tistory.com/205](https://kkamagistory.tistory.com/205)

[https://ko.wikipedia.org/wiki/네트워크_스위치](https://ko.wikipedia.org/wiki/%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC_%EC%8A%A4%EC%9C%84%EC%B9%98)

[https://nhj12311.tistory.com/75](https://nhj12311.tistory.com/75)

[http://www.kocw.net/home/cview.do?cid=6166c077e545b736#.Y1LT5irubfk.link](http://www.kocw.net/home/cview.do?cid=6166c077e545b736#.Y1LT5irubfk.link)

[https://itaeheon.tistory.com/20?category=889461](https://itaeheon.tistory.com/20?category=889461)

## 🌟 라우팅

### ✨ 라우팅 테이블

어떤 목적지에 도달하기 위해서 ➡️ 거쳐야 할 다음 라우터의 정보

라우터에서는 이 테이블을 참고해서 받은 패킷을 어느 쪽으로 넘겨줘야 하는지를 결정하는 것이다.

라우팅 테이블 안에 모든 목적지들을 저장할수는 없기 때문에, 목적지는 prefix를 이용해서 매칭을 한다. 하지만 이마저도 모두 테이블 안에 넣기에는 많기 때문에 Longest Prefix Match Forwarding 방식으로 가장 길게 매칭되는 것을 찾아서 그 쪽으로 넘겨주는 방식을 취한다고 한다.

### ✨ static routing

netpractice에서 사용하는 방식인데, 관리자가 라우팅 테이블을 채우는 방식이다.

관리자가 설정한 대로만 하기 때문에 라우터의 부담이 적고 속도도 빠르다.

단점이라면 예상대로 관리가 어렵고 장애 대처가 어렵다는 점이 있다.

### ✨ dynamic routing

라우터가 동적으로 라우팅 테이블을 채우는 방식이다.

뭔가 문제가 생겼을 때에도 동적으로 라우팅 테이블을 바꾸기 때문에 장애 대처와 관리가 쉽다는 장점이 있다.

단점으로는 라우터가 계속 주변을 확인하고 업데이트해야 하기 때문에 라우터의 부담이 크다는 점이 있다.

라우팅 테이블을 채우는 라우팅 알고리즘으로는 Link state algorithm, distance vector algorithm 등등이 있는데 … 예전에 썼던 강의 노트로 정리 대체함. ([Link state algorithm](https://www.notion.so/f99f377f6f1b46d88e6512279d784211), [distance vector algorithm](https://www.notion.so/_13-4b790f31e54842deb9c635748566b05a))

### ✨ 참고

[https://ko.wikipedia.org/wiki/라우팅_테이블](https://ko.wikipedia.org/wiki/%EB%9D%BC%EC%9A%B0%ED%8C%85_%ED%85%8C%EC%9D%B4%EB%B8%94)

[http://www.kocw.net/home/cview.do?cid=6166c077e545b736#.Y1LWz6hhJAE.link](http://www.kocw.net/home/cview.do?cid=6166c077e545b736#.Y1LWz6hhJAE.link)

[https://catsbi.oopy.io/225439bd-ec84-4e16-aeca-0dfcb9954ea6](https://catsbi.oopy.io/225439bd-ec84-4e16-aeca-0dfcb9954ea6)

## 🌟 Network Layer - Link Layer에서의 전송 흐름

### ✨ 그 전에 ARP에 대해서

link 계층에서 다루는 frame에서의 address는 MAC address이다. (네트워크 인터페이스 고유의 주소) 따라서 IP에 해당하는 MAC address를 frame의 필드에 맞게 적어줘야 한다. 이 MAC 주소를 찾는 프로토콜이 ARP 프로토콜이다.

ARP Request라는 frame을 전체에 broadcast 한다. 그 frame 안에는 게이트웨이의 IP가 들어있다.

모든 호스트와 라우터는 그 프레임을 받겠지만, 해당되는 수신자면 자신의 IP와 MAC 주소를 담아서 응답해준다. ⇒ 테이블이 채워짐!

### ✨ 전송 흐름

![simulation](/simulation.jpeg)

1. A ➡️ B 전송
    1. A의 Routing table을 보고 next hop의 IP address를 알아낸다.
    2. 알아낸 IP address에 해당하는 MAC 주소를 ARP table을 보고 확인한다.
2. B ➡️ A 답장
    1. 보낸 측의 IP address를 확인하고 IP 헤더를 씌워서 패킷을 만든다.
    2. 보낸 측의 IP address에 해당하는 MAC 주소를 ARP table을 보고 확인한다. ➡️ Frame 헤더를 씌워서 Frame을 만든다.

### ✨ 참고

[https://musclebear.tistory.com/12](https://musclebear.tistory.com/12)

[https://www.stevenjlee.net/2020/06/07/이해하기-arp-address-resolution-protocol-프로토콜/](https://www.stevenjlee.net/2020/06/07/%EC%9D%B4%ED%95%B4%ED%95%98%EA%B8%B0-arp-address-resolution-protocol-%ED%94%84%EB%A1%9C%ED%86%A0%EC%BD%9C/)

## 🌟 이것저것

### ✨ 네트워크 계층의 이유

![network_layers](/network_layers.jpeg)

통신이 일어나는 과정을 이렇게 계층화 해 두면 흐름 이해가 쉽고, 무엇보다 어떤 특정한 부분에 문제가 생겼을 때 그 계층에 해당하는 부분만 고쳐주면 되기 때문에 관리도 쉽다.

### ✨ 예약된 IP

참고 : [https://m.blog.naver.com/PostView.naver?isHttpsRedirect=true&blogId=p_rain&logNo=220878796660](https://m.blog.naver.com/PostView.naver?isHttpsRedirect=true&blogId=p_rain&logNo=220878796660)

문제 풀이에 중요한 영향을 미쳤던 부분만 보면

- Loopback address (127.0.0.0/8)
    - 같은 장치 안에서 테스트 목적으로 사용하는 주소
    - localhost (127.0.0.1) : 자기 자신을 가리키는 주소
- 사설 IP
    - 10.0.0.0/8
    - 172.16.0.0/12
    - 192.168.0.0/16
- 네트워크 / 서브넷에서
    - 가장 첫번째 주소 : 네트워크 자체를 지칭
    - 가장 마지막 주소 : 동일한 네트워크 내에서 broadcast 하는데 사용하는 주소