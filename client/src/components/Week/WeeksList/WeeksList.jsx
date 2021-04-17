import { useState, useEffect } from 'react';

import * as weeksService from '../../../services/weeksService.js';
import SingleWeek from '../SingleWeek/SingleWeek.jsx';

import './WeeksList.css';

function WeeksList({ diaryId }) {
    const [weeks, setWeeks] = useState([]);
    const [hasToReload, setHasToReload] = useState(false);

    useEffect(() => {
        weeksService
            .getAllCurrentDiary(diaryId)
            .then(res => setWeeks(res))
            .then(setHasToReload(false))
            .catch(err => console.error(err));
    }, [hasToReload]);

    const reload = () => {
        setTimeout(() => {
            setHasToReload(true)
        }, 100);
    }

    return (
        <div className="weeks-list-wrapper">
            <h1 className="text-center custom-font p-1">Weeks</h1>
            <hr />
            <div className="container">
                <table className="table table-bordered table-hover table-background">
                    <thead className="text-center">
                        <tr>
                            <th>Week's Number</th>
                            <th>Mood</th>
                            <th>Moments</th>
                            <th></th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {weeks
                            .map(w => <SingleWeek
                                key={w.id}
                                id={w.id}
                                number={w.number}
                                mood={w.moodAsString}
                                toDos={w.toDosCount}
                                moments={w.momentsCount}
                                clickHandler={reload} />)}
                    </tbody>
                </table>
            </div>
            <div className="fill pt-1 pb-1"></div>
        </div >
    );
}

export default WeeksList;