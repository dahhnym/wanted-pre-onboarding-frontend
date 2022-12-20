<a href="https://hits.seeyoufarm.com"><img src="https://hits.seeyoufarm.com/api/count/incr/badge.svg?url=https%3A%2F%2Fgithub.com%2Fdahhnym%2Fwanted-pre-onboarding-frontend&count_bg=%2379C83D&title_bg=%23555555&icon=&icon_color=%23E7E7E7&title=hits&edge_flat=true" align="right"/></a><br>

# 원티드 프리온보딩 프론트엔드 인턴십 선발과제

## Dependency

- React 18.2.0
- React-router-dom
- Sass
- Axios

## 실행방법

```
$npm install
$npm start
```

## 데모

### 배포 URL

https://incomparable-kringle-dffa94.netlify.app/

### 테스트 계정

이메일 : test@test123.com <br>
비밀번호 : qwer1234

## 시연영상

|                                                                       회원가입                                                                        |                                                                       로그인&로그아웃                                                                       |
| :---------------------------------------------------------------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------------------------------------------------------------------: |
| <img src='https://user-images.githubusercontent.com/74545780/207077431-8b96a0c7-1feb-4606-b2c0-27269245a269.gif' alt='회원가입 시연' width='350px' /> | <img src='https://user-images.githubusercontent.com/74545780/207077445-4529254a-0980-48b7-ae8b-90d627527383.gif' alt='로그인로그아웃 시연' width='350px' /> |

|                                                                 투두리스트 생성, 수정, 삭제                                                                  |
| :----------------------------------------------------------------------------------------------------------------------------------------------------------: |
| <img src='https://user-images.githubusercontent.com/74545780/207165834-71b8cb63-784f-4e49-89a0-f89e2daa75dd.gif' alt='투두리스트 CRUD 시연' width='350px' /> |

## 파일구조

```
src
 ┣ assets
 ┃ ┣ cancel.svg
 ┃ ┣ checked.svg
 ┃ ┣ confirm.svg
 ┃ ┣ delete.svg
 ┃ ┣ edit.svg
 ┃ ┗ not-checked.svg
 ┣ components
 ┃ ┣ Auth
 ┃ ┃ ┣ components
 ┃ ┃ ┃ ┣ EmailInput.jsx
 ┃ ┃ ┃ ┣ FormButton.jsx
 ┃ ┃ ┃ ┣ PasswordInput.jsx
 ┃ ┃ ┃ ┗ Signout.jsx
 ┃ ┃ ┣ Auth.jsx
 ┃ ┃ ┗ Auth.scss
 ┃ ┗ ToDo
 ┃ ┃ ┣ components
 ┃ ┃ ┃ ┣ Checkbox.jsx
 ┃ ┃ ┃ ┣ TodoContent.jsx
 ┃ ┃ ┃ ┣ ToDoControlButtons.jsx
 ┃ ┃ ┃ ┣ ToDoEditButtons.jsx
 ┃ ┃ ┃ ┣ ToDoForm.jsx
 ┃ ┃ ┃ ┗ ToDoItem.jsx
 ┃ ┃ ┣ ToDo.jsx
 ┃ ┃ ┗ Todo.scss
 ┣ store
 ┃ ┣ auth-context.js
 ┃ ┗ todo-context.js
 ┣ api.js
 ┣ App.css
 ┣ App.jsx
 ┣ index.css
 ┣ index.js
 ┗ reset.css
```

### assets

- 아이콘으로 svg 형태의 이미지를 사용
  - 사용 이유: 크기를 변경해도 깨지지 않고, fill 등의 속성을 이용하여 이미지 color를 변경할 수 있다는 장점이 있음
    (라이브러리를 사용해도 되지만 가능하면 dependency를 추가하지 않는 선에서 구현해보았습니다).
