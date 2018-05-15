/**
 * Created by vaibhav on 15/5/18
 */
import React from 'react';

const SpecieCard = ({number, name, image, types, flavor_text}) => {
    let id_string = "" + number;
    let filler = "000";
    let pokemon_id = filler.substring(0, filler.length - id_string.length) + id_string;
    return (
        <div className="card">
            <div className="card-image">
                <figure className="image is-2by2 has-background-light">
                    <img async src={image}
                         alt={name}/>
                </figure>
            </div>
            <div className="card-content">
                <div className="media">
                    <div className="media-content">
                        <p className="subtitle is-6 has-text-grey">#{pokemon_id}</p>
                        <p className="title is-4 is-capitalized">
                            <span
                                className="has-text-black">
                                {name}
                            </span>
                        </p>
                        <p className="subtitle is-6">{flavor_text}</p>
                    </div>
                </div>
            </div>
            <footer className="card-footer">
                {types.map((item, index) =>
                    <span key={index}
                          className={`card-footer-item is-uppercase ${item.type.name}`}>
                        {item.type.name}
                    </span>
                )}
            </footer>
        </div>
    );
};

export default SpecieCard;