import { ElMessage } from 'element-plus';

export const checkFile = (uploadFile: any, uploadFiles: any) => {
    const size = uploadFile.raw.size;
    const type = uploadFile.raw.type;
    if (!size || !type) {
        ElMessage.error('Oops, looks like you\'ve uploaded a wrong file.');
        return false;
    }
    if (type !== 'text/plain') {
        ElMessage.error('The type of the file must be \'.txt\'(text/plain).');
        return false;
    }
    if (size / (1024 * 1024) > 1) {
        ElMessage.error('The size of the file must be less than 1 MB.');
        return false;
    }
    console.log("文件检查通过")
    return true;
}

export const resShowErr = (error: Error, uploadFile: any, uploadFiles: any) => {
    ElMessage.error('Upload failed for' + error + '.');
    return;
}

export const resShowSuccess = (response: any, uploadFile: any, uploadFiles: any) => {
    ElMessage.success(response);
    return;
}