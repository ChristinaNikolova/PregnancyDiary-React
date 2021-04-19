import { useState, useEffect } from 'react';
import toastr from 'toastr';

import AdminFormWrapper from '../../../shared/Administration/AdminFormWrapper/AdminFormWrapper.jsx';
import Input from '../../../shared/Input/Input.jsx';
import * as validator from '../../../../utils/validators/categoryValidator.js';
import * as categoriesService from '../../../../services/categoriesService.js';
import * as authService from '../../../../services/authService.js';

import './CreateCategory.css';

function CreateCategory({ history }) {
    useEffect(() => {
        if (!authService.isAdmin()) {
            history.push('/');
            return;
        };
    }, []);

    const [errorName, setErrorName] = useState('');
    const [errorPicture, setErrorPicture] = useState('');

    const onCreateCategorySubmitHandler = (e) => {
        e.preventDefault();

        const name = e.target.name.value;
        const picture = e.target.picture.value;

        setErrorName(validator.validName(name));
        setErrorPicture(validator.validPicture(picture));

        if (validator.validName(name) === '' &&
            validator.validPicture(picture) === ''
        ) {
            categoriesService
                .create(name, picture)
                .then((data) => {
                    if (data['status'] === 400) {
                        toastr.error(data['message'], 'Error');
                        return;
                    }
                    toastr.success(data['message'], 'Success');
                    history.push('/admin/categories');
                })
        }
    }
    return (
        <div className="create-category-wrapper">
            <AdminFormWrapper title="Create New Category" />
            <form onSubmit={onCreateCategorySubmitHandler}>
                <div className="row create-category-form">
                    <div className="col-lg-8">
                        <Input
                            type='text'
                            name='name'
                            label='Name'
                            error={errorName} />

                        <Input
                            type='url'
                            name='picture'
                            label='Picture'
                            error={errorPicture} />

                        <div className="text-center">
                            <button className="btn" type="submit">Create</button>
                        </div>
                    </div>
                </div >
            </form >
        </div >
    );
}

export default CreateCategory;