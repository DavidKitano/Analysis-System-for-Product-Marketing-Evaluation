<template>
    <section class="analyzerBox el-main">
        <section>
            <el-alert
                title="This page is built for PC views. Before we finish some adaptions for mobile phone views, please use a modern computer browser to access this page."
                type="warning" center show-icon />
            <el-space class="analyzerBoxHeader">
                <el-text id="textInput" class="tabActive" @click="changeTab('-1')">
                    <el-icon>
                        <EditPen />
                    </el-icon>
                    Text Input
                </el-text>
                <el-divider direction="vertical" />
                <el-text id="FileUpload" class="tabInactive" @click="changeTab('1')">
                    <el-icon>
                        <FolderOpened />
                    </el-icon>
                    File Upload
                </el-text>
            </el-space>
        </section>
        <section v-if="articleMod" v-loading="analyzeLoading">
            <div class="slider-block">
                <el-text>Height</el-text>
                <el-divider direction="vertical" />
                <el-text class="textGap-05">Article Lock</el-text>
                <el-switch v-model="articleLock" width="80" inline-prompt active-text="Lock" inactive-text="Unlock" />
                <el-divider direction="vertical" />
                <el-tooltip class="box-item" effect="dark" :content="tips" placement="top-start">
                    <el-icon class="biggerIcon">
                        <Warning />
                    </el-icon>
                </el-tooltip>
                <el-slider v-model="articleTextRows" :step="5" show-stops :min="0" :max="50" />
            </div>
            <el-form>
                <el-input v-model="articleText" :rows="articleTextRows" :disabled="articleLock" type="textarea"
                    placeholder="Please input the article." maxlength="6000" show-word-limit resize="none" />
            </el-form>
            <el-row class="analyzeBtnGroups">
                <el-button type="primary" :disabled="!articleText"
                    @click="textAnalyze(String(articleText))">Analyze</el-button>
                <el-popconfirm width="220" confirm-button-text="OK" cancel-button-text="No, Thanks" :icon="InfoFilled"
                    icon-color="#626AEF" title="Confirm to clear all?" @confirm="articleClear()" :disabled="articleLock"
                    v-if="articleText">
                    <template #reference>
                        <el-button type="danger" :disabled="articleLock">Clear</el-button>
                    </template>
                </el-popconfirm>
            </el-row>
        </section>
        <section v-else v-loading="analyzeLoading">
            <el-upload class="uploadFile" :drag="true" :accept="acceptFile" :limit="1" :method="uploadMethod"
                :with-credentials="true" :show-file-list="true" :auto-upload="false" :on-change="checkFile"
                :on-error="up.resShowErr" :on-success="up.resShowSuccess" :on-remove="function () { uploadAvail = false; }"
                ref="upload" :on-exceed="handleExceed" v-model:file-list="fileList" :http-request="fileAnalyze">
                <el-icon class="el-icon--upload"><upload-filled /></el-icon>
                <div class="el-upload__text">
                    Drop file here or <em>click to upload</em>
                </div>
                <template #tip>
                    <div class="el-upload__tip">
                        ※ Single ".txt" file with a size less than 1 MB is available. <br />
                        ※ Only 1 file allowed, new file will cover the old file.
                    </div>
                </template>
            </el-upload>
            <el-row class="analyzeBtnGroups">
                <el-button type="primary" :disabled="!uploadAvail" @click="fileAnalyze">Upload & Analyze</el-button>
            </el-row>
        </section>
        <section class="analyzerBoxResultHeader" v-if="detailResult.isExisted">
            <el-divider>
                <el-icon><star-filled /></el-icon>
            </el-divider>
            <el-text class="tabActive">
                <el-icon>
                    <Finished />
                </el-icon>
                Analysis
            </el-text>
        </section>
        <section class="analyzerBoxResult" v-if="detailResult.isExisted">
            <h3 id="sentimentalLabel">Sentimental:</h3>
            <el-image :src="opt.getIcon(sentimentalUrl[sentimentalIndex])" fit="fill" style="width: 280px; height: 50px">
                <template #error>
                    <div class="image-slot">
                        <div class="image-slot">{{ sentimentalText[sentimentalIndex] }}</div>
                    </div>
                </template>
                <template #placeholder>
                    <div class="image-slot">Loading<span class="dot">...</span></div>
                </template>
            </el-image>

            <h3 id="detailLabel">Detail:</h3>
            <el-card class="box-card">
                <template #header>
                    <div class="card-header">
                        <span class="claimText">Claim</span>
                        <el-divider direction="vertical" />
                        <span class="evidenceText">Evidence</span>
                        <el-divider direction="vertical" />
                        <span class="positionText">Position</span>
                        <el-divider direction="vertical" />
                        <span class="concluding_StatementText">Concluding Statement</span>
                        <el-divider direction="vertical" />
                        <span class="leadText">Lead</span>
                        <el-divider direction="vertical" />
                        <span class="counterclaimText">Counterclaim</span>
                        <el-divider direction="vertical" />
                        <span class="rebuttalText">Rebuttal</span>
                        <el-divider direction="vertical" />
                        <span class="defaultText">Irrelevant contents have been filtered</span>
                    </div>
                </template>
                <el-text class="resultDetailBox" id="resultDetailBox">
                    <DetailResult :data="toRaw(detailResult.data)"></DetailResult>
                </el-text>
            </el-card>
        </section>
    </section>
</template>

<script setup lang="ts">
import { reactive, ref, toRaw } from 'vue';
import { ElMessage, genFileId } from 'element-plus';
import type { UploadInstance, UploadProps, UploadRawFile } from 'element-plus';
import { InfoFilled, StarFilled, UploadFilled, Finished } from '@element-plus/icons-vue';
import * as up from '@/utils/upload';
import * as opt from '@/utils/optimize';
import * as ana from '@/api/analyzer';
import loveUrl from '../assets/images/love.svg';
import indifferentUrl from '../assets/images/indifferent.svg';
import sadUrl from '../assets/images/sad.svg';
import { useMainStore } from '@/stores/user';
import pinia from '@/stores/';

