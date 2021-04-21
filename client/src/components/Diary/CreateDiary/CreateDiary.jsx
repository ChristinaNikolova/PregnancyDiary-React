import { useEffect, useState } from 'react';
import toastr from 'toastr';

import Input from '../../shared/Input/Input.jsx';
import DiaryPicture from '../../shared/DiaryPicture/DiaryPicture.jsx';
import * as validator from '../../../utils/validators/diaryValidator.js';
import * as diariesService from '../../../services/diariesService.js';
import * as authService from '../../../services/authService.js';

import './CreateDiary.css';

function CreateDiary({ history }) {
    const [errorPositiveTest, setErrorPositiveTest] = useState('');
    const [errorDueDate, setErrorDueDate] = useState('');
    const genders = ['Girl', 'Boy', "I don't know yet", 'Surprice'];

    useEffect(() => {
        if (!authService.isAuthenticated()) {
            history.push('/login');
            return;
        };
    }, []);

    const onCreateDiarySubmitHandler = (e) => {
        e.preventDefault();

        const positiveTest = e.target.positiveTest.value;
        const dueDate = e.target.dueDate.value;
        const gender = e.target.gender.value;

        setErrorPositiveTest(validator.validPositiveTest(positiveTest));
        setErrorDueDate(validator.validDueDate(dueDate));

        if (validator.validPositiveTest(positiveTest) === '' &&
            validator.validDueDate(dueDate) === '') {
            diariesService
                .create(positiveTest, dueDate, gender)
                .then((data) => {
                    if (data['status'] === 400) {
                        toastr.error(data['message'], 'Error');
                        return;
                    }
                    toastr.success(data['message'], 'Success');
                    history.push('/user/diaries');
                });
        };
    };

    return (
        <div className="create-diary-wrapper">
            <h1 className="custom-font text-center">Create Diary</h1>
            <hr />
            <div className="row create-diary-form">
                <div className="col-lg-8">
                    <form className="mt-2" onSubmit={onCreateDiarySubmitHandler}>
                        <Input
                            type='date'
                            name='positiveTest'
                            label='Positive Test'
                            error={errorPositiveTest} />

                        <Input
                            type='date'
                            name='dueDate'
                            label='Due Date'
                            error={errorDueDate} />

                        <div className="form-group">
                            <label className="form-control-label" htmlFor="gender">Gender</label>
                            <select className="form-control" id="gender">
                                {genders.map(g => <option key={g} value={g}>{g}</option>)}
                            </select>
                        </div>

                        <div className="text-center">
                            <button className="btn" type="submit">Create</button>
                        </div>
                    </form>
                </div>
            </div>
            <DiaryPicture />
        </div>
    );
}

export default CreateDiary;