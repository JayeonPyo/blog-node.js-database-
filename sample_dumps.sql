
BEGIN;

INSERT INTO user (id, password,is_admin)
VALUES
("root", "password", 1),
("test1", "password", 0),
("test2", "password", 0),
("test3","password", 0)
;


INSERT INTO post(user_id,title,content, view_count, recommend_count)
VALUES
("root","SAMPLE TITLE", "SAMPLE CONTENT", 100, 100),
("root","SAMPLE TITLE", "SAMPLE CONTENT", 100, 100),
("root","SAMPLE TITLE", "SAMPLE CONTENT", 100, 100),
("root","SAMPLE TITLE", "SAMPLE CONTENT", 100, 100),
("root","SAMPLE TITLE", "SAMPLE CONTENT", 100, 100),
("root","SAMPLE TITLE", "SAMPLE CONTENT", 100, 100),
("root","SAMPLE TITLE", "SAMPLE CONTENT", 100, 100),
("root","SAMPLE TITLE", "SAMPLE CONTENT", 100, 100),
("root","SAMPLE TITLE", "SAMPLE CONTENT", 100, 100),
("root","SAMPLE TITLE", "SAMPLE CONTENT", 100, 100),
("root","SAMPLE TITLE", "SAMPLE CONTENT", 100, 100),
("root","SAMPLE TITLE", "SAMPLE CONTENT", 100, 100),
("root","SAMPLE TITLE", "SAMPLE CONTENT", 100, 100),
("root","SAMPLE TITLE", "SAMPLE CONTENT", 100, 100),
("root","SAMPLE TITLE", "SAMPLE CONTENT", 100, 100),
("root","SAMPLE TITLE", "SAMPLE CONTENT", 100, 100),
("root","SAMPLE TITLE", "SAMPLE CONTENT", 100, 100),
("root","SAMPLE TITLE", "SAMPLE CONTENT", 100, 100),
("root","SAMPLE TITLE", "SAMPLE CONTENT", 100, 100),
("root","SAMPLE TITLE", "SAMPLE CONTENT", 100, 100),
("root","SAMPLE TITLE", "SAMPLE CONTENT", 100, 100),
("root","SAMPLE TITLE", "SAMPLE CONTENT", 100, 100),
("root","SAMPLE TITLE", "SAMPLE CONTENT", 100, 100),
("root","SAMPLE TITLE", "SAMPLE CONTENT", 100, 100),
("root","SAMPLE TITLE", "SAMPLE CONTENT", 100, 100)
;

INSERT INTO post(id,user_id, title, content, view_count, recommend_count)
VALUES
(101,"root","오늘의 일기", "ㅎㅎㅎ<br>GG!", 1010,22),
(102,"root", "오늘의 일기2", "ㅋㅋㅋㅋㅋㅋ", 3, 1),
(103, "root","냠냠 후루룩", "야호야호", 10, 3),
(104, "root","오늘의 점심", "굿굿", 15, 20)
;


INSERT INTO comment(post_id, user_id, content) 
VALUES
(101, "test1", "정말 멋져요 ><"),
(101, "test1", "헤헤헤ㅔ"),
(101, "test2", "ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ"),
(102, "test1", "헤헤헤ㅔ"),
(102, "test2", "ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ"),
(102, "test3", "헤헤헤ㅔ"),
(103, "test3", "ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ"),
(103, "test3", "ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ"),
(104, "test2", "gggg")
;



COMMIT;

