import { Calendar } from 'react-native-big-calendar'
import Navigation from '../../components/Navigation/Navigation';

const Schedule = () => {
    const events = [
        {
            title: 'Meeting',
            start: new Date(2023, 27, 12, 10, 0),
            end: new Date(2023, 1, 11, 10, 30),
        },
        {
            title: 'Coffee break',
            start: new Date(2020, 1, 11, 15, 45),
            end: new Date(2020, 1, 11, 16, 30),
        },
    ];

    return (
        <>
        <Navigation />
        <div className="container mt-5">
            <Calendar 
                events={events} 
                height={600}
                selectable 
                views={["day", "week", "month"]}
            />
        </div>
        </>
    ); 
}

export default Schedule;
