---
title: "[so_long] MiniLibX 이용해서 작은 2D게임 만들기"
date: 2022-05-15 21:19:16
category: 42Curcus/La-so_long
description: "This project is a very small 2D game. It is built to make you work with textures, sprites. And some very basic gameplay elements."
---

블랙홀을 2일 남기고 쏘롱 평가를 받았다. 정말 다시는 하고 싶지 않은 끔찍한 경험이었고... 앞으로는 좀 미리미리 챙겨서 해야겠다. 너무 긴장해서 make 명령어 치는데 손이 덜덜 떨렸다.

## 🚀 So_long

MiniLibX 라이브러리를 이용해서 간단한 2D게임을 만드는 과제이다.

맨데토리 기준 구현해야 하는 기능으로는

- 맵 그리기
- 플레이어 표시하고 <kbd>W</kbd>, <kbd>A</kbd>, <kbd>S</kbd>, <kbd>D</kbd> 키로 움직이기
- <kbd>ESC</kbd> 버튼과 창 닫기 버튼으로 프로그램 종료하기
- 수집물 획득, 획득 전에 출구로 나가지 못하게 하기
- 플레이어의 움직임 쉘에 표시하기

등 이 있다.

맨데토리 부분만 구현한 내 쏘롱의 윈도우 화면은 다음과 같다. (게임 실행 중 쉘에는 플레이어가 움직인 횟수가 출력되어야 함.)

![mandatory_test](./imgs/so_long_jeyoon_mandatory_test.gif)

## 🚀 MiniLibX 

과제의 절반은 이 MiniLibX와 싸웠다 해도 과언이 아니었다. 동료평가하면서도 나왔던 얘기긴 한데 왜 윈도우가 뜬다는데 왜 안뜨는건지... 왜 갑자기 세그폴트? 이런 적이 한두번이 아니다. 덕분에 눈으로 디버깅하는 실력을 좀 키운 것 같기도 하고...

