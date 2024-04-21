import mysql from 'mysql2/promise';
import { NextResponse } from "next/server";

export const GET = async (req, res) => {
    let connection;
    try {
        connection = await mysql.createConnection({
            host: process.env.MYSQL_HOST || "localhost",
            user: process.env.MYSQL_USER || "root",
            password: process.env.MYSQL_PASSWORD || "sexy",
            database: process.env.MYSQL_DB || "PMS"
        });
        const [rows] = await connection.execute('SELECT * FROM Patient');
        return NextResponse.json(rows);
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            msg: "Error Occurred"
        });
    }
}

export const POST = async (req, res) => {
    let connection;
    console.log(req.body)
    const body = await req.json();
    console.log(body)
    const username = body.username;
    const password = body.password;
    const name = body.name;
    const gender = body.gender;
    const dob = body.dob;
    const phone_no = body.phone_no;
    const address = body.address;
    const insurance = body.insurance;
    try {
        connection = await mysql.createConnection({
            host: process.env.MYSQL_HOST || "localhost",
            user: process.env.MYSQL_USER || "root",
            password: process.env.MYSQL_PASSWORD || "sexy",
            database: process.env.MYSQL_DB || "PMS"
        });
        const [rows] = await connection.execute(`insert into Patient values (NULL,'${username}','${password}','${name}','${gender}','${dob}','${phone_no}','${address}','${insurance}')`);
        return NextResponse.json(rows);
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            msg: "Error Occurred"
        });
    }
}