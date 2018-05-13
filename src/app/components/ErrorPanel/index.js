/**
 * Created by Aleksey on 4/16/2018.
 */

import React from 'react';
import PropTypes from 'prop-types';

const ErrorPanel = ({errors}) => {
    return (
        <div className="notification is-danger">
            <button className="delete"/>
            {
                errors.map((error, index) => {
                    return <p key={index} className='control'>{error}</p>
                })
            }
        </div>
    );

};

ErrorPanel.propTypes = {
    errors: PropTypes.array.isRequired
};

export default ErrorPanel;
