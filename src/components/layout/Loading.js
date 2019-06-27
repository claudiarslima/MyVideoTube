import React from 'react';
import ReactLoading from 'react-loading';

const Loading = ({ type, color }) => (
    <ReactLoading type="spinningBubbles" className="loading m-auto d-flex" color="#801336" height={'100vh'} width={'100vw'} />
);

export default Loading;
