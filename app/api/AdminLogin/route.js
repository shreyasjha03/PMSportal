import mysql from "mysql2/promise";
import { NextResponse } from "next/server";

export const GET = async (req, res) => {
  let connection;
  try {
    connection = await mysql.createConnection({
      host: process.env.MYSQL_HOST || "localhost",
      user: process.env.MYSQL_USER || "root",
      password: process.env.MYSQL_PASSWORD || "sexy",
      database: process.env.MYSQL_DB || "PMS",
    });
    const [rows] = await connection.execute("SELECT * FROM Receptionist");
    return NextResponse.json(rows);
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      msg: "Error Occurred",
    });
  }
};

export const POST = async (req, res) => {
  let connection;
  console.log(req.body);
  const body = await req.json();
  console.log(body);
  const username = body.username;
  const password = body.password;
  try {
    connection = await mysql.createConnection({
      host: process.env.MYSQL_HOST || "localhost",
      user: process.env.MYSQL_USER || "root",
      password: process.env.MYSQL_PASSWORD || "sexy",
      database: process.env.MYSQL_DB || "PMS",
    });
    const [rows] = await connection.execute(
      `SELECT Admin_ID FROM Receptionist WHERE Admin_username='${username}' AND Admin_password='${password}'`
    );
    console.log(rows);

    if (rows.length === 0) {
      return NextResponse.json({
        message: "Admin does not exist",
        success: false,
      });
    } else {
      return NextResponse.json({
        message: "Admin exists, logging in",
        success: true,
      });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      msg: "Error Occurred",
    });
  }
};
