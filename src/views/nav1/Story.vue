<template>
<section>
	<el-form ref="form" :model="form" label-width="60px" @submit.prevent="onSubmit" style="margin:20px;width:60%;min-width:800px;">
		<el-form-item label="意图">
			<el-select v-model="form.intent" placeholder="请选择意图">
				<el-option v-for="item in intentData"
				:label="item"
				:key="item"
				:value="item"
				>
				</el-option>
			</el-select>
		</el-form-item>
        <el-form-item label="词槽">
			<el-checkbox-group v-model="form.slot">
				<!-- <el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox> -->
				<el-checkbox v-for="item in slotData"
				:label="item"
				:key="item"
				name="slot"
				>
				</el-checkbox>
			</el-checkbox-group>
		</el-form-item>
		<el-form-item label="行为">
			<el-select v-model="form.action" placeholder="请选择行为">
				<el-option v-for="item in actionData"
				:label="item"
				:key="item"
				:value="item"
				>
				</el-option>
			</el-select>
		</el-form-item>
		<el-form-item>
			<el-button type="primary" @click="writedata()">立即生成</el-button>
			<el-button @click="delContent()">取消</el-button>
		</el-form-item>
	</el-form>
	<div class="divcss" style="margin:20px 80px 0px">
	<el-input
		type="textarea"
		size="medium"
		:autosize="{ minRows: 5}"
		placeholder="请输入内容"
		v-model="content">
	</el-input> 
	</div>
	<div style="margin:20px 80px 0px">
	<el-button type="primary" @click="writeStory()">立即生成</el-button>
	<el-button @click="delStory()">取消</el-button>
	</div>
	</section>
</template>

<script>
	export default {
		data() {
			return {
				form: {
					intent: '',
					action: '',
					slot: []
				},
				slotData: [],
				intentData: [],
				actionData: [],
				content: ""
			}
		},
		methods: {
			writeStory: function(){
				this.$confirm('确认提交吗？', '提示', {}).then(()=>{
					console.log(this.content)
				this.$http.post('apis/saveStory', {data: this.content}).then(response => {
					console.log(response.data);
				}, response => {
					console.log("error");
				});
				})
			},
			delStory: function(){
				this.content=""
			},
			writedata: function(){
				this.$confirm('确认提交吗？', '提示', {}).then(()=>{
					if (this.form.intent != "")
						this.content += "* "+this.form.intent
					if (this.form.slot.length>0) {
						this.content += "{"+this.form.slot+"}"+"\n";
						for (var element in this.form.slot)
							this.content += "    - slot{"+this.form.slot[element]+"}\n"
					}
					else
						this.content += "\n"
					if (this.form.action != "")
						this.content += "    - "+this.form.action+"\n"
					this.delContent();
				})
			},
			delContent: function(){
				this.form.intent="",
				this.form.slot=[],
				this.form.action=""
			},
			onSubmit() {
				console.log('submit!');
			},
			//加载词槽数据
			loadSlotData: function(){
				this.$http.get('apis/getSlotData').then(response => {
						for (var val in response.data) {
							// console.log(response.data[val].Ename)
							var content = '"'+response.data[val].Ename+'": '+'""'
							this.slotData.push(content)
						}
						// console.log(this.slotData)
					}, response => {
						console.log("error");
					});    
			},
			//加载意图数据
			loadIntentData: function(){
				this.$http.get('apis/getData').then(response => {
						for (var val in response.data) {
							// console.log(val)
							this.intentData.push(response.data[val].Ename)
						}
					}, response => {
						console.log("error");
					});    
			},
			//加载行为数据
			loadActionData: function(){
				this.$http.get('apis/getActionData').then(response => {
						for (var val in response.data) {
							// console.log(val)
							this.actionData.push(response.data[val].Ename)
						}
					}, response => {
						console.log("error");
					});    
			},
		},
		created(){
			this.loadSlotData();
			this.loadIntentData();
			this.loadActionData()
		},
	}

</script>

<style scoped>
.divcss{
	width: 80%
}
</style>