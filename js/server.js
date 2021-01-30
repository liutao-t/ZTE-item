let express = require("express")();

let mysql = require("mysql");
const port = 8080;

// Node解决跨域问题
express.all("/*", function(req, res, next) {
    // 跨域处理
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1');
    res.header("Content-Type", "application/json;charset=utf-8");
    next(); // 执行下一个路由
})

// 规划mysql链接
let sql = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "123456",
    database: "zte"
})

// 尝试链接
sql.connect();

express.get("/login", (request, response) => {
        let username = request.query.username;
        let password = request.query.password;

        sql.query(`SELECT * FROM user WHERE username="${username}" AND password="${password}"`, (error, data) => {
            if (error) {
                console.log(error);
                response.send("error")
            } else {
                if (!data.length) {
                    response.end("error")
                } else {
                    response.end("success")
                }
            }
        })

    })
    //注册
express.get("/addUser", (request, response) => {
        let username = request.query.username;
        let password = request.query.password;
        let usercode = request.query.usercode;
        sql.query(`INSERT INTO user (username,password,usercode) VALUES ("${username}","${password}","${usercode}")`, (error) => {
            if (error) {
                console.log(error);
                response.send("error")
            } else {
                response.send("success")
            }
        })
    })
    //向admin中引入数据库文件

express.listen(port)
console.log("server is running at " + port)