---
title: "Hexo로 블로그 만들기"
date: 2021-11-09 12:59:28
category: Blog
description: "Hexo로 Github 블로그 만들기"
---

Github 블로그로 옮긴지는 오래 되었지만... 이번에 블로그를 정리한 김에 시작부터 차근차근 정리해보려고 합니다.

## 🚀 Hexo

Github 블로그를 만들기 위해서 사용하는 프레임워크는 Hexo 말고도 Jekyll, Hugo 등 여러가지가 있다. 하지만 내가 Hexo를 선택한 이유는 무엇보다도 Jekyll의 Ruby, Hugo의 Go 보다는 Hexo의 JS에 더 익숙했기 때문이다. 각각의 장점이 있으므로 이것저것 체험해 보고 잘 맞는 도구를 사용하는게 좋을 것 같다.

## 🚀 Hexo 설치하기

Hexo를 설치하기 위해서는 Node.js와 Git이 설치되어 있어야 한다. (설치 링크 : [Node.js](https://nodejs.org/en/), [Git](https://git-scm.com/)) 설치를 완료하면 비로소 Hexo를 설치할 수 있다.

```shell
npm install -g hexo-cli
```
다음으로는 hexo 블로그가 될 폴더를 초기화 해주어야 한다.
```shell
hexo init 블로그폴더이름
cd 블로그폴더이름
npm install
```
이렇게 하면 블로그 폴더 내부에 여러가지 파일들이 생성되는데 자주 사용한 것들을 정리하면 다음과 같다.
```
.
├── _config.yml     : 사이트 전반적인 설정 파일
├── scaffolds       : post의 기본 형태(템플릿)를 설정할 수 있다. 내부 파일을 원하는대로 바꿔주면 된다.
├── source          : post와 같은 사이트 콘텐츠들이 있는 폴더
├── themes          : 테마 폴더
```
이후에 설명하겠지만 원격서버를 돌려서 설치가 잘 되었는지 확인해 볼 수 있다.
```shell
hexo s
```
## 🚀 Github page와 연결하기
연결하기 위해서는 사이트와 연결할 새로운 repository를 만들어줘야 한다.</br>
해당 내용은 다른 곳에도 많이 정리되어 있기도 하고, [공식문서](https://docs.github.com/en/pages)에 아주 자세히 설명되어 있기 때문에 따로 정리하지는 않았다. 설명을 따라서 사이트와 연결할 수 있는 repository를 준비한다.

다음으로는 hexo-deployer-git을 설치해준다.
```shell
npm install hexo-deployer-git --save
```
그 다음 `_config.yml` 파일에서 아래의 내용으로 수정해준다.
```yaml
# Deployment
## Docs: https://hexo.io/docs/one-command-deployment
deploy:
  type: git
  repo: https://github.com/yoouyeon/yoouyeon.github.io
  branch: master
```
이때 repo에는 .git으로 끝나는 url이 아닌 주소창에 보이는 그 url을 넣어줘야함에 주의한다.

그리고 정적파일을 생성한 뒤에, deploy하면 블로그 배포가 완료된다.
```shell
hexo d -g
```
## 🚀 자주 쓰이는 명령어 정리하기
### ✨ post 생성
```shell
hexo new "new post title"
```
포스트 제목에 띄어쓰기가 없는 경우에는 따옴표로 묶어줄 필요 없지만, 띄어쓰기가 있는 경우에는 **반드시** 따옴표로 묶어주어야 공백 부분이 `-`로 대체된 제목의 파일이 생성된다.
### ✨ 로컬 서버 구동
```shell
hexo server
(또는)
hexo s
```
post를 수정하거나 테마를 바꾸는 등의 변경사항이 있을 경우에 로컬 서버에서 돌려본 후에 배포하는 것이 좋다.

서버를 구동한 뒤에 파일을 수정하면 즉시 그 결과가 반영되어 확인할 수 있다.

### ✨ 정적 파일 생성
```shell
hexo generate
(또는)
hexo g
```
### ✨ 배포
```shell
hexo deploy
(또는)
hexo d
```
보통은 정적파일 생성 후에 배포를 하므로 `-g (-generate)` 옵션을 넣어주면 정적파일 생성과 배포를 한번에 할 수 있다.
```shell
hexo d -g
```