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
        sql.query(`INSERT INTO user (username,password) VALUES ("${username}","${password}")`, (error) => {
            if (error) {
                console.log(error);
                response.send("error")
            } else {
                response.send("success")
            }
        })
    })
    //向admin中引入数据库文件
express.get("/getStudents", (request, response) => {
        const id = request.query.id;
        let s = id ? `SELECT * FROM students WHERE id="${id}"` : `SELECT * FROM students ORDER BY id`;
        sql.query(s, (error, data) => {
            if (error) {
                console.log(error)
                response.end("error")
            } else {
                response.send(data)
            }
        })
    })
    //修改数据
express.get("/editStudent", (request, response) => {
        const id = request.query.id;
        const name = request.query.name;
        const age = request.query.age;
        // const sex = request.query.sex;
        const city = request.query.city;
        const joinDate = request.query.joinDate;
        sql.query(`UPDATE students SET username="${name}",age="${age}",city="${city}",joinDate="${joinDate}" WHERE id="${id}"`, (error) => {
            if (error) {
                console.log(error)
                response.end("error")
            } else {
                response.send("success")
            }
        })
    })
    //删除数据
express.get("/delStudents", (request, response) => {
        const id = request.query.id;
        sql.query(`DELETE FROM students WHERE id=${id}`, (error, data) => {
            if (error) {
                console.log(error)
                response.end("error")
            } else {
                response.end("success")
            }
        })
    })
    //增加学生数据
express.get("/addStudent", (request, response) => {
    const name = request.query.name;
    const age = request.query.age;
    const sex = request.query.sex;
    const city = request.query.city;
    const joinDate = request.query.joinDate;
    if (name && age && sex && city && joinDate) {
        sql.query(`INSERT INTO students (username,sex,age,city,joinDate) VALUES ("${name}","${sex}","${age}","${city}","${joinDate}")`, (error, data) => {
            if (error) {
                console.log(error)
                response.end("error")
            } else {
                response.send("success")
            }
        })
    } else {
        response.end("error");
    }
})

express.listen(port)
console.log("server is running at " + port)