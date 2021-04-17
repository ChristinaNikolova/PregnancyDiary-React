import { useState } from 'react';
import toastr from 'toastr';

import DiaryPicture from '../../shared/DiaryPicture/DiaryPicture.jsx';
import Input from '../../shared/Input/Input.jsx';
import * as validator from '../../../utils/validators/memoryValidator.js';
import * as memoriesService from '../../../services/memoriesService.js';

import './CreateMemory.css';

function CreateMemory({ match, history }) {
    const [errorDate, setErrorDate] = useState('');
    const [errorTitle, setErrorTitle] = useState('');
    const [errorContent, setErrorContent] = useState('');
    const weekId = match.params.id;

    const onCreatMamorySubmitHandler = (e) => {
        e.preventDefault();

        const date = e.target.date.value;
        const title = e.target.title.value;
        const content = e.target.content.value;

        setErrorDate(validator.validDate(date));
        setErrorTitle(validator.validTitle(title));
        setErrorContent(validator.validContent(content));

        if (validator.validDate(date) === '' &&
            validator.validTitle(title) === '' &&
            validator.validContent(content) === '') {
            memoriesService
                .create(date, title, content, weekId)
                .then((data) => {
                    if (data['status'] === 400) {
                        toastr.error(data['message'], 'Error');
                        return;
                    }
                    toastr.success(data['message'], 'Success');
                    history.push(`/diary/week/see/${weekId}`);
                })
        }
    }

    return (
        <div className="create-memory-wrapper">
            <h1 className="custom-font text-center">Create Memory</h1>
            <hr />
            <div className="row create-memory-form">
                <div className="col-lg-8">
                    <form className="mt-2" onSubmit={onCreatMamorySubmitHandler}>
                        <Input
                            type='date'
                            name='date'
                            label='Date'
                            error={errorDate} />

                        <Input
                            type='text'
                            name='title'
                            label='Title'
                            error={errorTitle} />

                        <Input
                            type='text'
                            name='content'
                            label='Content'
                            error={errorContent} />

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

export default CreateMemory;