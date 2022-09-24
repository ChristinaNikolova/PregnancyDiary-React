import { useState } from 'react';
import toastr from 'toastr';

import * as validator from '../../../utils/validators/weekValidator.js';
import * as weeksService from '../../../services/weeksService.js';

import DiaryPicture from '../../shared/DiaryPicture/DiaryPicture.jsx';
import Input from '../../shared/Input/Input.jsx';

import './AddWeek.css';

function AddWeek({ match, history }) {
    const [errorNumber, setErrorNumber] = useState('');
    const [errorMyWeight, setErrorMyWeight] = useState('');
    const [errorMyBellySize, setErrorMyBellySize] = useState('');
    const [errorBabyWeight, setErrorBabyWeight] = useState('');
    const [errorBabyHeight, setErrorBabyHeight] = useState('');
    const moods = ['Happy', 'Sad', 'Surprised', 'Melancholic', 'Angry'];
    const diaryId = match.params.id;

    const onAddWeekSubmitHandler = (e) => {
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
                .create(diaryId, number, myWeight, myBellySize, mood, babyWeight, babyHeight)
                .then((data) => {
                    if (data['status'] === 400) {
                        toastr.error(data['message'], 'Error');
                        return;
                    };
                    toastr.success(data['message'], 'Success');
                    history.push(`/diary/see/${diaryId}`);
                });
        };
    };

    return (
        <div className="add-week-wrapper">
            <h1 className="custom-font text-center">Add Week</h1>
            <hr />
            <div className="row add-week-form">
                <div className="col-lg-8">
                    <form className="mt-2" onSubmit={onAddWeekSubmitHandler}>
                        <Input
                            type='number'
                            name='number'
                            label='Week Number'
                            error={errorNumber} />

                        <Input
                            type='number'
                            name='myWeight'
                            label='My Weight in kg'
                            error={errorMyWeight} />

                        <Input
                            type='number'
                            name='myBellySize'
                            label='My Belly Size in cm'
                            error={errorMyBellySize} />

                        <div className="form-group">
                            <label className="form-control-label" htmlFor="mood">My Mood</label>
                            <select className="form-control" id="mood">
                                {moods.map(m => <option key={m} value={m}>{m}</option>)}
                            </select>
                        </div>

                        <Input
                            type='number'
                            name='babyWeight'
                            label='Baby Weight in gr'
                            error={errorBabyWeight} />

                        <Input
                            type='number'
                            name='babyHeight'
                            label='Baby Height in mm'
                            error={errorBabyHeight} />

                        <div className="text-center">
                            <button className="btn" type="submit">Add Week</button>
                        </div>
                    </form>
                </div>
            </div>
            <DiaryPicture />
        </div>
    );
}

export default AddWeek;