import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { UploadFile } from './UploadFile/UploadFIle';
import { hideUploader } from '../../../redux/actions/actions';
import './uploader.scss';

export const Uploader = () => {
    const files = useSelector(state => state.upload.files);
    const dispatch = useDispatch();
    const isVisible = useSelector(state => state.upload.isVisible);

    return (isVisible &&
        <div className='uploader'>
            <div className="uploader__header">
                <div className="uploader__title">Donwloads</div>
                <button className="uploader__close" onClick={() => dispatch(hideUploader())}>X</button>
            </div>
            {files.map(file => <UploadFile key={file.id} file={file} />)}
        </div>
    )
}
