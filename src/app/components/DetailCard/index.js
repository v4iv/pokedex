/**
 * Created by vaibhav on 15/5/18
 */
import React from 'react';

const DetailCard = ({height, weight, category, ablities}) => {
    return (
        <div className="card">
            <div className="card-header">
                <p className="card-header-title">
                    Details
                </p>
            </div>
            <div className="card-content">
                <div className="columns">
                    <div className="column is-half">
                        <p className="is-6 has-text-grey">Height</p>
                        <p>{height / 10} m</p>
                        <p className="is-6 has-text-grey">Weight</p>
                        <p>{weight / 10} kg</p>
                    </div>
                    <div className="column is-half">
                        <p className="is-6 has-text-grey">Category</p>
                        <p>{category}</p>
                        <p className="is-6 has-text-grey">Abilities</p>
                        {ablities.map((ability, index) => {
                            return <p key={index}
                                      className="is-capitalized">{ability.ability.name}</p>
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DetailCard;