# To Do List project

## Project setup
```shell
npm install
```

### 1. 백엔드가 구현되어 있지 않아, 로컬 개발용 데이터베이스로 json server를 사용합니다.
- json server는 json 파일을 사용하여 간단한 시뮬레이션을 위한 REST API Mock server를 구축할 수 있는 패키지 입니다.
- 참고 : <https://www.npmjs.com/package/json-server>
```shell
# JSON 서버 글로벌 설치 - 아래 서버 실행을 위해 '-g' 옵션으로 글로벌로 설치하도록 합니다.
npm install -g json-server 

# JSON 서버 시작 
json-server --watch db.json 
```

### 2. Vue 프로젝트 실행
```
npm run serve
```
