import React, {FunctionComponent} from 'react';
import { get } from 'lodash';

interface Props{
    stats: object[]
}

const StatsBox: FunctionComponent<Props> = (props) => {
    const {stats} = props
    return (
        <div className='box'>
            {stats.map((stat, idx) => {
                const stat_name = get(stat, ['stat', 'name'])
                const base_stat = get(stat, ['base_stat'])

                return <div className='column' key={idx}>
                    <label className='label is-uppercase'>{stat_name}</label>
                    <progress className="progress is-primary" value={base_stat} max="100">{base_stat}%</progress>
                </div>
            })}
        </div>
    );
};

export default StatsBox;
