# To Do List project 

<div align=center>
  
[![Hits](https://hits.seeyoufarm.com/api/count/incr/badge.svg?url=https%3A%2F%2Fgithub.com%2FYoonion%2Ftodo-list-Vue3&count_bg=%2379C83D&title_bg=%23555555&icon=&icon_color=%23E7E7E7&title=hits&edge_flat=false)](https://hits.seeyoufarm.com)
  
</div>

* Vue.js(3.x) 프레임워크로 작성된 프로젝트에요.
* 컴포넌트 API Styles 은 Composition API를 따라요.

---------------------

### 1. 프로젝트 설치
```shell
# To Do List 프로젝트를 clone 해요.
git clone https://github.com/Yoonion/todo-list-Vue3.git

# 프로젝트에 필요한 패키지를 설치해요.
npm install
```

### 2. 백엔드가 구현되어 있지 않아, 로컬 개발용 데이터베이스로 json server를 사용해요.
- json server는 json 파일을 사용하여 간단한 시뮬레이션을 위한 REST API Mock server를 구축할 수 있는 패키지에요.
- 프로젝트에 포함된 db.json 파일에 데이터가 저장돼요.
- 참고 : <https://www.npmjs.com/package/json-server>
```shell
# 서버 실행을 위해 '-g' 옵션으로 글로벌로 설치하도록 해요.
npm install -g json-server 

# json server를 시작해요.
json-server --watch db.json 
```
- 프로젝트에 포함된 **db.json** 파일에서 저장된 데이터를 볼 수 있어요.
- <http://localhost:3000/todoList> 에서도 저장된 데이터를 볼 수 있어요.

### 3. Vue 프로젝트를 실행해요.
```
npm run serve
```
- 정상적으로 실행이 됐다면, <http://localhost:8080/> 에서 프로젝트를 볼 수 있어요.
