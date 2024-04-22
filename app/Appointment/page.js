"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Head from "next/head";
import Image from "next/image";

export default function BookingPage() {
  const [doctors, setDoctors] = useState([]);
  const [timeSlots, setTimeSlots] = useState(null);
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [patientId, setPatientId] = useState(""); // New state for patient ID

  const fetchTimeSlots = async () => {
    try {
      const response = await axios.post(
        `http://localhost:3000/api/AvailableTime/${selectedDoctor}`,
        {
          selected_date: selectedDate,
        }
      );
      setTimeSlots(response.data);
    } catch (error) {
      console.error("Error fetching time slots:", error);
    }
  };

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/doctor");
        setDoctors(response.data);
      } catch (error) {
        console.error("Error fetching doctors:", error);
      }
    };

    fetchDoctors();
  }, []);

  const handleDoctorChange = (event) => {
    setSelectedDoctor(event.target.value);
  };

  const handleDateChange = async (event) => {
    setSelectedDate(event.target.value);
    await fetchTimeSlots();
  };

  const handleTimeChange = (event) => {
    setSelectedTime(event.target.value);
  };

  const handlePatientIdChange = (event) => {
    setPatientId(event.target.value);
  };

  const handleAppointmentSelection = (slot) => {
    const selectedSlot = document.getElementById(slot);
    if (selectedSlot.classList.contains("selected")) {
      selectedSlot.classList.remove("selected");
    } else {
      selectedSlot.classList.add("selected");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Add logic to submit appointment with selected data and patient ID
  };

  return (
    <div>
      <Head>
        <title>Book an Appointment</title>
        <meta name="description" content="Book an Appointment page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="container mx-auto p-8 max-w-md relative">
        <div className="rounded-md border border-gray-300 p-4 shadow-md">
          <h1
            className="text-3xl font-bold mb-6 text-center"
            style={{ color: "black" }}
          >
            Book an Appointment
          </h1>
          <form className="max-w-lg mx-auto" onSubmit={handleSubmit}>
            <div className="mb-4 flex flex-col">
              <label className="block mb-2" htmlFor="doctor">
                Doctor:
              </label>
              <select
                name="doctor"
                id="doctor"
                className="input-field"
                required
                style={{ color: "black" }}
                value={selectedDoctor}
                onChange={handleDoctorChange}
              >
                <option value="">Select a doctor</option>
                {doctors.map((doctor) => (
                  <option key={doctor.doc_id} value={doctor.doc_id}>
                    {doctor.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-4 flex flex-col">
              <label className="block mb-2" htmlFor="date">
                Date:
              </label>
              <input
                type="date"
                name="date"
                id="date"
                className="input-field"
                required
                style={{ color: "black" }}
                value={selectedDate}
                onChange={handleDateChange}
              />
            </div>

            {timeSlots && (
              <div className="mb-4 flex flex-col">
                <label className="block mb-2" htmlFor="time">
                  Time:
                </label>
                <select
                  name="time"
                  id="time"
                  className="input-field"
                  required
                  style={{ color: "black" }}
                  value={selectedTime}
                  onChange={handleTimeChange}
                >
                  <option value="">Select a time slot</option>
                  {timeSlots.map((slot) => (
                    <option
                      key={slot.Time_slot}
                      id={slot.Time_slot}
                      value={slot.Time_slot}
                      onClick={() => handleAppointmentSelection(slot)}
                    >
                      {slot.Time_slot}
                    </option>
                  ))}
                </select>
              </div>
            )}
            <div className="mb-4 flex flex-col">
              <label className="block mb-2" htmlFor="patientId">
                Patient ID:
              </label>
              <input
                type="text"
                name="patientId"
                id="patientId"
                className="input-field"
                required
                style={{ color: "black" }}
                value={patientId}
                onChange={handlePatientIdChange}
              />
            </div>
            <div className="mb-4 flex flex-col">
              <label className="block mb-2" htmlFor="reason">
                Reason for Appointment:
              </label>
              <textarea
                name="reason"
                id="reason"
                className="input-field"
                rows="2"
                required
                style={{ color: "black" }}
              />
            </div>
            <div className="flex flex-col rounded-md border border-gray-300 p-2 shadow-md max-w-sm">
              <button
                type="submit"
                className="btn-primary block mx-auto font-bold"
                style={{ color: "black" }}
              >
                Book Appointment
              </button>
            </div>
          </form>
        </div>
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
            src="/2315794.jpg"
            alt="Description of the image"
            width={1300}
            height={400}
          />
        </div>
      </main>
    </div>
  );
}
