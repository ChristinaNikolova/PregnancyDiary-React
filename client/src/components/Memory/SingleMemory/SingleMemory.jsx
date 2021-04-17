import { Link } from 'react-router-dom';

import './SingleMemory.css';

function SingleMemory({ id, date, title, content, clickHandler }) {
    const remove = () => {

    }

    return (
        <tr className="text-center row-single-week">
            <td>{date}</td>
            <td>{title}</td>
            <td>{content}</td>
            <td><Link to={`/diary/week/update/${id}`}><button className="btn btn-warning">Update</button></Link></td>
            <td><button className="btn btn-danger" onClick={remove}>Remove</button></td>
        </tr >
    );
}

export default SingleMemory;