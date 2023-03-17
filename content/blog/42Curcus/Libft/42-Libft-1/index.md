---
title: "[Libft] part.1"
date: 2021-05-11 12:30:52
category: 42Curcus/Libft
description: "My first own library"
---

Libc의 함수들을 포함해서 앞으로 본과정에서 유용하게 쓰일 함수들이 담긴 C라이브러리를 직접 만드는 과제이다.
이 과제를 하면서 조사하고 생각했던 것들을 정리해보았다.

## 🚀 ft_memset
```c
#include <strings.h>
void *memset(void *b, int c, size_t len);
```
**b주소에서부터 len바이트만큼을 c라는 값으로 초기화한다.**

[코드](https://github.com/yoouyeon/42Cursus/blob/main/Libft/ft_memset.c)

### ✨ 구현 시 고려사항
- **int 형 parameter c는 내부에서 unsigned char로 변환된다. (매뉴얼 내용)**

- **b는 void형 pointer이기 때문에 접근 할 때에 unsigned char로 형변환 해준 뒤에 접근해야 한다.**

	char도 1바이트이고, unsigned char도 1바이트인데 왜 메모리를 접근하는 함수에서는 대부분(거의 다?) void\*를 unsigned char\*로 캐스팅하는지 궁금했는데 이유가 그나마 구체적으로 설명되어있는 글이 있었다. [(참고)](https://kldp.org/node/75686)
  
  간단히 정리하면 내부의 비트를 투명하게 볼 수 있어 좀 더 활용도(?)가 높은 unsigned char의 특성과, signed로 인해서 발생할 수 있는 여러가지 문제들(범위를 벗어난다거나, signed bit로 인해 표현할 수 있는 숫자들의 수가 줄어든다거나..) 등등으로 인해서 메모리 접근을 위해서는 unsigned char 형 포인터를 사용하는 것이 거의 관례적으로 굳어졌다는 것 같다...
  
  그럼 왜 void*로 함수 프로토타입을 만들어 둔 것이냐 하면 확장성을 위해서!
  
- **size_t**

	size_t는 ~~일반적으로는 unsigned int라고 정의되어 있다지만 확실하게 unsigned int라고도 할 수는 없는 것 같다.~~(`size_t == unsigned int` 가 항상 성립하면 굳이 unsigned int 를 사용할 필요가 없으니까...) (6/30 추가: 클러스터 환경에서 size_t가 unsigned long long임을 확인했다. size_t를 int라고 무작정 확신할 수 없는 이유가 생김.)
  
  시스템마다 미묘하게 다른 메모리 공간의 크기를 정의하가 위해서 size_t라는 자료형을 만든 것 같다.
  
  size_t는 <sys/types.h>헤더에 정의되어있다고 하는데 이 헤더는 과제에서 사용되는  <unistd.h>나 <stdlib.h>에서도 인클루드되어있는 헤더이므로 굳이 다시 인클루드 해줄 필요는 없다고 생각한다. [(참고)](https://seoulforest.tistory.com/entry/sizet-%ED%83%80%EC%9E%85%EC%9D%98-%EC%9D%B4%ED%95%B4)
  
- **not-protected**

  `NULL`입력을 별도로 처리해 줄 필요 없다.

## 🚀 ft_bzero
```c
#include <strings.h>
void bzero(void *s, size_t n);
```
s주소에서부터 n바이트 만큼을 0으로 초기화한다.
`memset`과 기능이 거의 유사해서인지 이제는 거의 사용하지 않는 함수라고 한다.
`memset(s, 0, n)`이랑 결과가 같다.

[코드](https://github.com/yoouyeon/42Cursus/blob/main/Libft/ft_bzero.c)

## 🚀 ft_memcpy
```c
#include <string.h>
void *memcpy(void *dst, const void *src, size_t n);
```
**src주소로부터 n개의 바이트를 dst주소에 복사한다.**
`strcpy` 함수와 비슷하다는 느낌이 들었는데 `memcpy`의 다른 점은 `'\0'`을 확인하지 않고 무조건 n바이트를 복사한다는 점이다.

[코드](https://github.com/yoouyeon/42Cursus/blob/main/Libft/ft_memcpy.c)

### ✨ 구현 시 고려사항
memory overlap이 있는 경우에는 정의되지 않은 행동을 한다고 한다. (매뉴얼 참고)
이 정의되지 않은 행동이라는 것이 되게 신경쓰였는데 동료들과 상의해 본 결과 정의되지 않은 행동 (undefined behavior)라는 것을 이 상황에 대해서 이 함수가 할 행동에 대해서 책임지지 않겠다는 뜻이라고 해석했다.
그래서 memory overlap 상황을 신경쓰지 않고 그냥 무조건 n바이트 복사하는 것으로 구현했다.
memory overlap에 대해서는 다른 함수(`memmove`)에서 자세히 적으려 한다.

## 🚀 ft_memccpy
```c
#include <string.h>
void *memccpy(void *dst, const void *src, int c, size_t n);
```
**src의 주소에서 dst주소로 바이트 단위로 복사하는데 src에서 문자 c를 만날때까지 복사한다.
만약 c를 만나지 못한다면 n바이트만큼을 복사한다.**

[코드](https://github.com/yoouyeon/42Cursus/blob/main/Libft/ft_memccpy.c)

### ✨ 구현 시 고려사항
- **반환 값**
  - src에서부터 n바이트 안에 c가 있을 경우 => dst에서 c다음 주소를 반환한다.
  - src에서부터 n바이트 안에 c가 없을 경우 => `NULL`을 반환한다.

## 🚀 ft_memmove
```c
#include <string.h>
void *memmove(void *dst, const void *src, size_t len);
```
**`memcpy`와 비슷하게 src의 n바이트를 dst에 복사한다.**
`memcpy`와의 차이점은 `memmove`에서는 dst와 src의 메모리공간이 overlap되는 경우도 고려해서 항상 non-destructive manner로 복사를 한다는 것이다.

[코드](https://github.com/yoouyeon/42Cursus/blob/main/Libft/ft_memmove.c)

### ✨ 구현 시 고려사항
- **memory overlap?**

  dst가 src보다 뒤에 있는 경우에 흔히 하는 방법대로 src의 첫 부분부터 복사를 하게되면 dst의 첫 부분과 src의 뒷 부분이 겹쳐져서(overlap) src의 뒷 부분이 손상될 가능성이 있다.

- **non destructive manner**

  src의 뒷부분이 손상될 가능성이 있는 경우(src < dst)에도 문제없이 dst에 원래 있는 src의 내용들을 그대로 복사하려면 dst의 뒷부분에서부터 복사를 하면 dst의 위치와 상관없이 그대로 복사할 수 있다.

- **`NULL` 이 입력으로 들어왔을 때의 처리 방식**

  원본 `memmove` 함수에서 `NULL` 입력을 처리하는 것을 관찰하던 중에 dst와 src가 모두 `NULL`인 경우에는 `NULL`을 반환하고, 그 외에 둘 중 하나만 `NULL`인 경우에는 segmentation fault가 났다. 

  어떤 이유로 둘 다 `NULL`일 경우에만 처리해줬는지 궁금했는데 함수 내에서는 별도로 `NULL` 입력에 대한 처리를 해 주지 않았지만 예외 처리 1번을 처리하면서 동시에 둘다 `NULL`일 경우가 걸러진 것이 아닌가... 하는 생각이 들었다.

### ✨ 예외 처리
1. `dst == src`인 경우
	=> src나 dst나 똑같으니까 복사하지 않고 `return (dst);`
2. `len == 0` 인 경우
	=> dst에 복사할 byte가 없으니까 복사하지 않고 `return (dst);`

<details>
  <summary>개인적 삽질 + 앞으로 남은 42과제 해결에 있어서 깨달은 점</summary>
  <div markdown="1">
  과제에 도움이 되는 여러 테스터를 돌리던 중 이상하게 다른 테스터에서는 통과가 되었는데 unit-test라는 테스터에서만 한 케이스가 자꾸 crush가 났다.  memory range를 오버했다는 에러였는데 아무리 봐도 이상한 부분이 없어서 환장하다 기절 직전까지 갔을 때에 슬랙에서 같은 에러로 고통받으신 분의 스레드를 발견했다.  결론은 M1의 저주였다...(정확한 원인은 모르겠음) M1을 사용하는 분들에게 공통적으로 같은 테스터에서 같은 오류가 발생했었고, 과제 제출시에는 문제가 없었다고 한다...하하  구글링에는 한계가 있으니 42 과제를 하다가 모르는 점이 생기면 슬랙에 검색해보자! 특히 뒷 기수들은 앞 기수의 선배님들이 이런저런 오류들을 몸소 겪으며 슬랙에 기록을 해 두었기 때문에.. 나처럼 너무 늦게 찾아보지 말고 과제에 문제가 생겼다 하면 일단 슬랙을 검색하자... (허름)
</details>



## 🚀 ft_memchr
```c
#include <string.h>
void *memchr(const void *s, int c, size_t n);
```
**s배열의 n bytes 내에서 가장 첫번째로 등장하는 c문자를 가리키는 포인터를 반환한다.
만약 s배열의 n bytes 내에 c문자가 없으면 `NULL`을 반환한다.**

[코드](https://github.com/yoouyeon/42Cursus/blob/main/Libft/ft_memchr.c)

### ✨ 구현 시 고려사항

- **`NULL`입력에 대한 처리**
  - `n == 0` 인 경우에는 `NULL` 반환
  - 그 외에 s가 `NULL`인 경우에는 segmentatioin fault 발생

## 🚀 ft_memcmp
```c
#include <string.h>
int memcmp(const void *s1, const void *s2, size_t n);
```
**s1주소로부터 n바이트와 s2주소로부터 n바이트를 비교한다.**

[코드](https://github.com/yoouyeon/42Cursus/blob/main/Libft/ft_memcmp.c)

### ✨ 구현 시 고려사항
- **두 배열의 길이는 n bytes인 것으로 간주한다.**

  n bytes 이상이어야 한다는 것인지, 아니면 딱 n bytes여야 한다는 것인지 잘 모르겠다.

  하지만 두 배열 모두 n bytes 미만이면 안된다는 것은 확실함. (매뉴얼 원문: Both strings are assumed to be n bytes long.)
  오버플로우 상관 없이 무조건 n바이트를 비교한다.

- **반환값**

	- 두 배열이 같은 경우에는 0을 반환한다.
	- 두 배열이 다를 경우에는 첫번째로 다른 byte의 차이를 반환한다. (s1 - s2) => 이 때 연산은 unsigned char로 이루어져야 한다. \200과 \0을 비교하면 양수가 나와야 함.
	- 길이가 0인 배열은 항상 같다. => n이 0일 경우에는 항상 0을 반환한다.
	
- **`NULL` 입력에 관한 처리**

  두 배열 중 하나라도 `NULL`인 경우에는 segmentation fault를 발생시킨다.

## 🚀 ft_strlen
```c
#include <string.h>
size_t strlen(const char *s);
```
`NULL`문자 앞에 있는 문자의 개수를 반환한다. => 배열의 길이를 반환.

[코드](https://github.com/yoouyeon/42Cursus/blob/main/Libft/ft_strlen.c)

## 🚀 ft_strlcpy
```c
#include <string.h>
size_t strlcpy(char *dst, const char *src, size_t dstsize);
```
**src배열의 내용 중 dstsize - 1개의 문자를 dst에 복사한다. (1바이트는 '\0' 자리.)**
`dstsize`가 0이 아닌 경우에는 '\0'로 마무리를 한다.
src의 길이를 반환한다.

[코드](https://github.com/yoouyeon/42Cursus/blob/main/Libft/ft_strlcpy.c)

### ✨ 구현 시 고려사항

1. **protected? not protected?**

   **protected function**이란 `NULL` 포인터의 입력이 들어왔을 때 함수 내부에서 `NULL`을 반환한다던가 해서 오류를 처리하는 함수

   **not protected function**이란 `NULL` 포인터의 입력이 들어왔을 때를 고려하지 않고 구현된 함수. 대부분의 경우(모든 경우라고는 내가 잘 몰라서 할 수가 없겠다.) 세그멘테이션 폴트로 함수 실행이 종료된다.

   프로텍트 여부에 대해서 동료들 사이에서도 의견이 분분했던 것 같은데 일단 원 함수인 `strlcpy`에서도 `NULL` 포인터가 입력되었을 때 세그폴트를 발생시켰기 때문에(not protected) `ft_strlcpy`를 not protected function으로 구현했다.


### ✨ 예외 처리
1. `src == NULL || dst == NULL`인 경우 Segmentation fault 발생시킴
2. `dstsize == 0` => 복사는 진행하지 않고 그냥 src의 길이만 반환한다.

## 🚀 ft_strlcat
```c
#include <string.h>
size_t strlcat(char *dst, const char *src, size_t dstsize);
```
**dst의 끝('\0'문자 자리)에서부터 src의 문자들을 붙인다.**

작업이 완료된 후의 문자열의 길이가 최대 dstsize - 1이 되어야 한다 (1바이트는 '\0'자리)'

[코드](https://github.com/yoouyeon/42Cursus/blob/main/Libft/ft_strlcat.c)

### ✨ 구현 시 고려사항

- dstsize의 의미

  dstsize = dstlen + 붙이려는 글자 수 + 1

- 가능한 경우와 그 상황에서의 동작

  - dstlen >= dstsize
    - 복사하지 않는다.
    - `return (dstsize + srclen);`
  - srclen < dstsize - dstlen
    - 붙이려는 글자 수가 srclen보다 큰 경우
    - src 전체(`NULL`문자 까지)를 dst 뒤에 이어붙인다. (with `memcpy`)
  - srclen >= dstsize - dstlen
    - 붙이려는 글자 수가 srclen과 같거나 큰 경우
    - 길이가 같은 경우가 포함되는 이유는..  `NULL`문자 자리를 포함해줘야 하기 때문이다.
    - `srclen`의 (dstsize - dstlen - 1)개 문자를 dst에 붙인 다음, 잊지 말고 `NULL` 종료를 해 준다.

- 반환값의 경우

  - 복사를 안하는 경우 (dstlen <= dstsize)

    => `return (dstsize + srclen);`

  - 복사를 하는 경우

    => `return (dstlen + srclen);`

## 🚀 ft_strchr

```c
#include <string.h>
char *strchr(const char *s, int c);
```
**s문자열에서 c문자(converted to a char)의 포인터를 반환한다.
만약 찾는 문자가 없다면 `NULL` 포인터를 반환한다.**

[코드](https://github.com/yoouyeon/42Cursus/blob/main/Libft/ft_strchr.c)

### ✨ 구현 시 고려사항
- c에는 0이 들어갈수도 있음. `NULL`문자 포함해서 탐색해야 한다.
- 이전까지는 c를 unsigned char로 형변환했었는데 이번에는 char로 형변환 하는것에 주의하기.

## 🚀 ft_strrchr
```c
#include <string.h>
char *strrchr(const char *s, int c);
```
**문자열 s에서 가장 마지막에 있는 c문자의 포인터를 반환한다.
만약 찾는 문자가 없다면 `NULL` 포인터를 반환한다.**

[코드](https://github.com/yoouyeon/42Cursus/blob/main/Libft/ft_strrchr.c)

### ✨ 구현 시 고려사항
- strchr와 마찬가지로 문자열에 '\0'까지 포함한다.

## 🚀 ft_strnstr
```c
#include <string.h>
char *strnstr(const char *haystack, const char *needle, size_t len);
```
**haystack에서 n바이트만큼을 탐색하면서 포함된 needle문자열의 시작 포인터를 반환한다.**
만약 일치하는 문자열이 없으면 `NULL`을 반환한다.

[코드](https://github.com/yoouyeon/42Cursus/blob/main/Libft/ft_strnstr.c)

### ✨ 구현 시 고려사항
- needle의 마지막 '\0'문자는 검색하지 않는다. (매뉴얼) (haystack 중간에 '\0'이 있을 수는 없으니까.)

- 입력에 따른 결과

  - needle이 `NULL`인 경우에는 segfault를 발생시킨다.

  - needle이 빈 문자열일 경우에는 haystack과 상관없이 haystack을 반환한다.

    (haystack이 `NULL`이면 `NULL`반환, 유효한 문자열이면 그 문자열 반환)

  - len = 0이면 `NULL` 반환

  - 그 외의 정상적이지 않은 입력에는 오류를 낸다.

## 🚀 ft_strncmp
```c
#include <string.h>
int strncmp(const char *s1, const char *s2, size_t n);
```
**문자열 s1과 s2에서 최대 n바이트만큼을 비교한다.
이 함수는 binary data를 비교하는 것 보다는 string을 비교하는데에 중점을 두기 때문에 '\0' character 이상으로는 비교하지 않는다는 점이 memcmp와 다른 점이다.**

[코드](https://github.com/yoouyeon/42Cursus/blob/main/Libft/ft_strncmp.c)

### ✨ 구현 시 고려사항
- **반환값**
	매뉴얼에 따르면
    - s1이 s2보다 클 경우에는 0보다 큰 정수
    - s1과 s2가 같을 경우에는 0
    - s1이 s2보다 작을 경우에는 0보다 작은 정수
  
  를 반환한다.
- **비교는 unsigned char를 이용하여 한다.**
	=> '\200'이 '\0'보다 크다.

## 🚀 ft_atoi
```c
#include <stdlib.h>
int	atoi(const char *str);
```
**ascii to int**

[코드](https://github.com/yoouyeon/42Cursus/blob/main/Libft/ft_atoi.c)

### ✨ 구현 시 고려사항
- **변환 과정** (이 순서로 입력되지 않으면 정상적으로 변환하지 않는다.)
	
  1. 공백 건너뛰기 (공백: 아스키코드 9~13번, ' ')
  
    2. 부호 결정하기 (- 등장하면 부호 변환하기)
  
       피신때의 과제와 다른 점은 실제 atoi에서는 +든, -든 부호를 하나만 허용한다는 점이다. 
  
       만약 부호가 2개 이상 등장한다면 0을 반환해야 한다.
  
    3. 문자열이 끝나기 전까지, 숫자가 아닌 문자가 나오기 전까지의 문자들을 정수로 변환한다.

- int 범위의 최솟값의 절댓값이 int 범위의 최댓값보다 크기 때문에 변환할 숫자를 담을 변수를 int로 두면 int 범위 최솟값을 변환할 때에 문제가 생긴다.
  나는 절댓값을 unsigned int에 저장하도록 했다.

- int 범위 밖의 수에 대한 처리 ()

  - int min 미만일 경우 `atoi`는 ~~0을 반환한다.~~
  - int max 초과일 경우 `atoi`는 ~~-1을 반환한다.~~
  
  int 범위 밖의 수에 대해서는 좀 더 고민을 해 봐야 한다. 너무 크게 범위를 벗어나는 수 말고 적당히 범위를 넘어가는 수로 테스트해보면 어떤 식으로 처리해야 할 지 알 수 있을 것이다.

## 🚀 ft_isalpha
```c
#include <ctype.h>
int isalpha(int c);
```
**c(unsigned char로 변환)가 알파벳인지 확인한다.**
c가 알파벳이 아니면 0을 반환하고 알파벳이면 0이 아닌 수를 반환한다. (나는 1을 반환시켰다.)

[코드](https://github.com/yoouyeon/42Cursus/blob/main/Libft/ft_isalpha.c)

## 🚀 ft_isdigit
```c
#include <ctype.h>
int isdigit(int c);
```
**c(unsigned char로 변환)가 숫자 문자인지 확인한다.**
c가 숫자가 아니면 0을 반환하고 숫자면 0이 아닌 수를 반환한다. (나는 1을 반환시켰다.)

[코드](https://github.com/yoouyeon/42Cursus/blob/main/Libft/ft_isdigit.c)

## 🚀 ft_isalnum
```c
 #include <ctype.h>
int isalnum(int c);
```
**c에 대해서 isdigit 또는 isalpha가 참이 되는지를 확인한다.**
참이 아니면 0을 반환하고, 참이면 0이 아닌 수를 반환한다. (나는 1을 반환시켰다.)

[코드](https://github.com/yoouyeon/42Cursus/blob/main/Libft/ft_isalnum.c)

## 🚀 ft_isascii
```c
#include <ctype.h>
int isascii(int c);
```
**c가 아스키 문자인지를 확인한다. (which is any character between 0 and octal 0177 inclusive.)**

[코드](https://github.com/yoouyeon/42Cursus/blob/main/Libft/ft_isascii.c)

## 🚀 ft_isprint
```c
#include <ctype.h>
int isprint(int c);
```
**c(unsigned char로 변환)문자가 출력가능한 문자인지 판단한다.**
출력가능한 문자: 아스키코드 32~126

[코드](https://github.com/yoouyeon/42Cursus/blob/main/Libft/ft_isprint.c)

## 🚀 ft_toupper
```c
#include <ctype.h>
int toupper(int c);
```
**c가 소문자일 경우에 대문자로 변환.**
소문자가 아닌 경우에는 아무것도 하지 않는다.

[코드](https://github.com/yoouyeon/42Cursus/blob/main/Libft/ft_toupper.c)

## 🚀 ft_tolower
```c
#include <ctype.h>
int tolower(int c);
```
**c가 대문자일 경우에 소문자로 변환.**
대문자가 아닌 경우에는 아무것도 하지 않는다.

[코드](https://github.com/yoouyeon/42Cursus/blob/main/Libft/ft_tolower.c)

## 🚀 ft_calloc
```c
#include <stdlib.h>
void *calloc(size_t count, size_t size);
```
**size bytes 크기의 object count개 만큼의 공간을 할당하고, 그 포인터를 반환한다.**
할당한 메모리는 모두 0을 할당한다. (bzero이용)

[코드](https://github.com/yoouyeon/42Cursus/blob/main/Libft/ft_calloc.c)

## 🚀  ft_strdup
```c
#include <string.h>
char *strdup(const char *s1);
```
**s1문자열 길이 + 1만큼의 메모리를 할당한 다음 (with `malloc`) s1문자열을 복사한 후 반환한다.**
문자열일 경우에 `'\0'`	마무리를 잊지 말자.. (Abort error로 30분 삽질함)

[코드](https://github.com/yoouyeon/42Cursus/blob/main/Libft/ft_strdup.c)