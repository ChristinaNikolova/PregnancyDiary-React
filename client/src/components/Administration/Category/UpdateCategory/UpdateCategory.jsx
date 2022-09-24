import { useState, useEffect } from 'react';
import toastr from 'toastr';

import * as categoriesService from '../../../../services/categoriesService.js';
import * as validator from '../../../../utils/validators/categoryValidator.js';
import AdminFormWrapper from '../../../shared/Administration/AdminFormWrapper/AdminFormWrapper.jsx';
import Input from '../../../shared/Input/Input.jsx';

import './UpdateCategory.css';

function UpdateCategory({ match, history }) {
    const [category, setCategory] = useState({});
    const [errorName, setErrorName] = useState('');
    const [errorPicture, setErrorPicture] = useState('');
    const categoryId = match.params.id;

    useEffect(() => {
        categoriesService
            .getCategoryForUpdate(categoryId)
            .then(res => setCategory(res))
            .catch(err => console.error(err));
    }, []);

    const updateCategorySubmitHandler = (e) => {
        e.preventDefault();

        const name = e.target.name.value;
        const picture = e.target.picture.value;

        setErrorName(validator.validName(name));
        setErrorPicture(validator.validPicture(picture));

        if (validator.validName(name) === '' &&
            validator.validPicture(picture) === '') {
            categoriesService
                .update(categoryId, name, picture)
                .then((data) => {
                    if (data['status'] === 400) {
                        toastr.error(data['message'], 'Error');
                        return;
                    };
                    toastr.success(data['message'], 'Success');
                    history.push(`/admin/categories`);
                });
        };
    };

    return (
        <div className="update-category-wrapper">
            <AdminFormWrapper title="Update Category" />
            <form onSubmit={updateCategorySubmitHandler}>
                <div className="row update-category-form">
                    <div className="col-lg-8">
                        <Input
                            type='text'
                            name='name'
                            label='Name'
                            value={category.name}
                            error={errorName} />

                        <Input
                            type='url'
                            name='picture'
                            label='Picture'
                            value={category.picture}
                            error={errorPicture} />

                        <div className="text-center">
                            <button className="btn" type="submit">Update</button>
                        </div>
                    </div>
                </div >
            </form >
        </div >
    );
}

export default UpdateCategory;