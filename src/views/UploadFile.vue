<template>
    <div>
      <a-button icon="upload"  type="primary" style="margin-right: 8px" @click="uploadResult">
        上传
      </a-button>
      <a-modal v-model="uploadResultVisible" @cancel="cancel" :okText="'提交'" :cancelText="'取消'" title="上传文件" @ok="handleOk">
      <a-upload-dragger
        name="file"
        :multiple="true"
        :fileList="fileList"
        @download="handleDownload"
        :remove="removefiles"
        @change="handleChange"
        :beforeUpload="beforeUpload"
      >
        <p class="ant-upload-drag-icon">
          <a-icon type="container" />
        </p>
        <p class="ant-upload-text">
          点击或将文件拖拽到这里上传
        </p>
        <p class="ant-upload-hint">
          支持扩展名：待定
        </p>
      </a-upload-dragger>
      </a-modal>
    </div>
</template>

<script>
  import {uploadFiles } from '@/request/api'

  export default {
        name: "UploadFile",
      data(){
          return{
            // 将数组文件变成受控，必须设置，否则会用组件默认的
            fileList:[],
            // 控制弹框的状态
            uploadResultVisible: false,
          }
      },
      methods:{
          // 点击上传按钮显示弹框
        uploadResult(){
          this.uploadResultVisible = true
        },
        // 点击取消清空文件列表
        cancel(){
          this.fileList = []
        },

        // 点击提交按钮调接口并关闭弹框
        handleOk(e) {
          console.log(e);
          // 同时传多个文件并一起传递给后台，需要用formData来承载
          var formData = new FormData()
          for (const item of this.fileList) {
            // 追加数据
            formData.append('files', item)
            console.log(formData.get("files"));
            // set和append作用差不多，set会覆盖之前的
            formData.set('id', this.taskId)
          }

          // 调接口
          uploadFiles(formData).then((res) => {
            console.log(res)
            if(res.status==200){
              this.fileList = []
              this.$message.success('操作成功')
              // 关闭弹框
              this.uploadResultVisible = false;
            }
          }).catch((err)=>{
            console.log(err)
          })
        },


        // 文件下载
        handleDownload (file) {
          console.log(file)
          this.$message.warn('您点击了下载')
        },

        // 点垃圾桶触发的事件(删除文件)
        removefiles(file) {
          console.log(file,this.fileList)   //file代表点击的文件，this.fileList代表总上传数
          // 通过文件的 uid对比 确定具体删除哪一个
          this.fileList.forEach((item,index)=>{
            if (item.uid === file.uid) {
              this.fileList.splice(index, 1)
              console.log(this.fileList)
            }
          })
        },
        // 文件状态改变时触发的事件
        handleChange(info) {
          console.log(info)
          const status = info.file.status;
          console.log(status)
          if (status !== 'uploading') {
            console.log(info.file, info.fileList);
          }
          if (status === 'done') {
            this.$message.success(`${info.file.name} file uploaded successfully.`);
          } else if (status === 'error') {
            this.$message.error(`${info.file.name} file upload failed.`);
          }
        },
        // 上传前触发的事件
        beforeUpload(file, fileList) {
          const fileType = file.name.replace(/.+\./, '');
          const fileFormat =
            fileType === 'zip' ||
            fileType === 'rar' ||
            fileType === 'pdf' ||
            fileType === 'docx' ||
            fileType === 'doc' ||
            fileType === 'png' ||
            fileType === 'jpg' ||
            fileType === 'jpeg';
          const fileSize = file.size !== 0;
          console.log(fileSize)
          if (!fileFormat) {
            fileList.splice(fileList.indexOf(file),1);
            this.$message.error('只能上传rar、zip、doc、docx、pdf、jpg 格式的文件');
            return false;
          }
          const isLt10M = file.size / 1024 / 1024 < 10;
          if (!isLt10M) {
            fileList.splice(fileList.indexOf(file),1);
            this.$message.error('文件大小不能超过10MB!');
            return false;
          }
          if (!fileSize) {
            fileList.splice(fileList.indexOf(file),1);
            this.$message.error('不能上传空文件!');
            return false;
          }

          // 最多上传10个
          if(this.fileList.length<10){
            this.fileList.push(file)
            console.log(this.fileList)
          }else {
            this.$message.warning(`最多上传10个文件`);
          }
          return false  //暂时不保存  必须写上，不然会请求地址栏的地址
        },

      }
    }
</script>

<style scoped>

</style>
