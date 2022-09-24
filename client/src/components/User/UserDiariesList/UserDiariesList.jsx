import { useState, useEffect } from 'react';
import toastr from 'toastr';

import * as diariesService from '../../../services/diariesService.js';
import * as usersService from '../../../services/usersService.js';

import UserDiaryRow from '../UserDiaryRow/UserDiaryRow.jsx';
import './UserDiariesList.css';

function UserDiariesList() {
    const [diaries, setDiaries] = useState([]);

    useEffect(() => {
        usersService
            .getUserDiaries()
            .then(res => setDiaries(res))
            .catch(err => console.error(err));
    }, []);

    const removeClickHandler = (diaryId) => {
        diariesService
            .remove(diaryId)
            .then((data) => {
                if (data['status'] === 400) {
                    toastr.error(data['message'], 'Error');
                    return;
                };

                setDiaries((state) => state.filter(d => d.id !== diaryId));
                toastr.success(data['message'], 'Success');
            });
    };

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
                                clickHandler={removeClickHandler} />)}
                    </tbody>
                </table>
            </div>
            <div className="fill pt-1 pb-1"></div>
        </div >
    );
}

export default UserDiariesList;