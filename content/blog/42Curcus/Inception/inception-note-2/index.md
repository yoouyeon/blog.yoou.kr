---
title: "Dockerfile reference 읽기"
date: 2022-10-26 22:28:59
category: 42Curcus/inception
description: "Docker Document 읽기"
---

[https://wooono.tistory.com/123](https://wooono.tistory.com/123)

[https://docs.docker.com/engine/reference/builder/](https://docs.docker.com/engine/reference/builder/)

## 🌟 Dockerfile

도커 이미지를 만들기 위한 명령어들이 적혀있는 스크립트 파일.

도커파일 명령어 한줄 한줄마다 이미지를 구성하는 레이어가 생긴다.

장점? : 

- 사이즈가 큰 이미지 파일 자체를 배포하는 것 보다 더 용량이 작은 도커파일을 배포하는 것이 더 비용이 적게 든다.
- 어떤 식으로 도커 이미지가 구성되어있는지를 도커파일을 보고 이해할 수 있다.

## 🌟 Format

```docker
# Comment
INSTRUCTION argument
```

명령어는 항상 대문자일 필요는 없는데 대문자로 적는 쪽이 더 구별하기 쉬움

도커는 도커파일의 명령어를 순서대로 읽는다.

반드시 `FROM` 명령으로 시작해야 함. (Parser directive, Comments, 전역 ARGs가 먼저 올 수 있긴 함)

---

`FROM` 은 Parent Image를 나타냄. 

📍 Parent Image : 이미지의 Parent Image를 `FROM` 명령을 이용해서 지정하면, 그 이후의 command들은 parent image에 기반하여 작동한다. 만약에 `FROM` 명령을 쓰지 않았다면, parent image를 사용하지 않는다는 뜻이므로 base image를 만든다.

[https://docs.docker.com/glossary/#parent-image](https://docs.docker.com/glossary/#parent-image)

`#` 로 시작하는 줄은 유효한 parser directive가 아닌 이상 comment로 처리한다.

`#` 는 Dockerfile의 명령이 실행되기 전에 모두 삭제되기 때문에 중간에 들어와 있어도 문제가 없다.

~~whitespace에 대한 얘기가 있는데 안읽어봄~~

## 🌟 Parser directives

Dockerfile의 내용들이 어떻게 처리될지에 영향을 미친다.

근데 이미지에 레이어를 추가하지는 않고, 빌드 단계에도 보여지지 않는다. (?)

특별한 형식으로 적혀 있어야 Parser directive로 처리되는 것 같다. (앞서서 유효한 Parser directive가 아니라면 그냥 comment로 처리된다고 했었음)

```docker
유효함
# directive=value

유효하지 않음 (형식에 맞지 않음)
# direc

유효하지 않음 (두번 등장)
# directive=value1
# directive=value2

유효하지 않음 (명령어 뒤에 등장)
FROM baseimage
# directive=value

유효하지 않음 (코멘트 뒤에 등장)
# this is comment
# directive=value

유효하지 않음 (알려지지 않은 directive)
# unknowndirective=value

공백은 상관없다곤 하는데 걍 왠만하면 맞추는게 좋지 않을까
```

## 🌟 `FROM`

새로운 build stage를 만들고, 이후 명령을 위한 Base Image를 설정한다.

유효한 Dockerfile이라면 반드시 `FROM` 명령으로 시작해야 한다.

Base image는 어떤 유효한 이미지라도 상관은 없지만 Public Repositories에 있는 이미지를 당겨오는 쪽이 편함.

- `ARG`는 Dockerfile에서 FROM보다 앞서서 등장할 수 있는 유일한 명령어.
- `FROM` 은 여러 이미지를 만들거나, 의존성이 있는 build stage를 만들 때 하나의 Dockerfile에서 여러번 등장할 수 있다.
  
    각각의 `FROM` 명령은 기존의 state를 모두 clear하기 때문에 새로운 `FROM` 명령 전에 기존 상태를 노트해두면 된다.
    
- 그 밖에도 `FROM` 명령에 `AS name`을 붙여서 새로운 build stage에 이름을 붙일수도 있고, `tag`, `digest` 값을 넣어줄 수 있다는 것 같다.

~~(플랫폼 관련 내용은 나중에 필요하면 읽어보기…)~~

(나중에 읽어보기 : [https://docs.docker.com/engine/reference/builder/#understand-how-arg-and-from-interact](https://docs.docker.com/engine/reference/builder/#understand-how-arg-and-from-interact))

## 🌟 `RUN`

RUN 명령은 현재 이미지에서 command를 실행하고, 그 결과를 커밋한다.

이렇게 커밋된 결과는 다음 명령에서 사용되는 것

(이렇게 명령어를 쌓아서 만드는 도커의 컨셉이 장점이 많다는 이야기)

두가지 형태로 사용할 수 있다.

- `RUN <command>`
  
    `RUN echo hello hi`
    
- `RUN [”executable”, “param1”, “param2”]`
  
    `RUN [”echo”, “helllo”, “hi”]`
    

backslash 이용해서 줄 구분할 수 있음

이 아래로 RUN의 수많은 옵션들… 일단 해 보고 필요하면 읽어봄 [https://docs.docker.com/engine/reference/builder/#run---mount](https://docs.docker.com/engine/reference/builder/#run---mount)

## 🌟 `CMD`

가능한 CMD 형태

- `CMD ["executable","param1","param2"]`
- `CMD ["param1","param2"]`
- `CMD command param1 param2`

Dockerfile 안에 오직 하나의 CMD 명령만 들어갈 수 있음. 만약에 여러개 들어가있으면 가장 마지막 명령만 보인다.

주된 목적은 실행중인 컨테이너에게 “기본값”을 주는 것

이 기본값은 어떤 명령 실행이 될 수도 있고, (첫번째, 세번째 form) 아니면 다른 명령 실행에 주어질 기본 인자가 될 수도 있다. (이렇게 인자를 줘야 할 때는 당연히 `ENTRYPOINT` 명령으로 기본적으로 실행될 명령을 지정해줘야 한다.)

먄약에 CMD 명령으로 기본 인자를 지정할 때에는 `ENTRYPOINT` 명령 역시 JSON Format 으로 적어야 한다.

- - -

1, 2번 형태는 Shell로 실행되지 않기 때문에 3번째 형태와 같이 적어줘도 동일하게 동작하지 않을 수도 있다.

## 🌟 `ENTRYPOINT`

가능한 ENTRYPOINT 형태 

- `ENTRYPOINT ["executable", "param1", "param2"]`
- `ENTRYPOINT command param1 param2`

컨테이너에서 실행될 명령을 지정.

> The *shell* form prevents any `CMD` or `run` command line arguments from being used, but has the disadvantage that your `ENTRYPOINT` will be started as a subcommand of `/bin/sh -c`, which does not pass signals. This means that the executable will not be the container’s `PID 1` - and will *not* receive Unix signals - so your executable will not receive a `SIGTERM` from `docker stop <container>`.
> 

시그널을 받아서 뭔가를 해야 하는 상황이라면 shell form 을 사용하면 안될 것 같다.

- ENTRYPOINT와 CMD
  
    [https://bluese05.tistory.com/77](https://bluese05.tistory.com/77)
    

## 🌟 `VOLUME`

```docker
VOLUME ["/data"]
```

VOLUME 명령은 마운트 지점을 만들고, 컨테이너가 외부로 연결된 어떤 공간을 보유한다고 표시 (?)

JSON array 형태로 적어도 되고 일반 문자열로 적어도 된다.

```docker
FROM ubuntu
RUN mkdir /myvol
RUN echo "hello world" > /myvol/greeting
VOLUME /myvol
```

## 🌟 `EXPOSE`

```docker
EXPOSE <port> [<port>/<protocol>...]
```

EXPOSE 명령으로는 만들고자 하는 컨테이너가 열어 둘 특정한 네트워크 포트를 지정할 수 있다.

TCP/UDP를 지정할수도 있고, 기본값은 TCP이다.

단순히 열어두기만 하는 것이지 실제로 그 포트를 사용하기 위해서는 docker run 시에 -p 플래그를 넣어서 하나 이상의 포트를 매핑해줘야 하는 것 같다.

```bash
docker run -p 80:80/tcp -p 80:80/udp ...
```

이런 식으로

더 자세한 내용은 [여기](https://docs.docker.com/network) 를 참고하라는 것 같다. (언젠간 필요할테니 나중에 읽어보는걸로…)

## 🌟 `COPY`

두가지 형태

- `COPY [--chown=<user>:<group>] <src>... <dest>`
- `COPY [--chown=<user>:<group>] ["<src>",... "<dest>"]`

`COPY` 명령어로는 `<src>` 에 있는 파일이나 디렉토리를 컨테이너의 파일시스템의 `<dest>`로 복사할 수 있다.

`<dest>` 는 절대경로로 줄 수도 있고, `WORKDIR` 에 대한 상대경로로 줄 수도 있다.

## 🌟 `WORKDIR`

```docker
WORKDIR /path/to/workdir
```

`RUN`, `CMD`, `ENTRYPOINT`, `COPY`, `ADD` 명령의 working directory를 설정할 수 있다.

만약에 설정해둔 `WORKDIR`이 존재하지 않는다면 생성된다.

`WORKDIR` 명령은 여러번 등장할 수 있는데, 뒤에 나오는 경로가 상대경로일 경우에 기준은 앞선 `WORKDIR`이다.

기본값은 `/` 이다.

## 🌟 `USER`

```docker
USER <user>[:<group>]
# USER <UID>[:<GID>]
```

기본 user name과 group을 설정할 수 있음 (이건 옵션)

이렇게 설정한 user가 이후 나오는 RUN 으로 지정된 명령들을 실행한다.

```docker
FROM microsoft/windowsservercore
# Create Windows user in the container
RUN net user /add patrick
# Set it for subsequent commands
USER patrick
```

RUN 명령으로 생성한 user를 지정해서 다음 명령을 실행하게 할 수도 있는 것 같다.

## 🌟 `ARG`

```docker
ARG <name>[=<default value>]
```

docker build 커맨드로 값을 지정할 수 있는 변수들을 정의하는 명령

기본값을 설정할 수 있다. 만약에 docker build 커맨드의 인자로 값을 지정하지 않았다면, 기본값을 사용한다.

~~(Scope 생략)~~

### ✨ ARG variable 사용하기

```docker
FROM ubuntu
ARG CONT_IMG_VER
RUN echo $CONT_IMG_VER
```

### ✨ 사전 정의된 ARGS

- `HTTP_PROXY`
- `http_proxy`
- `HTTPS_PROXY`
- `https_proxy`
- `FTP_PROXY`
- `ftp_proxy`
- `NO_PROXY`
- `no_proxy`
- `ALL_PROXY`
- `all_proxy`

## 🌟 Docker image 만들어보기

[https://javacan.tistory.com/entry/docker-start-7-create-image-using-dockerfile](https://javacan.tistory.com/entry/docker-start-7-create-image-using-dockerfile)

```docker
FROM alpine:3.10
ENTRYPOINT ["echo", "hello"]
# ENTRYPOINT echo hello
```

```bash
docker build --tag echoalpine:1.0 .
docker images
docker run --rm echoalpine:1.0
```

![dockerfile_practice](/dockerfile_practice.png)