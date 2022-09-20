import { useState, useEffect } from 'react';

import toastr from 'toastr';

import * as weeksService from '../../../services/weeksService.js';
import * as authService from '../../../services/authService.js';
import SingleWeek from '../SingleWeek/SingleWeek.jsx';

import './WeeksList.css';

function WeeksList({ diaryId }) {
    const [weeks, setWeeks] = useState([]);

    useEffect(() => {
        if (!authService.isAuthenticated()) {
            return;
        };

        weeksService
            .getAllCurrentDiary(diaryId)
            .then(res => setWeeks(res))
            .catch(err => console.error(err));

    }, [diaryId]);

    const removeClickHandler = (weekId) => {
        weeksService
            .remove(weekId)
            .then((data) => {
                if (data['status'] === 400) {
                    toastr.error(data['message'], 'Error');
                    return;
                };

                setWeeks((state) => state.filter(w => w.id !== weekId));
                toastr.success(data['message'], 'Success');
            });
    };

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