/** Pinia存储 */
const store = useMainStore(pinia);
const usernameSession = sessionStorage.getItem('username');
const tips = ref<String>('Height: To adjust the height of article box.  /   Article Lock: To (un)lock the status of article to make it (un)available to edit.');
const articleMod = ref<Boolean>(true);
const articleText = ref<String>('');
const articleTextRows = ref<number>(10);
const articleLock = ref<Boolean>(false);
const acceptFile = ref<String>("text/plain");
// const acceptFile = ref<String>(".doc,.docx,.xml,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document")
const uploadMethod = ref<String>("POST");
const uploadAvail = ref<Boolean>(false);
const sentimentalIndex = ref<number>(0);
const sentimentalUrl = reactive([
    loveUrl,
    indifferentUrl,
    sadUrl
])
const sentimentalText = reactive(['Positive', 'Neutral', 'Negative']);
const upload = ref<UploadInstance>()
let detailResult = reactive({
    data: [
        // ["Claim", "This is a text that used for claim something."],
        // ["Claim", "I know that it is weird to get into this situation, but I'm gonna frankly speak out for claiming stuff for everyone sitting here."],
        // ["Evidence", "This article shows the fact that LGBT community is still having a long way to go to fight actually for their legal rights."]
    ],
    isExisted: false
});
const analyzeLoading = ref<Boolean>(false);
let fileList: any = [];
let fd = new FormData();

/**
 * 获取update.ts中checkFile的返回值用的中间函数
 * @param uploadFile 钩子传过去的文件
 * @param uploadFiles 钩子传过去的文件组
 */
const checkFile = (uploadFile: any, uploadFiles: any) => {
    uploadAvail.value = up.checkFile(uploadFile, uploadFiles);
}

/**
 * 监听上传文件的覆盖情况
 */
const handleExceed: UploadProps['onExceed'] = (files) => {
    upload.value!.clearFiles()
    const file = files[0] as UploadRawFile
    file.uid = genFileId()
    upload.value!.handleStart(file)
}

/**
 * 清除文本内容
 */
const articleClear = () => {
    articleText.value = '';
}

/**
 * 换tab
 * @param param Tab参数
 */
const changeTab = (param: any) => {
    const text = document.getElementById('textInput');
    const file = document.getElementById('FileUpload');
    if (param == "1") {
        articleMod.value = false;
        text?.classList.remove('tabActive');
        text?.classList.add('tabInactive');
        file?.classList.remove('tabInactive');
        file?.classList.add('tabActive');
    }
    else if (param == "-1") {
        text?.classList.remove('tabInactive');
        text?.classList.add('tabActive');
        file?.classList.remove('tabActive');
        file?.classList.add('tabInactive');
        if (!articleLock.value) {
            articleClear();
        }
        articleMod.value = true;
    }
    else {
        console.error('Wrong param input while changing tabs!')
    }
}

const textAnalyze = (text: string) => {
    // console.log(store.loginStatus)
    if (!usernameSession && !store.loginStatus
    ) {
        ElMessage.error('Please login first!');
        return;
    }
    if (!text) {
        ElMessage.error('Please input text!');
        return;
    }
    analyzeLoading.value = true;
    detailResult.data = [];
    detailResult.isExisted = false;
    sentimentalIndex.value = 0;
    setTimeout(async () => {
        opt.debounce(async () => {
            let res = await ana.textAnalyzeApi(text);
            res = opt.formalizeRes(res);
            console.log('中间件', res);
            analyzeLoading.value = false;
            if (!res) return;
            if (res['avail']) {
                ElMessage({
                    showClose: true,
                    message: res['msg'],
                    type: 'success',
                    duration: 2500
                });

                detailResult.isExisted = true;
                detailResult.data = up.formalizeDetailRes(res).text;
                sentimentalIndex.value = up.formalizeDetailRes(res).sentimentalIndex;
            } else {
                ElMessage({
                    showClose: true,
                    message: res['msg'],
                    type: 'error',
                    duration: 2500
                });
            }
        }, 1000, true);
    }, 1000)
}

const fileAnalyze = (params: any) => {
    if (!params) return;
    console.log('上传文件实例', params)
    if (!usernameSession && !store.loginStatus
    ) {
        ElMessage.error('Please login first!');
        return;
    }
    // upload.value!.submit();
    if (!fileList[0]) {
        return;
    }
    fd.append("file", fileList[0].raw);
    analyzeLoading.value = true;
    detailResult.data = [];
    detailResult.isExisted = false;
    sentimentalIndex.value = 0;
    setTimeout(async () => {
        opt.debounce(async () => {
            let res = await ana.fileAnalyzeApi(fd);
            res = opt.formalizeRes(res);
            analyzeLoading.value = false;
            if (!res) return;
            if (res['avail']) {
                ElMessage({
                    showClose: true,
                    message: res['msg'],
                    type: 'success',
                    duration: 2500
                });
                detailResult.isExisted = true;
                detailResult.data = up.formalizeDetailRes(res).text;
                sentimentalIndex.value = up.formalizeDetailRes(res).sentimentalIndex
            } else {
                ElMessage({
                    showClose: true,
                    message: res['msg'],
                    type: 'error',
                    duration: 2500
                });
            }
        }, 1000, true);
    }, 1000)
}
</script>

<style scoped lang="scss">
@import '../assets/scss/analyzer.module.scss';

@import '../assets/scss/sentimental_category.scss';
</style>