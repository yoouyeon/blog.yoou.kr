---
title: "NGINX Container"
date: 2022-10-30 23:22:10
category: 42Curcus/inception
description: "우당탕탕 inception nginx 설정"
---

## 🌟 TLS (SSL)

[https://opentutorials.org/course/228/4894](https://opentutorials.org/course/228/4894)

### ✨ HTTPS와 SSL

HTTP는 Hypertext Transfer Protocol

HTPPS의 S는 Over Secure Socker Layer, 즉 SSL 프로토콜 위에서 돌아가는 HTTP이고 보안이 강화된 HTTP라는 뜻

### ✨ SSL과 TLS

같은 말.

발명은 SSL이라는 이름으로 되었는데 표준화되면서 TLS라는 이름이 붙었다.

하지만 아직 SSL을 더 많이 씀

### ✨ SSL 인증서

클라이언트와 서버간의 통신을 제 3자가 보증하는 문서

서버는 이 인증서를 갖고 있으면서 클라이언트가 서버에 접속하면 이 인증서 정보를 건네고, 클라이언트 쪽에서는 인증서 정보를 확인하고 신뢰할 수 있는 연결인지를 확인한 뒤에 다음 절차를 수행한다.

## 🌟 Basic

[https://ndb796.tistory.com/95](https://ndb796.tistory.com/95)

1. base image를 데비안 버스터로
2. 그 위에다가 엔진엑스를 설치
3. 엔진엑스가 백그라운드에서 돌도록 명령어를 실행한다.

```docker
# base image : debian buster
FROM debian:buster
# install nginx
RUN apt-get update
RUN apt-get install -y nginx
# listen port 80
EXPOSE 80
# run nginx
ENTRYPOINT ["nginx", "-g", "daemon off;"]
```

dockerfile을 실행해봅시다.

```bash
docker build --tag hello:0.1 .
# 결과 확인
docker images
```

container를 만들어봅시다.

```bash
docker run --name hello_nginx -d -p 80:80 hello:0.1
# 실행 확인
docker ps
```

접속해봅시다.

(호스트에서 접속이 안되어서 일단 VM 내 firefox로 접속함. (아마도 포트포워딩 문제인 것 같다.)

`localhost:80`

![result 1](/result_1.png)

(10/28 포트포워딩까지 성공)

![result 2](/result_2.png)

![Port fowarding](/Port_fowarding.png)

데몬으로 돌렸기 때문에 컨테이너를 제거할 때에는 중지하고 제거해야 함.

```bash
docker stop (컨테이너 이름)
```

### ✨ 명령어 해설 (?)

```bash
docker build --tag hello:0.1 .
```

`docker build` : dockerfile로부터 docker image를 생성하는 command

`--tag` : 만들 이미지의 이름과 태그를 지정. 여기서는 이름이 hello, 태그가 0.1이다.

`.` : Context, 즉 빌드 과정에서 사용할 파일들이 있는 곳, PATH 또는 URL이 들어갈 수 있는데 별 지정이 없으면 . 을 적어준다고 이해했다.

```bash
docker images
docker ps
```

[https://docs.docker.com/engine/reference/commandline/images/](https://docs.docker.com/engine/reference/commandline/images/)

생성되어있는 도커 이미지들을 리스트로 보여주는 command

[https://docs.docker.com/engine/reference/commandline/ps/](https://docs.docker.com/engine/reference/commandline/ps/)

동작중인 컨테이너의 목록 출력

```bash
docker run --name hello_nginx -d -p 80:80 hello:0.1
```

`docker run` : 컨테이너를 생성하고, 실행하는 커맨드

`--name` : 컨테이너의 이름을 지정

`-d` : 컨테이너를 background에서 실행하게 함. Container ID를 출력한다.

`-p` : `<연결하고자 하는 포트>: <container의 포트>` 여기서는 컨테이너의 80번 포트를 호스트의 80번 포트에 연결한 것이다.

```bash
docker stop (컨테이너 이름)
docker rm (컨테이너 이름)
docker rmi (이미지 이름)
```

[https://docs.docker.com/engine/reference/commandline/stop/](https://docs.docker.com/engine/reference/commandline/stop/)

실행중인 컨테이너 멈춤

[https://docs.docker.com/engine/reference/commandline/rm/](https://docs.docker.com/engine/reference/commandline/rm/)

컨테이너 삭제

[https://docs.docker.com/engine/reference/commandline/rmi/](https://docs.docker.com/engine/reference/commandline/rmi/)

이미지 삭제

### ✨ 문제 해결

[Docker container stop 시에 permission denied 에러](https://itdar.tistory.com/372)

## 🌟 TLS 설정 전 이것저것

### ✨ 컨테이너에 접속하기

```bash
# 컨테이너에 직접 들어가기
docker exec -it <container_name or ID> /bin/bash
# 컨테이너에서 나오기
exit
```

### ✨ openssl 설치 직후 폴더 구조

![openssl 설치 직후 폴더 구조](/openssl_directory_structure.png)

ssl 이라는 폴더가 생기기 때문에 따로 Dockerfile에서 폴더를 만들어 줄 필요가 없었음.

### ✨ nginx 설정

#### nginx.conf 와 conf.d

[https://juneyr.dev/nginx-basics](https://juneyr.dev/nginx-basics)

- `nginx.conf` “파일”
    - nginx의 설정이 적혀 있는 핵심 파일.
    - 서버가 커진다면 여기에 모든 설정을 몽땅 적는 것 보다는 다른 conf 파일로 빼서 인클루드 하는 방식으로 구성하는 것이 좋다.
- `conf.d` “폴더”
    - `nginx.conf` 에서 `include`로 불러올 수 있는 conf 파일들을 저장하는 폴더 (처음에는 비어있다.)
    - 이렇게 확장자가 `.conf` 인 모든 파일들을 `nginx.conf` 파일에서 인클루드하기 때문에 `<어쩌고>.conf` 라고 이름만 지어서 `conf.d` 폴더 안에 넣어주면 될 것 같다.
      
        ![nginx.conf](/nginx_conf.png)
