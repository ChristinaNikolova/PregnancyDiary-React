import { Link } from 'react-router-dom';

import './SingleWeek.css';

function SingleWeek({ id, number, mood, moments, clickHandler }) {
    return (
        <tr className="text-center row-single-week">
            <td className="td-number">{number}</td>
            <td className="td-mood">{mood}</td>
            <td className="td-moments">{moments}</td>
            <td className="td-see-week"><Link to={`/diary/week/see/${id}`}><button className="btn btn-details">See Week</button></Link></td>
            <td className="td-update-week"><Link to={`/diary/week/update/${id}`}><button className="btn btn-warning">Update</button></Link></td>
            <td className="td-remove-week"><button className="btn btn-danger" onClick={() => clickHandler(id)}>Remove</button></td>
        </tr>
    );
}

export default SingleWeek;