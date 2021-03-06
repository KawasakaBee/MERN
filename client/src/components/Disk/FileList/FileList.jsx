import React from 'react'
import { useSelector } from 'react-redux';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { File } from './File/File';
import './fileList.scss';

export const FileList = () => {
    const files = useSelector(state => state.files.files);

    if (files.length === 0) {
        return (
            <div className='loader'>Files not found</div>
        )
    }

    return (
        <div className='filelist'>
            <div className="filelist__header">
                <div className="filelist__name">Name</div>
                <div className="filelist__date">Date</div>
                <div className="filelist__size">Size</div>
            </div>
            <TransitionGroup>
                {files.map(file =>
                    <CSSTransition key={file._id} timeout={500} classNames={'file'} exit={false}>
                        <File file={file} />
                    </CSSTransition>)}
            </TransitionGroup>
        </div>
    )
}
