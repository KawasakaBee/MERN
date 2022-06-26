import React from 'react'
import folderImg from '../../../../assets/img/folder.svg';
import fileImg from '../../../../assets/img/file.svg';
import { useDispatch, useSelector } from 'react-redux';
import { pushToStack, setCurrentDir } from '../../../../redux/actions/actions';
import { deleteFile, downloadFile } from '../../../../actions/file';
import { sizeFormat } from '../../../../utils/Input/sizeFormat';
import './file.scss';

export const File = ({ file }) => {
    const currentDir = useSelector(state => state.files.currentDir);
    const dispatch = useDispatch();

    const openDirHandler = () => {
        if (file.type === 'dir') {
            dispatch(pushToStack(currentDir));
            dispatch(setCurrentDir(file._id));
        }
    }

    const downloadClickHanler = (event) => {
        event.stopPropagation();
        downloadFile(file);
    }

    const deleteClickHandler = (event) => {
        event.stopPropagation();
        dispatch(deleteFile(file));
    }

    return (
        <div className='file' onClick={() => openDirHandler(file)}>
            <img className='file__img' src={file.type === 'dir' ? folderImg : fileImg} alt='file' />
            <div className="file__name">{file.name}</div>
            <div className="file__date">{file.date.split('').slice(0, 10)}</div>
            <div className="file__size">{sizeFormat(file.size)}</div>
            {file.type !== 'dir' && <button className='file__btn file__download' onClick={(event) => downloadClickHanler(event)}>Download</button>}
            <button className='file__btn file__delete' onClick={(event) => deleteClickHandler(event)}>Delete</button>
        </div>
    )
}
