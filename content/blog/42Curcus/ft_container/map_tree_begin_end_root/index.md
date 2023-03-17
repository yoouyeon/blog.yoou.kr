---
title: "map의 begin과 end, 그리고 root에 대한 입장정리"
date:  2023-01-01 22:22:54
category: 42Curcus/ft_container
description: "C++ Map 에 대해서 몰랐던 내용들"
---

(아직 map 구현중이라 이후에 업데이트되는 내용이 있을 수 있음.)

map 구현을 위해 __tree 헤더파일을 뜯어보던 중에 굉장히 당황스러운 사실을 알게되었는데 정리를 해 둬야 나중에 또 이상한 실수를 하지 않을 것 같아서 간단히 정리해보려고 한다.

## 🌟 begin

`begin`은 map의 요소들 중에서 가장 작은 요소(그 자체!)를 가리키고 있는 이터레이터이다.

나는 왜 헷갈리고 있었는지 모르겠는데.... `begin`과 `root`는 아주 특별한 경우(원소가 하나가 있는 경우, 혹은 두개인 경우 중 일부)가 아니면 분명히 다른 요소를 가리키고 있다!!!

## 🌟 end

vector를 구현할 때에 end 이터레이터는 그냥 begin + size 지점의 이터레이터를 반환하는 식으로 구현했었다.

따라서 당연히 size가 증가함에 따라 end 이터레이터도 계속해서 변했고, 마지막 원소 다음의 이론적인 원소를 가리키는 이터레이터라는 end의 정의에도 이렇게 구현하는 것이 가장 어울린다고 생각한다.

그런데 map의 end는 어떻게 ... 구현을 해야 할까...

__tree 헤더파일에는 end() 함수가 아래처럼 구현되어 있다.

```cpp
__iter_pointer __end_node() _NOEXCEPT
{
  return static_cast<__iter_pointer>(
    pointer_traits<__end_node_ptr>::pointer_to(__pair1_.first())
  );
}
```

`__pair1_.first()` 는 `__end_node_t` 타입의 어떤 값이다. end_node 자체를 담고 있는 값인 것 같고. 생성자에서 그냥 빈 요소로 초기화된다. 이렇게 생성자에서 초기화 된 이후에는 (확실하진 않지만) 값이 변하는 부분이 없어 보였다. 시작부터 그냥 어떤 빈 노드 하나를 가리키고 있는 것 같다.

실제로도 그렇게 동작하는지 궁금해서 간단히 실험을 해 봤는데 정말 원소의 최댓값과 상관없이 end() 함수의 반환값은 vector와 다르게 계속 동일하다는 것을 확인할 수 있었다. (🫠)

```cpp
std::map<int, bool> std_map;
// 값 하나를 넣고 end, rend를 저장
std_map.insert(std::make_pair(1, true));
auto end1 = std_map.end();
auto rend1 = std_map.rend();
// key가 1보다 큰 값들을 넣고 새로운 end, rend를 저장
std_map.insert(std::make_pair(2, true));
std_map.insert(std::make_pair(3, true));
std_map.insert(std::make_pair(4, true));
auto end2 = std_map.end();
auto rend2 = std_map.rend();
// 변했는지 비교해보기
std::cout << "===== map ======\n";
std::cout << "end1 과 end2는 동일합니다 : " << std::boolalpha << (end1 == end2) << "\n";
std::cout << "rend1 과 rend2는 동일합니다 : " << std::boolalpha << (rend1 == rend2) << "\n";
// 벡터 결과도 확인해보기
std::vector<int> std_vector;
auto vend1 = std_vector.end();
auto vrend1 = std_vector.rend();
std_vector.push_back(1);
std_vector.push_back(2);
auto vend2 = std_vector.end();
auto vrend2 = std_vector.rend();
std::cout << "==== vector ====\n";
std::cout << "end1 과 end2는 동일합니다 : " << std::boolalpha << (vend1 == vend2) << "\n";
std::cout << "rend1 과 rend2는 동일합니다 : " << std::boolalpha << (vrend1 == vrend2) << "\n";
/* 출력 (이왜진)
 * ===== map ======
 * end1 과 end2는 동일합니다 : true
 * rend1 과 rend2는 동일합니다 : true
 * ==== vector ====
 * end1 과 end2는 동일합니다 : false
 * rend1 과 rend2는 동일합니다 : false
*/
```

## 🌟 root

대부분의 Red Black Tree 구현 레퍼런스들은 root 노드를 저장해두고 삽입, 삭제, 검색을 하는데 __tree 헤더파일에서는 begin node와 end node만을 저장해두고 있었다. 그래서 root 노드는 어떻게 찾아내는지 확인해봤는데 `end_node->left` 값을 확인하고 있었다.

```cpp
__node_pointer __root() const _NOEXCEPT
        {return static_cast<__node_pointer>(__end_node()->__left_);}
```

이상하게도 __end_node의 오른쪽 자식은 어디서도 사용하지 않는다...

아무튼 root의 주소는 end_node의 왼쪽 자식에 연결해두고 root가 바뀔 때에는 이 값을 바꾸는 방식으로 root를 관리하고 있었다. 왜 하필 left일까... 이렇게 하는 것보다 그냥 root 포인터를 하나 두는게 더 낫지 않을까...?
