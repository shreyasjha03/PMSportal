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
    const [rows] = await connection.execute("SELECT * FROM doctor");
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
  const qualification = body.qualification;
  const name = body.name;
  const gender = body.gender;
  const dob = body.dob;
  const address = body.address;
  const phoneno = body.phoneno;
  const email = body.email;
  try {
    connection = await mysql.createConnection({
      host: process.env.MYSQL_HOST || "localhost",
      user: process.env.MYSQL_USER || "root",
      password: process.env.MYSQL_PASSWORD || "sexy",
      database: process.env.MYSQL_DB || "PMS",
    });
    const [rows] = await connection.execute(
      `INSERT INTO doctor (username, password, qualification, name, gender, dob, address, phoneno, email) VALUES ('${username}','${password}','${qualification}','${name}','${gender}','${dob}','${address}','${phoneno}','${email}')`
    );
    return NextResponse.json(rows);
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      msg: "Error Occurred",
    });
  }
};
