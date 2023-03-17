---
title: "Netpractice 과제 하면서 공부한 내용 (1)"
date: 2022-10-21 22:59:46
category: 42Curcus/NetPractice
description: "Network 연습하기"
---

⚠️ 그냥 공부한 것 모아둔 것이라 순서 엉망입니다..

## 🌟 IP Protocol

> 인터넷 프로토콜은 송신 호스트와 수신 호스트가 패킷 교환 네트워크에서 정보를 주고받는 데 사용하는 정보 위주의 규약이며, OSI 네트워크 계층에서 호스트의 주소 지정과 패킷 분할 및 조립 기능을 담당한다. (출처: https://ko.wikipedia.org/wiki/인터넷_프로토콜)

정보 위주의 규약. (네트워크 계층)

- 패킷 분할 / 조립

    링크 계층에는 링크마다 보낼 수 있는 데이터 유닛의 크기가 정해져 있다.

    만약에 송신 쪽에서 보내야 하는 패킷이 그 크기보다 크면 보낼 수 있는 크기로 쪼개서 (Fragmentation) 독립적으로 전송한다. (쪼갠 것에 대한 정보는 IP 헤더에 들어있다 : flag, offset)

    수신 측에서는 독립적으로 받은 패킷들을 헤더의 정보를 이용해서 재조립 (reassemble) 하는데 만약에 누락이 발생하면 reassemble 과정이 일어나지 못하므로 버린다. (재전송을 요청하지는 않는다 ➡️ 비신뢰성)

- IP 주소를 이용해서 데이터를 전달 (위에서 말했듯이 성공여부는 보장하지 않는다.)

- 경로 설정 (라우팅)

### ✨ TCP / IP ?

IP 프로토콜은 데이터 전송 성공 여부를 확인하지 않는다고 했다. 따라서 신뢰성을 얻기 위해서는 상위 레이어 프로토콜의 도움을 받아야 하는데 그 프로토콜이 바로 TCP 프로토콜인 것. (전송 계층)

… 흔히 알고 있는 3-way handshaking 방식으로 신뢰성을 보장하는 그 프로토콜 맞다 (보낸다~! ➡️ 잘 받았어 ~! ➡️ 잘 받았다는 것 확인 ~!)

### ✨ 참고

[https://ko.wikipedia.org/wiki/인터넷_프로토콜](https://ko.wikipedia.org/wiki/%EC%9D%B8%ED%84%B0%EB%84%B7_%ED%94%84%EB%A1%9C%ED%86%A0%EC%BD%9C)

[http://www.kocw.net/home/cview.do?cid=6166c077e545b736#.Y1KsjFovJm4.link](http://www.kocw.net/home/cview.do?cid=6166c077e545b736#.Y1KsjFovJm4.link)

## 🌟 IP Address 클래스

### ✨ 필요성

초기 32비트 IPv4 구조는 8비트의 네트워크 영역과 그 네트워크 내의 호스트를 가리키는 나머지 (24비트) 영역으로 고정되어 있었다. 따라서 사용할 수 있는 네트워크는 그 종류가 적고 규모가 컸다. (2^8개의 네트워크, 각각 2^24개의 호스트를 가진다.)

근데 네트워크가 필요한 곳은 많고, 그 필요한 곳에서 모두 대규모의 네트워크를 필요로 하는 것은 아니기 때문에 이런 식으로 분배하다가는 분명히 IP 주소가 낭비된다.

따라서 큰 규모에서 작은 규모로 미리 나누어 둔 다음에 (이렇게 나눈 것을 클래스라고 한다.) 필요에 따라서 분배해 주는 방식을 사용하게 되었는데 이게 바로 IP 클래스 방식이다.

### ✨ IP 클래스 방식

전체 네트워크를 절반으로 나눈게 클래스 A

나머지 절반 (클래스 A 크기) 을 다시 반으로 나눈게 클래스 B

나머지 절반을 다시 반으로 나눈게 클래스 C

나머지 절반을 반으로 나눠서 각각 클래스 D와 클래스 E 로 만들었다.

용지 크기를 결정하는 방식과 동일하다 생각하니 이해하기 편했다.

![Paper-size-images](/Paper-size-images.webp)

출처 : [https://www.hobbycraft.co.uk/help-centre/further-info/cp-paper-size-guide.html](https://www.hobbycraft.co.uk/help-centre/further-info/cp-paper-size-guide.html)

전체 네트워크를 0000 0000 ~ 1111 1111 범위라고 하면

절반이 될 A 클래스는 0000 0000 ~ 0111 1111 이 될 것이다.

나머지 절반은 1000 0000 ~ 1111 1111 일 테니

그 절반이 될 B 클래스는 1000 0000 ~ 1011 1111이 될 것이다.

- A클래스
    - `00000000 00000000 00000000 00000000`
    - `01111111 11111111 11111111 11111111`
- B클래스
    - `10000000 00000000 00000000 00000000`
    - `10111111 11111111 11111111 11111111`
- C클래스
    - `11000000 00000000 00000000 00000000`
    - `11011111 11111111 11111111 11111111`
- D클래스
    - `11100000 00000000 00000000 00000000`
    - `11101111 11111111 11111111 11111111`
- E클래스
    - `11110000 00000000 00000000 00000000`
    - `11111111 11111111 11111111 11111111`

이걸 옥텟 단위로 10진수로 바꾼 것이 아래

![network_classes](/network_classes.png)

클래스별 네트워크 주소, host 주소 구조

![network_classes_structure](/network_classes_structure.png)

클래스 D는 Multicasting 용으로 예약되어 있다. 어떻게 사용되는건지 궁금해서 찾아보긴 했는데……… 잘 이해는 안간다. 그냥 이 주소로 보내면, 거기에 참여하는 호스트들 여럿이 동시에 수신할 수 있게 되는 것이라고 이해하기로 했다. ([https://unabated.tistory.com/entry/Multicast-Address-멀티캐스트-주소](https://unabated.tistory.com/entry/Multicast-Address-%EB%A9%80%ED%8B%B0%EC%BA%90%EC%8A%A4%ED%8A%B8-%EC%A3%BC%EC%86%8C))

클래스 E는 연구용으로 남겨둔 클래스이기 때문에 역시 일반적으로는 사용하지 않는다.

### ✨ 클래스 방식은 이제 거의 사용하지 않는다.

클래스 방식을 사용하게 된다면 예전보다는 훨씬 필요에 따라서 유연하게 사용할 수 있지만, 이 역시도 낭비가 심하다. 1000개의 호스트가 필요하다면 클래스 B를 할당받아야 하는데 그럼 무려 6만개 이상의 호스트가 낭비되게 되는 것이라..

그래서 요즘은 IP 주소 할당에 CIDR 방식을 사용하는 것이다.

내가 본 강의에서는 클래스 방식은 이제 사용하지 않으니까 굳이 알 필요 없다는 식으로 말씀하시긴 했는데 왜인지 거의 모든 네트워크 강의에서는 클래스 방식을 설명한다. 그래서 공부하긴 했는데 나 역시도 왜 알아야 하는건지 잘 모르겠다. (ㅋㅋㅋㅜㅜ) 사진 찾으러 들어갔던 스택오버플로우 답변에서도 너무 단호하게 (Nope.) 별로 안쓴다고 답변해줘서 좀 웃겼다. ([https://stackoverflow.com/questions/60044507/ipv4-classes-are-they-useful-in-any-way-nowadays](https://stackoverflow.com/questions/60044507/ipv4-classes-are-they-useful-in-any-way-nowadays))

### ✨ 참고

[https://ko.wikipedia.org/wiki/네트워크_클래스](https://ko.wikipedia.org/wiki/%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC_%ED%81%B4%EB%9E%98%EC%8A%A4)

[https://jhnyang.tistory.com/503](https://jhnyang.tistory.com/503)

[https://docs.oracle.com/cd/E19504-01/802-5753/planning3-78185/index.html](https://docs.oracle.com/cd/E19504-01/802-5753/planning3-78185/index.html)

[https://www.telecomworld101.com/Classes.html](https://www.telecomworld101.com/Classes.html)

[https://youtu.be/b7Wk-6w5vgg](https://youtu.be/b7Wk-6w5vgg)

## 🌟 CIDR / Subneting

### ✨ CIDR와 Subneting

정말 너무너무 궁금했는데 너무 잘 정리된 글을 찾아서 다행이라 생각한다…

결론은 CIDR는 서브넷팅, 슈퍼넷팅 등등 IP 주소를 효율적으로 나누기 위한 방법을 사용해서 분배하는 방식을 말하는 것이기 때문에

**서브네팅 ⊂ CIDR 이런 관계가 성립된다고 한다!!**

### ✨ CIDR

Classless Inter-Domain Routing

클래스 방식이 옥텟 단위로 (이건 내 뇌피셜임) 구분을 했다면, 사이더는 비트 단위로 구분하는 방식이다.

동일하게 접두어 (영어 그대로 prefix라고 함) 가 네트워크 ID이고, 나머지가 host ID가 되는데, 동일한 접두어를 갖는 (즉 동일한 초기 비트를 갖는) IP 주소들을 동일한 사이더 블록에 포함되어 있다고 한다. (사이더 블록은 그냥 서브넷이라고 생각하면 된다.)

A.B.C.D/N 이런 식으로 표기를 하게 되는데 여기서 N이 바로 프리픽스 비트의 개수가 되는 것이다.

![CIDR_table](/CIDR_table.png)

출처 : [https://ko.wikipedia.org/wiki/사이더_(네트워킹)](https://ko.wikipedia.org/wiki/사이더_(네트워킹))

### ✨ Subneting

IP주소를 나누기 위한 작업을 의미한다. 필요에 따라서 절반 / 절반의 절반 / … 이런 식으로 쪼개주는 것이다.

#### 1/2 로 나눠보기

![subneting_1/2](/subneting_1.png)

출처 : [https://youtu.be/-iMFsDdfoeI](https://youtu.be/-iMFsDdfoeI)

호스트 ID의 가장 왼쪽 비트 1개를 이용해서 나눠준다. 절반으로 나누기 때문에 서브넷 하나는 0, 나머지 하나는 1을 갖게 될 것이다.

#### 1/4로 나눠보기

![subneting_1/4](/subneting_2.png)

출처 : [https://youtu.be/-iMFsDdfoeI](https://youtu.be/-iMFsDdfoeI)

절반의 절반! 이므로 호스트 ID의 가장 왼쪽 비트 2개를 이용해서 나눠준다.

#### 평가를 위한 특훈

![calculate host ID range 1](/subneting_3.png)

출처 : [https://youtu.be/-iMFsDdfoeI](https://youtu.be/-iMFsDdfoeI)

![calculate host ID range 1](/subneting_4.png)

출처 : [https://youtu.be/-iMFsDdfoeI](https://youtu.be/-iMFsDdfoeI)

사실 넷프렉티스 이 두 슬라이드가 전부인 것 같은데…ㅋㅋ (현타옴) 약간 본투비루트랑 비슷하게 실제 과제에 필요한 지식이랑 평가자에게 설명하기 위해 필요한 지식의 양의 차이가 엄청난 것 같다.

### ✨ 참고

[https://inpa.tistory.com/entry/WEB-🌐-CIDR-이-무얼-말하는거야-⇛-개념-정리-계산법](https://inpa.tistory.com/entry/WEB-%F0%9F%8C%90-CIDR-%EC%9D%B4-%EB%AC%B4%EC%96%BC-%EB%A7%90%ED%95%98%EB%8A%94%EA%B1%B0%EC%95%BC-%E2%87%9B-%EA%B0%9C%EB%85%90-%EC%A0%95%EB%A6%AC-%EA%B3%84%EC%82%B0%EB%B2%95)

[https://inpa.tistory.com/entry/WEB-IP-클래스-서브넷-마스크-서브넷팅-총정리#서브넷_/_서브넷_마스크_/_서브네팅_총정리](https://inpa.tistory.com/entry/WEB-IP-%ED%81%B4%EB%9E%98%EC%8A%A4-%EC%84%9C%EB%B8%8C%EB%84%B7-%EB%A7%88%EC%8A%A4%ED%81%AC-%EC%84%9C%EB%B8%8C%EB%84%B7%ED%8C%85-%EC%B4%9D%EC%A0%95%EB%A6%AC#%EC%84%9C%EB%B8%8C%EB%84%B7_/_%EC%84%9C%EB%B8%8C%EB%84%B7_%EB%A7%88%EC%8A%A4%ED%81%AC_/_%EC%84%9C%EB%B8%8C%EB%84%A4%ED%8C%85_%EC%B4%9D%EC%A0%95%EB%A6%AC)

[https://youtu.be/-iMFsDdfoeI](https://youtu.be/-iMFsDdfoeI)

## 🌟 이것저것

### ✨ 대역폭

간혹 **네트워크 크기(호스트의 개수)** 를 의미하기 위해서 **네트워크 대역폭** 이라는 단어를 사용하는 경우를 본 적이 있는데 네트워크 대역폭이란 완전 다른 의미인 것 같다. 아무래도 잘못된 단어 선택인 듯.

네트워크 대역폭은 그 네트워크의 성능을 표현하기 위한 단어. 얼마나 많은 데이터를 단위시간 안에 전달할 수 있는지를 의미한다.

참고 : [https://velog.io/@ragnarok_code/대역폭-bandwidth란](https://velog.io/@ragnarok_code/%EB%8C%80%EC%97%AD%ED%8F%AD-bandwidth%EB%9E%80)

### ✨ 패킷 교환 방식

예전엔 회선 교환 방식이었다. 전화망을 생각하면 이해가 편하다. 전화망처럼 어떤 연결이 이루어지고 있으면 그 연결 동안에는 연결된 장치가 독점적으로 그 연결을 사용한다.

이런 방식은 효율적으로 연결을 사용할 수 없기 때문에 다른 방식을 사용하게 되었는데 그게 바로 패킷 교환 방식이다.

패킷 교환 방식에서는 어떤 독점적이고 유일한 하나의 루트로 연결이 이루어지는 것이 아니라 여러 중간 지점들을 거쳐가면서 (그 중간 지점들을 hop 이라고 한다.) 패킷 단위로 데이터를 전송한다.

인터넷에서 사용하는 TCP/IP 프로토콜에서 사용하는 방식이 바로 패킷 교환 방식

참고

- [https://velog.io/@doondoony/ip101](https://velog.io/@doondoony/ip101)
- [https://cozy-dandelion.tistory.com/42](https://cozy-dandelion.tistory.com/42)
- [https://ko.wikipedia.org/wiki/홉_(네트워크)](https://ko.wikipedia.org/wiki/%ED%99%89_(%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC))

### ✨ 사설 IP, 사설망

모든 호스트에 고유한 IP를 부여한다면 IP 가 모자란다.

그래서 어떤 그룹으로 묶고, 그 그룹을 대표하는 IP만 유일한 IP로 부여하고, 그 안에 있는 호스트들은 그 그룹 안에서만 유일한 IP를 부여해서 구분한다.

이런 그룹을 사설망이라고 하고, 그 그룹을 대표하는 IP 를 Gateway 주소라고 하고, 그 안에 있는 호스트들에게 부여될 수 있는 IP, 사설망에서 사용될 수 있는 IP를 사설 IP 라고 한다. 

![private_ip_range](/private_ip_range.png)

출처 : [https://m.blog.naver.com/PostView.naver?isHttpsRedirect=true&blogId=hatesunny&logNo=220790654612](https://m.blog.naver.com/PostView.naver?isHttpsRedirect=true&blogId=hatesunny&logNo=220790654612)

참고 : [https://inpa.tistory.com/entry/WEB-🌐-IP-기초-사설IP-공인IP-NAT-개념-정말-쉽게-정리](https://inpa.tistory.com/entry/WEB-%F0%9F%8C%90-IP-%EA%B8%B0%EC%B4%88-%EC%82%AC%EC%84%A4IP-%EA%B3%B5%EC%9D%B8IP-NAT-%EA%B0%9C%EB%85%90-%EC%A0%95%EB%A7%90-%EC%89%BD%EA%B2%8C-%EC%A0%95%EB%A6%AC)

### ✨ 첫번째와 마지막 주소

네트워크나 서브넷의 첫번째 주소는 호스트를 지정하는 것이 아니라 네트워크를 지정하는데 사용된다.

마지막 주소는 그 네트워크의 모든 호스트에 메시지를 브로드캐스트하는 데 사용된다.

따라서 첫번째 주소와 마지막 주소는 개별 호스트에 할당할 수 없다.

참고 : [https://learn.microsoft.com/ko-kr/troubleshoot/windows-client/networking/tcpip-addressing-and-subnetting](https://learn.microsoft.com/ko-kr/troubleshoot/windows-client/networking/tcpip-addressing-and-subnetting)
