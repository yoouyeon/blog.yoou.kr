---
title: "RFC 7231 - Resource, Representation"
date:  2022-11-21 11:15:46
category: 42Curcus/Webserv
description: "우당탕탕 webserv 이론공부"
---

[RFC 7231 - HTTP/1.1 : Semantics and Content 번역](https://roka88.dev/106)

> 서버를 기준으로 필요한 내용 위주로 정리함.

## 🌟 2. Resources (리소스)

리소스 : HTTP 요청의 대상. 각 리소스는 URI (I임에 유의. Uniform Resource Identifier) 로 식별된다.

요청에 RFC 7230에 정의된 다양한 형태 중 하나로( ……… 5.3 ……… ) 대상 URI가 들어있고, 요청을 받은 서버에서는 그 대상에 대한 URI를 재구성한다 ( ……… 5.5 ……… )

## 🌟 3. Representations (표현)

리소스의 현재, 또는 원하는 상태를 표현하기 위한 추상화가 필요하고, 그 추상화를 “REST” 라고 부른다.

“표현” 이란 리소스의 어느 시점의 상태를 프로토콜을 통해 쉽게 전달할 수 있게 하기 위한 정보. 표현 메타데이터의 집합과 표현 데이터 스트림으로 구성된다.

selective representation은 조건부 요청을 평가하고, GET에 대한 200(OK)나 304(Not Modified) 응답을 구성하기 위한 데이터와 메타데이터를 제공하는데 사용된다.

### ✨ 3.1 Representation Metadata (표현 메타데이터)

Representation 헤더 필드 : 표현에 대한 메타데이터 제공

메시지에 본문이 있을 경우에는 표현 헤더 필드는 본문의 표현 데이터를 해석하는 방법 설명

HEAD 요청에 대한 응답에서는 요청이 GET이었을 때 본문에 있었을 표현 데이터를 설명한다.

- Content-Type : [3.1.1.5](#3115-content-type)
- Content-Encoding : [3.1.2.2](#3122-content-encoding)
- Content-Language : [3.1.3.2](#3132-content-language)
- Content-Location : [3.1.4.2](#3142-content-location)

#### ✏️ 3.1.1 Processing Representation Data

##### 📍 3.1.1.1 Media Type

Content-Type 헤더필드와 Accept 헤더필드에서 사용하는 데이터 타입을 표현하는 방식

```
Media-type = type "/" subtype *(OWS ";" OWS parameter))

type = token (대소문자 구분 ❌)
subtype = token (대소문자 구분 ❌)
parameter = name "=" value
name = token (대소문자 구분 ❌)
value = token or quoted-string (name에 따라서 대소문자 구분 여부 결정)
```

parameter의 value는 토큰 혹은 quoted-string으로 전송되는데, 아래와 같은 형식이 모두 가능하지만 일관성을 위해서 가장 처음 예가 권장된다.

```
text/html;charset=utf-8
text/html;charset=UTF-8
Text/HTML;Charset="utf-8"
text/html; charset="utf-8"
```

(결론적으론 **type, subtype, parameter-name은 소문자로 통일**, **불필요한 공백을 넣지 말고**, **parameter-value는 가능하면 소문자에 따옴표 없는 토큰**으로 하는 방식이 권장된다는 것 같다.)

parameter의 "=" 문자 주위에 공백을 허용하지 않는다. → 공백이 있으면 잘못된 것.

##### 📍3.1.1.2 Charset

charset은 대소문자를 구분하지 않는 토큰

```
charset = token
```

##### 📍3.1.1.3 Canonicalization and Text Defaults

표준 형식은 Text 타입의 경우에 줄 바꿈으로 CRLF를 사용하는 것을 권장하지만, HTTP는 전체 본문에 일관되기만 하면 CR 또는 LF만으로도 줄바꿈을 할 수 있다.

생성쪽은 위와 같은 방식으로 메시지를 생성할 수 있고 (금지는 아님) **수신 측에서는 CLRF 뿐 만 아니라 CR, LF 만으로 줄바꿈 된 텍스트 미디어의 줄바꿈을 해석할 수 있어야 한다.**

위 내용은 "text" 타입의 경우에만 적용된다.

##### 📍3.1.1.5 Content-Type

메시지 페이로드에 포함된 표현 또는 선택된 표현 등 관련 표현의 미디어 타입을 나타낸다.

```
Content-Type = media-type

media-type = Section 3.1.1.1
```

본문을 포함하는 메시지를 생성하는 발신자는 미디어타입을 그 발신자가 알 수 없는 경우가 아니라면 메시지에 Content-Type 헤더 필드를 생성해야 한다. 수신 측에서는 만약 본문이 있는 메시지에 Content-Type 필드가 없는경우 미디어 타입을 가정하거나, 데이터를 검토해서 타입을 결정할 수 있다.

리소스 소유자는 올바른 Content-Type 을 제공하는 것이 적절하지만 아닌 서버도 많기 때문에 클라이언트 쪽에서 타입을 재정의하는 경우 있다. 이 경우에는 잘못된 타입으로 결정하는 위험과 추가적인 보안 위험에 노출시킬 수 있다.

#### ✏️ 3.1.2 Encoding for Compression or Integrity

##### 📍3.1.2.1 Content Codings

표현에 적용되었거나 적용될 수 있는 인코딩 변환.

Accept-Encoding 과 Content-Encoding 헤더필드에 사용된다.

```
content-coding = token
```

content-coding 값은 대소문자를 구분하지 않는다. 이 명세에서 정의되는 값은 compress (x-compress), deflate, gzip

##### 📍3.1.2.2 Content-Encoding

표현에 어떤 content-coding이 적용되었는지, content-type 헤더필드에 있는 그 타입의 데이터를 얻기 위해 어떤 디코딩 매커니즘을 사용해야 하는지 나타낸다.

```
Content-Encoding = content-coding

Content-Encoding: gzip
```

하나 이상의 인코딩이 표현에 적용될 수 있고, 해당 인코딩이 적용된 순서대로 Content-Encoding 필드에 나열되어야 한다.

요청 메시지에 허용되지 않는 Content-Coding이 있는 경우에는 415(Unsupported Media Type)로 응답한다.

#### ✏️ 3.1.3 Audience Language

##### 📍3.1.3.1 Language Tags

Content-Language 헤더필드에서 사용하는 문법

```
fr, en-US, es-419, az-Arab, x-pig-latin, man-Nkoo-GN
```

##### 📍3.1.3.2 Content-Language

```
Content-Language = language-tag
```

Content-Lauguage가 지정되지 않은 경우, 기본값은 모든 언어 대상이라는 것이다.

다수를 대상으로 하는 컨텐츠의 경우에는 필드의 값에 다수의 언어를 기재할수도 있다.

모든 미디어 타입에 적용될 수 있다. (텍스트 문서에만 한정되지 않는다.)

####  ✏️ 3.1.4 Identification

##### 📍3.1.4.2 Content-Location

이 메시지의 페이로드에 해당하는 특정 리소스의 식별자로 사용할 수 있는 URI을 참조한다.

요청 메시지가 생성될 때 이 URI에 대해 GET 요청을 수행한다면, 이 요청에 대한 200(OK) 응답은 페이로드에 동일한 표현을 포함할 것이다.

```
Content-Location = absolute-URI/partial-URI
```

Content-Location 값은 Request URI의 대체 값은 아니다.

Content-Location이 2xx(Successful) 응답 메시지에 포함되고, 요청 URI와 동일한 URI에 대한 것을 가리키는 경우, 수신자는 페이로드를 메시지 작성 시점의 그 리소스의 표시로 간주할 수 있다.

- GET, HEAD 요청의 경우 서버가 Content-Location을 제공하지 않았을때와 그 의미가 같다.
- PUT, POST와 같은 요청의 경우 서버의 응답에 해당 리소스의 새로운 표현이 포함됨을 의미한다.

### ✨ 3.2 Representation Data

표현 데이터는 메시지의 페이로드 본문으로 제공되거나 요청 URI에 의해 참조된다.

표현 데이터는 Content-Type, Content-Encoding을 통해 결정된다.

페이로드를 구체적으로 기술하는 헤더 필드를 "payload header fields" 라고 한다.

- Content-Length
- Content-Range
- Trailer
- Transfer-Encoding
