import React from 'react'; 

const Card = (props) => {
    const { name, email, id } = props; 
    return (
        <div className="bg-light-blue dib br3 pa3 ma2 grow bw2 shadow-5 tc">
            <img alt="robots" src={`https://robohash.org/set_set3/${id}?size=200x200`} />
            <div>
                <h2>{name}</h2>
                <p>{email}</p>
            </div>
        </div>
    )
};

export default Card; 