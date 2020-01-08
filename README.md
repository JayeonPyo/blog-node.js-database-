

<h1> 
  node.js와 sqlite3을 이용한 카페 만들기(only js) > 소수전공
</h1>


### 코드 받기
```
git clone https://github.com/HeegyuKim/simple-nodejs-blog.git
```

### 1. 패키지 설치
```
npm install
```
### 2. 데이터베이스 생성 및 샘플 데이터 넣기 
```
sqlite3 blog.db < schema.sql
sqlite3 blog.db < sample_dumps.sql
```
### 3. 실행 및 접속
```
node blog.js
localhost:3000
```

### 


### window 위에서 실행 데이터베이스 삭제 및 생성, 읽기
```
rm test.db
sqlite3 test.db
.read schema.sql
```
