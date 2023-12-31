import React, { useContext, useState } from "react";
import QrScanner from "react-qr-scanner";
import axios from "axios";

import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import CarForm from "../CarForm/CarForm";
import LitoForm from "../LitoForm/LitoForm";
import ServiceForm from "../ServiceForm/ServiceForm";

const ScanQR = () => {
  const {
    user: { id: userID, department },
  } = useContext(AuthContext);
  const [isAttendanceChecked, setAttendanceChecked] = useState(false);
  console.log(userID);

  const handleScan = async (data) => {
    if (data && !isAttendanceChecked) {
      console.log(data);
      // debugger;
      try {
        setAttendanceChecked(true);
        // const timestamp = new Date().toISOString();
        const expectedQRDataArray = department.map(dept => `QR code for department ${dept.name}`);
        console.log(expectedQRDataArray);

        if (expectedQRDataArray.includes(data.text)) {
          const res = await axios.post(
            "https://qrcodecheckin-d350fcfb1cb9.herokuapp.com/api/employee/check-attendance",
            { employeeID: userID },
            { withCredentials: true }
          );

          if (res.data.success) {
            alert("Attendance checked successfully!");
          } else {
            alert("Expired QR code. Please generate a new QR code.");
          }
        } else {
          alert("Invalid QR code. Please scan the correct QR code.");
        }
      } catch (error) {
        console.error("Error:", error);
        alert("An error occurred.");
      } finally {
        setAttendanceChecked(false);
      }
    }
  };

  const handleError = (error) => {
    console.error("QR code scanning error:", error);
  };

  return (
    <div className="scan-qr-container mt-3">
      <h2>Scan QR Code</h2>
      <QrScanner
        onScan={handleScan}
        onError={handleError}
        style={{ width: "100%" }}
        key="environment"
        constraints={{ audio: false, video: { facingMode: "environment" } }}
      />
      {/* <CarForm 
        position={postion === 'Autofahrer'}
        attendance_id={attendanceID}
      />
      <LitoForm 
        position={postion === 'Lito'}
        attendance_id={attendanceID}
      />
      <ServiceForm 
        position={postion === 'Service'}
        attendance_id={attendanceID}
      /> */}
    </div>
  );
};

export default ScanQR;