- 커스텀 checkbox 구현을 위해 img 태그에 src 속성으로, 투두 수정삭제버튼 등의 button 요소에 backround url속성으로 이미지를 넣는 방식 사용
  <br>

  **커스텀 checkbox**

  ```jsx
  import Checked from './../../../assets/checked.svg';
  import NotChecked from './../../../assets/not-checked.svg';

  //...

  return (
    <img
      src={isCompleted ? Checked : NotChecked}
      alt={isCompleted ? '완료' : '미완료'}
      // ...
    />
  );
  ```

  [↳ 관련코드 전체보기](https://github.com/dahhnym/wanted-pre-onboarding-frontend/blob/f5e8f8d025bd19a2ecc2f315bf6e08f6032c68ff/src/components/ToDo/components/Checkbox.jsx#L15)

  **버튼**

  ```js
  import Edit from './../../../assets/edit.svg';

  //...

  return (
    <button
            type="button"
            // ...
            style={{
              background: `center / cover no-repeat url(${Edit})`,
              width: '20px',
              height: '20px',
            }}
          >
  )
  ```

  [↳ 관련코드 전체보기](https://github.com/dahhnym/wanted-pre-onboarding-frontend/blob/f5e8f8d025bd19a2ecc2f315bf6e08f6032c68ff/src/components/ToDo/components/ToDoControlButtons.jsx#L36)

### components

- Auth와 Todo 크게 두 가지로 나누고 각 컴포넌트 안에 폴더를 생성하여 세부 컴포넌트를 만들었습니다. 애플리케이션의 규모가 작아 페이지 단위보다는 그냥 하나의 컴포넌트로 접근했습니다.
- css의 경우, 평소 styled-component를 자주 사용하지만 이 과제의 경우 애플리케이션의 규모가 작아 css 작업이 많지 않을것 같아 각 큰 컴포넌트(Auth, ToDo)별로 style sheet 하나만 두고 클래스 선택자를 사용하여 스타일링 하였습니다.
  - CSS-in-JS가 아니여서 컴포넌트 내에 스타일 관련 코드를 제외한 로직 관련 코드만 볼 수 있다는 장점이 있습니다.
  - 아쉬운점은 상위 컴포넌트에 css가 import 되어있어서 전체 하위 컴포넌트가 영향을 받는다는 점입니다. 일부 하위 컴포넌트는 스타일 적용시키고 싶지 않을때 문제가 됩니다. `module.scss`를 사용하면 어땠을까 하는 아쉬운 점이 있습니다.

### store

Props drilling 피하기 위해 Context API를 사용하였으며 관심사별로 context를 생성하였습니다.

- Auth context
- Todo Context
  <br>

각 context 내에는 useReducer 훅을 사용하여 state 업데이트하였습니다.
useReducer 사용 이유는 state 여러개 만들기 보다 기능에 맞춰서 관련 상태값 한번에 업데이트해주기 위해서입니다.

### api.js

공통으로 사용하는 api 호출 함수를 하나의 파일에 모두 선언해두었습니다. 투두 CRUD 관련 함수들에는 인자로 accessToken을 넘겨줘야 합니다.

```js
axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
```

`axios.defaults.headers.common['Authorization']`을 이용해 전역으로 header의 Authorization 값을 선언해두고, 함수 선언시에는 headers의 Authorization을 따로 쓰지 않아도 되도록 하고 싶었는데 로그인/회원가입 성공 이후 `/todo`로 바로 안 넘어가지는 버그가 있어서 그냥 함수에 일일이 accessToken 넘겨주는 방식을 택했습니다..

[↳ api.js 전체보기](https://github.com/dahhnym/wanted-pre-onboarding-frontend/blob/f5e8f8d025bd19a2ecc2f315bf6e08f6032c68ff/src/api.js)

## 주요 기능 설명

### UI

UI만 담당하는 컴포넌트는 따로 만들지 못했습니다.
로그인 폼의 input, 스타일은 동일하나 내용만 다른 button 등 반복되는 UI가 있어 재사용가능한 UI 컴포넌트를 따로 만들 필요성은 느꼈으나 시간부족으로 실제 구현까지는 하지 못했습니다.

### 로그인/회원가입

#### 로그인/회원가입을 한 라우터(`/` 경로)에 구현

`isSigninClicked` 값에 따라 `signInUser()` 혹은 `signUpUser()` 메소드가 호출됩니다.

로그인/회원가입은 중복되는 로직이 많기 때문에 따로 라우터를 만들기 보다 유저의 로그인 혹은 회원가입 프로세스를 switch 하는 state를 하나 만들어서 state 값에 따라 해당되는 API 콜을 하는 함수를 호출하도록 하였습니다.

```jsx
const onSubmit = async e => {
  e.preventDefault();

  //...

  if (ctx.isSignInClicked) {
    await signInUser();
  } else {
    await signUpUser();
  }
};
```

[↳ 관련코드 전체보기](https://github.com/dahhnym/wanted-pre-onboarding-frontend/blob/f5e8f8d025bd19a2ecc2f315bf6e08f6032c68ff/src/components/Auth/Auth.jsx#L63)

아래는 로그인에 사용되는 메소드로, 기 유저의 email, password 정보 요청 후 있으면 응답을 성공적으로 받으면 `isSuccess와 data라는 속성을 가진 객체`를 반환하도록 구현하였습니다. 주 이유는 Auth 컴포넌트에서 isSuccess의 값을 토대로 Auth 컴포넌트에서 로그인 성공실패 처리를 하고, 에러 메세지 표시 등 에러 핸들링을 좀더 용이하게 하기위해서입니다. <br>
data에는 응답으로 받은 정보가 들어가는데 요청 성공 시에는 data에 access token의 정보가, 실패 시에는 error 관련 데이터(error message, error status code 등)가 들어갑니다. 401, 404 에러의 경우 로그인 폼 아래에 에러 메세지가 표시가 되며, 그 외 에러는 콘솔에 error 출력하도록 처리했습니다.

```js
export const getUser = async (email, password) => {
  return await axios
    .post('/auth/signin', { email: email, password: password })
    .then(res => {
      if (res.status === 200) {
        return { isSuccess: true, data: res.data };
      }
    })
    .catch(error => {
      console.error(error);
      if (
        error.response.data.statusCode === 401 ||
        error.response.data.statusCode === 404
      ) {
        return { isSuccess: false, data: error.response.data };
      } else {
        console.error('로그인 실패', error);
      }
    });
};
```

[↳ 관련코드 전체보기](https://github.com/dahhnym/wanted-pre-onboarding-frontend/blob/f5e8f8d025bd19a2ecc2f315bf6e08f6032c68ff/src/api.js#L25)

```js
if (data.statusCode === 401) {
  ctx.setErrorMsg('입력하신 정보가 일치하지 않습니다.');
  return;
}
if (data.statusCode === 404) {
  ctx.setErrorMsg('입력하신 정보가 존재하지 않습니다.');
  return;
}
```

[↳ 관련코드 전체보기](https://github.com/dahhnym/wanted-pre-onboarding-frontend/blob/f5e8f8d025bd19a2ecc2f315bf6e08f6032c68ff/src/components/Auth/Auth.jsx#L44)

### 투두

CRUD 로직은 대부분 `todo-context.js`에 useReducer를 사용하여 구현했습니다. 이유는 투두 아이템 하나에 세부 컴포넌트가 여럿 있고(체크박스, 투두 수정,삭제,취소,확인 버튼) 각 컴포넌트에 props로 전달해야할 함수가 너무 많고, 한 기능에 업데이트해야할 state도 여럿 있어 reducer 함수를 사용했습니다.

[↳ todo-context.js 코드보기](https://github.com/dahhnym/wanted-pre-onboarding-frontend/blob/f5e8f8d025bd19a2ecc2f315bf6e08f6032c68ff/src/store/todo-context.js)

<br>

처음에 새 투두 추가할때와 투두 수정할때의 input value를 하나의 state를 사용했더니 ~~(당연하게도)~~ 투두를 수정하면 새 투두를 입력받는 input창에도 같이 입력이 되는 문제점이 있었습니다. 그래서 새 투두를 입력받는 input의 state와 투두 리스트의 투두 수정할때의 input value를 담는 state를 따로 만들었습니다.

그리고 todoReducer 함수의 initialState에 기존 todo Data를 넣어줌으로서 수정 버튼 클릭시 원래 있던 투두 내용이 그대로 input창에 유지되도록 했습니다.

```js
const ToDoItem = ({ todoSingleData }) => {
  const { id } = todoSingleData;

  //...

  const initialState = {
    val: todoSingleData.todo, // 기존에 있는 todo data의 value
  };

  const [todoState, dispatchTodo] = useReducer(todoReducer, initialState);

  //...
};
```
