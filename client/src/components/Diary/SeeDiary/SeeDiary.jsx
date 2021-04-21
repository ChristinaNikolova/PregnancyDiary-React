import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import * as diariesService from '../../../services/diariesService.js';
import * as authService from '../../../services/authService.js';
import SeeBaby from '../../Baby/SeeBaby/SeeBaby.jsx';
import DiaryPicture from '../../shared/DiaryPicture/DiaryPicture.jsx';
import WeeksList from '../../Week/WeeksList/WeeksList.jsx';

import './SeeDiary.css';

function SeeDiary({ match, history }) {
    const [diary, setDiary] = useState({});
    const [hasToReload, setHasToReload] = useState(false);
    const diaryId = match.params.id;

    useEffect(() => {
        if (!authService.isAuthenticated()) {
            history.push('/login');
            return;
        };

        diariesService
            .getDiary(diaryId)
            .then(res => setDiary(res))
            .then(setHasToReload(false))
            .catch(err => console.error(err));
    }, [hasToReload]);

    const reload = () => {
        setTimeout(() => {
            setHasToReload(true)
        }, 100);
    };

    const getGender = () => {
        if (diary.genderAsString === 'Girl') {
            return <div className="col-md-4"><i className="fas fa-heart girl mr-1"></i><span className="ml-1 mr-1 custom-font bold">Gender:</span><span>{diary.genderAsString}</span></div>
        } else if (diary.genderAsString === 'Boy') {
            return <div className="col-md-4"><i className="fas fa-heart boy mr-1"></i><span className="ml-1 mr-1 custom-font bold">Gender:</span><span>{diary.genderAsString}</span></div>
        } else if (diary.genderAsString === 'Surprice') {
            return <div className="col-md-4"><i className="fas fa-gift mr-1"></i><span className="ml-1 mr-1 custom-font bold">Gender:</span><span>{diary.genderAsString}</span></div>
        } else {
            return <div className="col-md-4"><i className="fas fa-question mr-1"></i><span className="ml-1 mr-1 custom-font bold">Gender:</span><span>I don't know yet</span></div>
        }
    };

    return (
        <div className="my-diary-wrapper">
            <h1 className="text-center pt-2 custom-font">My Diary</h1>
            <hr />
            <DiaryPicture />
            <div className="row m-2 text-center">
                <div className="col-md-4"><i className="fas fa-sun mr-1"></i><span className="ml-1 mr-1 custom-font bold">Positive test:</span><span>{diary.positiveTestAsString}</span></div>
                <div className="col-md-4"><i className="fas fa-calendar-check mr-1"></i><span className="ml-1 mr-1 custom-font bold">Due date:</span><span>{diary.dueDateAsString}</span></div>
                {getGender()}
            </div>
            {diary.isBabyBorn
                ? <SeeBaby diaryId={diaryId} clickHandler={reload} />
                : <p className="text-center custom-btn">
                    <Link to={`/diary/baby/create/${diaryId}`}><button className="btn btn-lg mt-4 mr-2" role="button">Baby is Born!</button></Link>
                    <Link to={`/diary/week/add/${diaryId}`}><button className="btn btn-lg mt-4" role="button">Add New Week</button></Link>
                </p>}
            <WeeksList diaryId={diaryId} />
        </div>
    );
}

export default SeeDiary;