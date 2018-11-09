import * as React from 'react';
import loading from './loading.svg';

class Callback extends React.Component {
    render() {

        return (
            <div>
                <img src={loading} alt="loading"/>
            </div>
        );
    }
}

export default Callback;