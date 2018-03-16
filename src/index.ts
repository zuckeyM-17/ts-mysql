const { createConnection } = require("mysql");
import { Connection, MysqlError, FieldInfo } from "mysql";

const con: Connection = createConnection({
  host: "localhost",
  port: 13306,
  user: "root",
  password: "password",
  database: "sandbox"
});

interface User {
  id?: number;
  name: string;
}

// const insertSql = "INSERT INTO users SET ?;";
// const createUser = (name: string): Promise<string | Error> => {
//   return new Promise((resolve, reject) => {
//     con.query(insertSql, { name: name }, (err: MysqlError | null, results: any) => {
//       if (err) { reject(err); return; }
//       resolve("success!");
//     });
//   });
// };

const selectSql = "SELECT * FROM users;";
const getUsers = (): Promise<User[] | Error> => {
  return new Promise((resolve, reject) => {
    con.query(selectSql, (err: MysqlError | null, results: any) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(results);
    });
  });
};

new Promise((resolve, reject) => {
  con.beginTransaction((err: MysqlError) => {
    if (err) {
      reject(err);
      return;
    }
    resolve(getUsers());
  });
})
  .then((result: any) => {
    result.forEach((user: any) => console.log(user.name));
    process.exit(0);
  })
  .catch((err: Error) => {
    console.log(err);
    process.exit(1);
  });
