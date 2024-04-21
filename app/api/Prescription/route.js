import mysql from "mysql2/promise";
import { NextResponse } from "next/server";

export const POST = async (req, res) => {
  let connection;
  console.log(req.body);
  const body = await req.json();
  console.log(body);
  const patient_id = parseInt(body.patient_id);
  const doctor_id = parseInt(body.doctor_id);

  const prescriptions = body.prescriptions;
  try {
    connection = await mysql.createConnection({
      host: process.env.MYSQL_HOST || "localhost",
      user: process.env.MYSQL_USER || "root",
      password: process.env.MYSQL_PASSWORD || "sexy",
      database: process.env.MYSQL_DB || "PMS",
    });

    for (let prescription of prescriptions) {
      const medicine_name = prescription.medicine_name;
      const dosage = prescription.dosage;
      const duration = prescription.duration;
      const quantity = parseInt(prescription.quantity);
      const instruction = prescription.instruction;
      const [rows] = await connection.execute(
        `insert into Prescription (patient_id, doctor_id, medicine_name, dosage, duration, quantity, instruction) values (${patient_id},${doctor_id},'${medicine_name}','${dosage}','${duration}',${quantity},'${instruction}')`
      );
    }

    return NextResponse.json({
      message: "Added prescription",
      success: true,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      msg: "Error Occurred",
    });
  }
};
