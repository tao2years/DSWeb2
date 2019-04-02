<template>
	<section>
        <!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="filters">
				<el-form-item>
					<el-button type="info" @click="handleAdd">新增词槽</el-button>
				</el-form-item>
			</el-form>
		</el-col>

        <!-- 列表 -->
        <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="Cname" label="词槽名称" ></el-table-column>
            <el-table-column prop="Ename" label="英文别名" ></el-table-column>
            <el-table-column prop="Description" label="词槽描述" ></el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <!-- 编辑页面 -->
		<el-dialog title="编辑" v-model="editForm2Visible" :close-on-click-modal="false">
			<el-form :model="editForm2" label-width="80px" :rules="editForm2Rules" ref="editForm2">
				<el-form-item label="词槽名称" prop="Cname">
					<el-input v-model="editForm2.Cname" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="英文别名" prop="Ename">
					<el-input v-model="editForm2.Ename" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="词槽描述" prop="Description">
					<el-input type="textarea" v-model="editForm2.Description"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="editForm2Visible = false">取消</el-button>
				<el-button type="primary" @click.native="editSubmit" :loading="editLoading2">提交</el-button>
			</div>
		</el-dialog>

        <!--新增界面-->
		<el-dialog title="新增" v-model="addForm2Visible" :close-on-click-modal="false">
			<el-form :model="addForm2" label-width="80px" :rules="addForm2Rules" ref="addForm2">
				<el-form-item label="词槽名称" prop="Cname">
					<el-input v-model="addForm2.Cname" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="英文别名" prop="Ename">
					<el-input v-model="addForm2.Ename" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="词槽描述" prop="Description">
					<el-input type="textarea" v-model="addForm2.Description"></el-input>
				</el-form-item>
                <el-form-item label="词槽词典" prop="Dict">
                    <el-upload
                        class="upload-demo"
                        action="https://jsonplaceholder.typicode.com/posts/"
                        :before-upload="beforeUpload"
                        :on-preview="handlePreview"
                        :on-remove="handleRemove"
                        :before-remove="beforeRemove"
                        :on-exceed="handleExceed"
                        :file-list="fileList">
                        <el-button size="small" type="primary">点击上传</el-button>
                        <div slot="tip" class="el-upload__tip">只能上传txt文件</div>
                    </el-upload>
					<!-- <el-input type="textarea" v-model="addForm2.Dict"></el-input> -->
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="addForm2Visible = false">取消</el-button>
				<el-button type="primary" @click.native="addSubmit" :loading="addLoading2">提交</el-button>
			</div>
		</el-dialog>

	</section>
</template>

<script>
import data from '@/assets/intent.json'
export default {
    data() {
        return {
            fileList:[],
            filters: {
                Cname: ''
            },
            tableData: [],
            index: '',
            editForm2Visible: false,//编辑界面是否显示
		    editLoading2: false,
			editForm2Rules: {
				Cname: [
                    { required: true, message: '请输入词槽名称', trigger: 'blur' }
                ],
                Ename: [
                    { required: true, message: '请输入英文别名', trigger: 'blur' }
				]
			},
			//编辑界面数据
			editForm2: {
                Cname: '',
                Ename: '',
                Description: ''
            },
            addForm2Visible: false,//新增界面是否显示
			addLoading2: false,
			addForm2Rules: {
				Cname: [
                    { required: true, message: '请输入词槽名称', trigger: 'blur' }
                ],
                Ename: [
                    { required: true, message: '请输入英文别名', trigger: 'blur' }
				]
            },
            addForm2: {
                Cname: '',
                Ename: '',
                Description: ''
            },
        }
      },
    methods:{
        // 加载本地数据
        makeData: function(){
            var temp = []
            for (var val in data) {
                // console.log(val)
                this.tableData.push(data[val])
            }
        },
        //加载服务器数据
        makeSerData: function(){
            this.$http.get('apis/getSlotData').then(response => {
                    for (var val in response.data) {
                        // console.log(val)
                        this.tableData.push(response.data[val])
                    }
                }, response => {
                    console.log("error");
                });    
        },
        // 删除数据
        handleDelete(index, row) {
            this.$confirm('确认删除该记录吗?', '提示', {
					type: 'warning'
				}).then(()=>{
                    this.tableData.splice(index, 1);
                    this.saveData()
                }).catch(() => {

				})
            console.log(this.tableData);
        },
        // 编辑数据
        handleEdit: function (index, row) {
            // console.log(index, row);
			this.editForm2Visible = true;
            this.editForm2 = Object.assign({}, row);
            this.index = index
        },
        // 提交编辑
        editSubmit: function (){
            this.$refs.editForm2.validate((valid)=>{
                if (valid){
                    this.$confirm('确认提交吗？', '提示', {}).then(()=>{
                        this.editLoading2 = true;
                        let para = Object.assign({}, this.editForm2);
                        this.editLoading2 = false;
                        this.$message({
							message: '提交成功',
							type: 'success'
                        });
                        this.editForm2Visible = false;
                        this.tableData.splice(this.index, 1, para);
                        // console.log(this.tableData)
                        this.$refs['editForm2'].resetFields();
                        this.saveData()
                    }).catch(() => {

				    })
                }
            })
        },
        //显示新增界面
		handleAdd: function () {
			this.addForm2Visible = true;
			this.addForm2 = {
				Cname: '',
                Ename: '',
                Description: ''
			};
        },
        addSubmit: function () {
			this.$refs.addForm2.validate((valid)=>{
                if (valid){
                    this.$confirm('确认提交吗？', '提示', {}).then(()=>{
                        this.addLoading2 = true;
                        let para = Object.assign({}, this.addForm2);
                        console.log(para)
                        this.addtLoading = false;
                        this.$message({
							message: '提交成功',
							type: 'success'
                        });
                        this.addForm2Visible = false;
                        // this.tableData.splice(this.index, 1, para);
                        // console.log(this.tableData)
                        this.tableData.push(para)
                        this.$refs['addForm2'].resetFields();
                        this.saveData()
                        console.log("save successs")
                    }).catch(() => {

				    })
                }
            })
        },
        // 保存文件
        saveData:function() {
            // console.log(this.tableData)
            this.$http.post('apis/testSlot', {data: this.tableData}).then(response => {
                console.log(response.data);
            }, response => {
                console.log("error");
            });
        },
        handleRemove(file, fileList) {
        console.log(file, fileList);
        },
        handlePreview(file) {
            console.log(file);
        },
        handleExceed(files, fileList) {
            this.$message.warning(`出错了`);
        },
        beforeRemove(file, fileList) {
            return this.$confirm(`确定移除 ${ file.name }？`);
        },
        beforeUpload(file){
            console.log(file.name)
            let fd = new FormData();
            fd.append('file',file);//传文件
            fd.append('filename',file.name);//传文件
            this.$http.post('apis/upload',fd).then(function(res){
                console.log(res.data)
            })
        },
    },
    created(){
        // this.makeData()
        this.makeSerData()
    }
}
</script>

<style scoped>
.textarea-inherit {
        width: 100%;
        overflow: auto;
        word-break: break-all; 
    }
</style>