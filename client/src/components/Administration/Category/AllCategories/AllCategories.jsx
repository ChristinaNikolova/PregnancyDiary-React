import { useEffect, useState } from 'react';

import * as categoriesService from '../../../../services/categoriesService.js';
import CategorySingleRow from '../CategorySingleRow/CategorySingleRow.jsx';

import './AllCategories.css';

function AllCategories() {
    const [categories, setCategories] = useState([]);
    const [hasToReload, setHasToReload] = useState(false);

    useEffect(() => {
        categoriesService
            .getAllForAdministration()
            .then(res => setCategories(res))
            .then(setHasToReload(false))
            .catch(err => console.error(err));
    }, [hasToReload]);

    const reload = () => {
        setTimeout(() => {
            setHasToReload(true)
        }, 100);
    };

    return (
        <div className="all-category-wrapper">
            <h1 className="text-center custom-font p-1">Categories</h1>
            <hr />
            <div className="container">
                <table className="table table-striped table-bordered table-hover table-background m-2">
                    <thead className="text-center">
                        <tr>
                            <th>Name</th>
                            <th>Articles Count</th>
                            <th>Picture</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {categories.map(c => <CategorySingleRow
                            key={c.id}
                            id={c.id}
                            name={c.name}
                            articlesCount={c.articlesCount}
                            picture={c.picture}
                            clickHandler={reload} />)}
                    </tbody>
                </table>
            </div>
            <div className="fill pb-1 pt-1"></div>
        </div >
    );
}

export default AllCategories;