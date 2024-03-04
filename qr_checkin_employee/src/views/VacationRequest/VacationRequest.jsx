import { useState, useContext } from "react";
import axios from "axios";
import { format } from "date-fns/format";

import { AuthContext } from "../../context/AuthContext";
import Navigation from "../../components/Navigation/Navigation";
import RequestHistory from "../../components/RequestHistory/RequestHistory";
import BootstrapDatepicker from "../../components/BootstrapDatepicker/BootstrapDatepicker";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

const VacationRequest = () => {

    const [isLoading, setIsLoading] = useState(false);
    
    const [type, setType] = useState('Holiday');
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    const formData = {
        request_dayOff_start: format(startDate, 'MM/dd/yyy'),
        request_dayOff_end: format(endDate, 'MM/dd/yyyy'),
        request_content: type,
    };

    const {
        user: {id: userID}
    } = useContext(AuthContext);

    const userString = localStorage.getItem('user');
    const userObject = userString ? JSON.parse(userString) : null;

    const baseUrl = process.env.REACT_APP_BASE_API_URL;

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);

        try {
            const response = await axios.post(
                baseUrl + `/api/employee/create-request?employeeID=${userID}&employeeName=${userObject.name}`,
                formData,
            );
            alert("Successfully sent the request!");
            setIsLoading(false);
        } catch (err) {
            alert(err.response?.data?.message);
            setIsLoading(false);
        }
    }

    return (
        <>
        <Navigation />
        <div className="container p-4 mt-5">
            <h4 className="mb-3">Request vacation form</h4>
            
            <label className="form-label">Start day</label>
            <div className="mb-3">
                <BootstrapDatepicker
                    wrapperClassName="datepicker" 
                    className="form-control"
                    dateFormat="dd/MM/yyyy"
                    name="request_dayOff_start"
                    selected={startDate} 
                    onChange={(date) => setStartDate(date)}
                />
            </div>

            <label className="form-label">End day</label>
            <div className="mb-3 w-100">
                <BootstrapDatepicker
                    wrapperClassName="datepicker" 
                    className="form-control w-100"
                    dateFormat="dd/MM/yyyy"
                    selected={endDate} 
                    onChange={(date) => setEndDate(date)} 
                />
            </div>

            <label className="form-label">Type</label>
            <div className="mb-3">
                <input 
                    type="radio" className="btn-check" 
                    name="request_content" id="holidayOption" 
                    autoComplete="off"
                    value="Holiday"
                    onChange={(val) => setType(val)}
                />
                <label className="btn btn-outline-primary" htmlFor="holidayOption">Holiday</label>

                <div className="vr m-1"></div>

                <input 
                    type="radio" className="btn-check" 
                    name="request_content" id="sickdayOption" 
                    autoComplete="off" 
                    value="Sick day"
                    onChange={(val) => setType(val)}
                />
                <label className="btn btn-outline-primary" htmlFor="sickdayOption">Sick day</label>
            </div>

            <div className="">
                <button 
                    className="btn btn-primary"
                    onClick={ handleFormSubmit }
                    disabled={isLoading}
                >
                    <span name="loading" aria-hidden="true" 
                        className={
                            `spinner-border spinner-border-sm me-2
                            ${isLoading ? '' : 'd-none'}`
                        }
                    ></span>
                    <span name="loading" className={`${isLoading ? '' : 'd-none'}`} role="status">Sending...</span>
                    <span name="submitBtn" className={`${isLoading ? 'd-none' : ''}`}>Send request</span>
                </button>

                <RequestHistory />
            </div>
        </div>
        </>
    );
}

export default VacationRequest;
