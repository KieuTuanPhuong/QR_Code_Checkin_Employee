import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const LitoFormForgot = ( props ) => {
    const [formData, setFormData] = useState({
        bar: '',
        kredit_karte: '',
        kassen_schniff: '',
        gesamt_ligerbude: '',
        gesamt_liegerando: '',
    });

    const [formValid, setFormValid] = useState({
        bar: false,
        kredit_karte: false,
        kassen_schniff: false,
        gesamt_ligerbude: false,
        gesamt_liegerando: false,
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        const newFormData = {
            ...formData,
            [name]: value,
        };
    
        setFormData(newFormData);
        setFormValid({
            ...formValid,
            [name]: value !== '',
        });
    };

    const navigate = useNavigate();
    const isFormValid = Object.values(formValid).every((field) => field);

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post(
                `https://qrcodecheckin-d350fcfb1cb9.herokuapp.com/api/employee/update-attendance?attendanceID=${ props.attendance_id_forgot }`,
                formData,
            );
            alert("Successfully update!");
            navigate('/schedule');
        } catch (error) {
            alert(error.response?.data?.message);
        }
    };    
    
    return (
        <>
        {/* Manually open the Form */}
        {/* <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#litoForm">
            Open lito form
        </button> */}

        <div 
            style={{ display: props.positionForgot === 'Lito' ? 'block' : 'none' }}
            className={`modal fade ${props.positionForgot === 'Lito' ? 'show' : ''}`} 
            id="litoForm" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" 
            aria-labelledby="litoFormLabel" aria-hidden="true"
        >
            <div className="modal-dialog">
                {/* Header */}
                <div className="modal-content">
                <div className="modal-header d-flex flex-column align-items-start">
                    <h1 className="modal-title" id="litoFormLabel">Filiale { props.department }</h1>
                    <h3 className="modal-title fs-5">Lito</h3>
                    {/* <h3><span className="badge text-bg-success">{ props.time }</span></h3> */}
                </div>

                {/* Body */}
                <div className="modal-body">
                    <div className="form-floating mb-3">
                        <input 
                            type="number" placeholder="Enter bar"
                            className={`form-control ${isFormValid ? '' : 'is-invalid'}`} 
                            name='bar'
                            value={ formData.bar }
                            onChange={ handleInputChange }
                        />
                        <label>BAR</label>
                        <div className="invalid-feedback">
                            This field is required.
                        </div>
                    </div>

                    <div className="input-group has-validation mb-3">
                        <div className={`form-floating ${isFormValid ? '' : 'is-invalid'}`}>
                            <input   
                                type="number" placeholder="Username"
                                className={`form-control ${isFormValid ? '' : 'is-invalid'}`} 
                                name='kredit_karte'
                                value={ formData.kredit_karte }
                                onChange={ handleInputChange }
                            />
                            <label>Kreditkarte</label>
                        </div>
                        <div className="invalid-feedback">
                            This field is required.
                        </div>
                    </div>

                    <div className="input-group mb-3">
                        <div className={`form-floating ${isFormValid ? '' : 'is-invalid'}`}>
                            <input   
                                type="number" placeholder="Username" 
                                className={`form-control ${isFormValid ? '' : 'is-invalid'}`} 
                                name='kassen_schniff'
                                value={ formData.kassen_schniff }
                                onChange={ handleInputChange }
                            />
                            <label>Kassenschnitt</label>
                        </div>
                        <div className="invalid-feedback">
                            This field is required.
                        </div>
                    </div>

                    <div className="input-group mb-3">
                        <div className={`form-floating ${isFormValid ? '' : 'is-invalid'}`}>
                            <input   
                                type="number" placeholder="Username" 
                                className={`form-control ${isFormValid ? '' : 'is-invalid'}`} 
                                name='gesamt_ligerbude'
                                value={ formData.gesamt_ligerbude }
                                onChange={ handleInputChange }
                            />
                            <label>Gesamt Liferbude</label>
                        </div>
                        <div className="invalid-feedback">
                            This field is required.
                        </div>
                    </div>

                    <div className="input-group mb-3">
                        <div className={`form-floating ${isFormValid ? '' : 'is-invalid'}`}>
                            <input   
                                type="number" placeholder="Username" 
                                className={`form-control ${isFormValid ? '' : 'is-invalid'}`} 
                                name='gesamt_liegerando'
                                value={ formData.gesamt_liegerando }
                                onChange={ handleInputChange }
                            />
                            <label>Gesamt Liferando</label>
                        </div>
                        <div className="invalid-feedback">
                            This field is required.
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="modal-footer">
                    <button 
                        type="button" className="btn btn-secondary" 
                        data-bs-dismiss="modal"
                        disabled={ !isFormValid }
                        onClick={ handleSubmit }                    
                    >
                        Submit
                    </button>
                </div>
                </div>
            </div>
        </div>
        </>
    ); 
}

export default LitoFormForgot;
