"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Prescription.css";

export default function PrescriptionPage() {
  const [patient_id, setPatientId] = useState("");
  const [doctor_id, setDoctorId] = useState("");
  const [prescriptions, setPrescriptions] = useState([]);

  useEffect(() => {
    fetchPrescriptions();
  }, []);

  const fetchPrescriptions = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/Prescription"
      );
      setPrescriptions(response.data);
    } catch (error) {
      console.error("Error fetching prescriptions:", error);
    }
  };

  const handleInputChange = (index, field, value) => {
    const updatedPrescriptions = [...prescriptions];
    updatedPrescriptions[index][field] = value;
    setPrescriptions(updatedPrescriptions);
  };

  const addRow = () => {
    setPrescriptions([
      ...prescriptions,
      {
        medicine_name: "",
        dosage: "",
        duration: "",
        quantity: "",
        instruction: "",
      },
    ]);
  };

  const savePrescriptions = async () => {
    console.log({
      patient_id,
      doctor_id,
      prescriptions,
    });

    try {
      await axios.post("http://localhost:3000/api/Prescription", {
        patient_id,
        doctor_id,
        prescriptions,
      });
      console.log("Prescriptions saved successfully!");
    } catch (error) {
      console.error("Error saving prescriptions:", error);
    }
  };

  return (
    <div className="container">
      <h1>Prescriptions</h1>
      <div className="input-container">
        <label>Patient ID: </label>
        <input
          type="text"
          value={patient_id}
          onChange={(e) => setPatientId(e.target.value)}
        />
      </div>

      <div className="input-container">
        <label>Doctor ID: </label>
        <input
          type="text"
          value={doctor_id}
          onChange={(e) => setDoctorId(e.target.value)}
        />
      </div>
      <button className="add-btn" onClick={addRow}>
        Add Row
      </button>
      <table className="prescription-table">
        <thead>
          <tr>
            <th>Medicine Name</th>
            <th>Dosage</th>
            <th>Duration</th>
            <th>Quantity</th>
            <th>Instruction</th>
          </tr>
        </thead>
        <tbody>
          {prescriptions.map((prescription, index) => (
            <tr key={index}>
              <td>
                <input
                  type="text"
                  value={prescription.medicine_name}
                  style={{ color: "black" }}
                  onChange={(e) =>
                    handleInputChange(index, "medicine_name", e.target.value)
                  }
                />
              </td>
              <td>
                <input
                  type="text"
                  value={prescription.dosage}
                  style={{ color: "black" }}
                  onChange={(e) =>
                    handleInputChange(index, "dosage", e.target.value)
                  }
                />
              </td>
              <td>
                <input
                  type="text"
                  value={prescription.duration}
                  style={{ color: "black" }}
                  onChange={(e) =>
                    handleInputChange(index, "duration", e.target.value)
                  }
                />
              </td>
              <td>
                <input
                  type="text"
                  value={prescription.quantity}
                  style={{ color: "black" }}
                  onChange={(e) =>
                    handleInputChange(index, "quantity", e.target.value)
                  }
                />
              </td>
              <td>
                <input
                  type="text"
                  value={prescription.instruction}
                  style={{ color: "black" }}
                  onChange={(e) =>
                    handleInputChange(index, "instruction", e.target.value)
                  }
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="save-btn" onClick={savePrescriptions}>
        Save Prescriptions
      </button>
    </div>
  );
}
