import { useState, useEffect, useContext } from 'react';

import Calendar from 'react-calendar';
import "react-calendar/dist/Calendar.css";
import "../Calendar/calendar.css";
import axios from 'axios';
// import { format } from "date-fns-tz";
import { shiftType } from '../../assets/data/data';
import "./Attendance.css";
import Navigation from '../../components/Navigation/Navigation';
import { AuthContext } from '../../context/AuthContext';

const Attendance = (props) => {
    const { id, name, departmentDefined, role } = props
    console.log(departmentDefined);
    const [selectedYear, setSelectedYear] = useState(new Date());
    const [selectedMonth, setSelectedMonth] = useState(null);
    const [employeeData, setEmployeeData] = useState(null);
    const [FormState, setFormState] = useState(false);
    const [addShiftFormState, setAddShiftFormState] = useState(true);
    const [inforShiftFormState, setInforShiftFormState] = useState(false);
    const [selectedDate, setSelectedDate] = useState("");
    const [dateFormDb, setDateFormDb] = useState("")
    const [loading, setLoading] = useState(false);
    const [selectedShift, setSelectedShift] = useState(null);
    const [attendanceDataByDate, setAttendanceDataByDate] = useState()
    const [scheduleDataByDate, setScheduleDataByDate] = useState()
    const [scheduleEmployee, setScheduleEmployee] = useState()
    const [shiftDataByDate, setShiftDataByDate] = useState()

    const {
        user: { id: userID }
    } = useContext(AuthContext)


    const baseUrl = process.env.REACT_APP_BASE_API_URL;

    const userString = localStorage.getItem('user');
    const userObject = userString ? JSON.parse(userString) : null;

    const fetchScheduleEmployyee = async () => {

        try {
            const response = await axios.get(
                baseUrl + `/api/employee/get-attendance?employeeID=${userID}&employeeName=${userObject.name}`,
                { withCredentials: true }
            );
            setScheduleEmployee(response.data);
            // setShiftDataByDate(employeeData?.message[0]?.department?.map((item) => item?.schedules));
        } catch (error) {
            console.error("Error fetching employee data:", error);
        }
    };

    // useEffect(() => {
    //     setUserObject(userObject)
    //     console.log(userObject);
    // }, [])

    useEffect(() => {
        fetchScheduleEmployyee();

        const fetchAttendanceDataByDate = async () => {
            if (userObject?.role === "Admin") {
                try {
                    const year = selectedDate.substring(0, 4);
                    const month = selectedDate.substring(5, 7);
                    const day = selectedDate.substring(8, 10)
                    const date = `${month}/${day}/${year}`
                    const response = await axios.get(
                        baseUrl + `/api/admin/manage-attendance/get-by-specific?employeeID=${id}&year=${year}&month=${month}&date=${dateFormDb}`,
                        { withCredentials: true }
                    );

                    setAttendanceDataByDate(response.data.message);
                    console.log("attendance", response.data);
                } catch (error) {
                    if (error.response && error.response.status) {
                        if (error.response.status === 404) {
                            setAttendanceDataByDate([])
                        }
                    } else {
                        console.error("Error fetching schedule data:", error.message);
                    }
                }
            }
            if (userObject?.role === "Inhaber") {
                try {
                    const year = selectedDate.substring(0, 4);
                    const month = selectedDate.substring(5, 7);
                    const day = selectedDate.substring(8, 10)
                    const date = `${month}/${day}/${year}`
                    const response = await axios.get(
                        baseUrl + `/api/inhaber/manage-attendance/get-by-specific?inhaber_name=${userObject?.name}&employeeID=${id}&year=${year}&month=${month}&date=${dateFormDb}`,
                        { withCredentials: true }
                    );

                    setAttendanceDataByDate(response.data.message);
                    console.log("attendance", response.data);
                } catch (error) {
                    if (error.response && error.response.status) {
                        if (error.response.status === 404) {
                            setAttendanceDataByDate([])
                        }
                    } else {
                        console.error("Error fetching schedule data:", error.message);
                    }
                }
            }
        };
        fetchAttendanceDataByDate();

    }, [id, selectedDate, dateFormDb, role, userObject?.role]);

    if (shiftDataByDate) {
        console.log("sdfdfsfd", shiftDataByDate);
    }

    const renderTileContent = ({ date }) => {
        if (!scheduleEmployee || !scheduleEmployee.message) return null;
        const dataForDate = scheduleEmployee?.message
            ?.filter((schedule) => {
                const scheduleDate = new Date(schedule.date);
                return scheduleDate.toDateString() === date.toDateString();
            })
            .map((schedule) => ({
                departmentName: schedule.department_name,
                shiftCode: schedule.shift_info.shift_code,
                check_in_time: schedule.shift_info.time_slot?.check_in_time,
                check_out_time: schedule.shift_info.time_slot?.check_out_time,
                check_in_status: schedule.shift_info.time_slot?.check_in_status,
                check_out_status: schedule.shift_info.time_slot?.check_out_status,
                status: schedule.status,
                results: schedule.results,
            }));

        return (
            <div className={`font-Changa calendar-tile ${dataForDate?.length > 0 ? "scheduled" : ""}`}>
                {/* You can customize the content of the tile here */}
                {dataForDate?.length > 0 ? (
                    dataForDate.map(({ status, departmentName, shiftCode, check_in_time, check_out_time, check_out_status, check_in_status, results }, index) => (
                        <div key={index} className="d-flex flex-column gap-2 border-secondary py-2 rounded-3 mt-2 bg-light align-items-center justify-content-center fw-bold">
                            <div className='d-flex flex-row gap-2'>
                                <div className="border border-danger bg-danger ms-2 rounded-circle" style={{ width: "0.6rem", height: "0.6rem" }}></div>
                                <div className="text-dark">{departmentName}: {shiftCode}</div>
                            </div>
                            {status === "missing" ? (<div className='text-black'>{status}</div>) : (<div className='flex flex-col'>
                                <div className="text-dark">Check-in: {check_in_time}-{check_in_status}</div>
                                <div className="text-dark">Check-out: {check_out_time}-{check_out_status}</div>
                                <div className="text-dark">Result: {results}</div>
                            </div>)}
                        </div>
                    ))
                ) : (
                    <div></div>
                )}
            </div>
        );
    };

    const handleMonthChange = (date) => {
        setSelectedMonth(date);
    };
    return (
        <>
            <Navigation />
            <div className="flex flex-col justify-center items-center w-full gap-4 font-Changa text-textColor mt-3">
                <h2 className="text-2xl font-bold">Schedule Calendar</h2>
                {selectedYear && (
                    <Calendar
                        onChange={handleMonthChange}
                        value={selectedMonth}
                        view="month"
                        showNeighboringMonth={false}
                        tileContent={renderTileContent}
                    />
                )}
            </div>
        </>
    );
}

export default Attendance;
