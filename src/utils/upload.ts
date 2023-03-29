import { ElMessage } from 'element-plus';

export type DetailResGroup = {
    name: string
    color: string
    count: number
    status: string
    icon: string
    headers: [{ name: string; key: string; format: any }]
    data: any[]
    operators: [
        {
            name: string
            icon: string
            handle: any
        }
    ]
}

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

export const formalizeDetailRes = (data: any) => {
    const res = {
        text: data.tagging_text,
        sentimentalIndex: 0
    };
    switch (data.sentimental) {
        default:
        case '-1': {
            res.sentimentalIndex = 2;
            break;
        }
        case '0': {
            res.sentimentalIndex = 1;
            break;
        }
        case '1': {
            res.sentimentalIndex = 0;
            break;
        }
    }
    return res;
}