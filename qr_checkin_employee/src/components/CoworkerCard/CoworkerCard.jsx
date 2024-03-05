const CoworkerCard = (props) => {
    const employees = props.employees;
    return (
        <>
            <div className="row">
                <div className="col-12 col-sm-6 col-md-4 col-lg-3">
                    <div className="card border-dark mb-3">
                        <div className="card-header">{ props.shiftName }</div>
                        <div className="card-body text-dark">
                            <h5 className="card-title">{ props.schedule }</h5>
                            {employees.map((index, item) => {
                                <p className="card-text">{ item }</p>
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CoworkerCard;

