import { Link } from 'react-router-dom';

import './UserDiaryRow.css';

function UserDiaryRow({ id, positiveTest, dueDate, gender, weeks, clickHandler }) {
    const remove = () => {

    }

    return (
        <tr className="text-center">
            <td>{positiveTest}</td>
            <td>{dueDate}</td>
            <td>{gender}</td>
            <td>{weeks}</td>
            <td><Link to={`/diary/see/${id}`}><button className="btn btn-details">See Diary</button></Link></td>
            <td><Link to={`/diary/update/${id}`}><button className="btn btn-warning">Update</button></Link></td>
            <td><button className="btn btn-danger" onClick={remove}>Remove</button></td>
        </tr >
    );
}

export default UserDiaryRow;