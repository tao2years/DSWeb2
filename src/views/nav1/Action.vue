<template>
	<section>
        <!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="filters">
				<el-form-item>
					<el-button type="info" @click="handleAdd">新增行为</el-button>
				</el-form-item>
			</el-form>
		</el-col>

        <!-- 列表 -->
        <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="Cname" label="行为名称" ></el-table-column>
            <el-table-column prop="Ename" label="英文别名" ></el-table-column>
            <el-table-column prop="Description" label="回复模板" ></el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <!-- 编辑页面 -->
		<el-dialog title="编辑" v-model="editForm3Visible" :close-on-click-modal="false">
			<el-form :model="editForm3" label-width="80px" :rules="editForm3Rules" ref="editForm3">
				<el-form-item label="行为名称" prop="Cname">
					<el-input v-model="editForm3.Cname" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="英文别名" prop="Ename">
					<el-input v-model="editForm3.Ename" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="回复模板" prop="Description">
					<el-input type="textarea" placeholder="换行分割不同回答 自定义操作写自定义" v-model="editForm3.Description"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="editForm3Visible = false">取消</el-button>
				<el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
			</div>
		</el-dialog>

        <!--新增界面-->
		<el-dialog title="新增" v-model="addForm3Visible" :close-on-click-modal="false">
			<el-form :model="addForm3" label-width="80px" :rules="addForm3Rules" ref="addForm3">
				<el-form-item label="行为名称" prop="Cname">
					<el-input v-model="addForm3.Cname" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="英文别名" prop="Ename">
					<el-input v-model="addForm3.Ename" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="回复模板" prop="Description">
					<el-input type="textarea" placeholder="换行分割不同回答 自定义操作写自定义" v-model="addForm3.Description"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="addForm3Visible = false">取消</el-button>
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
            editForm3Visible: false,//编辑界面是否显示
		    editLoading: false,
			editForm3Rules: {
				Cname: [
                    { required: true, message: '请输入行为名称', trigger: 'blur' }
                ],
                Ename: [
                    { required: true, message: '请输入英文别名', trigger: 'blur' }
				]
			},
			//编辑界面数据
			editForm3: {
                Cname: '',
                Ename: '',
                Description: ''
            },
            addForm3Visible: false,//新增界面是否显示
			addLoading: false,
			addForm3Rules: {
				Cname: [
                    { required: true, message: '请输入行为名称', trigger: 'blur' }
                ],
                Ename: [
                    { required: true, message: '请输入英文别名', trigger: 'blur' }
				]
            },
            addForm3: {
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
            this.$http.get('apis/getActionData').then(response => {
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
			this.editForm3Visible = true;
            this.editForm3 = Object.assign({}, row);
            this.index = index
        },
        // 提交编辑
        editSubmit: function (){
            this.$refs.editForm3.validate((valid)=>{
                if (valid){
                    this.$confirm('确认提交吗？', '提示', {}).then(()=>{
                        this.editLoading = true;
                        let para = Object.assign({}, this.editForm3);
                        this.editLoading = false;
                        this.$message({
							message: '提交成功',
							type: 'success'
                        });
                        this.editForm3Visible = false;
                        this.tableData.splice(this.index, 1, para);
                        // console.log(this.tableData)
                        this.$refs['editForm3'].resetFields();
                        this.saveData()
                    }).catch(() => {

				    })
                }
            })
        },
        //显示新增界面
		handleAdd: function () {
			this.addForm3Visible = true;
			this.addForm3 = {
				Cname: '',
                Ename: '',
                Description: ''
			};
        },
        addSubmit: function () {
			this.$refs.addForm3.validate((valid)=>{
                if (valid){
                    this.$confirm('确认提交吗？', '提示', {}).then(()=>{
                        this.addLoading = true;
                        let para = Object.assign({}, this.addForm3);
                        console.log(para)
                        this.addtLoading = false;
                        this.$message({
							message: '提交成功',
							type: 'success'
                        });
                        this.addForm3Visible = false;
                        // this.tableData.splice(this.index, 1, para);
                        // console.log(this.tableData)
                        this.tableData.push(para)
                        this.$refs['addForm3'].resetFields();
                        this.saveData()
                        console.log("save successs")
                    }).catch(() => {

				    })
                }
            })
        },
        saveData:function() {
            // console.log(this.tableData)
            this.$http.post('apis/testAction', {data: this.tableData}).then(response => {
                console.log(response.data);
            }, response => {
                console.log("error");
            });
        }
    },
    created(){
        // this.makeData()
        this.makeSerData()
    },
    // updated(){
    //     console.log("updated")
    // }
}
</script>

<style scoped>

</style>