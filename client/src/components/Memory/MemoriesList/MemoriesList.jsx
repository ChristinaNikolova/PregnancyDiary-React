import { useEffect, useState } from 'react';

import * as memoriesService from '../../../services/memoriesService.js';
import SingleMemory from '../SingleMemory/SingleMemory.jsx';

import './MemoriesList.css';

function MemoriesList({ weekId }) {
    const [memories, setMemories] = useState([]);

    useEffect(() => {
        memoriesService
            .allCurrentWeek(weekId)
            .then(res => setMemories(res))
            .catch(err => console.error(err));
    }, []);

    const reload = () => {

    }

    return (
        <div className="memory-list-wrapper">
            <h1 className="text-center custom-font p-1">Memories...</h1>
            <hr />
            <div className="container">
                <table className="table table-bordered table-hover table-background">
                    <thead className="text-center">
                        <tr>
                            <th>Date</th>
                            <th>Title</th>
                            <th>Content</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {memories
                            .map(m => <SingleMemory
                                key={m.id}
                                id={m.id}
                                date={m.dateAsString}
                                title={m.title}
                                content={m.content}
                                clickHandler={reload} />)}
                    </tbody>
                </table>
            </div>
            <div className="fill pt-1 pb-1"></div>
        </div >
    );
}

export default MemoriesList;