<template>
	<section>
        <!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="filters">
				<el-form-item>
					<el-button type="info" @click="handleAdd">新增意图</el-button>
				</el-form-item>
			</el-form>
		</el-col>

        <!-- 列表 -->
        <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="Cname" label="意图名称" ></el-table-column>
            <el-table-column prop="Ename" label="英文别名" ></el-table-column>
            <el-table-column prop="Description" label="意图描述" ></el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <!-- 编辑页面 -->
		<el-dialog title="编辑" v-model="editFormVisible" :close-on-click-modal="false">
			<el-form :model="editForm" label-width="80px" :rules="editFormRules" ref="editForm">
				<el-form-item label="意图名称" prop="Cname">
					<el-input v-model="editForm.Cname" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="英文别名" prop="Ename">
					<el-input v-model="editForm.Ename" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="意图描述" prop="Description">
					<el-input type="textarea" v-model="editForm.Description"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="editFormVisible = false">取消</el-button>
				<el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
			</div>
		</el-dialog>

        <!--新增界面-->
		<el-dialog title="新增" v-model="addFormVisible" :close-on-click-modal="false">
			<el-form :model="addForm" label-width="80px" :rules="addFormRules" ref="addForm">
				<el-form-item label="意图名称" prop="Cname">
					<el-input v-model="addForm.Cname" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="英文别名" prop="Ename">
					<el-input v-model="addForm.Ename" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="意图描述" prop="Description">
					<el-input type="textarea" v-model="addForm.Description"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="addFormVisible = false">取消</el-button>
				<el-button type="primary" @click.native="addSubmit" :loading="addLoading">提交</el-button>
			</div>
		</el-dialog>

	</section>
</template>

<script>
import data from '@/assets/intent.json'
export default {
    data() {
        return {
            filters: {
                Cname: ''
            },
            tableData: [],
            index: '',
            editFormVisible: false,//编辑界面是否显示
		    editLoading: false,
			editFormRules: {
				Cname: [
                    { required: true, message: '请输入意图名称', trigger: 'blur' }
                ],
                Ename: [
                    { required: true, message: '请输入英文别名', trigger: 'blur' }
				]
			},
			//编辑界面数据
			editForm: {
                Cname: '',
                Ename: '',
                Description: ''
            },
            addFormVisible: false,//新增界面是否显示
			addLoading: false,
			addFormRules: {
				Cname: [
                    { required: true, message: '请输入意图名称', trigger: 'blur' }
                ],
                Ename: [
                    { required: true, message: '请输入英文别名', trigger: 'blur' }
				]
            },
            addForm: {
                Cname: '',
                Ename: '',
                Description: ''
            },
        }
      },
    methods:{
        // 加载数据
        makeData: function(){
            var temp = []
            for (var val in data) {
                this.tableData.push(data[val])
            }
        },
        // 删除数据
        handleDelete(index, row) {
            this.$confirm('确认删除该记录吗?', '提示', {
					type: 'warning'
				}).then(()=>{
                    this.tableData.splice(index, 1);
                }).catch(() => {

				})
            console.log(this.tableData);
        },
        // 编辑数据
        handleEdit: function (index, row) {
            // console.log(index, row);
			this.editFormVisible = true;
            this.editForm = Object.assign({}, row);
            this.index = index
        },
        // 提交编辑
        editSubmit: function (){
            this.$refs.editForm.validate((valid)=>{
                if (valid){
                    this.$confirm('确认提交吗？', '提示', {}).then(()=>{
                        this.editLoading = true;
                        let para = Object.assign({}, this.editForm);
                        this.editLoading = false;
                        this.$message({
							message: '提交成功',
							type: 'success'
                        });
                        this.editFormVisible = false;
                        this.tableData.splice(this.index, 1, para);
                        // console.log(this.tableData)
                        this.$refs['editForm'].resetFields();
                    }).catch(() => {

				    })
                }
            })
        },
        //显示新增界面
		handleAdd: function () {
			this.addFormVisible = true;
			this.addForm = {
				Cname: '',
                Ename: '',
                Description: ''
			};
        },
        addSubmit: function () {
			this.$refs.addForm.validate((valid)=>{
                if (valid){
                    this.$confirm('确认提交吗？', '提示', {}).then(()=>{
                        this.addLoading = true;
                        let para = Object.assign({}, this.addForm);
                        console.log(para)
                        this.addtLoading = false;
                        this.$message({
							message: '提交成功',
							type: 'success'
                        });
                        this.addFormVisible = false;
                        // this.tableData.splice(this.index, 1, para);
                        // console.log(this.tableData)
                        this.tableData.push(para)
                        this.$refs['addForm'].resetFields();
                        this.saveData()
                        console.log("save successs")
                    }).catch(() => {

				    })
                }
            })
        },
    },
    created(){
        this.makeData()
    },
    // updated(){
    //     console.log("updated")
    // }
}
</script>

<style scoped>

</style>