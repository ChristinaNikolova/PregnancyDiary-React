import { useEffect, useState } from 'react';
import toastr from 'toastr';

import DiaryPicture from '../../shared/DiaryPicture/DiaryPicture.jsx';
import Input from '../../shared/Input/Input.jsx';
import * as weeksService from '../../../services/weeksService.js';
import * as authService from '../../../services/authService.js';
import * as validator from '../../../utils/validators/weekValidator.js'

import './UpdateWeek.css';

function UpdateWeek({ match, history }) {
    const [errorNumber, setErrorNumber] = useState('');
    const [errorMyWeight, setErrorMyWeight] = useState('');
    const [errorMyBellySize, setErrorMyBellySize] = useState('');
    const [errorBabyWeight, setErrorBabyWeight] = useState('');
    const [errorBabyHeight, setErrorBabyHeight] = useState('');
    const [week, setWeek] = useState({});
    const weekId = match.params.id;
    const moods = ['Happy', 'Sad', 'Surprised', 'Melancholic', 'Angry'];

    useEffect(() => {
        if (!authService.isAuthenticated()) {
            history.push('/login');
            return;
        };

        weeksService
            .getDetails(weekId)
            .then(res => setWeek(res))
            .catch(err => console.error(err));
    }, []);

    const onUpdateWeekSubmitHandler = (e) => {
        e.preventDefault();

        const number = e.target.number.value;
        const myWeight = e.target.myWeight.value;
        const myBellySize = e.target.myBellySize.value;
        const mood = e.target.mood.value;
        const babyWeight = e.target.babyWeight.value;
        const babyHeight = e.target.babyHeight.value;

        setErrorNumber(validator.validNumber(number));
        setErrorMyWeight(validator.validMyWeight(myWeight));
        setErrorMyBellySize(validator.validMyBellySize(myBellySize));
        setErrorBabyWeight(validator.validBabyWeight(babyWeight));
        setErrorBabyHeight(validator.validBabyHeight(babyHeight));

        if (validator.validNumber(number) === '' &&
            validator.validMyWeight(myWeight) === '' &&
            validator.validMyBellySize(myBellySize) === '' &&
            validator.validBabyWeight(babyWeight) === '' &&
            validator.validBabyHeight(babyHeight) === '') {
            weeksService
                .update(weekId, week.diaryId, number, myWeight, myBellySize, mood, babyWeight, babyHeight)
                .then((data) => {
                    if (data['status'] === 400) {
                        toastr.error(data['message'], 'Error');
                        return;
                    };
                    toastr.success(data['message'], 'Success');
                    history.push(`/diary/see/${week.diaryId}`);
                });
        };
    };

    return (
        <div className="update-week-wrapper">
            <h1 className="custom-font text-center">Update Week</h1>
            <hr />
            <div className="row update-week-form">
                <div className="col-lg-8">
                    <form className="mt-2" onSubmit={onUpdateWeekSubmitHandler}>
                        <Input
                            type='number'
                            name='number'
                            label='Week Number'
                            value={week.number}
                            error={errorNumber} />

                        <Input
                            type='number'
                            name='myWeight'
                            label='My Weight'
                            value={week.myWeight}
                            error={errorMyWeight} />

                        <Input
                            type='number'
                            name='myBellySize'
                            label='My Belly Size'
                            value={week.myBellySize}
                            error={errorMyBellySize} />

                        <div className="form-group">
                            <label className="form-control-label" htmlFor="mood">My Mood</label>
                            <select className="form-control" id="mood">
                                {moods
                                    .filter(m => m !== week.mood)
                                    .map(m => <option key={m} value={m}>{m}</option>)}
                                <option selected={week.mood}>{week.mood}</option>
                            </select>
                        </div>

                        <Input
                            type='number'
                            name='babyWeight'
                            label='Baby Weight'
                            value={week.babyWeight}
                            error={errorBabyWeight} />

                        <Input
                            type='number'
                            name='babyHeight'
                            label='Baby Height'
                            value={week.babyHeight}
                            error={errorBabyHeight} />

                        <div className="text-center">
                            <button className="btn" type="submit">Update Week</button>
                        </div>
                    </form>
                </div>
            </div>
            <DiaryPicture />
        </div>
    );
}

export default UpdateWeek;