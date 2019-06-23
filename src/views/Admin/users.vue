<template>
    <div >
        <el-table :data="nowtableData" height="250" border style="width: 100%">
            <el-table-column prop="id" label="ID"></el-table-column>
            <el-table-column prop="HeadUser" label="用户头像">
                    <template slot-scope="scope">
                        <img :src="scope.row.UserHead" class="userHeadImg">
                    </template>
            </el-table-column>
            <el-table-column prop="username" label="用户名"></el-table-column>
            <el-table-column prop="email" label="邮箱"></el-table-column>
            <el-table-column prop="caozuo" label="操作">
                <template slot-scope="scope">
                    <el-button @click="handleClick(scope.$index,scope.row)">{{ scope.row.isFreeze? '已禁用':'未禁用' }}</el-button>
                    <el-button @click="handleDelete(scope.$index,scope.row)" type="danger">删除</el-button>
                </template>
        </el-table-column>
        </el-table>
        <el-pagination background layout="prev, pager, next" :total="tableData.length" :page-size="pageSize" :current-page.sync="currentPage" class="page">
        </el-pagination>
    </div>
</template>

<script>
import { constants } from "crypto";
export default {
  name: "users",
  data() {
    return {
      tableData: [],
      currentPage:1,
      pageSize:2
    };
  },
  mounted() {
    this.axios.get("/api2/admin/userList").then(res => {
        console.log(res);
        var status = res.data.status;
        console.log(status);
        console.log(res.data.data.usersList);
        if (status === 0) {
            this.tableData = res.data.data.usersList;
        }
    });
  },
  computed:{
      nowtableData(){
        return this.tableData.slice((this.currentPage-1)*this.pageSize,this.currentPage*this.pageSize);
      }
    },
  methods: {
    handleClick(index, row) {
        console.log(index, row);
        this.axios.post('/api2/admin/updateFreeze', {
            username: row.username,
            isFreeze: !row.isFreeze,
        }).then(res => {
            var status = res.data.status;
            if (status === 0) {
                this.$alert("禁用操作成功", "信息", {
                confirmButtonText: "确定",
                callback: action => {
                    this.nowtableData[index].isFreeze=!row.isFreeze;
                }
                });
          }else{
                this.$alert("禁用操作失败", "信息", {
                confirmButtonText: "确定",
                });
          }
        });
    },
    handleDelete(index,row){
        this.axios.post('/api2/admin/deleteUser',{
            username:row.username,
        }).then((res)=>{
            var status=res.data.status;
            if(status===0){
                this.$alert("删除操作成功", "信息", {
                    confirmButtonText: "确定",
                    callback: action => {
                        this.nowtableData.splice(index,1);
                    }
                });
            }else{
                 this.$alert("禁用操作失败", "信息", {
                confirmButtonText: "确定",
                });
            }
        })
    }
  }
};
</script>

<style scoped>
.page{
    margin-top: 20px;
}
.userHeadImg{
    width: 50px;
    height: 50px;
    border-radius: 50%;
}
</style>
