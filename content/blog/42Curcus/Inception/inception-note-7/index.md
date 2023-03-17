---
title: "docker compose로 MariaDB 설정하고 Wordpress CLI 알아보기"
date:  2022-12-12 04:33:57
category: 42Curcus/inception
description: "우당탕탕 inception docker compose 써보기"
---

## 🌟 요약

이번에도 일단 다 쓰면서 정리했기 때문에 한 문단에서도 입장이 바뀌는.. 경우가 허다합니다….

그래서 다 적고 쓴 요약을 제일 위에 올립니다~!

### ✨ 어제 검색해보기로 한 MariaDB 관련 키워드들

- `mysql_install_db` : MySQL 데이터 디렉토리를 초기화하는 Perl 스크립트. 인증 방식이나 데이터 디렉토리 경로 등을 다양한 옵션을 가지고 설정할 수 있는데, MySQL 5.7 버전부터는 mysqld에 종속되어서 더 이상 지원하지 않는다. 현재 지원되는 가장 오래된 MariaDB 버전이 MySQL 5.7과 호환되므로 이건 쓰지 않는게 좋겠다 판단했다.

- `mysqladmin` : 관리자가 할 수 있는 설정들을 편하게 할 수 있게 해주는 유틸리티이다. 인셉션에서는 mysqld 데몬을 종료시키거나, 데몬의 상태 (꺼졌는지? 켜졌는지?)를 알아내는 목적으로 사용되는 것 같은데, 필요성에 대해서는 좀 더 찾아봐야 한다.

  ```bash
  mysqladmin -u$MYSQL_ROOT -p$MYSQL_ROOT_PASSWORD shutdown;
  ```

### ✨ docker compose와 환경변수

기본적으로 동일한 경로에 있는 .env 파일의 값을 환경변수로 사용한다.

만약에 다른 환경변수 파일을 사용하고 싶다면 docker compose up 명령 시에 `--env-file` 옵션으로 파일의 경로를 지정해 줄 수 있다.

각각의 서비스에서 다른 환경변수를 사용하고 싶다면 크게 두가지 방법이 있다.

1. `environment:` 필드에서 환경변수 하나하나 값을 지정해준다. 이 때 환경변수의 값으로는 .env 파일에 있는 값을 사용할 수 있다.
2. `env_file:` 필드에서 이 서비스에서 사용할 환경변수 목록 파일을 설정해준다.

나는 `env_file:` 필드에다 동일하게 .env 파일을 넣어주는 방식을 사용했다.

### ✨ WP-CLI

Wordpress 설정을 커맨드라인으로 할 수 있게 해 주는 툴이다.

WP-CLI 파일을 curl로 받아오기 때문에 curl을 무조건 설치해줘야 한다. (wget도 가능!)

