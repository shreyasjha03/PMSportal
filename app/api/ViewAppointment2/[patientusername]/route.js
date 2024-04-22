import mysql from "mysql2/promise";
import { NextResponse } from "next/server";

export const GET = async (req, context) => {
  let connection;
  console.log(context.params);
  const patientusername = context.params.patientusername;
  try {
    connection = await mysql.createConnection({
      host: process.env.MYSQL_HOST || "localhost",
      user: process.env.MYSQL_USER || "root",
      password: process.env.MYSQL_PASSWORD || "sexy",
      database: process.env.MYSQL_DB || "PMS",
    });

    const query = `SELECT A.appointment_date, A.appointment_time, P.name AS patient_name, D.name AS doctor_name, A.reason 
FROM Appointment AS A
INNER JOIN doctor AS D ON A.doc_id = D.doc_id
INNER JOIN Patient AS P ON A.patient_id = P.patient_id
WHERE P.username='${patientusername}'`;

    console.log(query);
    const [rows] = await connection.execute(query);
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
