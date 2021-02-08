import React, {FunctionComponent} from 'react';
import {get} from 'lodash'
import './styles.css'

interface Props {
    name: string
    sprites: object
}

const SpriteBox: FunctionComponent<Props> = (props) => {
    const {name, sprites} = props

    const front_default_sprite: string = get(sprites, ['front_default'])
    const back_default_sprite: string = get(sprites, ['back_default'])

    return (
        <div className="card">
            <div className="card-image">
                <div className='animation'>
                    <div className='animation-frames'>
                        <div className='animation-frame'>
                            <figure className="image is-2by2 has-background-light">
                                <img src={front_default_sprite} alt={name}/>
                            </figure>
                        </div>
                        <div className='animation-frame'>
                            <figure className="image is-2by2 has-background-light">
                                <img src={back_default_sprite} alt={name}/>
                            </figure>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SpriteBox;
