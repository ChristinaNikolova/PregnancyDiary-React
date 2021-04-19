import { useEffect, useState } from 'react';
import toastr from 'toastr';

import AdminFormWrapper from '../../../shared/Administration/AdminFormWrapper/AdminFormWrapper.jsx';
import Input from '../../../shared/Input/Input.jsx';
import * as validator from '../../../../utils/validators/articleValidator.js';
import * as articlesService from '../../../../services/articlesService.js';
import * as categoriesService from '../../../../services/categoriesService.js';
import * as authService from '../../../../services/authService.js';

import './CreateArticle.css';

function CreateArticle({ history }) {
    const [categories, setCategories] = useState([]);
    const [errorTitle, setErrorTitle] = useState('');
    const [errorContent, setErrorContent] = useState('');
    const [errorPicture, setErrorPicture] = useState('');

    useEffect(() => {
        if (!authService.isAdmin()) {
            history.push('/');
            return;
        };

        categoriesService
            .getAllNames()
            .then(res => setCategories(res))
            .catch(err => console.error(err));
    }, []);

    const onCreateArticleSubmitHandler = (e) => {
        e.preventDefault();

        const title = e.target.title.value;
        const content = e.target.content.value;
        const categoryName = e.target.categoryName.value;
        const picture = e.target.picture.value;

        setErrorTitle(validator.validTitle(title));
        setErrorContent(validator.validContent(content));
        setErrorPicture(validator.validPicture(picture));

        if (validator.validTitle(title) === '' &&
            validator.validContent(content) === '' &&
            validator.validPicture(picture) === '') {
            articlesService
                .create(title, content, categoryName, picture)
                .then((data) => {
                    if (data['status'] === 400) {
                        toastr.error(data['message'], 'Error');
                        return;
                    }
                    toastr.success(data['message'], 'Success');
                    history.push('/admin/articles');
                })
        }
    }

    return (
        <div className="create-article-wrapper">
            <AdminFormWrapper title="Create New Article" />
            <form onSubmit={onCreateArticleSubmitHandler}>
                <div className="row create-article-form">
                    <div className="col-lg-8">
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

                        <div className="form-group">
                            <label className="form-control-label" htmlFor="categoryName">Category</label>
                            <select className="form-control" id="categoryName">
                                {categories.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
                            </select>
                        </div>

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

export default CreateArticle;