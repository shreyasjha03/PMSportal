import mysql from "mysql2/promise";
import { NextResponse } from "next/server";

export const GET = async (req, context) => {
  let connection;
  console.log(context.params);
  const patient_username = context.params.patient_username;
  try {
    connection = await mysql.createConnection({
      host: process.env.MYSQL_HOST || "localhost",
      user: process.env.MYSQL_USER || "root",
      password: process.env.MYSQL_PASSWORD || "sexy",
      database: process.env.MYSQL_DB || "PMS",
    });

    const query = ` SELECT Bill.Bill_no, Bill.Room_charge, Bill.Consultation_fee, Bill.Medicines_fee, Bill.Testing_fee, Bill.Total, Bill.Admin_ID FROM Bill JOIN Patient ON Bill.Patient_ID = Patient.patient_id WHERE Patient.username = '${patient_username}'`;
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
