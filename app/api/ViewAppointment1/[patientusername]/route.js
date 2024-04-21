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

    const query = `SELECT doctor.name, 
       Appointment.appointment_date, 
       Appointment.appointment_time 
FROM Appointment 
JOIN Patient ON Appointment.patient_id = Patient.patient_id 
JOIN doctor ON Appointment.doc_id = doctor.doc_id 
WHERE Patient.username = '${patientusername}';
`;

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
