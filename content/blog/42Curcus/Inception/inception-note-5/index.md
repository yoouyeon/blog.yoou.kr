---
title: "MariaDB Container"
date: 2022-11-08 23:09:48
category: 42Curcus/inception
description: "우당탕탕 inception MariaDB 설정"
---

## 🌟 Maria DB ?

[https://ko.wikipedia.org/wiki/MariaDB](https://ko.wikipedia.org/wiki/MariaDB)

오픈소스의 관계형 데이터베이스 관리 시스템. MySQL과 동일한 소스코드를 기반으로 한다.

## 🌟 컨테이너 셋업 (by hand)

1. install mariadb-server, (mariadb-client는 아마도 여기에 설치해야 할 것 같음), vim

    모든(?) DBMS는 server와 client로 나뉘어져 있어서 만들고자 하는 서버의 역할에 따라서 server만, client만(?), 둘 다 설치할 수 있는데 일반적으로는 둘다 설치한다.

    - mariadb-server : 말 그대로 서버
    - mariadb-client : 서버에 쿼리를 날리기 위한 툴 (정도로 생각하자)
2. 50-server.cnf에서 설정 수정 (**`/etc/mysql/mariadb.conf.d/50-server.cnf`)**

    여기서는 외부 접속을 허용할 수 있다. (bind-address 옵션)

    기본적으로는 bind-address 옵션이 살아 있는데 주석처리 해줌으로써 외부 접속을 허용할 수 있다. (지금은 밖의 wordpress에서 접속을 해야 하는데 그 컨테이너 IP를 생성 시점에는 알 수 없기 때문에.. 이렇게 외부에서 접속할 수 있게 하는게 아닐까 생각한다.

3. DB와 USER를 생성한다. ( ⇒ 나중에 dockerfile에서 스크립트로 실행해야 할 듯 하다.)

    ```docker
    # 0. mysql로 들어가기
    mysql
    # 1. mysql 시작
    service mysql start
    # 2. user 생성
    mysql -u root -e "CREATE USER '${MYSQL_USER}'@'%' IDENTIFIED BY '${MYSQL_PASSWORD}';"
    # 3. database 생성
    mysql -u root -e "CREATE DATABASE ${DB_NAME};"
    # 4. 권한 주기
    mysql -u root -e "GRANT ALL PRIVILEGES ON '${DB_NAME}' TO '${MYSQL_USER}'@'%' WITH GRANT OPTION;"
    # 5. root 비밀번호 변경
    mysql -u root -e "ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '${MYSQL_ROOT_PASSWORD}';"
    # 6. 변경 적용
    mysql -u root -e "FLUSH PRIVILEGES;"
    ```

    [https://developer-eun-diary.tistory.com/144](https://developer-eun-diary.tistory.com/144)

    1. mysql 시작
    2. user 생성

        `-u` : 접속할 계정의 이름을 적음 (여기서는 루트계정으로 접속하겠다는 뜻)

        `-e` : 쉘 스크립트에서 mysql 쿼리를 사용할 수 있게 하는 옵션

        `‘USERNAME’’@’’IP’` 이런 형태 ⇒ IP에 %를 넣게 되면 모든 외부 IP에서 접근할 수 있게 된다 (`어쩌구@127.0.%` 이렇게도 가능) (만약에 @ 없이 그냥 user name만 넣는다면 외부에서 접근할 수 없는 유저가 생성된다.)

        [https://linuxkill.tistory.com/4](https://linuxkill.tistory.com/4)

        `IDENTIFIED BY` : password까지 설정한다. (이 부분을 빼면 비밀번호 없는 유저 생성할 수 있음)

    3. DB 생성
    4. 권한 주기

        `GRANT ALL PRIVILEGES ON ‘Database_name’` : ‘Database_name’ 에 대한 모든(ALL) 권한(PRIVILEGES)을 부여한다 (GRANT)

        [https://m.blog.naver.com/wlstncjs1234/221762257613](https://m.blog.naver.com/wlstncjs1234/221762257613)

        `WITH GRANT OPTION` : 이 옵션을 사용하면 `TO` 절의 대상도 자신이 받은 권한을 다른 유저에게 부여할 수 있다. ~~(여기서는 굳이 필요한 옵션인지 잘 모르겠다.)~~ (root 유저를 사용하는 것 보다는 root 유저에 상응하는 유저를 만들어서 사용하는 편이 더 좋기 때문에 `WITH GRANT OPTION` 을 사용하는 것이 좋다.)

    5. root의 비밀번호 변경하기

        그대로 두면 문제가 있다. (당연함)

        [https://dba.stackexchange.com/questions/209514/what-is-mysql-native-password](https://dba.stackexchange.com/questions/209514/what-is-mysql-native-password)

        `IDENTIFIED WITH` : 비밀번호 입력

        `mysql_native_password` : 기본 인증 정책 (인터넷에 보이는 거의 대부분의 변경 방법에는 인증을 하게 하는데, 왜인지 여기선 없어도 변경이 된다.)

    6. 변경 내용 적용

        `FLUSH PRIVILEGES` : 명령어 사용 뒤에 적용

![MySQL](/mysql_practice.png)

문제는 잘 된건지 확인할 방법이 (아직은) 없음;;

## 🌟 컨테이너 셋업 (by dockerfile)

(22.11.10 추가)

### ✨ 알고 있는 대로 짜 보기

1. 데비안 / 알파인

    데비안을 기본으로 하려고 했는데 알파인쪽이 더 레퍼런스도 많고 빌드 속도도 빠르다는 이야기를 들어서 알파인도 고려를 해 보기로 했다.

    ```docker
    # FROM alpine:3.15
    FROM debian:buster
    ```
2. mariadb-server, mariadb-client를 설치한다.

    [https://wiki.alpinelinux.org/wiki/MariaDB#Installation](https://wiki.alpinelinux.org/wiki/MariaDB#Installation)

    ```docker
    # RUN apk update
    # RUN apk upgrade
    # RUN apk add mariadb mariadb-client

    RUN apt-get update
    RUN apt-get -y upgrade
    RUN apt-get install -y mariadb-server mariadb-client
    ```

3. mariadb에 외부 접속이 가능하도록 bind-address 부분을 주석처리 한다.

    NGINX때 처럼 설정파일을 미리 작성해두었다가 복사하는 방법도 있고, sed 명령을 사용해서 한 줄씩 변경하는 방법도 있는데, 여기서는 한줄만 간단히 바꾸어주면 되기 때문에 sed 명령을 사용하기로 했다.

    ```docker
    # RUN sed -i 's/bind-address/#bind-address/g' /etc/my.cnf.d/mariadb-server.cnf
    RUN sed -i 's/bind-address/#bind-address/g' /etc/mysql/mariadb.conf.d/50-server.cnf
    ```

4. wordpress에서 사용할 DB와 User를 만든다.

    앞서서 직접 할 때는 그냥 쉘 스크립트를 써서 동작시키게 하려고 했었는데 그냥 sql문을 작성해서 직접 리다이렉트로 입력해주는 방법이 더 간단할 것 같아 그 방법으로 해 주었다.

    ```docker
    RUN service mysql start && mysql < create_db.sql
    ```

5. 3306 포트 열어주기

    ```docker
    EXPOSE 3306
    ```

6. 마지막 CMD..? 는 잘 모르겠어서 아래에서 공부해보았다.

### ✨ 리눅스에서 mysql을 구동하는 명령어

[https://jjongwoo.tistory.com/29](https://jjongwoo.tistory.com/29)

[https://yaruki0318.tistory.com/entry/mysqld와-mysqldsafe의-관계](https://yaruki0318.tistory.com/entry/mysqld%EC%99%80-mysqldsafe%EC%9D%98-%EA%B4%80%EA%B3%84)

- **`mysqld`** : Mysql + Daemon, 백그라운드에서 돌아가고 있는 프로세스, `Mysql` 서버 그 자체
- **`mysql`** : 우분투의 터미널처럼 sql문을 실행시켜주는 (DB를 다룰 수 있게 하는) 커맨드라인 클라이언트
- **`mysqld_safe`** : `mysqld`를 안전하게 실행하기. `mysqld`를 감시하는 데몬이다. 이 데몬을 실행하면, 내부에서 `mysqld`를 실행한다. 어떤 문제가 발생하여 `mysqld`가 구동을 중지하면 `mysqld_safe`에서 다시 `mysqld`를 실행하는 등의 보다 안정적인 실행을 지원하는 것 같다.
`mysqld`로 직접 실행하는 것 보다는 `mysqld_safe`를 통해서 실행하는 것을 권장한다고 함.

### ✨ 잘 설정되었는지 확인해보기

저번에는 어떻게 하는지 몰랐었는데 원격으로 접속할 수 있는 옵션이 있었다.

[https://velog.io/@latte_h/Docker에서-Mariadb-설치](https://velog.io/@latte_h/Docker%EC%97%90%EC%84%9C-Mariadb-%EC%84%A4%EC%B9%98)

```shell
mysql -u (user이름) -p -h (ip address) -P (Port number) (DB 이름)
```

![mariadb_test](/mariadb_test.png)

감격스럽다.
