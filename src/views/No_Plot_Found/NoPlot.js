import React from 'react';
import './NoPlot.css';
// import imageName from '../../assets/images/bg.jpg';
const NoPlot = () => {
    return (
        <div id="notfound">
            <div class="notfound">
                {/* <div class="notfound-404">
                    <h1>Oops!</h1>
                </div> */}
                <h2>404 - Plot not found</h2>
                <p>The plot you are looking for might have been removed or purchased had or is temporarily unavailable.</p>
            </div>
        </div>
    );
};

export default NoPlot;
