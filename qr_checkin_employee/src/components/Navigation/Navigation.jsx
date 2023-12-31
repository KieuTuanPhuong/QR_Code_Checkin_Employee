const Navigation = () => {
    return (
        <>
        <div className="container mt-3">
            <ul className="nav nav-underline nav-justified">
                <li className="nav-item">
                    <a className="nav-link" href="schedule">Schedule</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="attendance-history" >Attendance history</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="vacation-request" >Vacation request</a>
                </li>
            </ul>
        </div>
        </>
    );
}

export default Navigation;
