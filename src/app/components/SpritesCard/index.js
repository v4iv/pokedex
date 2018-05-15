/**
 * Created by vaibhav on 15/5/18
 */
import React from 'react';

const SpritesCard = ({sprites, name}) => {
    return (
        <div className="card">
            <div className="card-header">
                <p className="card-header-title">
                    Sprites
                </p>
            </div>
            <div className="columns">
                {sprites
                    .filter(sprite => sprite !== null)
                    .reverse()
                    .map((sprite, index) => {
                            return (
                                <div className="column" key={index}>
                                    <figure className="image is-2by2">
                                        <img async src={sprite}
                                             alt={name}/>
                                    </figure>
                                </div>
                            )
                        }
                    )}
            </div>
        </div>
    );
};

export default SpritesCard;