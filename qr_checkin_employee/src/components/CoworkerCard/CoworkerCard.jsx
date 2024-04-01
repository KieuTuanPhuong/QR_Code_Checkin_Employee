const CoworkerCard = (props) => {
    const employees = props.employees;
    return (
        <>
            <div className="row">
                <div className="col-12 col-sm-6 col-md-4 col-lg-3">
                    <div className="card border-dark mb-3 shadow">
                        <div className="card-header">Filiale {props.department}</div>
                        <div className="card-body text-dark">
                            <h5 className="card-title">{props.shift_code}</h5>
                            <h5><span class="badge text-bg-success">{ props.time }</span></h5>
                            {employees.map((employee, index) => 
                                <div key={index} className="flex flex-col">
                                    <div>{employee.id} ~ {employee.name}</div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CoworkerCard;