MiniLibX는 많은 그래픽 관련 지식이 없이도 간단하게 창을 생성하고, 이미지를 띄울 수 있게 하는 라이브러리이다. 서브젝트에서 파일을 2개 주는데 각각 OpenGL 버전과 mms 버전이다. 둘 중에 하나만 골라 쓰면 되는데 나는 OpenGL 버전을 썼다가 어마어마한 Warning에 질려서 mms의 보다 최신 버전을 따로 다운받아 썼다. 서브젝트 외의 다른 버전을 사용해도 괜찮다는 답변과 그 파일이 있는 슬랙 글 [링크 (42born2code 로그인 필요)](https://42born2code.slack.com/archives/CN9RHKQHW/p1625327722124500)

### ✨ MiniLibX 함수

과제에서 사용한 함수는 아래와 같다.

```c
void	*mlx_init();

void	*mlx_new_window(void *mlx_ptr, int size_x, int size_y, char *title);

int	mlx_put_image_to_window(void *mlx_ptr, void *win_ptr, void *img_ptr, int x, int y);

int	mlx_loop (void *mlx_ptr);

void	*mlx_xpm_file_to_image(void *mlx_ptr, char *filename,	int *width, int *height);

int	mlx_destroy_window(void *mlx_ptr, void *win_ptr);

int	mlx_destroy_image(void *mlx_ptr, void *img_ptr);

int	mlx_hook(void *win_ptr, int x_event, int x_mask, int (*funct)(), void *param);

```

- `mlx_init()` : 사용자의 소프트웨어와 생성할 윈도우 간의 연결을 초기화하는 함수. 반환되는 (void *) 타입의 mlx_ptr는 이후의 MiniLibX 내의 함수의 호출에 사용된다.
- `mlx_new_window()` : 새로운 윈도우를 생성하는 함수. 반환되는 값은 (void *) 타입의 생성된 윈도우를 가리키는 포인터이다.
- `mlx_put_image_to_window` : 이미지를 window에 출력하는 함수. 여기서 사용되는 이미지는 이후에 나올 함수에서 반환된 이미지 포인터가 가리키는 이미지이다.
- `mlx_loop()` : 이벤트가 발생할 때까지 계속해서 반복하고 있는 함수. 
- `mlx_xpm_file_to_image()` : xpm 파일을 MiniLibX에서 사용할 수 있는 이미지로 바꾸고 그 이미지를 가리키는 포인터를 반환하는 함수.
- `mlx_destroy_window()` : 생성한 윈도우를 삭제
- `mlx_destroy_image()` : 생성한 이미지를 삭제
- `mlx_hook()` 이벤트 핸들러 함수. `x_event`에는 이미 정의되어 있는 이벤트를 가리키는 상수를 넣어주고, `x_mask`에는 MacOS에서는 mask를 지원하지 않기 때문에 그냥 0을 넣어주고, `func()`에는 이벤트 발생 시 호출될 함수를, `param`에는 호출될 함수에 전달될 인자를 넣어준다.

함수 명이 직관적이라 어떤 목적으로 사용하는 함수인지는 이해하기 쉬웠지만...

아까 말했듯이 뭔가 문제가 있는데 문제가 왜 발생하는지 모르겠어서 고생을 좀 했었다. 세그폴트가 발생하거나, 창이 생성이 안되는데에는 **파일명 오류** (wall을 wll로 적는다거나(경험담)) 또는 **다양한 이유**로 win_ptr이 반환이 안된다거나 하는 이유가 있었다. 디버깅을 해 봐도 딱히 눈에 띄는 부분이 없어서 열심히 물어보고, 코드 열심히 뜯어보고 했었던 기억이 있다... 🥲

### ✨ 동적라이브러리

mms 버전을 쓰게 된다면 동적 라이브러리를 사용하게 될 것이다. 그동안은 쭉 정적 라이브러리만 썼던 터라 그냥 익숙한 opengl 버전을 쓰려고 했었는데 아무래도 warning이 너무 많이 발생해서... 그냥 mms로 바꾸고 동적 라이브러리를 한번 써 보기로 했다.

정적 라이브러리는 실행파일을 생성했을 때 라이브러리 내의 모든 코드들이 실행 파일 안에 들어 있기 때문에 그냥 실행파일 하나로도 실행이 가능하다. 

하지만 동적 라이브러리를 가지고 실행파일을 생성했을 때에는 실행파일 내에 코드들이 들어가지 않기 때문에 만들어진 실행파일을 생성할 때 그 동적 라이브러리와 함께 실행을 해 줘야 한다.

동적 라이브러리와 실행파일을 함께 동작시키려면 실행파일에 동적 라이브러리의 위치를 알려줘야 하는데 (참고 : `install_name_tool`) 그냥 실행파일과 동일한 경로에 동적 라이브러리가 있으면 동적 라이브러리의 경로를 따로 설정하지 않아도 동작이 잘 되길래 나는 mlx의 Makefile을 수정해서 make시에 라이브러리가 mlx 폴더 밖으로 빠져나와 실행파일과 동일한 경로에 있게 바꾸어주었다. (clean, fclean, re 부분도 신경써주자)

## 🚀 과제 진행 과정

[과제 레포](https://github.com/yoouyeon/42Cursus/tree/main/so_long)

### ✨ read_map

먼저 .ber 확장자로 들어오는 맵 파일을 읽어준다.

```c
void	read_map(t_game *game, char *filename)
{
	if (malloc_map(game, filename) == FALSE)
		exit_error(game, "Error\n: Memory allocation failed.");
	load_map(game, filename);
}
```

필요한 길이를 재서 넉넉하게 map을 저장할 2차원 배열을 할당해준 뒤에(`malloc_map()`) 개행을 기준으로 행을 나누어서 2차원 배열에 넣어준다. (`load_map()`)

### ✨ check_map

서브젝트에서 요구한 조건은

1. 직사각형 모양일 것 (모든 행의 길이가 동일할 것)
2. 맵이 wall로 완전히 둘러싸여 있을 것
3. P, E, C 가 적어도 1개 있을 것.

이 세가지 조건이다.

```c
void	check_map(t_game *game)
{
	t_cnt	cnts;

	cnts.cnt_e = 0;
	cnts.cnt_c = 0;
	cnts.cnt_p = 0;
	if (is_rectangular(game) == FALSE)
		exit_error(game, "Error\n: The map must be rectangular.");
	if (is_closed(game) == FALSE)
		exit_error(game, "Error\n: The map must be closed/surrounded by walls.");
	if (check_characters(game, &cnts) == FALSE)
		exit_error(game, "Error\n: In map contents");
	game->map.carrot = cnts.cnt_c;
}
```

여기서 의견이 좀 갈릴 수 있는 부분은 3번째 조건인 P, E, C가 적어도 1개 있을 조건인데, E, C가 여러 개 있는 맵은 상식적으로 이해가 가도 P가 여러 개 있는 맵은 상식적으로는 좀 이해가 가지 않는다. 그래서 P가 2개 이상 있을 경우도 에러로 처리하신 분들도 계시던데 내 개인적인 생각으로는 에러 조건을 추가해도 괜찮은 상황인건지 모르겠어서 나는 가장 처음에 탐색되는 P 하나만 유효하게 처리하고 나머지는 빈 공간으로 처리해줬다. 슬랙에 좀 찾아보니 랜덤으로 자리 지정해주신 분도 계신 듯 한데 어떻게 하는 지 모르겠다... 이건 디펜스하는 것에 달린 듯?

### ✨ draw_map

MiniLibX 함수를 이용해서 윈도우에 맵을 그려준다. 이 부분은 일단 출력만 안정적으로 시킬 수 있다면 그렇게 어려운 과정은 아닌 것 같다.

```c
void	draw_map(t_game *game)
{
	init_mlx(game);
	put_imgs(game);
}

void	put_imgs(t_game *game)
{
	int	i;
	int	j;

	i = 0;
	while (i < game->map.height)
	{
		j = 0;
		while (j < game->map.width)
		{
			if (game->map.map[i][j] == '1')
				put_img_32(game, game->imgs.wall, j, i);
			else if (game->map.map[i][j] == 'C')
				put_img_32(game, game->imgs.carrot, j, i);
			else if (game->map.map[i][j] == 'E')
				put_img_32(game, game->imgs.house, j, i);
			else if (game->map.map[i][j] == 'P')
				put_bunny(game, game->bunny.dir, j, i);
			else
				put_img_32(game, game->imgs.blank, j, i);
			j++;
		}
		i++;
	}
}
```

그냥 맵의 내용에 맞는 이미지를 출력해주면 된다.

플레잉 스크린샷에서 볼 수 있듯이 bunny의 움직임에 따라서 이미지를 다르게 만들어주었다. 사실 필수는 아니고 좀 더 예쁘게 만들고 싶은 마음에 추가한 부분인데 개인적으로는 꽤 만족스럽다. 그래서 위의 `draw_map`에서 `p`인 경우에는 방향별로 다른 이미지를 출력하기 위해서 `put_bunny` 함수로 이미지를 출력해 주었다.

```c
void	put_bunny(t_game *game, int dir, int x, int y)
{
	if (dir == 1)
		mlx_put_image_to_window(game->mlx_ptr, game->win_ptr, \
			game->imgs.bunny_1, 32 * x, 32 * y);
	else if (dir == 2)
		mlx_put_image_to_window(game->mlx_ptr, game->win_ptr, \
			game->imgs.bunny_2, 32 * x, 32 * y);
	else if (dir == 3)
		mlx_put_image_to_window(game->mlx_ptr, game->win_ptr, \
			game->imgs.bunny_3, 32 * x, 32 * y);
	else
		mlx_put_image_to_window(game->mlx_ptr, game->win_ptr, \
			game->imgs.bunny_4, 32 * x, 32 * y);
}
```

이렇게 저장되어 있는 방향(`dir`)에 따라서 토끼의 이미지를 달리 출력해주면 화면에서는 실제로 방향을 바꾸는 것처럼 보인다.

### ✨ key_press

```c
int	main(int argc, char **argv)
{
	t_game	game;
	//(생략)
	read_map(&game, argv[1]);
	check_map(&game);
	draw_map(&game);
	mlx_hook(game.win_ptr, KEYPRESS, 0, &key_press, &game);
	mlx_hook(game.win_ptr, X_EVENT_KEY_EXIT, 0, &exit_game, &game);
	mlx_loop(game.mlx_ptr);
	return (0);
}
```

이렇게 key가 눌리는 이벤트와 윈도우 종료 버튼을 누르는 이벤트를 mlx_hook로 걸어주었다.

```c
int	key_press(int keycode, t_game *game)
{
	if (keycode == KEY_ESCAPE)
		exit_game(game);
	else if (keycode == KEY_W)
		check_bunny(game, 1, 0, -1);
	else if (keycode == KEY_A)
		check_bunny(game, 2, -1, 0);
	else if (keycode == KEY_S)
		check_bunny(game, 3, 0, 1);
	else if (keycode == KEY_D)
		check_bunny(game, 4, 1, 0);
	return (0);
}
```

그리고 방향에 따라 bunny를 움직일 수 있는지 확인하고(`check_bunny`), 움직여주고 (맵을 조정하면 된다!) 맵대로 다시 `put_imgs()` 함수로 출력을 해 주면 맨데토리 끝!

## 🚀 회고..

앞으로는 블랙홀 직전에 평가를 받는 아슬아슬한 짓을 하지 말자. 블랙홀에 빠질 위험이 있었던 것도 맞지만 시간에 쫓겨 해보고 싶었던 보너스를 하지 못한게 아쉽다. 나중에 여유가 있으면 해 보고 싶지만 아직 그렇게 블랙홀이 여유있는 것도 아니라서 할 수 있을지 모르겠다...

사실 지금까지 한 다른 과제들은 그렇게 애정(?)을 담아서 하지는 않았었는데 이 과제는 내 취향을 좀 담을 수 있어서 그런가 애정을 담아서 열심히 했던 것 같다. 그래서인가 지금까지 동료평가 중에 한번도 받아보지 못했던 **Outstanding Project** 를 두번이나(!) 받았다. 표정 관리 잘 못했던 것 같은데 솔직히 엄청 기뻤다. 크크

예전에는 일일 과제 기록을 노션에 정리했었는데 이번 과제는 프로젝트 레포지토리에 같이 저장하면서 진행했다. 개인적인 기록이라 보여지는게 부끄럽긴 한데 (의미없는 삽질 + 졸려 힘들어 어지러워 찡찡거림도 가득..) 그래도 보여지는데 저장하니 좀 더 열심히 공부하고 정리하게 되는 것 같다. 남은 과제들도 이렇게 정리하면서 진행할 수 있게 되었으면 좋겠다...

