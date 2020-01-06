
exports.user = {
    create: function(db, body, next) {
        //회원가입 처리
        db.serialize(function(){
            var id = body.id;
            var password = body.password;
            var query = "INSERT INTO user(id,password) VALUES(?, ?)";
            var stmt = db.prepare(query);
            stmt.run(id,password,function(err){

                if(err) {
                    //동일한 ID가 존재해서 에러가 남

                    next(false);
                } else{
                    next(true);
                }
            });
            stmt.finalize();
        });
    },


    get_list: function(db, query, next) {
        var users = null;
        var page = parseInt(query.page || "1") - 1;
        var count_per_page = 5;
        
        
        var query = "SELECT * FROM user " +
                " WHERE is_ admin = 0 " +
                "ORDER BY created_at DESC, id DESC " + 
                "LIMIT ?, ?";
        var stmt = db.prepare(query);
        stmt.all(page * count_per_page, count_per_page,  function(err, rows) {
            users = rows;
        });
        stmt.finalize();


        var query = "SELECT COUNT(*) / ? + 1 AS max_page FROM user "
        + " WHERE is_ admin = 0 " ;
        
        stmt = db.prepare(query);
        stmt.all(count_per_page, function(err, rows){

            if(err) {
                next(err, null);
            }
            else {
                var result = {
                    page: page + 1,
                    max_page: rows[0].max_page,
                    users: users
                };
    
                next(null, result);
            }
        })
        stmt.finalize();

     
        
    },

    login: function(db, id, password, next) {
        db.serialize(function(){
            var query = "SELECT * FROM user WHERE " 
            + "id=? AND password=? AND is_admin =0;";
            var stmt = db.prepare(query);
            stmt.all(id,password,function(err,result){
                next(err,result);
            });
            stmt.finalize();
        });


        
    },

    delete: function(db, id, next) {
        db.serialize(function(){
            var query = "DELETE FROM user WHERE id=? AND is_admin = 0 ";
            var stmt = db.prepare(query);
            stmt.run(id,function(err,result){
                next(err);
            });
            stmt.finalize();
        });
    }
}

exports.post = {

    get_list: function(db, query, next) {
        var posts = null;
        var page = parseInt(query.page || "1") - 1;
        var count_per_page = 5;
        
        // 게시물 목록을 가져옴.
        var query = "SELECT * FROM post " +
                "ORDER BY created_at DESC, id DESC " + 
                "LIMIT ?, ?";
        var stmt = db.prepare(query);
        stmt.all(page * count_per_page, count_per_page, 
            function(err, rows) {
            posts = rows;
        });
        stmt.finalize();

        // 최대 페이지 개수를 가져옴.
        var query = "SELECT COUNT(*) / ? + 1 AS max_page FROM post";
        stmt = db.prepare(query);
        stmt.all(count_per_page, function(err, rows){

            if(err) {
                next(err, null);
            }
            else {
                var result = {
                    page: page + 1,
                    max_page: rows[0].max_page,
                    posts: posts
                };
    
                next(null, result);
            }
        })
        stmt.finalize();

     
      

    },

    // id를 가진 게시물을 DB에서 가져와서 next()로 전달.
    // 댓글도 함께 가져옴.
    get: function(db, id, next) {
        db.serialize(function(){
            var result = {}
            //1.게시물 가져오기
            var query = "SELECT * FROM post " +
             " WHERE id =?";
            var stmt = db.prepare(query);
            stmt.all(id, function(err,post){
                if(post.length > 0 ){
                    result.post = post[0];
                }else { //게시물 찾지 못할 경우
                    result.post = {
                        title: "존재하지 않는 게시물입니다."
                    }
                }
            })
            stmt.finalize();
                //댓글 가져오기
            query="SELECT * FROM comment "+
            " WHERE post_id=?";
            stmt = db.prepare(query);
            stmt.all(id, function(err,comments){
                result.comments = comments;
                next(err,result);
            })
            stmt.finalize();
        })
        
    },

    // 게시물의 조회수를 증가시킴
    increase_view_count: function(db, id, next) {
        var query = "UPDATE post SET view_count = view_count +1 "+
        " WHERE id = ? ";
        var stmt = db.prepare(query);
        stmt.run(id, function(err){
        next(err);
        });
        stmt.finalize();
        
    },

    // 게시물의 추천수를 증가시킴.
    increase_recommend_count: function(db, id, next) {
        var query = "UPDATE post SET recommend_count = recommend_count + 1 " +
        "WHERE id = ? ";
        var stmt = db.prepare(query);
        stmt.run(id, function(err){
        next(err);
        });
        stmt.finalize();

        
    },


    // body에 있는 내용으로 새로운 게시물 작성
    //next(err,post_id)
    create: function(db, user_id,title, content,next) {
        var query = "INSERT INTO post(user_id,title, content) VALUES(?,?,?) ";
        var stmt = db.prepare(query);
        stmt.run(user_id,title,content, function(err){
        next(err,this.lastID);
        });
        stmt.finalize();
 
    },

    // body에 있는 내용으로 id 게시물 변경
    modify: function(db, id, user_id, title, content, next) {
        var query = "UPDATE post SET user_id=?, title=?, content=? WHERE id = ?";
        var stmt = db.prepare(query);
        stmt.run(user_id, title, content,id, function(err) {
            next(err);
        });
        stmt.finalize();
        
    },

    // id 게시물 삭제
    delete: function(db, id, next) {
        var query = "DELETE FROM post WHERE id = ? ";
        var stmt = db.prepare(query);
        stmt.run(id, function(err){
            next(err);
        });
        stmt.finalize();
        
    }
};

exports.comment = {

    //댓글 달기
    create: function(db, uid, post_id, content, next) {
        var query = "INSERT INTO comment(user_id, post_id, content) VALUES (?,?,?) ";
        var stmt = db.prepare(query);
        stmt.run(uid, post_id, content,function(err){
            next(err);
        })
        stmt.finalize();
    },

    delete: function(db, user_id, comment_id, next) {
        var query = "DELETE FROM comment WHERE user_id = ? AND id =? ";
        var stmt = db.prepare(query);
        stmt.run(user_id,comment_id,function(err){

            next(err);

        })
        stmt.finalize();
        
    },

    delete_by_admin: function(db, comment_id, next) {
        
    },

    get_list: function(db, query, next) {
        
    },
};

exports.admin = {

    login: function(db, id, password, next) {
        db.serialize(function(){
            var query = "SELECT * FROM user WHERE " 
            + "id=? AND password=? AND is_admin = 1;";
            var stmt = db.prepare(query);
            stmt.all(id,password,function(err,result){
                next(err,result);
            });
            stmt.finalize();
        });
        
    }
}