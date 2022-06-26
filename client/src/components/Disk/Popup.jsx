import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Input } from '../../utils/Input/Input'
import { createDir } from '../../actions/file';
import { setPopupDisplay } from '../../redux/actions/actions';

export const Popup = () => {
    const [dirName, setDirName] = useState('');
    const popupDisplay = useSelector(state => state.files.popupDisplay);
    const currentDir = useSelector(state => state.files.currentDir);
    const dispatch = useDispatch();

    const createDirHandler = () => {
        dispatch(createDir(currentDir, dirName));
        dispatch(setPopupDisplay('none'));
        setDirName('');
    }

    return (
        <div className='popup' style={{ display: popupDisplay }} onClick={() => dispatch(setPopupDisplay('none'))} >
            <div className="popup__content" onClick={event => event.stopPropagation()}>
                <div className="popup__header">
                    <div className="popup__title">Create new folder</div>
                    <button className="popup__close" onClick={() => dispatch(setPopupDisplay('none'))}>X</button>
                </div>
                <Input className="popup__input" value={dirName} setValue={setDirName} type="text" placeholder='Enter folder name' />
                <button className="popup__create" onClick={() => createDirHandler()}>Create</button>
            </div>
        </div>
    )
}
