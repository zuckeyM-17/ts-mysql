const { createConnection } = require("mysql");
import { Connection, MysqlError, FieldInfo } from "mysql";

const con: Connection = createConnection({
  host: "localhost",
  port: 13306,
  user: "root",
  password: "password",
  database: "sandbox"
});

const sql = "INSERT INTO users SET ?;";

const createUser = (name: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    con.query(sql, { name: name }, (err: MysqlError | null, results: any) => {
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
    resolve(createUser("zuckey"));
  });
})
  .then(result => {
    console.log(result);
    process.exit(0);
  })
  .catch((err: Error) => {
    console.log(err);
    process.exit(1);
  });
