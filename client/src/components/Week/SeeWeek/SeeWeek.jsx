import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import * as weeksService from '../../../services/weeksService.js';

import './SeeWeek.css';

function SeeWeek({ match }) {
    const [week, setWeek] = useState({});
    const weekId = match.params.id;

    useEffect(() => {
        weeksService
            .getDetails(weekId)
            .then(res => setWeek(res))
            .catch(err => console.error(err));
    }, []);

    return (
        <div className="see-week-wrapper">
            <h1 className="text-center pt-2 custom-font">Week {week.number}</h1>
            <hr />
            <div className="row m-2 text-center">
                <div className="col-md-3 bold-font">
                    <span className="custom-font">Me</span>
                    <div><i className="fas fa-weight"></i> Weight: {week.myWeight} kg</div>
                    <div><i className="fas fa-hand-point-right"></i> Belly Size: {week.myBellySize} cm</div>
                    {week.mood === 'Happy'
                        ? <div><i className="far fa-laugh-beam"></i> Mood: {week.mood}</div>
                        : <div><i className="far fa-sad-cry"></i> Mood: {week.mood}</div>}

                </div>
                <div className="col-md-6"><img src="../../../74724521-baby-shower-greeting-card-with-babies-boy-and-girl.jpg" alt="pic-current-week"></img></div>
                <div className="col-md-3 bold-font">
                    <span className="custom-font">Baby</span>
                    <div><i className="fas fa-weight"></i> Weight: {week.babyWeight} gr</div>
                    <div><i className="fas fa-hand-point-right"></i> Height: {week.babyHeight} mm</div>
                </div>
            </div>
            <hr />
            <p className="text-center">
                <Link to={`/week/memory/create/${weekId}`}><button className="btn btn-lg" role="button">Add Memory</button></Link>
            </p>
            <div className="fill pt-1 pb-1"></div>
        </div>
    );
}

export default SeeWeek;