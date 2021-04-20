import { useEffect, useState } from 'react';
import { produce } from 'immer';
import { generate } from 'shortid';
import toastr from 'toastr';

import DiaryPicture from '../../shared/DiaryPicture/DiaryPicture.jsx';
import InputError from '../../shared/InputError/InputError.jsx';
import * as validator from '../../../utils/validators/memoryValidator.js';
import * as memoriesService from '../../../services/memoriesService.js';
import * as authService from '../../../services/authService.js';

import './CreateMemory.css';

function CreateMemory({ match, history }) {
    const [memories, setMemories] = useState([]);
    const weekId = match.params.id;

    useEffect(() => {
        if (!authService.isAuthenticated()) {
            history.push('/login');
            return;
        };
    }, []);

    const addMemory = () => {
        setMemories(prevState => ([...prevState, {
            id: generate(),
            date: new Date(),
            title: '',
            content: '',
            errorDate: validator.ErrorMessageDate(),
            errorTitle: validator.ErrorMessageTitle(),
            errorContent: validator.ErrorMessageContent(),
        }]));
    };

    const removeMemory = (targetIndex) => {
        const memoryIndex = getMemoryIndex(targetIndex);
        const memoryId = memories[memoryIndex].id;

        setMemories(memories => memories.filter(x => x.id !== memoryId));
    };

    const getMemoryIndex = (target) => {
        const startIndex = (target).indexOf('[') + 1;
        const endIndex = (target).indexOf(']');
        const memoryIndex = (target).slice(startIndex, endIndex);

        return memoryIndex;
    };

    const onChangeMemoryDateHandler = (e) => {
        const memoryIndex = getMemoryIndex(e.target.id);
        const date = e.target.value;

        setMemories(currentMemory => produce(currentMemory, memories => {
            memories[memoryIndex].date = date;
        }));
    };

    const onBlurMemoryDateHandler = (e) => {
        const memoryIndex = getMemoryIndex(e.target.id);
        let date = memories[memoryIndex]?.date;
        setDateError(memoryIndex, date);
    };

    const setDateError = (memoryIndex, date) => {
        setMemories(currentMemory => produce(currentMemory, memories => {
            memories[memoryIndex].errorDate = validator.validDate(date);
        }));
    };

    const onChangeMemoryTitleHandler = (e) => {
        const memoryIndex = getMemoryIndex(e.target.id);
        const title = e.target.value;

        setMemories(currentMemory => produce(currentMemory, memories => {
            memories[memoryIndex].title = title;
        }));
    };

    const onBlurMemoryTitleHandler = (e) => {
        const memoryIndex = getMemoryIndex(e.target.id);
        let title = memories[memoryIndex]?.title;
        setTitleError(memoryIndex, title);
    };

    const setTitleError = (memoryIndex, title) => {
        setMemories(currentMemory => produce(currentMemory, memories => {
            memories[memoryIndex].errorTitle = validator.validTitle(title);
        }));
    };

    const onChangeMemoryContentHandler = (e) => {
        const memoryIndex = getMemoryIndex(e.target.id);
        const content = e.target.value;

        setMemories(currentMemory => produce(currentMemory, memories => {
            memories[memoryIndex].content = content;
        }));
    };

    const onBlurMemoryContentHandler = (e) => {
        const memoryIndex = getMemoryIndex(e.target.id);
        let content = memories[memoryIndex]?.content;
        setContentError(memoryIndex, content);
    };

    const setContentError = (memoryIndex, content) => {
        setMemories(currentMemory => produce(currentMemory, memories => {
            memories[memoryIndex].errorContent = validator.validContent(content);
        }));
    };

    const onCreatMamorySubmitHandler = (e) => {
        e.preventDefault();

        if (!memories.some(m => m.errorDate !== '' || m.errorTitle !== '' || m.errorContent !== '')) {
            memoriesService
                .create(memories, weekId)
                .then((data) => {
                    if (data['status'] === 400) {
                        toastr.error(data['message'], 'Error');
                        return;
                    }
                    toastr.success(data['message'], 'Success');
                    history.push(`/diary/week/see/${weekId}`);
                });
        };
    }

    return (
        <div className="create-memory-wrapper">
            <h1 className="custom-font text-center">Create Memories</h1>
            <hr />
            <div className="row create-memory-form">
                <div className="col-lg-8">
                    <form className="mt-2" onSubmit={onCreatMamorySubmitHandler}>
                        {memories.map((memory, memoryIndex) => {
                            const index = `memories[${memoryIndex}]`;
                            return (
                                <div key={memory.id}>
                                    <label className="form-control-label">Memory: </label>
                                    <div className="form-group">
                                        <label className="form-control-label" htmlFor={index}>Date</label>
                                        <input className="form-control" onBlur={onBlurMemoryDateHandler} onChange={onChangeMemoryDateHandler} name="date" key={() => produce()} id={`${index}`} type="date" />
                                    </div>
                                    <InputError>{memory.errorDate}</InputError>
                                    <div className="form-group">
                                        <label className="form-control-label" htmlFor={index}>Title</label>
                                        <input className="form-control" onBlur={onBlurMemoryTitleHandler} onChange={onChangeMemoryTitleHandler} name="title" key={() => produce()} id={`${index}`} type="text" />
                                    </div>
                                   <InputError>{memory.errorTitle}</InputError>
                                    <div className="form-group">
                                        <label className="form-control-label" htmlFor={index}>Content</label>
                                        <input className="form-control" onBlur={onBlurMemoryContentHandler} onChange={onChangeMemoryContentHandler} name="content" key={() => produce()} id={`${index}`} type="text" />
                                    </div>
                                    <InputError>{memory.errorContent}</InputError>
                                    <button className="btn btn-danger" type="button" onClick={() => removeMemory(index)}>Remove</button>
                                    <hr />
                                </div>
                            )
                        })}
                        <button type="button" className="btn ml-2" onClick={addMemory}>Add Memory</button>
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