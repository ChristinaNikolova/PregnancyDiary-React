import { useState } from 'react';

import * as validator from '../../../utils/validators/articleValidator.js';

import Input from '../../shared/Input/Input.jsx';

import './SearchArticle.css';

function SearchArticle({ clickHandler, isSearched }) {
    const [errorMessage, setErrorMessage] = useState('');

    const onSearchArticleSubmitHandler = (e) => {
        e.preventDefault();

        const query = e.target.search.value;

        setErrorMessage(validator.validSearchText(query));

        if (validator.validSearchText(query) === '') {
            e.target.search.value = '';
            clickHandler(query);
        };
    };

    const clear = () => {
        clickHandler();
    };

    return (
        <div className="search-wrapper m-3">
            <div className="row">
                <div className="col-lg-12">
                    <h4 className="text-center mt-1 custom-font">Find an article</h4>
                    <p className="text-center custom-font">Search for an article using the form below:</p>
                </div>
                <div className="col-lg-2"></div>
                <div className="col-lg-8">
                    <div className="search-form">
                        <form className="m-2" onSubmit={onSearchArticleSubmitHandler}>
                            <div className="row">
                                <div className="col-lg-10">
                                    <Input
                                        type='text'
                                        name='search'
                                        label=''
                                        placeholder='Search'
                                        error={errorMessage} />
                                </div>
                                <div className="col-lg-2">
                                    <button className="btn" type="submit">Search</button>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="col-lg-2"></div>
                    <div className="text-center mb-1">
                        {isSearched && <button className="btn btn-danger custom-danger" onClick={clear}>Clear Result</button>}
                    </div>
                </div>
            </div>
            <hr />
        </div>
    );
}

export default SearchArticle;