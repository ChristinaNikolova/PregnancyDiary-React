import { Link } from 'react-router-dom';

import './SingleMemory.css';

function SingleMemory({ id, date, title, content, clickHandler }) {
    return (
        <tr className="text-center row-single-memory">
            <td>{date}</td>
            <td>{title}</td>
            <td>{content}</td>
            <td><Link to={`/week/memory/update/${id}`}><button className="btn btn-warning">Update</button></Link></td>
            <td><button className="btn btn-danger" onClick={() => clickHandler(id)}>Remove</button></td>
        </tr >
    );
}

export default SingleMemory;