// pages/api/submit-appointment.js

import mysql from "mysql2/promise";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { patientId, doctorId, appointmentDate, appointmentTime, reason } =
      req.body;

    try {
      // Connect to the MySQL database
      const connection = await mysql.createConnection({
        host: process.env.MYSQL_HOST || "localhost",
        user: process.env.MYSQL_USER || "root",
        password: process.env.MYSQL_PASSWORD || "sexy",
        database: process.env.MYSQL_DB || "PMS",
      });

      // Insert appointment into the Appointment table
      const [result] = await connection.execute(
        "INSERT INTO Appointment (patient_id, doc_id, appointment_date, appointment_time, reason) VALUES (?, ?, ?, ?, ?)",
        [patientId, doctorId, appointmentDate, appointmentTime, reason]
      );

      // Close the database connection
      await connection.end();

      res.status(200).json({
        message: "Appointment submitted successfully",
        appointmentId: result.insertId,
      });
    } catch (error) {
      console.error("Error inserting appointment:", error);
      res.status(500).json({
        message: "Error submitting appointment",
        error: error.message,
      });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
