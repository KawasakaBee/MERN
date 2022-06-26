import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getFiles, uploadFile } from '../../actions/file';
import { FileList } from './FileList/FileList';
import { Popup } from './Popup';
import { setCurrentDir, setPopupDisplay } from '../../redux/actions/actions';
import { Uploader } from './Uploader/Uploader';
import './disk.scss';

export const Disk = () => {
    const dispatch = useDispatch();
    const currentDir = useSelector(state => state.files.currentDir);
    const dirStack = useSelector(state => state.files.dirStack);
    const loader = useSelector(state => state.app.loader);
    const [dragEnter, setDragEnter] = useState(false);
    const [sort, setSort] = useState('type');

    useEffect(() => {
        dispatch(getFiles(currentDir, sort));
    }, [currentDir, sort])

    const showPopupHandler = () => dispatch(setPopupDisplay('flex'));

    const backClickHandler = () => {
        const backDirStack = dirStack.pop();
        dispatch(setCurrentDir(backDirStack));
    }

    const fileUploadHandler = (event) => {
        const files = [...event.target.files];
        files.forEach(file => dispatch(uploadFile(file, currentDir)));
    }

    function dragEnterHandler(event) {
        event.preventDefault();
        event.stopPropagation();
        setDragEnter(true);
    }

    function dragLeaveHandler(event) {
        event.preventDefault();
        event.stopPropagation();
        setDragEnter(false);
    }

    function dropHandler(event) {
        event.preventDefault();
        event.stopPropagation();
        let files = [...event.dataTransfer.files];
        files.forEach(file => dispatch(uploadFile(file, currentDir)));
        setDragEnter(false);
    }

    if (loader === true) {
        return (
            <div className='loader'>
                <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
            </div >
        )
    }

    return (!dragEnter ?
        <div className='disk' onDragEnter={dragEnterHandler} onDragLeave={dragLeaveHandler} onDragOver={dragEnterHandler}>
            <div className="disk__btns">
                <div className="disk__create" onClick={() => showPopupHandler()}>Create folder</div>
                <div className="disk__upload">
                    <label className='disk__upload-label' htmlFor="disk__upload-input">Upload file</label>
                    <input className='disk__upload-input' onChange={(event) => fileUploadHandler(event)} multiple={true} id='disk__upload-input' type="file" />
                </div>
                <select value={sort} onChange={event => setSort(event.target.value)} className="disk__select">
                    <option className='disk__option' value="name">Name</option>
                    <option className='disk__option' value="type">Type</option>
                    <option className='disk__option' value="date">Date</option>
                </select>
                {currentDir !== null && <div className="disk__back" onClick={() => backClickHandler()}>Back</div>}
            </div>
            <FileList />
            <Popup />
            <Uploader />
        </div>
        :
        <div className="drop-area" onDrop={dropHandler} onDragEnter={dragEnterHandler} onDragLeave={dragLeaveHandler} onDragOver={dragEnterHandler}>Drag files here</div>
    )
}
