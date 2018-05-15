/**
 * Created by vaibhav on 15/5/18
 */
import React from 'react';

const StatsCard = ({stats}) => {
    return (
        <div className="card">
            <div className="card-header">
                <p className="card-header-title">
                    Stats
                </p>
            </div>
            <div className="card-content">
                {stats.map((stat, index) =>
                    <div key={index}>
                        <p className="has-text-grey is-uppercase is-4">{stat.stat.name}</p>

                        <progress className="progress is-primary" value={stat.base_stat}
                                  max="100">{stat.base_stat}%
                        </progress>
                    </div>
                )}
            </div>
        </div>
    );
};

export default StatsCard;