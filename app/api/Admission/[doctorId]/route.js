import mysql from "mysql2/promise";
import { NextResponse } from "next/server";

export const GET = async (req, context) => {
  let connection;
  console.log(context.params);
  const doctorId = parseInt(context.params.doctorId);
  try {
    connection = await mysql.createConnection({
      host: process.env.MYSQL_HOST || "localhost",
      user: process.env.MYSQL_USER || "root",
      password: process.env.MYSQL_PASSWORD || "sexy",
      database: process.env.MYSQL_DB || "PMS",
    });
    const [rows] = await connection.execute(
      `SELECT date_of_joining, patient, room_no, name FROM Admission INNER JOIN Nurse ON Admission.nurse = Nurse.nurse_id WHERE Admission.doc_id =${doctorId}`
    );
    return NextResponse.json(rows);
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      msg: "Error Occurred",
    });
  } finally {
    if (connection) {
      // Close the connection when done
      connection.end();
    }
  }
};
