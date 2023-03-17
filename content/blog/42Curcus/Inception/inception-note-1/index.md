---
title: "Docker overview 읽기"
date: 2022-10-24 23:14:17
category: 42Curcus/inception
description: "Docker Document 읽기"
---

[https://docs.docker.com/get-started/overview/](https://docs.docker.com/get-started/overview/)

## 🌟 The Docker platform

도커는 **컨테이너** 라는 느슨하게 격리되어있는 환경에서 어플리케이션을 패키징하고 실행하는 기능을 제공한다.

격리와 보안은 하나의 호스트에서 여러 컨테이너들을 동시에 실행시킬 수 있게 함.

컨테이너는 가볍고, 어플리케이션을 실행하는 데 필요한 모든 것들을 포함하고 있기 때문에, 호스트에 설치되어 있는 것들에 대해서 전혀 생각할 필요가 없음.

컨테이너를 공유할 수 있고, 그 컨테이너를 공유받은 사람들은 동일하게 작동하는 컨테이너를 받았다고 확신할 수 있다.

*~~도커 기능 생략~~*

## 🌟 Docker architecture

client-server architecture를 사용한다.

Docker client는 Docker container를 빌드하고, 실행하고, 배포하는  Docker deamon에게 요청한다.

Docker client과 deamon은 동일한 시스템에서 동작할수도 있고, 원격에 있는 daemon에 연결할수도 있다. 

다른 Docker client는 Docker Compose인데, 이건 여러개의 container로 이루어진 application을 작업할 수 있게 해 준다.

![docker architecture](https://docs.docker.com/engine/images/architecture.svg)

### ✨ The Docker daemon (`dockerd`)

Docker API request를 받아서 Docker object들 (image, container, network, volumes)을 관리함.

daemon들끼리도 통신할 수 있다.

### ✨ The Docker client (`docker`)

Docker user가 Docker와 상호작용할 수 있는 방법

예를 들어서 `docker run` 이라는 커맨드를 쓰면, client가 `dockerd`에게 `run` 이라는 명령을 전달하는 것임.

client는 여러개의 daemon과 통신할 수 있다.

### ✨ Docker Desktop

… 도커 설치하는 어플리케이션.

여기 안에는 Docker daemon, Docker client, Docker Compose, … 등등이 포함되어있다.

### ✨ Docker registries

Docker registry는 Docker image를 저장한다.

Docker Hub는 모두가 사용할 수 있는 public registry이고, Docker는 기본적으로 Docker Hub에서 이미지를 찾도록 설정되어 있다.

private registry를 만들수도 있음.

`docker pull` 나 `docker run` 커맨드를 쓰면, 필요한 이미지들이 설정된 registry에서 불러와진다.

`docker push` 커맨드를 쓰면, 내 이미지가 설정된 registry로 push된다.

### ✨ Docker objects

#### Images

image는 Docker container를 만들기 위한 방법이 있는 read-only template이다.

기존의 이미지에 추가적인 설정을 더해서 새로운 이미지를 만들 수 있다.

새로운 이미지를 생성할수도 있고, registry에 있는 다른 사람이 만든 이미지를 사용할수도 있다.

새로운 이미지를 만들기 위해서는 이미지를 만들고, 실행하기 위한 단계가 정의되어있는 **Dockerfile**을 만들어야 한다.

Dockerfile의 각각의 명령들은 이미지의의 한 레이어를 만든다.

Dockerfile을 변경하고, 다시 실행하면 그 수정된 명령으로 만들어지는 레이어만 바뀌고 새로 빌드된다.

이게 다른 가상화 기술들에 비해서 이미지가 가볍고 빠르게 만드는 이유 중 하나임.

#### Containers

컨테이너는 이미지의 실행가능한 인스턴스

Docker API를 이용해서 container를 만들고, 시작하고, 멈추고, 움직이고, 삭제할 수 있다.

컨테이너를 다른 네트워크(여러개도 가능)에 연결할 수 있고 저장공간을 붙일수도 있고, 컨테이너의 현 상태를 베이스로 한 새로운 이미지를 만들수도 있다.

기본적으로, 컨테이너는 다른 컨테이너와 호스트머신과 격리되어있다.

이 격리 여부? 도 내가 조정할 수 있다는 것 같다.

컨테이너를 만들거나 시작할 때 이미지 뿐만 아니라 다른 옵션들도 줄 수 있다.

컨테이너가 제거되면, 영구 저장소에 저장되지 않은 변경내용들은 삭제된다

---

#### Example `docker run` command

```docker
docker run -i -t ubuntu /bin/bash
```

`ubuntu` 컨테이너를 TTY 모드를 사용해서 (`-t`) 표준 입력을 유지하고 (`-i`) 실행 후 `/bin/bash` 명령을 실행한다

1. `ubuntu` 이미지가 local에 없으면 수동으로 docker pull ubuntu 명령을 실행한 것처럼 이미지를 불러온다.
2. docker container create 명령을 수동으로 실행한것처럼 새로운 컨테이너를 생성한다.
3. 컨테이너의 마지막 레이어로 read-write filesystem을 할당한다.
   
    ⇒ 실행중인 컨테이너에서 local filesystem에 파일이나 폴더를 생성/수정할 수 있게 함.
    
4. 네트워크 옵션을 따로 지정하지 않았기 때문에 네트워크 인터페이스를 컨테이너에 생성해서 기본 네트워크에 연결한다.
   
    컨테이너에 IP address를 할당하는 작업도 포함됨.
    
    기본적으로 컨테이너는 호스트머신의 네트워크 연결을 이용해서 외부 네트워크와 연결한다.
    
5. 컨테이너를 시작하고, `/bin/bash` 명령을 실행한다.
6. `/bin/bash` 명령이 종료되면, 컨테이너 역시 멈추지만 제거되지는 않는다. (다시 실행하거나 제거할 수 있다.)

![docker run test screenshot](/docker_run_test.png)