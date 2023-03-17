---
title: "docker commands"
date: 2022-10-27 23:49:07
category: 42Curcus/inception
description: "Docker Document 읽기"
---

## 🌟 docker build

[https://docs.docker.com/engine/reference/commandline/build/](https://docs.docker.com/engine/reference/commandline/build/)

> Build an image from a Dockerfile

일단 필요해보이는것만 정리함

### ✨ Usage

```bash
docker build [OPTIONS] PATH | URL | -
```

### ✨ Description

도커파일과 “context”로 부터 도커이미지를 만드는 커맨드

Context 라는 건 지정된 PATH, URL에 있는 파일들의 집합.

빌드 과정중에 Context의 파일들을 참조할 수 있다. (예: Dockerfile instruction 중 COPY 에서 사용)

### ✨ \[Option\] `--tag`, `-t`

만들 이미지의 이름과 태그를 설정

아래처럼 태그와 이름을 여러개 만들수도 있다. ([태그 조건](https://docs.docker.com/engine/reference/commandline/tag/)도 있는 것 같다.)

```bash
docker build -t vieux/apache:2.0 .
docker build -t whenry/fedora-jboss:latest -t whenry/fedora-jboss:v2.1 .
```

### ✨ \[Examples\] Build with PATH

```bash
docker build .
```

여기서 `.` 가 `PATH`

현재 있는 디렉토리의 모든 파일을 Docker daemon에게 보내서 활용할 수 있게 한다.

어떤 블로그에서는 명령어의 종료라고 설명을 하는 걸 보면 특별히 지정해 줄 Context가 없는 경우에는 . 을 적는 것 같다. (필수 인자이기 때문에)

## 🌟 docker run

[https://docs.docker.com/engine/reference/commandline/run/](https://docs.docker.com/engine/reference/commandline/run/)

> Run a command in a new container
> 

### ✨ Usage

```bash
docker run [OPTIONS] IMAGE [COMMAND] [ARG...]
```

### ✨ Description

어떤 이미지 위에 뭔가를 쓸 수 있는 (작업을 할 수 있는(?)) 컨테이너의 한 층을 쌓는 command

그리고 미리 지정해둔 특정한 command를 시작한다.

API `/containers/create` 이후 `/containers/(id)/start` 와 동등한 결과를 낸다.

컨테이너의 생성과 시작을 함께 하는 명령

만약에 나중에 생성했던 컨테이너를 시작만 하고 싶으면 `docker start` command를 사용하면 됨.

### ✨ \[Options\] `-name`

Assign a name to the container

```bash
docker run --name test
```

### ✨ \[Options\] `--detach`, `-d`

Run container in background and print container ID

컨테이너를 백그라운드로 실행하는 것.

![docker run --detach result](/docker_run_detach.png)

이런식으로 container ID가 아래에 출력된다. (컨테이너는 background에서 실행중)

### ✨ \[Options\] `--publish`, `-p`

Publish a container's port(s) to the host

```bash
docker run -p 127.0.0.1:80:8080/tcp ubuntu bash
```

container의 8080 포트를 127.0.0.1의 TCP 80번 포트에 바인드

호스트에 바인딩되지 않은 포트 (예 : -p 127.0.0.1:80:80 대신 -p 80:80)는 외부에서 접근할수도 있다.

이는 도커가 자체 iptables 규칙을 관리하기 때문에 (우리 가상환경 내에서) 특정 포트를 막도록 UFW를 구성했더라도 적용된다.
