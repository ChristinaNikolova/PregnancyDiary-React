import { useState, useEffect } from 'react';
import toastr from 'toastr';

import * as validator from '../../../utils/validators/babyValidators.js';
import * as babiesService from '../../../services/babiesService.js';

import BabyBornPicture from '../../shared/BabyBornPicture/BabyBornPicture.jsx';
import Input from '../../shared/Input/Input.jsx';

import './UpdateBaby.css';

function UpdateBaby({ match, history }) {
    const [baby, setBaby] = useState({});
    const [errorName, setErrorName] = useState('');
    const [errorBirthDate, setErrorBirthDate] = useState('');
    const [errorBirthTime, setErrorBirthTime] = useState('');
    const [errorHeight, setErrorHeight] = useState('');
    const [errorWeight, setErrorWeight] = useState('');
    const [errorPicture, setErrorPicture] = useState('');
    const diaryId = match.params.diaryId;
    const babyId = match.params.babyId;
    const genders = ['Girl', 'Boy'];

    useEffect(() => {
        babiesService
            .getDetailsForUpdate(diaryId)
            .then(res => setBaby(res))
            .catch(err => console.error(err));
    }, [diaryId]);

    const onUpdateBabySubmitHandler = (e) => {
        e.preventDefault();

        const name = e.target.name.value;
        const birthDate = e.target.birthDate.value;
        const birthTime = e.target.birthTime.value;
        const gender = e.target.gender.value;
        const height = e.target.height.value;
        const weight = e.target.weight.value;
        const picture = e.target.picture.value;

        setErrorName(validator.validName(name));
        setErrorBirthDate(validator.validbirthDate(birthDate));
        setErrorBirthTime(validator.validBirthTime(birthTime));
        setErrorHeight(validator.validHeight(height));
        setErrorWeight(validator.validWeight(weight));
        setErrorPicture(validator.validPicture(picture));

        if (validator.validName(name) === '' &&
            validator.validbirthDate(birthDate) === '' &&
            validator.validBirthTime(birthTime) === '' &&
            validator.validHeight(height) === '' &&
            validator.validWeight(weight) === '' &&
            validator.validPicture(picture) === '') {
            babiesService
                .update(babyId, name, birthDate, birthTime, gender, weight, height, picture, diaryId)
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
        <div className="update-baby-wrapper">
            <h1 className="custom-font text-center">Update Baby</h1>
            <hr />
            <div className="row update-baby-form">
                <div className="col-lg-8">
                    <form className="mt-2" onSubmit={onUpdateBabySubmitHandler}>
                        <Input
                            type='text'
                            name='name'
                            label='Name'
                            value={baby.name}
                            error={errorName} />

                        <Input
                            type='date'
                            name='birthDate'
                            label='Birth Date'
                            value={baby.formattedBirthDate}
                            error={errorBirthDate} />

                        <Input
                            type='text'
                            name='birthTime'
                            label='Birth Time'
                            value={baby.birthTime}
                            error={errorBirthTime} />

                        <div className="form-group">
                            <label className="form-control-label" htmlFor="gender">Gender</label>
                            <select className="form-control" id="gender">
                                {genders
                                    .filter(g => g !== baby.genderAsString)
                                    .map(g => <option key={g} value={g}>{g}</option>)}
                                <option selected={baby.genderAsString}>{baby.genderAsString}</option>
                            </select>
                        </div>

                        <Input
                            type='number'
                            name='height'
                            label='Height in mm'
                            value={baby.height}
                            error={errorHeight} />

                        <Input
                            type='number'
                            name='weight'
                            label='Weight in gr'
                            value={baby.weight}
                            error={errorWeight} />

                        <Input
                            type='url'
                            name='picture'
                            label='Picture'
                            value={baby.picture}
                            error={errorPicture} />

                        <div className="text-center">
                            <button className="btn" type="submit">Update</button>
                        </div>
                    </form>
                </div>
            </div>
            <BabyBornPicture />
        </div>
    );
}

export default UpdateBaby;