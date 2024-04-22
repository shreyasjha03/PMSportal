"use client";
import axios from "axios";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

export default function DoctorSignUp() {
  return (
    <div>
      <Head>
        <title>DoctorSignUp</title>
        <meta name="description" content="Sign up page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="container mx-auto p-8 max-w-md">
        <h1
          className="text-3xl font-bold mb-4 text-center"
          style={{ color: "black" }}
        >
          Doctor Sign Up
        </h1>
        <form
          className="space-y-4"
          onSubmit={async (e) => {
            e.preventDefault();
            const {
              username,
              password,
              qualification,
              name,
              gender,
              dob,
              address,
              phoneno,
              email,
            } = e.target.elements;
            console.log(
              username,
              password,
              qualification,
              name,
              gender,
              dob,
              address,
              phoneno,
              email
            );
            console.log(e);
            const res = await axios.post(
              "http://localhost:3000/api/SignupDoctor",
              {
                username: username.value,
                password: password.value,
                qualification: qualification.value,
                name: name.value,
                gender: gender.value,
                dob: dob.value,
                address: address.value,
                phoneno: phoneno.value,
                email: email.value,
              }
            );
            console.log(res.data);
          }}
        >
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "200%",
              height: "100%",
              zIndex: -1,
              opacity: 0.5,
            }}
          >
            <Image
              src="/signup.jpg"
              alt="Description of the image"
              width={1300}
              height={400}
            />
          </div>
          <div className="rounded-md border border-gray-300 p-4 shadow-md">
            <div className="flex flex-col">
              <label htmlFor="username" className="font-semibold">
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
              <label htmlFor="password" className="font-semibold">
                Password:
              </label>
              <input
                type="text"
                required
                name="password"
                className="input-field"
                style={{ color: "black" }}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="qualification" className="font-semibold">
                Qualification:
              </label>
              <input
                type="text"
                required
                name="qualification"
                className="input-field"
                style={{ color: "black" }}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="name" className="font-semibold">
                Name:
              </label>
              <input
                type="text"
                required
                name="name"
                className="input-field"
                style={{ color: "black" }}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="gender" className="font-semibold">
                Gender:
              </label>
              <select
                id="gender"
                name="gender"
                required
                style={{ color: "black" }}
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
            <div className="flex flex-col">
              <label htmlFor="dob" className="font-semibold">
                Date Of Birth:
              </label>
              <input
                type="date"
                required
                id="dob"
                className="input-field"
                style={{ color: "black" }}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="address" className="font-semibold">
                Address:
              </label>
              <input
                type="text"
                required
                name="address"
                className="input-field"
                style={{ color: "black" }}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="phoneno" className="font-semibold">
                Phone no:
              </label>
              <input
                type="tel"
                required
                name="phoneno"
                className="input-field"
                style={{ color: "black" }}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="email" className="font-semibold">
                Email:
              </label>
              <input
                type="email"
                required
                name="email"
                className="input-field"
                style={{ color: "black" }}
              />
            </div>
          </div>
          <div className="flex flex-col rounded-md border border-gray-300 p-4 shadow-md max-w-sm">
            <button
              type="submit"
              className="btn-primary font-bold"
              style={{ color: "white" }}
            >
              Register Doctor
            </button>
          </div>
          <h1
            className="text-l font-semibold mt-4 mb-4 text-center"
            style={{ color: "white" }}
          >
            <Link href="/Doctor">Redirect to Login Page</Link>
          </h1>
        </form>
      </main>
    </div>
  );
}
