import { useEffect, useState } from 'react';
import toastr from 'toastr';

import * as validator from '../../../utils/validators/memoryValidator.js';
import * as memoriesService from '../../../services/memoriesService.js';

import DiaryPicture from '../../shared/DiaryPicture/DiaryPicture.jsx';
import Input from '../../shared/Input/Input.jsx';

import './UpdateMemory.css';

function UpdateMemory({ match, history }) {
    const [memory, setMemory] = useState({});
    const [errorDate, setErrorDate] = useState('');
    const [errorTitle, setErrorTitle] = useState('');
    const [errorContent, setErrorContent] = useState('');
    const memoryId = match.params.id;

    useEffect(() => {
        memoriesService
            .getDetails(memoryId)
            .then(res => setMemory(res))
            .catch(err => console.error(err));
    }, [memoryId]);

    const onUpdateMamorySubmitHandler = (e) => {
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
                .update(memoryId, date, title, content, memory.weekId)
                .then((data) => {
                    if (data['status'] === 400) {
                        toastr.error(data['message'], 'Error');
                        return;
                    };
                    toastr.success(data['message'], 'Success');
                    history.push(`/diary/week/see/${memory.weekId}`);
                });
        };
    };

    return (
        <div className="update-memory-wrapper">
            <h1 className="custom-font text-center">Update Memory</h1>
            <hr />
            <div className="row update-memory-form">
                <div className="col-lg-8">
                    <form className="mt-2" onSubmit={onUpdateMamorySubmitHandler}>
                        <Input
                            type='date'
                            name='date'
                            label='Date'
                            value={memory.formattedDate}
                            error={errorDate} />

                        <Input
                            type='text'
                            name='title'
                            label='Title'
                            value={memory.title}
                            error={errorTitle} />

                        <Input
                            type='text'
                            name='content'
                            label='Content'
                            value={memory.content}
                            error={errorContent} />

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

export default UpdateMemory;