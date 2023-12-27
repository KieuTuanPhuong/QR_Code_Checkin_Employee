import axios from "axios";
import { useState } from "react";

const CarForm = () => {
    const [selectedCartype, setSelectedCartype] = useState('company');
    const handleCartypeChange = (event) => {
        setSelectedCartype(event.target.value);
    }
    
    const [formData, setFormData] = useState({
        car_type: '',
        car_number: '',
        check_in_km: '',
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post('your-api-endpoint', formData);

            console.log(response.data);
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    return (
        <>
        <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#autofahrerForm">
            Open autofahrer form
        </button>

        <div className="modal fade" id="autofahrerForm" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="autofahrerFormLabel" aria-hidden="true">
            <div className="modal-dialog">
                {/* Header */}
                <div className="modal-content">
                <div className="modal-header">
                    <h1 className="modal-title fs-5" id="autofahrerFormLabel">Autofahrer</h1>
                </div>

                {/* Body */}
                <div className="modal-body">
                    <label className="form-label">Car type</label>
                    <div className="form-check">
                        <input className="form-check-input" type="radio" name="car_type" 
                            value="company" 
                            checked={selectedCartype === "company"} 
                            onChange={handleCartypeChange}
                            id="companyCar"
                        />
                        <label className="form-check-label" htmlFor="companyCar">
                            Company
                        </label>
                    </div>
                    <div className="form-check mb-3">
                        <input className="form-check-input" type="radio" name="car_type" 
                            value="private"
                            checked={selectedCartype === "private"} 
                            onChange={handleCartypeChange}
                            id="privateCar"
                        />
                        <label className="form-check-label" htmlFor="privateCar">
                            Private
                        </label>
                    </div>

                    <div className={selectedCartype !== "company" ? 'd-none' : ''}>
                        <label className="form-label">Car name</label>
                        <input type="text" className="form-control mb-3" placeholder="Enter car's name" />
                    </div>
                    <div className={selectedCartype !== "private" ? 'd-none' : ''}>
                        <label className="form-label">Number plate</label>
                        <input type="text" className="form-control mb-3" id="" placeholder="Enter car's number plate" />
                    </div>
                    
                    <label className="form-label">Number of kilometers (check-in)</label>
                    <div className="input-group mb-3">
                        <input type="number" className="form-control" placeholder="Enter number of kilometers" />
                        <span className="input-group-text" >kilometer(s)</span>
                    </div>
                    <label className="form-label">Number of kilometers (check-out)</label>
                    <div className="input-group mb-3">
                        <input type="number" className="form-control" placeholder="Enter number of kilometers" />
                        <span className="input-group-text" >kilometer(s)</span>
                    </div>
                </div>

                {/* Footer */}
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Submit</button>
                </div>
                </div>
            </div>
        </div>
        </>
    );
}

export default CarForm;
