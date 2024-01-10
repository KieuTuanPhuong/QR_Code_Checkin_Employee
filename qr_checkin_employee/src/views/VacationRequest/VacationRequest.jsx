import { useState, useContext } from "react";
import axios from "axios";
import { format } from "date-fns/format";

import { AuthContext } from "../../context/AuthContext";
import Navigation from "../../components/Navigation/Navigation";
import RequestHistory from "../../components/RequestHistory/RequestHistory";
import BootstrapDatepicker from "../../components/BootstrapDatepicker/BootstrapDatepicker";

const VacationRequest = () => {

    const [isLoading, setIsLoading] = useState(false);

    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    const [formData, setFormData] = useState({
        request_dayOff_start: format(startDate, 'MM/dd/yyy'),
        request_dayOff_end: format(endDate, 'MM/dd/yyyy'),
        request_content: '',
    });

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

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
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

            <label className="form-label">Reason</label>
            <div className="input-group mb-3">
                <textarea 
                    className="form-control" 
                    id="exampleFormControlTextarea1" 
                    rows="3"
                    name="request_content"
                    value={ formData.request_content }
                    onChange={ handleInputChange }
                    disabled={isLoading}
                ></textarea>
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
