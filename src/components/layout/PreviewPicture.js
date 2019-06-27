import React from 'react';

const PreviewPicture = (props) => {
    const {pictureUrl} = props;
    return (
        <img id="img_user" src={pictureUrl} style={{
            height: "130px",
            width: "130px",
            position: "relative",
            top: "-80px",
            left: "25%",
            zIndex: "8",
            border: "2px solid white",
            padding: "3px",
            margin: "auto"
        }} className="rounded-circle"/>
    )
};

export default PreviewPicture;