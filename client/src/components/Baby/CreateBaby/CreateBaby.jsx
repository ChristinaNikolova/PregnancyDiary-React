import { useEffect, useState } from 'react';
import toastr from 'toastr';

import BabyBornPicture from '../../shared/BabyBornPicture/BabyBornPicture.jsx';
import Input from '../../shared/Input/Input.jsx';
import * as validator from '../../../utils/validators/babyValidators.js';
import * as babiesService from '../../../services/babiesService.js';
import * as authService from '../../../services/authService.js';

import './CreateBaby.css';

function CreateBaby({ match, history }) {
    useEffect(() => {
        if (!authService.isAuthenticated()) {
            history.push('/login');
            return;
        };
    }, []);

    const [errorName, setErrorName] = useState('');
    const [errorBirthDate, setErrorBirthDate] = useState('');
    const [errorBirthTime, setErrorBirthTime] = useState('');
    const [errorHeight, setErrorHeight] = useState('');
    const [errorWeight, setErrorWeight] = useState('');
    const [errorPicture, setErrorPicture] = useState('');
    const diaryId = match.params.id;
    const genders = ['Girl', 'Boy'];

    const onCreateBabySubmitHandler = (e) => {
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
                .create(name, birthDate, birthTime, gender, weight, height, picture, diaryId)
                .then((data) => {
                    if (data['status'] === 400) {
                        toastr.error(data['message'], 'Error');
                        return;
                    }
                    toastr.success(data['message'], 'Success');
                    history.push(`/diary/see/${diaryId}`);
                });
        }

    }

    return (
        <div className="create-baby-wrapper">
            <h1 className="custom-font text-center">Baby Born</h1>
            <hr />
            <div className="row create-baby-form">
                <div className="col-lg-8">
                    <form className="mt-2" onSubmit={onCreateBabySubmitHandler}>
                        <Input
                            type='text'
                            name='name'
                            label='Name'
                            error={errorName} />

                        <Input
                            type='date'
                            name='birthDate'
                            label='Birth Date'
                            error={errorBirthDate} />

                        <Input
                            type='text'
                            name='birthTime'
                            label='Birth Time'
                            error={errorBirthTime} />

                        <div className="form-group">
                            <label className="form-control-label" htmlFor="gender">Gender</label>
                            <select className="form-control" id="gender">
                                {genders.map(g => <option key={g} value={g}>{g}</option>)}
                            </select>
                        </div>

                        <Input
                            type='number'
                            name='height'
                            label='Height in mm'
                            error={errorHeight} />

                        <Input
                            type='number'
                            name='weight'
                            label='Weight in gr'
                            error={errorWeight} />

                        <Input
                            type='url'
                            name='picture'
                            label='Picture'
                            error={errorPicture} />

                        <div className="text-center">
                            <button className="btn" type="submit">Baby</button>
                        </div>
                    </form>
                </div>
            </div>
            <BabyBornPicture />
        </div>
    );
}

export default CreateBaby;