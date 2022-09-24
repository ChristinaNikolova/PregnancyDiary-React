import { useState, useEffect } from 'react';
import toastr from 'toastr';

import * as weeksService from '../../../services/weeksService.js';

import SingleWeek from '../SingleWeek/SingleWeek.jsx';

import './WeeksList.css';

function WeeksList({ diaryId }) {
    const [weeks, setWeeks] = useState([]);

    useEffect(() => {
        loadWeeks();
    }, [diaryId]);

    const removeClickHandler = (weekId) => {
        weeksService
            .remove(weekId)
            .then((data) => {
                if (data['status'] === 400) {
                    toastr.error(data['message'], 'Error');
                    return;
                };

                loadWeeks();
                toastr.success(data['message'], 'Success');
            });
    };

    const loadWeeks = () => {
        weeksService
            .getAllCurrentDiary(diaryId)
            .then(res => setWeeks(res))
            .catch(err => console.error(err));
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
                                moments={w.momentsCount}
                                clickHandler={removeClickHandler} />)}
                    </tbody>
                </table>
            </div>
            <div className="fill pt-1 pb-1"></div>
        </div >
    );
}

export default WeeksList;