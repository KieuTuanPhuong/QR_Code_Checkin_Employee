const LitoForm = () => {
    return (
        <>
        <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#litoForm">
            Open lito form
        </button>

        <div className="modal fade" id="litoForm" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="litoFormLabel" aria-hidden="true">
            <div className="modal-dialog">
                {/* Header */}
                <div className="modal-content">
                <div className="modal-header">
                    <h1 className="modal-title fs-5" id="litoFormLabel">Lito</h1>
                </div>

                {/* Body */}
                <div className="modal-body">
                    <label className="form-label">Revenue</label>
                    <div className="input-group mb-3">
                        <span className="input-group-text">$</span>
                        <input type="number" className="form-control" aria-label="Amount (to the nearest dollar)" />
                        <span className="input-group-text">.00</span>
                    </div>
                    <label className="form-label">Tips</label>
                    <div className="input-group mb-3">
                        <span className="input-group-text">$</span>
                        <input type="number" className="form-control" aria-label="Amount (to the nearest dollar)" />
                        <span className="input-group-text">.00</span>
                    </div>
                    <label className="form-label">Expends</label>
                    <div className="input-group mb-3">
                        <span className="input-group-text">$</span>
                        <input type="number" className="form-control" aria-label="Amount (to the nearest dollar)" />
                        <span className="input-group-text">.00</span>
                    </div>
                    <label className="form-label">Upload image</label>
                    <div className="input-group mb-3">
                        <input type="file" className="form-control" id="inputGroupFile01" />
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

export default LitoForm;
