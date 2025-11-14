<template>
    <div class="app-container">
     <!--查询表单-->
    <div class="search-div">
      <el-form label-width="70px" size="small">
        <el-row>
          <el-col :span="24">
            <el-form-item label="角色名称">
              <el-input style="width: 100%" v-model="searchObj.roleName" placeholder="角色名称"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row style="display:flex">
          <el-button type="primary" icon="el-icon-search" size="mini" :loading="loading" @click="fetchData()">搜索</el-button>
          <el-button icon="el-icon-refresh" size="mini" @click="resetData">重置</el-button>   
        </el-row>
      </el-form>
    </div>   
    <br>
    <!-- 工具条 -->
    <div class="tools-div">
        <el-button type="success" icon="el-icon-plus" size="mini" @click="add">添 加</el-button>
        <el-button class="btn-add" size="mini" @click="batchRemove()" >批量删除</el-button>
    </div> 
    <!-- 表格 -->
    <el-table
      v-loading="listLoading"
      :data="list"
      stripe
      border
      style="width: 100%;margin-top: 10px;"
      @selection-change="handleSelectionChange">

      <el-table-column type="selection"/>

      <el-table-column
        label="序号"
        width="70"
        align="center">
        <template slot-scope="scope">
          {{ (page - 1) * limit + scope.$index + 1 }}
        </template>
      </el-table-column>

      <el-table-column prop="roleName" label="角色名称" />
      <el-table-column prop="roleCode" label="角色编码" />
      <el-table-column prop="createTime" label="创建时间" width="160"/>
      <el-table-column label="操作" width="200" align="center">
        <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-edit" size="mini" @click="edit(scope.row.id)" title="修改"/>
          <el-button type="danger" icon="el-icon-delete" size="mini" @click="removeDataById(scope.row.id)" title="删除"/>
          <el-button type="warning" icon="el-icon-baseball" size="mini" @click="showAssignAuth(scope.row)" title="分配权限"/>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页组件 -->
    <el-pagination
        :current-page="page"
        :total="total"
        :page-size="limit"
        style="padding: 30px 0; text-align: center;"
        layout="total, prev, pager, next, jumper"
        @current-change="fetchData"
    />

     <el-dialog title="添加/修改" :visible.sync="dialogVisible" width="40%" >
      <el-form ref="dataForm" :model="sysRole" label-width="150px" size="small" style="padding-right: 40px;">
        <el-form-item label="角色名称">
          <el-input v-model="sysRole.roleName"/>
        </el-form-item>
        <el-form-item label="角色编码">
          <el-input v-model="sysRole.roleCode"/>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false" size="small" icon="el-icon-refresh-right">取 消</el-button>
        <el-button type="primary" icon="el-icon-check" @click="saveOrUpdate()" size="small">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
//引入定义接口的js文件
import api from '@/api/system/sysRole'
export default {
    //vue代码结构
    //初始值
    data(){
        return {
            list: [], // 列表
            total: 0, // 总记录数
            page: 1, // 页码
            limit: 10, // 每页记录数
            searchObj: {}, // 查询条件
            dialogVisible:false, //是否弹框
            sysRole:{},//用于封装表单的数据
            multipleSelection: []// 批量删除选中的记录列表
        }
    },
    created(){//渲染之前的
        this.fetchData()
    },
    methods:{//操作方法
        //录音跳转
        showAssignAuth(row) {
          this.$router.push('/system/assignAuth?id='+row.id+'&roleName='+row.roleName);
        },
        //选择了复选框后，把所在的复选框的行的内容进行传递
        handleSelectionChange(selection){
            this.multipleSelection = selection
            // console.log("选择表格的内容信息：===",this.multipleSelection);
        },
        //条件分页方法
        fetchData(current = 1){
            this.page = current
            api.getPageList(this.page,this.limit,this.searchObj)
            .then(response => {
                this.list = response.data.records
                this.total = response.data.total
            })
        },
        removeDataById(id){
            // debugger
            this.$confirm('此操作将删除该记录, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                return api.removeById(id)
            }).then(response =>{
                //刷新页面
                this.fetchData()
                //提示信息
                this.$message.success(response.message || '删除成功')
            })
        },
        //点击添加，弹框
        add(){
            this.dialogVisible = true
        },
        edit(id){
            this.dialogVisible = true
            //根据ID查询
            this.fetchDataById(id)
        
        },
        //添加或者修改
        saveOrUpdate(){
            this.saveBtnDisabled = true // 防止表单重复提交
            if(!this.sysRole.id){
                this.save()
            }else{
                this.update()
            }
        },
        save(){
            api.saveRole(this.sysRole).then(response =>{
                this.$message.success(response.message || '操作成功')
                this.dialogVisible = false
                this.fetchData()
            })
        },
        update(){
            api.updateRole(this.sysRole).then(response => {
                 this.$message.success(response.message || '操作成功')
                 this.dialogVisible = false
                 this.fetchData()
            })
        },
         fetchDataById(id){
            api.getRoleById(id).then(
                response => this.sysRole = response.data
            )
         },
         batchRemove(){
              if (this.multipleSelection.length === 0) {
                    this.$message.warning('请选择要删除的记录！')
                    return
                }
                // debugger
                this.$confirm('此操作将删除所选的记录, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let idList = []
                    //选择复选框的数据再数组中this.multipleSelection
                    this.multipleSelection.forEach(item => {
                        idList.push(item.id)
                    });
                    console.log("===========",idList)
                    return api.batchRemove(idList)
                }).then(response =>{
                    //刷新页面
                    this.fetchData()
                    //提示信息
                    this.$message.success(response.message || '删除成功')
                })  
         }
    }

}
</script>