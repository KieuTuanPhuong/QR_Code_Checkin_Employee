import { Link } from "react-router-dom";

const Navigation = () => {
    return (
        <>
        <div className="container mt-3">
            <ul className="nav nav-underline nav-justified">
                <li className="nav-item">
                    <a className="nav-link" href="/">Home</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="check-in">Check in</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="schedule">Schedule</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="attendance-history" >Attendance history</a>
                </li>
            </ul>
        </div>
        </>
    );
}

export default Navigation;
