import { useEffect, useState } from 'react';
import toastr from 'toastr';

import Input from '../../shared/Input/Input.jsx';
import DiaryPicture from '../../shared/DiaryPicture/DiaryPicture.jsx';
import * as validator from '../../../utils/validators/diaryValidator.js';
import * as diariesService from '../../../services/diariesService.js';

import './UpdateDiary.css';

function UpdateDiary({ match, history }) {
    const [diary, setDiary] = useState({});
    const [errorPositiveTest, setErrorPositiveTest] = useState('');
    const [errorDueDate, setErrorDueDate] = useState('');
    const genders = ['Girl', 'Boy', "I don't know yet", 'Surprice'];
    const diaryId = match.params.id;

    useEffect(() => {
        diariesService
            .getDiaryForUpdate(diaryId)
            .then(res => setDiary(res))
            .catch(err => console.error(err));
    }, []);

    const onUpdateDiarySubmitHandler = (e) => {
        e.preventDefault();

        const positiveTest = e.target.positiveTest.value;
        const dueDate = e.target.dueDate.value;
        const gender = e.target.gender.value;

        setErrorPositiveTest(validator.validPositiveTest(positiveTest));
        setErrorDueDate(validator.validDueDate(dueDate));

        if (validator.validPositiveTest(positiveTest) === '' &&
            validator.validDueDate(dueDate) === '') {
            diariesService
                .update(diaryId, positiveTest, dueDate, gender)
                .then((data) => {
                    if (data['status'] === 400) {
                        toastr.error(data['message'], 'Error');
                        return;
                    }
                    toastr.success(data['message'], 'Success');
                    history.push('/user/diaries');
                });
        }
    }

    return (
        <div className="update-diary-wrapper">
            <h1 className="custom-font text-center">Update Diary</h1>
            <hr />
            <div className="row update-diary-form">
                <div className="col-lg-8">
                    <form className="mt-2" onSubmit={onUpdateDiarySubmitHandler}>
                        <Input
                            type='date'
                            name='positiveTest'
                            label='Positive Test'
                            value={diary.formattedPositiveTest}
                            error={errorPositiveTest} />

                        <Input
                            type='date'
                            name='dueDate'
                            label='Due Date'
                            value={diary.formattedDueDate}
                            error={errorDueDate} />

                        <div className="form-group">
                            <label className="form-control-label" htmlFor="gender">Gender</label>
                            {diary.genderAsString === 'DontKnow'
                                ? <select className="form-control" id="gender" value="I don't know yet">
                                    {genders.map(g => <option key={g} value={g}>{g}</option>)}
                                </select>
                                : <select className="form-control" id="gender" value={diary.genderAsString}>
                                    {genders.map(g => <option key={g} value={g}>{g}</option>)}
                                </select>}
                        </div>

                        <div className="text-center">
                            <button className="btn" type="submit">Update</button>
                        </div>
                    </form>
                </div>
            </div>
            <DiaryPicture />
        </div>
    );
}

export default UpdateDiary;