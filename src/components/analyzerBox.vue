<template>
    <section class="analyzerBox el-main">
        <section>
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
        <section v-if="articleMod">
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
                <el-button type="primary">Analyze</el-button>
                <el-popconfirm width="220" confirm-button-text="OK" cancel-button-text="No, Thanks" :icon="InfoFilled"
                    icon-color="#626AEF" title="Confirm to clear all?" @confirm="articleClear()">
                    <template #reference>
                        <el-button type="danger">Clear</el-button>
                    </template>
                </el-popconfirm>
            </el-row>
        </section>
        <section v-else>
            <el-upload class="uploadFile" :drag="true" :accept="acceptFile" :limit="1" :action="uploadUrl"
                :method="uploadMethod" :with-credentials="true" :show-file-list="true" :auto-upload="false"
                :on-change="checkFile" :on-error="up.resShowErr" :on-success="up.resShowSuccess"
                :on-remove="function () { uploadAvail = false; }">
                <el-icon class="el-icon--upload"><upload-filled /></el-icon>
                <div class="el-upload__text">
                    Drop file here or <em>click to upload</em>
                </div>
                <template #tip>
                    <div class="el-upload__tip">
                        Single ".txt" file with a size less than 1 MB is available
                    </div>
                </template>
            </el-upload>
            <el-row class="analyzeBtnGroups">
                <el-button type="primary" :disabled="!uploadAvail">Upload & Analyze</el-button>
            </el-row>
        </section>
        <section class="analyzerBoxResultHeader">
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
        <section class="analyzerBoxResult">
            <h3 id="sentimentalLabel">Sentimental:</h3>
            <el-image :src="getIcon(sentimentalUrl[sentimentalIndex])" fit="fill" style="width: 280px; height: 50px">
                <template #error>
                    <div class="image-slot">
                        <div class="image-slot">{{ sentimentalText[sentimentalIndex] }}</div>
                    </div>
                </template>
                <template #placeholder>
                    <div class="image-slot">Loading<span class="dot">...</span></div>
                </template>s
            </el-image>

            <h3 id="detailLabel">Detail:</h3>
            <el-card class="box-card">
                <template #header>
                    <div class="card-header">
                        <span class="positionText">Position</span>
                        <el-divider direction="vertical" />
                        <span class="claimText">Claim</span>
                        <el-divider direction="vertical" />
                        <span class="evidenceText">Evidence</span>
                        <el-divider direction="vertical" />
                        <span class="defaultText">Irrelevant</span>
                    </div>
                </template>
                <el-text class="resultDetailBox" id="resultDetailBox">
                    <DetailResult></DetailResult>
                </el-text>
            </el-card>
        </section>

    </section>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import { InfoFilled, StarFilled, UploadFilled, Finished } from '@element-plus/icons-vue'
import * as up from '@/utils/upload'
import loveUrl from '../assets/images/love.svg'
import indifferentUrl from '../assets/images/indifferent.svg'
import sadUrl from '../assets/images/sad.svg'

const tips = ref<String>('Height: To adjust the height of article box.  /   Article Lock: To (un)lock the status of article to make it (un)available to edit.');
const articleMod = ref<Boolean>(true);
const articleText = ref<String>('');
const articleTextRows = ref<number>(10);
const articleLock = ref<Boolean>(false);
const acceptFile = ref<String>("text/plain");
// const acceptFile = ref<String>(".doc,.docx,.xml,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document")
const uploadUrl = ref<String>("");
const uploadMethod = ref<String>("POST");
const uploadAvail = ref<Boolean>(false);
const sentimentalIndex = ref<number>(0);
const sentimentalUrl = reactive([
    loveUrl,
    indifferentUrl,
    sadUrl
])
const sentimentalText = reactive(['Positive', 'Neutral', 'Negative']);

/**
 * Vite获取静态文件
 * @param url 静态文件地址
 */
const getIcon = (url: string) => {
    return new URL(url, import.meta.url).href;
}

/**
 * 获取update.ts中checkFile的返回值用的中间函数
 * @param uploadFile 钩子传过去的文件
 * @param uploadFiles 钩子传过去的文件组
 */
const checkFile = (uploadFile: any, uploadFiles: any) => {
    uploadAvail.value = up.checkFile(uploadFile, uploadFiles);
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
        articleMod.value = true;
    }
    else {
        console.error('Wrong param input while changing tabs!')
    }
}


</script>

<style scoped lang="scss">
@import '../assets/scss/analyzer.module.scss';
</style>