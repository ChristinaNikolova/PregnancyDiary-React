import { useState } from 'react';

import DiaryPicture from '../../shared/DiaryPicture/DiaryPicture.jsx';
import Input from '../../shared/Input/Input.jsx';
import * as validator from '../../../utils/validators/weekValidator.js';

import './AddWeek.css';

function AddWeek({ match }) {
    const [errorNumber, setErrorNumber] = useState('');
    const [errorMyWeight, setErrorMyWeight] = useState('');
    const [errorMyBellySize, setErrorMyBellySize] = useState('');
    const [errorBabyWeight, setErrorBabyWeight] = useState('');
    const [errorBabyHeight, setErrorBabyHeight] = useState('');
    const moods = ["Happy", "Sad"];
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
            console.log("valid");
        } else {
            console.log("invalid");
        }
    }

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
                            label='My Weight'
                            error={errorMyWeight} />

                        <Input
                            type='number'
                            name='myBellySize'
                            label='My Belly Size'
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
                            label='Baby Weight'
                            error={errorBabyWeight} />

                        <Input
                            type='number'
                            name='babyHeight'
                            label='Baby Height'
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