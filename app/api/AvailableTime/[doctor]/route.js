import mysql from "mysql2/promise";
import { NextResponse } from "next/server";

export const POST = async (req, context) => {
  let connection;
  const doc_id = context.params.doctor;
  const body = await req.json();
  console.log(body);
  const date = body.selected_date;

  try {
    connection = await mysql.createConnection({
      host: process.env.MYSQL_HOST || "localhost",
      user: process.env.MYSQL_USER || "root",
      password: process.env.MYSQL_PASSWORD || "sexy",
      database: process.env.MYSQL_DB || "PMS",
    });
    const [rows] = await connection.execute(
      `SELECT Time_slot FROM available_time WHERE Doc_ID='${doc_id}'`
    );
    console.log(rows);

    if (rows.length == 0) {
      return NextResponse.json([]);
    } else {
      return NextResponse.json(rows);
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      msg: "Error Occurred",
    });
  }
};

// export async function getServerSideProps(context) {
//   let connection;
//   const doctor = context.params.doctor;

//   try {
//     connection = await mysql.createConnection({
//       host: process.env.MYSQL_HOST || "localhost",
//       user: process.env.MYSQL_USER || "root",
//       password: process.env.MYSQL_PASSWORD || "sexy",
//       database: process.env.MYSQL_DB || "PMS",
//     });

//     const [rows] = await connection.execute(
//       `SELECT Time_slot FROM available_time WHERE Doc_ID='${doctor}'`
//     );

//     const availableTimeSlots = rows.map((row) => row.Time_slot);

//     await connection.end();

//     return {
//       props: {
//         availableTimeSlots,
//       },
//     };
//   } catch (error) {
//     console.error("Error fetching available time slots:", error);
//     return {
//       props: {
//         availableTimeSlots: [],
//         error: "Error fetching available time slots",
//       },
//     };
//   }
// }

// export default function AvailableTimePage({ availableTimeSlots, error }) {
//   if (error) {
//     return <div>Error: {error}</div>;
//   }

//   return (
//     <div>
//       <h1>Available Time Slots</h1>
//       <ul>
//         {availableTimeSlots.map((timeSlot, index) => (
//           <li key={index}>{timeSlot}</li>
//         ))}
//       </ul>
//     </div>
//   );
// }
