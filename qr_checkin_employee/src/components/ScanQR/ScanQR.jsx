import React, { useContext, useState, useEffect } from "react";
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

  const [position, setPosition] = useState();
  const [attendanceID, setAttendanceID] = useState();
  const [isCheckout, setIsCheckout] = useState();

  const baseUrl = process.env.REACT_APP_BASE_API_URL;

  const userString = localStorage.getItem('user');
  const userObject = userString ? JSON.parse(userString) : null;

  const handleScan = async (data) => {
    if (data && !isAttendanceChecked) {
      try {
        setAttendanceChecked(true);

        const qrDataParts = data.text.split(' - ');
        if (qrDataParts.length === 2) {
          const departmentFromQR = qrDataParts[0];
          const timestampFromQR = new Date(qrDataParts[1]);
          const currentTimestamp = new Date();

          const expectedQRDataArray = department.map(dept => `QR code for department ${dept.name}`);
          if (expectedQRDataArray.includes(departmentFromQR)) {
            const timeDifference = currentTimestamp - timestampFromQR;
            if (timeDifference >= 0 && timeDifference <= 20000) {
              const res = await axios.post(
                `${baseUrl}/api/employee/check-attendance`,
                { employeeID: userID, employeeName: userObject.name },
                { withCredentials: true }
              );

              if (res.data.success) {
                alert("Attendance checked successfully!");
                if (res?.data?.message?.position === 'Autofahrer') {
                  setPosition('Autofahrer');
                  setAttendanceID(res?.data?.message?._id);
                }
                if (res?.data?.message?.shift_info?.time_slot?.check_out) {
                  setIsCheckout(res?.data?.message?.shift_info?.time_slot?.check_out);
                  if (res?.data?.message?.position === 'Lito') {
                    setPosition('Lito');
                    setAttendanceID(res?.data?.message?._id);
                  } else if (res?.data?.message?.position === 'Service') {
                    setPosition('Service');
                    setAttendanceID(res?.data?.message?._id);
                  }
                }
              } else {
                alert("Expired QR code. Please generate a new QR code.");
              }
            } else {
              alert("Expired QR code. Please generate a new QR code.");
            }
          } else {
            alert("Invalid QR code. Please scan the correct QR code.");
          }
        } else {
          alert("Invalid QR code format.");
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
        // constraints={{ audio: false, video: false }}
      />
      <CarForm 
        position={position}
        attendance_id={attendanceID}
        check_out={isCheckout}
      />
      <LitoForm 
        position={position}
        attendance_id={attendanceID}
      />
      <ServiceForm 
        position={position}
        attendance_id={attendanceID}
      />

    {/* <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#departmentSelect">
      Launch static backdrop modal
    </button> */}

    <div 
      style={{ display: position ? 'block' : 'none' }}
      className={`modal fade ${position ? 'show' : ''}`} 
      // style={{display: 'block'}}
      // className="modal fade show" 
      id="departmentSelect" data-bs-backdrop="static" 
      data-bs-keyboard="false" tabindex="-1" 
      aria-labelledby="departmentSelectLabel" aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="departmentSelectLabel">Select department</h1>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <select 
              class="form-select" 
              aria-label="Default select example"
            >
              <option selected>Open this select menu</option>
              <option value="1">C1</option>
              <option value="2">C2</option>
              <option value="3">C2</option>
            </select>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-primary">OK</button>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default ScanQR;