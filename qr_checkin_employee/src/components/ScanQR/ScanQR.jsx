import React, { useContext, useState, useEffect } from "react";
import QrScanner from "react-qr-scanner";
import axios from "axios";

import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import CarForm from "../CarForm/CarForm";
import LitoForm from "../LitoForm/LitoForm";
import ServiceForm from "../ServiceForm/ServiceForm";
import ServiceFormForgot from "../ServiceForm/ServiceFormForgot";
import LitoFormForgot from "../LitoForm/LitoFormForgot";
import CarFormForget from "../CarForm/CarFormForget";

const ScanQR = () => {
  const {
    user: { id: userID, department },
  } = useContext(AuthContext);
  const [isAttendanceChecked, setAttendanceChecked] = useState(false);

  const [position, setPosition] = useState();
  const [attendanceID, setAttendanceID] = useState();
  const [departmentCar, setDepartmentCar] = useState();
  const [positionForgot, setPositionForgot] = useState();
  const [attendanceIdForgot, setAttendanceIdForgot] = useState();
  const [isCheckout, setIsCheckout] = useState();
  const [attendObj, setAttendObj] = useState({});
  const [cameraEnabled, setCameraEnabled] = useState(true);

  const baseUrl = process.env.REACT_APP_BASE_API_URL;

  const userString = localStorage.getItem('user');
  const userObject = userString ? JSON.parse(userString) : null;

  useEffect(() => {
    const date = new Date();
    date.setHours(0, 0, 0, 0);
    const todayISO = date.toISOString();

    const getAttendanceHistory = async () => {
      try {
        const response = await axios.get(
          baseUrl + `/api/employee/get-attendance/current-month?employeeID=${userObject.id}&employeeName=${userObject.name}`
        );

        const attendanceHistory = response?.data?.message;
        const todayAttend = attendanceHistory.filter(item => item.date === todayISO);
        const forgotCheckAttendance = attendanceHistory.filter(item => item?.isAuto == true);
        if (forgotCheckAttendance != "") {
          setAttendObj(forgotCheckAttendance[0]);
          setPositionForgot(forgotCheckAttendance[0]?.position);
          setAttendanceIdForgot(forgotCheckAttendance[0]?._id);
          setCameraEnabled(false);
        }
        if (todayAttend.shift_info?.time_slot?.check_out_status === 'on time') {
          setIsCheckout(true);
        }
      } catch (error) {
        console.error(error);
      }
    }

    getAttendanceHistory();
  }, []);

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
                  setDepartmentCar(res?.data?.message?.department_name)
                  setCameraEnabled(false);
                }
                if (res?.data?.message?.shift_info?.time_slot?.check_out) {
                  setIsCheckout(res?.data?.message?.shift_info?.time_slot?.check_out);
                  if (res?.data?.message?.position === 'Lito') {
                    setPosition('Lito');
                    setAttendanceID(res?.data?.message?._id);
                    setCameraEnabled(false);
                  } else if (res?.data?.message?.position === 'Service') {
                    setPosition('Service');
                    setAttendanceID(res?.data?.message?._id);
                    setCameraEnabled(false);
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
        alert("An error occurred:"+ error.response?.data?.message);
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
      <h2>QR Scannen</h2>
      {cameraEnabled && (
        <QrScanner
          onScan={handleScan}
          onError={handleError}
          style={{ width: "100%" }}
          key="environment"
          constraints={{ 
            audio: false, 
            video: { facingMode: "environment" } 
          }}
        />
      )}
      <CarForm
        position={position}
        attendance_id={attendanceID}
        check_out={isCheckout}
        departmentCar={departmentCar}
      />
      <LitoForm
        position={position}
        attendance_id={attendanceID}        
      />
      <ServiceForm
        position={position}
        attendance_id={attendanceID}
      />

      <ServiceFormForgot
        positionForgot={positionForgot}
        attendance_id_forgot={attendanceIdForgot}
        department={ attendObj.department_name }
        // time={ attendObj.shift_info}
      />

      <LitoFormForgot
        positionForgot={positionForgot}
        attendance_id_forgot={attendanceIdForgot}
        department={ attendObj.department_name }
        // time={ attendObj.shift_info}
      />

      <CarFormForget
        positionForgot={positionForgot}
        attendance_id_forgot={attendanceIdForgot}
        department={ attendObj.department_name }
        // time={ attendObj.shift_info}
      />
      {/* <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#departmentSelect">
      Launch static backdrop modal
    </button> */}
    </div>
  );
};

export default ScanQR;
