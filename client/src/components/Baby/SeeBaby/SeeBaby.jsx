import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import * as babiesService from '../../../services/babiesService.js';

import './SeeBaby.css';

function SeeBaby({ diaryId, clickHandler }) {
    const [baby, setBaby] = useState({});

    useEffect(() => {
        babiesService
            .getDetails(diaryId)
            .then(res => setBaby(res))
            .catch(err => console.error(err));
    }, [diaryId]);

    return (
        <div className="baby-wrapper">
            <hr />
            <h3 className="custom-font text-center">Baby is Born!</h3>
            <h4 className="custom-font text-center">Welcome, {baby.name}!</h4>
            <p className="text-center">
                <Link to={`/diary/baby/update/${baby.id}/${diaryId}`}><button className="btn btn-warning mr-2">Update</button></Link>
                <button className="btn btn-danger" onClick={() => clickHandler(baby.id)}>Delete</button>
            </p>
            <div className="row text-center">
                <div className="col-md-6"><i className="fas fa-child"></i> Name: {baby.name}</div>
                {baby.genderAsString === 'Girl'
                    ? <div className="col-md-6"><i className="fas fa-heart female"></i> Gender: {baby.genderAsString}</div>
                    : <div className="col-md-6"><i className="fas fa-heart male"></i> Gender: {baby.genderAsString}</div>}
                <div className="col-md-6"><i className="fas fa-birthday-cake"></i> Birth Date: {baby.formattedBirthDate}</div>
                <div className="col-md-6"><i className="fas fa-clock"></i> Birth Time: {baby.birthTime}</div>
                <div className="col-md-6"><i className="fas fa-weight"></i> Weight: {baby.weight} gr</div>
                <div className="col-md-6"><i className="fas fa-clipboard-check"></i> Height: {baby.height} mm</div>
                <div className="col-md-12 m-3">
                    <img className="baby-born-pic" src={baby.picture} alt="baby-pic"></img>
                </div>
            </div>
        </div>
    );
}

export default SeeBaby;