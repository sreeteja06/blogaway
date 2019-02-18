const express = require('express');
const mysql = require('promise-mysql');
const cors = require('cors');

const app = express();
app.use(cors())

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3309,
    user: 'root',
    password: 'root',
    database: 'blogaway'
});


app.get('/', (req,res)=>{
    res.send({
        blog: "hey there",
    })
});

app.get('/likeArticle', (req, res)=>{
    const userid = req.query.userid;
    const articleID = req.query.articleid;
    let message = '';
    connection.then(async (conn)=>{
        try{
            await conn.query("insert into articleLikes values("+articleID+","+userid+")");
            message = "success";
        }catch (e){
            message = "fail";
        }
        res.send({
            message
        });
    });
});

app.get('/unlikeArticle', (req, res) => {
    const userid = req.query.userid;
    const articleID = req.query.articleid;
    let message = '';
    connection.then(async (conn) => {
        try {
            await conn.query("delete from articleLikes where articleid = " + articleID + " and userid = " + userid);
            message = "success";
        } catch (e) {
            console.log(e);
            message = "fail";
        }
        res.send({
            message
        })
    })
})

app.get('/checkUser', (req, res)=>{
    connection.then(async (conn)=>{
        const result = await conn.query("select count(*) from userTable where userid = " + req.query.userid);
        res.send({
            check: result[0]['count(*)']
        })
    })
});

// get articles written by user
app.get('/userArticles/:authorID', (req, res) => {
    let result;
    connection.then(async (conn) => {
        result = await conn.query('select * from articleTable where authorID = ' + req.params.authorID);
        res.send({ result: result });
    });
});

// add article
app.post('/addArticle', (req, res) => {
    // content title descript authorID
    let message = "", result;
    connection.then(async(conn)=>{
        try{
            console.log(req.query);
            // console.log("p"+JSON.stringify(req.params));
            result = await conn.query('insert into articletable (content, title, descript, authorID, tsp) values ("'+req.query.content+'","'+req.query.title+'","'+req.query.description+'", '+ req.query.userid+", now())");
            message = "success";
        }catch(e){
            message = "fail";
            // console.log(e);
        }
        res.send({
            message,
            result
        })
    });
});

// comment article
app.post('/addComment', (req, res)=>{
    let message = "", result ;
    connection.then(async(conn)=>{
        try{
            result = await conn.query("insert into comments (comment, authorID, articleID) values ('"+req.query.comment+"',"+req.query.userid+","+req.query.articleID+")");
            message = "success";
        }catch (e){
            message = "fail";
            console.log(e);
        }
        res.send({
            message,
            result
        })
    });
});

// get comments
app.get('/getComments', (req, res)=>{
    let result, likes ;
    connection.then(async(conn)=>{
        try{
            result = await conn.query("select * from comments where articleID = "+ req.query.articleID);
        }catch(e){
            console.log(e);
        }
        res.send({
            result,
            likes
        })
    });
});

// delete comment
app.get('/deleteComment', (req, res)=>{
    let result, message = "";
    connection.then(async (conn) => {
        try {
            result = await conn.query("delete from comments where commentID = " + req.query.commentID);
            message = "success";
        } catch (e) {
            message = "fail";
            console.log(e);
        }
        res.send({
            message,
            result
        })
    });
});
//likecomment
app.get('/likeComment', (req, res)=>{
    const userid = req.query.userid;
    const commentID = req.query.commentID;
    let message = '', result;
    connection.then(async (conn) => {
        try {
            result = await conn.query("insert into commentlikes values(" + commentID + "," + userid + ")");
            let count = await conn.query("select count(*) from commentlikes where commentID = "+ commentID);
            await conn.query("update comments set commentLikes = " + count[0]['count(*)']+" where commentID = "+ commentID);
            message = "success";
        } catch (e) {
            message = "fail";
            console.log(e);
            
        }
        res.send({
            message,
            result
        })
    })
});

//unlike comment
app.get('/unlikeComment', (req, res) => {
    const userid = req.query.userid;
    const commentID = req.query.commentID;
    let message = '', result;
    connection.then(async (conn) => {
        try {
            result = await conn.query("delete from commentlikes where commentID = " + commentID + " and userid = " + userid);
            let count = await conn.query("select count(*) from commentlikes where commentID = " + commentID);
            await conn.query("update comments set commentLikes = " + count[0]['count(*)'] + " where commentID = " + commentID);
            message = "success";
        } catch (e) {
            message = "fail";
            console.log(e);
        }
        res.send({
            message,
            result
        })
    })
});

app.get('/addUser', (req, res)=>{
    const userid = req.query.userid;
    const username = req.query.username;
    const email = req.query.email;
    let message = '';
    connection.then(async (conn) =>{
        try{
            await conn.query("insert into usertable values('"+userid+"','"+username+"','"+email+"')");
            message = 'success';
        }catch (e){
            message = 'fail';
            console.log(e);
        }
        res.send({
            message
        })
    })
});

app.get('/user/:userid', (req, res) => {
    let result;
    connection.then(async (conn) => {
        result = await conn.query('select * from userTable where userid = ' + req.params.userid);
        const followersCount = await conn.query("select COUNT(*) as followers from followersTable where userid = " + req.params.userid);
        const followingCount = await conn.query("select COUNT(*) as following from followingTable where userid = " + req.params.userid);
        res.send({ 
            userid: result[0]['userid'],
            name: result[0]['name'],
            email: result[0]['email'], 
            followers: followersCount[0]['followers'],
            following: followingCount[0]['following']
        });
        // conn.end();
    });
});

app.get('/article', (req,res) => {
    let result;
    connection.then(async (conn) => {
        result = await conn.query("select * from articleTable");
        res.send({ result })
    });
});

app.get('/follow', (req, res)=>{
    let message = '';
    try{
        connection.then(async (conn) => {
            await conn.query('insert into followingtable values(' + req.query.userid+','+req.query.followid + ')');
            await conn.query('insert into followerstable values(' + req.query.followid + ',' + req.query.userid + ')');
            message = 'success';
        });
    }catch(e){
        message = 'fail';
        console.log(e);
    }
    res.send({
        message
    })
});

app.get('/unfollow', (req, res) => {
    let message = '';
    try {
        connection.then(async (conn) => {
            await conn.query('delete from followerstable where followersid = ' + req.query.userid );
            await conn.query('delete from followingtable where followingid = ' + req.query.followid );
            message = 'success';
        });
    } catch (e) {
        message = 'fail';
        console.log(e);
    }
    res.send({
        message
    })
});

app.get('/article/:articleID', (req, res) => {
    let result;
    connection.then(async (conn) => {
        result = await conn.query('select * from articleTable where articleID = ' + req.params.articleID);
        res.send({ result: result[0] });
    });
});

// app.get('/deleteArticle')

app.listen(5000, ()=>{
    console.log("Server running on http://localhost:5000");
});