[여기](https://www.lesstif.com/system-admin/wordpress-command-line-wp-cli-128122908.html) 에선 PHP도 설치되어야 한다고 하는데 이유를 잘 모르겠어서 일단 패스. 근데 생각해보니까 요구사항때문에 어차피 php를 설치해야 하네요;

### ✨ to do

- wp로 wordpress 설치하고 요구사항대로 설정하기
  - https://www.lesstif.com/system-admin/wp-cli-22643947.html
  - https://developer.wordpress.org/cli/commands/core/
  - https://developer.wordpress.org/cli/commands/user/create/
- docker network 설정하기
- (가능하다면?) volume에 대해서 알아보기

힘내자!

## 🌟 어제 궁금했던 MariaDB 관련 키워드들 공부해보기

### ✨ mysql_install_db

https://mariadb.com/kb/en/mysql_install_db/

https://dev.mysql.com/doc/refman/5.6/en/mysql-install-db.html (이쪽이 더 설명이 잘 읽힘)

MySQL 데이터 디렉토리를 초기화 하는 스크립트 (Perl 스크립트라고 함. 확인해보니 데비안엔 Perl이 기본적으로 설치되어 있기 때문에 별다른 설정 없이 사용할 수 있을 것 같다.)

보다 더 안전하게 데이터 테이블을 만들 수 있는 것 같다.

- `--auth-root-authentication-method` : 인증 방식(?)이 unix_socket으로 변경되었다고 함. 그래서 기존 암호 인증 방식으로 설정하고 싶다면 이 옵션의 값을 normal로 지정해줘야 하는 것 같다.
- `--basedir` : MariaDB 설치 디렉토리의 경로
- `--datadir` : 데이터 디렉토리 경로를 설정할 수 있음.
- 등등 다른 옵션들이 많은데 아래의 내용을 봐버려서 공부 중단 ㅎㅎ

(MySQL과 MariaDB의 관계성에 대하여 : https://heewon26.tistory.com/69)

`mysql_install_db` 는 MySQL 5.7.6 버전부터 deprecated 라고 한다. (상단 두번째 문서 참고) 해당 기능은 `mysqld`로 종속되었다고 함.

`apt-get` 으로 설치한 MariaDB의 버전이 10.3.x 버전인데 이게 아마 지원하는 가장 옛날 버전으로 알고 있다. 근데 이 10.3 버전이 MySQL 5.7 과 호환되는 버전이라고 하므로… 어쨌든 `mysql_install_db` 는 사용하지 않는 쪽이 좋다고 판단해서 공부는 여기서 끝.

(`mysqld`로 `mysql_install_db` 대체하기 참고 : https://futurecreator.github.io/2018/08/01/installation-mysql-5-7-binary-tar-gz/) 나는 `mysql_install_db`가 우리 과제에 필요한지 아직은 잘 모르겠어서 일단 링크만 남겨둔다.

### ✨ mysqladmin

https://dev.mysql.com/doc/refman/8.0/en/mysqladmin.html

예상은 했지만… **A MySQL Server Administration Program**

관리자가 할 수 있는 작업들을 편하게 할 수 있도록 해 주는 유틸리티인 것 같다.

인셉션에서는 mysqld를 중단시키는데 사용한다던가, MariaDB 데몬이 살아있는지 확인하는데 사용하는 것 같다.

사실 데몬이 살아있는지 여부는 확인을 해 줄 필요성을 잘 모르겠어서 (아닐지도,,, 내가 무지한것일지도,,,,) mysqld를 중지시키는 방법만 보기로 했다.

```bash
mysqladmin -u $MYSQL_ROOT -p shutdown;
```

근데 또 생각해보니까 어차피 마지막에 `mysqld_safe` 로 다시 데몬을 실행시켜주는데 왜 다시 끄지? 근데 또 생각해보니까 왜 예전엔 끄지도 않고 다시 실행했었지? ㅋㅋ 생각하면 할수록 허접하다. 나중에 여쭤보기로 하고 일단 오늘은 마무리…

### ✨ 참고

https://velog.io/@chez_bono/Inception

https://bigpel66.oopy.io/library/42/inner-circle/20

## 🌟 MariaDB docker-compose.yml에서 설정하기

(사실 거의 다 해놔서 저번 시도에서 놓쳤던 것들만 정리함….) ← 지금까지의 내용으로 봐서는 다 해놨다는 건 별로 신빙성이 없음.

### ✨ ports 와 expose

ports와 expose는 둘다 컨테이너의 포트를 오픈해주는것이지만 (실제로 여는것과는 개념이 다름!) expose는 컨테이너들 사이에서만 사용할 수 있는 포트라면 ports는 컨테이너 밖의 외부 호스트에서도 접근할 수 있다.

이 과제를 예로 들면 nginx의 포트는 실제 외부에서 접근을 해 줘야 하기 때문에 ports로 열었다면, wordpress나 mariadb 컨테이너의 포트는 컨테이너 사이에서만 사용되기 때문에 expose로 열어주게 된다.

### ✨ 무한재시작…

nginx는 멀쩡한데 자꾸 mariadb 컨테이너가 무한 재시작을 했다.

무한 재시작 자체에 뭔가 문제가 있는 줄 알고 좀 헤맸는데 생각해보니까 예상치 못한 종료를 막기 위해서 mysqld_safe를 사용하기도 했고 restart always 옵션도 넣어뒀기 때문에.. 당연한 것이었다.

아무튼 재시작 자체에는 문제가 없었고 내 경우에는 sql 문법 오류… 때문이었다. 🫠

### ✨ 환경변수 지정해주기

https://docs.docker.com/compose/environment-variables/

https://seongjin.me/environment-variables-in-docker-compose/

nginx와는 달리 mariadb 컨테이너에서는 환경변수를 찾아 사용해야 한다.

위의 무한 재시작 문제를 해결하려고 하다가 알게 된 것이긴 하지만 (실제로 이 내용을 뺐을 때 문제가 발생하는지는 확인해보지 않았음) 이렇게 명시를 해 주는 쪽이 더 안전하기 때문에 그대로 넣어 주었다.

서브젝트에서는 .env 파일을 docker-compose.yml 파일과 동일한 폴더에 넣어주었다. compose 파일에서는 일단 .env 파일을 찾아서 그 내용을 바탕으로 환경변수를 사용하기 때문에 compose 파일에서 사용할 환경변수는 .env 파일에 적어주면 알아서 적용이 된다.

만약에 다른 경로의 파일을 사용해야 할 때에는 docker compose 명령의 `--env-file` 옵션으로 그 경로를 지정해주면 된다.

각각의 컨테이너에서 다른 환경변수를 사용해야 하는 경우가 있을 수 있다.

이 경우에는 `environment:` 필드에다 하나하나 값을 지정해주거나 (이 값을 지정할 때 .env 파일의 값을 사용할 수 있다.) 아니면 `env_file:` 필드에 그 파일을 지정해 줄 수 있다.

나는 `env_file:` 필드에 .env 파일을 지정해주는 방식을 사용했다.

## 🌟 Wordpress 설치 - Wordpress CLI

원격접속 잘 되고 막 꺼지거나 하지 않기 때문에 일단은 잘 되었다고 생각하고 Wordpress를 설정해보기로 했다. (볼륨 설정 하나도 안했으니 나중에 추가해줘야함!!!)

https://pyrasis.com/book/DockerForTheReallyImpatient/Chapter16/01

언뜻 봤을 때에는 설치해야 하는 패키지들이 엄청 많았던 것 같아서 상호관계들을 좀 유의해서 봐야겠다.

### ✨ Wordpress CLI 설치

https://wp-cli.org/

워드프레스를 커맨드라인으로 설정할 수 있는 툴이다. 유저추가… 등등 을 원래라면 접속해서 뜨는 유저설정(?) 페이지에서 일일이 추가해줘야 하는데 WP-CLI를 사용하면 커맨드라인으로 슈슈슉 편하게 설정할 수 있다~!

1. curl을 사용해서 다운로드해준다 → **`curl`을 설치해줘야 한다!**

   ```bash
   curl -O https://raw.githubusercontent.com/wp-cli/builds/gh-pages/phar/wp-cli.phar
   ```

2. wp 파일을 실행가능하게 권한을 설정해준다.

   ```bash
   chmod +x wp-cli.phar
   # 가이드에는 sudo로 실행했는데 컨테이너상에선 루트사용자로 동작하고있기 때문에 굳이 필요 없음
   mv wp-cli.phar /usr/local/bin/wp
   ```

### ✨ Wordpress CLI 실행

… to be continue …
