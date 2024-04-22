import mysql from "mysql2/promise";
import { NextResponse } from "next/server";

export const POST = async (req, res) => {
  let connection;
  console.log(req.body);
  const body = await req.json();
  console.log(body);
  const patientid = body.patient_id;
  const docname = body.doctorname;
  const date = body.appointment_date;
  const time = body.time;
  const reason = body.reason;

  try {
    connection = await mysql.createConnection({
      host: process.env.MYSQL_HOST || "localhost",
      user: process.env.MYSQL_USER || "root",
      password: process.env.MYSQL_PASSWORD || "sexy",
      database: process.env.MYSQL_DB || "PMS",
    });
    const [rows] = await connection.execute(
      `insert into Patient values (NULL,'${username}','${password}','${name}','${gender}','${dob}','${phone_no}','${address}','${insurance}')`
    );
    return NextResponse.json(rows);
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      msg: "Error Occurred",
    });
  }
};
