import axios from "axios";
import { addFile, addUploadFile, changeUploaderFile, createFiles, deleteFileAction, hideLoader, showLoader, showUploader } from "../redux/actions/actions";

export const getFiles = (dirId, sort) => async dispatch => {
    try {
        dispatch(showLoader());
        let url = 'http://localhost:5000/api/files';
        if (dirId) url = `http://localhost:5000/api/files?parent=${dirId}`;
        if (sort) url = `http://localhost:5000/api/files?sort=${sort}`;
        if (dirId && sort) url = `http://localhost:5000/api/files?parent=${dirId}&sort=${sort}`;
        const response = await axios.get(url, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });
        dispatch(createFiles(response.data));
    } catch (e) {
        alert(e.response.data.message);
    } finally {
        dispatch(hideLoader());
    }
}

export const createDir = (dirId, name) => async dispatch => {
    try {
        const response = await axios.post('http://localhost:5000/api/files', {
            name,
            parent: dirId,
            type: 'dir'
        }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });
        dispatch(addFile(response.data));
    } catch (e) {
        alert(e.response.data.message);
    }
}

export const uploadFile = (file, dirId ) => async dispatch => {
    try {
        const formData = new FormData();
        formData.append('file', file);
        if(dirId) formData.append('parent', dirId);

        const uploadFile = {name: file.name, progress: 0, id: Date.now()};
        dispatch(showUploader());
        dispatch(addUploadFile(uploadFile));

        const response = await axios.post('http://localhost:5000/api/files/upload', formData, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
            onUploadProgress: progressEvent => {
                const totalLength = progressEvent.lengthComputable ? progressEvent.total : progressEvent.target.getResponseHeader('content-length') || progressEvent.target.getResponseHeader('x-decompressed-content-length');
                if (totalLength) {
                    uploadFile.progress = Math.round((progressEvent.loaded * 100) / totalLength);
                    dispatch(changeUploaderFile(uploadFile));
                }
            }
        });
        dispatch(addFile(response.data));
    } catch (e) {
        alert(e.response.data.message);
    }
}

export async function downloadFile(file) {
    const response = await fetch(`http://localhost:5000/api/files/donwload?id=${file._id}`, {headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }});

    if(response.status === 200) {
        const blob = await response.blob();
        const donwloadUrl = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = donwloadUrl;
        link.download = file.name;
        document.body.appendChild(link);
        link.click();
        link.remove();
    }

}

export const deleteFile = (file) => async dispatch => {
    try {
        const response = await axios.delete(`http://localhost:5000/api/files?id=${file._id}`, {headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }});
        dispatch(deleteFileAction(file._id));
        alert(response.data.message);
    } catch (e) {
        alert(e.response.data.message);
    }
}

export const searchFiles = (search) => async dispatch => {
    try {
        const response = await axios.get(`http://localhost:5000/api/files/search?search=${search}`, {headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }});
        dispatch(createFiles(response.data));
    } catch (e) {
        alert(e.response.data.message);
    } finally {
        dispatch(hideLoader());
    }
}
