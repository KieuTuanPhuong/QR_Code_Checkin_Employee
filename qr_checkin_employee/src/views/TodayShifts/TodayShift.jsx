import { useEffect, useState } from "react";
import axios from "axios";
import { format } from "date-fns/format";


import Navigation from "../../components/Navigation/Navigation";
import CoworkerCard from "../../components/CoworkerCard/CoworkerCard";

const TodayShifts = () => {
    const date = new Date();
    const [shiftObj, setShiftObj] = useState([]);

    const userString = localStorage.getItem('user');
    const userObject = userString ? JSON.parse(userString) : null;

    const today = format(date, 'MM/dd/yyy');
    useEffect(() => {
        const baseUrl = process.env.REACT_APP_BASE_API_URL;

        const getCoWorker = async () => {
            try {
                const response = await axios.get(
                    baseUrl + `/api/employee/get-co-worker?employeeID=${userObject.id}&employeeName=${userObject.name}&department_name=${userObject.department[0].name}&date=${today}`
                );
                setShiftObj(response?.data?.message);
            } catch (error) {
                console.error('No shifts found today!');
            }
        }
        getCoWorker();
    }, []);

    return (
        <>
        <Navigation />
        <div className="container mt-5">
            {shiftObj.map((item) => {
                return <CoworkerCard
                    shiftName={item.shiftKey}
                    schedule={item.time}
                    employees={item.info}
                />
            })}            

        </div>
        </>
    );
}

export default TodayShifts;
