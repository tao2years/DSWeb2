<template>
<section>
  <br>
  <div style="margin:5px 30px">
  <el-upload 
    class="upload-demo"
    action="https://jsonplaceholder.typicode.com/posts/"
    :before-upload="beforeUpload"
    :on-preview="handlePreview"
    :on-remove="handleRemove"
    :before-remove="beforeRemove"
    :on-exceed="handleExceed"
    :file-list="fileList">
    <el-button type="primary">点击上传</el-button>
    <div slot="tip" class="el-upload__tip">请上传NLU训练文件</div>
  </el-upload>
  </div>
  <br>
  <el-form ref="form" :model="form2" label-width="80px" @submit.prevent="onSubmit" style="margin:20px;width:60%;min-width:600px;">
		<el-form-item label="训练方式" >
			<el-select v-model="form2.region" placeholder="请选择训练方式">
				<el-option label="Embedding" value="Embedding"></el-option>
				<el-option label="Keras" value="Keras"></el-option>
			</el-select>
			<el-button type="primary" @click="trainModel()">立即训练</el-button>
			<el-button @click.native.prevent>取消</el-button>
		</el-form-item>
  </el-form>
</section>
</template>

<script>
  export default {
    data() {
      return {
        fileList: [],
        form2: {
					name: '',
					region: ''
				}
      };
    },
    methods: {
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },
      handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      },
      beforeRemove(file, fileList) {
        return this.$confirm(`确定移除 ${ file.name }？`);
      },
      beforeUpload(file){
            console.log(file.name)
            console.log(file.url)
            let fd = new FormData();
            fd.append('file',file);//传文件
            fd.append('filename',file.name);//传文件
            this.$http.post('apis/upload_train',fd).then(function(res){
                console.log(res.data)
            })
        },
      trainModel: function(){
        this.$http.post('apis/trainModel', {data: this.form2.region}).then(response => {
                console.log(response.data);
            }, response => {
                console.log("error");
        });
      }
    }
  }
</script>