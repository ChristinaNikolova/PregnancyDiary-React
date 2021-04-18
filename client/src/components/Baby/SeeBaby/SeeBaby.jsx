import { useEffect, useState } from 'react';

import * as babiesService from '../../../services/babiesService.js';

import './SeeBaby.css';

function SeeBaby({ diaryId }) {
    const [baby, setBaby] = useState({});

    useEffect(() => {
        babiesService
            .getDetails(diaryId)
            .then(res => setBaby(res))
            .catch(err => console.error(err));
    }, []);

    return (
        <div className="baby-wrapper">
            <hr />
            <h3 className="custom-font text-center">Baby is Born!</h3>
            <div className="row text-center">
                <div className="col-md-6"><i class="fas fa-child"></i> Name: {baby.name}</div>
                {baby.genderAsString === 'Girl'
                    ? <div className="col-md-6"><i class="fas fa-heart female"></i> Gender: {baby.genderAsString}</div>
                    : <div className="col-md-6"><i class="fas fa-heart male"></i> Gender: {baby.genderAsString}</div>}
                <div className="col-md-6"><i class="fas fa-birthday-cake"></i> Birth Date: {baby.formattedBirthDate}</div>
                <div className="col-md-6"><i class="fas fa-clock"></i> Birth Time: {baby.birthTime}</div>
                <div className="col-md-6"><i class="fas fa-weight"></i> Weight: {baby.weight} gr</div>
                <div className="col-md-6"><i class="fas fa-clipboard-check"></i> Height: {baby.height} mm</div>
                <div className="col-md-12 m-3">
                    <img className="baby-born-pic" src={baby.picture} alt="baby-pic"></img>
                </div>
            </div>
        </div>
    );
}

export default SeeBaby;