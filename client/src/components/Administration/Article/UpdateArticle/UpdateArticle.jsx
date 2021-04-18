import { useEffect, useState } from 'react';
import toastr from 'toastr';

import AdminFormWrapper from '../../../shared/Administration/AdminFormWrapper/AdminFormWrapper.jsx';
import Input from '../../../shared/Input/Input.jsx';
import * as articlesService from '../../../../services/articlesService.js';
import * as categoriesService from '../../../../services/categoriesService.js';
import * as validator from '../../../../utils/validators/articleValidator.js';

import './UpdateArticle.css';

function UpdateArticle({ match, history }) {
    const [article, setArticle] = useState({});
    const [categories, setCategories] = useState([]);
    const [errorTitle, setErrorTitle] = useState('');
    const [errorContent, setErrorContent] = useState('');
    const [errorPicture, setErrorPicture] = useState('');
    const articleId = match.params.id;

    useEffect(() => {
        articlesService
            .getArticleForUpdate(articleId)
            .then(res => setArticle(res))
            .catch(err => console.error(err));

        categoriesService
            .getAllNames()
            .then(res => setCategories(res))
            .catch(err => console.error(err));

    }, []);

    const updateArticleSubmitHandler = (e) => {
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
                .update(articleId, title, content, categoryName, picture)
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
        <div className="update-article-wrapper">
            <AdminFormWrapper title="Update Article" />
            <form onSubmit={updateArticleSubmitHandler}>
                <div className="row update-article-form">
                    <div className="col-lg-8">
                        <Input
                            type='text'
                            name='title'
                            label='Title'
                            value={article.title}
                            error={errorTitle} />

                        <Input
                            type='text'
                            name='content'
                            label='Content'
                            value={article.content}
                            error={errorContent} />

                        <div className="form-group">
                            <label className="form-control-label" htmlFor="categoryName">Category</label>
                            <select className="form-control" id="categoryName">
                                {categories
                                    .filter(c => c.name !== article.categoryName)
                                    .map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
                                <option selected={article.categoryName}>{article.categoryName}</option>
                            </select>
                        </div>

                        <Input
                            type='url'
                            name='picture'
                            label='Picture'
                            value={article.picture}
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

export default UpdateArticle;