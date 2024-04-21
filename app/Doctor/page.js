"use client";
import axios from "axios";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { notification } from "antd";

export default function DoctorLogin() {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, password } = e.target.elements;
    try {
      const res = await axios.post("http://localhost:3000/api/doctor", {
        username: username.value,
        password: password.value,
      });
      if (res.data.success) {
        notification.success({
          message: "Doctor logging in",
          description: "Continuing to portal",
        });

        localStorage.setItem("doctor_id", username.value);
        // Redirect to Doctorpage
        window.location.href = "/Doctorpage";
      } else {
        notification.error({
          message: "Wrong Credentials",
          description: "Create an account if you dont have done!",
        });
      }
    } catch (error) {
      console.error("Error occurred:", error);
    }
  };

  return (
    <div>
      <Head>
        <title>Doctor Login</title>
        <meta name="description" content="Doctor login page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto p-8 max-w-md">
        <h1
          className="text-3xl font-bold mb-4 text-center"
          style={{ color: "black" }}
        >
          Doctor Login
        </h1>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "200%",
              height: "100%",
              zIndex: -1,
              opacity: 1.0,
            }}
          >
            <Image
              src="/456.jpg"
              alt="Description of the image"
              width={1500}
              height={500}
            />
          </div>
          <div className="rounded-md border border-gray-300 p-4 shadow-md">
            <div className="flex flex-col">
              <label
                htmlFor="username"
                className="font-semibold"
                style={{ color: "black" }}
              >
                Username:
              </label>
              <input
                type="text"
                required
                name="username"
                className="input-field"
                style={{ color: "black" }}
              />
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="password"
                className="font-semibold"
                style={{ color: "black" }}
              >
                Password:
              </label>
              <input
                type="password"
                required
                name="password"
                className="input-field"
                style={{ color: "black" }}
              />
            </div>
          </div>
          <div className="flex flex-col rounded-md border border-gray-300 p-2 shadow-md max-w-sm">
            <button
              type="submit"
              className="btn-primary"
              style={{ color: "black" }}
            >
              Login
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
