import { useState, useEffect } from 'react';

import * as usersService from '../../../services/usersService.js';
import * as authService from '../../../services/authService.js';
import UserDiaryRow from '../UserDiaryRow/UserDiaryRow.jsx';

import './UserDiariesList.css';

function UserDiariesList({ history }) {
    const [diaries, setDiaries] = useState([]);
    const [hasToReload, setHasToReload] = useState(false);

    useEffect(() => {
        if (!authService.isAuthenticated()) {
            history.push('/login');
            return;
        };

        usersService
            .getUserDiaries()
            .then(res => setDiaries(res))
            .then(setHasToReload(false))
            .catch(err => console.error(err));
    }, [hasToReload]);

    const reload = () => {
        setTimeout(() => {
            setHasToReload(true)
        }, 100);
    }

    return (
        <div className="diaries-list-wrapper">
            <h1 className="text-center custom-font p-1">My Diaries</h1>
            <hr />
            <div className="container">
                <table className="table table-bordered table-hover table-background">
                    <thead className="text-center">
                        <tr>
                            <th>Positive Test</th>
                            <th>Due Date</th>
                            <th>Gender</th>
                            <th>Weeks</th>
                            <th></th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {diaries
                            .map(d => <UserDiaryRow
                                key={d.id}
                                id={d.id}
                                positiveTest={d.positiveTestAsString}
                                dueDate={d.dueDateAsString}
                                gender={d.genderAsString}
                                weeks={d.weeksCount}
                                clickHandler={reload} />)}
                    </tbody>
                </table>
            </div>
            <div className="fill pt-1 pb-1"></div>
        </div >
    );
}

export default UserDiariesList;