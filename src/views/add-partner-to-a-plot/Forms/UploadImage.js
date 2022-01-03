import React from 'react';
import './UploadImage.css';
// import { DropzoneArea } from 'material-ui-dropzone';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import swal from 'sweetalert';
import server from '../../../server/server';
import { startLoading, stopLoading } from '../../../store/actions';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
const truncateSpace = (spacedValue) => {
    const [firstWord, secondWord] = spacedValue.split('%20');
    if (!secondWord) {
        return `${firstWord}`;
    } else {
        return `${firstWord} ${secondWord}`;
    }
};

const UploadImage = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    let { societyName, sectorNo, plotNo } = useParams();

    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(false);

    function imgHandler(event) {
        setImage(event.target.files[0]);
    }

    const onButtonClick = (event) => {
        event.preventDefault();
        event.target.files = null;
        setPreview(null);
    };

    const submitPaymentImageForm = async (values) => {
        try {
            const sN = truncateSpace(societyName);
            const secNo = truncateSpace(sectorNo);
            const plotn = truncateSpace(plotNo);
            const fd = new FormData();
            fd.append('paymentImage', image);
            fd.append('societyName', sN);
            fd.append('sectorNo', secNo);
            fd.append('plotNo', plotn);
            dispatch(startLoading());

            let response = await server.post('/paymentImages', fd);
            dispatch(stopLoading());
            console.log(response);

            // if (response.status === 400) {
            //     console.log(response);
            //     swal('Error!', `Succskas`, 'error');
            // }
        } catch (error) {
            dispatch(stopLoading());
            swal('Error!', `${error.response.data}`, 'error');
        }
    };
    useEffect(() => {
        if (image) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
            };
            reader.readAsDataURL(image);
            setImage(image);
        } else {
            setPreview(null);
        }
        console.log('🚀 ~ file: UploadImage.js ~ line 22 ~ useEffect ~ image', image);
    }, [image]);
    return (
        <div>
            <div className="file-upload">
                {preview ? (
                    <>
                        <button type="button" class="close" aria-label="Close" onClick={onButtonClick}>
                            <span aria-hidden="true">&times;</span>
                        </button>
                        <img className="file-upload-image" src={preview} alt="cook note" />
                    </>
                ) : (
                    <div>
                        <div className="image-upload-wrap">
                            <input className="file-upload-input" type="file" accept="image/*" onChange={imgHandler} />

                            <div className="drag-text">
                                <h3>Drag and drop a file or select add Image</h3>
                            </div>
                        </div>
                        <div className="file-upload-content">
                            <img className="file-upload-image" src={image} alt="cook note" />
                            <div className="image-title-wrap"></div>
                        </div>
                    </div>
                )}
                <button className="file-upload-btn" type="button" onClick={submitPaymentImageForm}>
                    Upload Image
                </button>
            </div>
        </div>
    );
};

export default UploadImage;
