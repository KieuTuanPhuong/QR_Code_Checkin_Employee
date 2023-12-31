import axios from "axios";
import { useState, useEffect, useContext } from "react";

import AuthContext from "../../context/AuthContext";

const CarForm = (props) => {
    const [selectedCartype, setSelectedCartype] = useState('company');
    const handleCartypeChange = (event) => {
        setSelectedCartype(event.target.value);

        if (selectedCartype === "private") {
            setNumberPlate('');
            setRegisterDate('');
        }
    }

    const [carOptions, setCarOptions] = useState([]);
    const [numberPlate, setNumberPlate] = useState('');
    const [registerDate, setRegisterDate] = useState('');
    
    useEffect(() => {
        const getCompanyCars = async () => {
            try {
                const response = await axios.get(
                    `https://qrcodecheckin-d350fcfb1cb9.herokuapp.com/api/employee/get-car`,
                );
                setCarOptions(response?.data?.message);
            } catch (error) {
                console.error('wrong');
            }
        }

        getCompanyCars();

    }, []);

    const handleSelectCar = (event) => {
        event.preventDefault()
        const selectedValue = event.target.value;

        if (selectedValue === 'Car 1') {
            setNumberPlate('30F-333.33');
            setRegisterDate('2023-12-24');
        } else if (selectedValue === 'Car 2') {
            setNumberPlate('30F-999.99');
            setRegisterDate('2023-12-24');
        }
    }


    return (
        <>
        <div className={`modal fade ${props.showModal === 'Autofahrer' ? 'show' : ''}`} id="autofahrerForm" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="autofahrerFormLabel" aria-hidden="true">
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
                        <select 
                            className="form-select mb-3" 
                            id="inputGroupSelect01"
                            onChange={ handleSelectCar }
                        >
                            <option value="">Choose...</option>
                            {carOptions?.map(option => (
                                <option key={ option._id } value={ option.car_name }>
                                    { option.car_name }
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Number plate</label>
                        <input 
                            type="text" className="form-control mb-3" 
                            id="" placeholder="Enter car's number plate"
                            value={numberPlate}
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Register date</label>
                        <input 
                            type="text" className="form-control mb-3" 
                            placeholder="Enter car's register date" 
                            value={registerDate}
                        />
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
