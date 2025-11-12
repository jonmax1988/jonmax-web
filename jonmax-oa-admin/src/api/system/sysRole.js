import request from '@/utils/request'

const api_name = '/system/admin/sysRole'
export default{
    
    //条件分页查询 /system/admin/sysRole {page}/{limit}
    getPageList(crreunt,limit,searchObj){
        return request({
            url:`${api_name}/${crreunt}/${limit}`,
            method:'get',
            //普通对象params：对象参数名称
            //json data:对象参数名称
            params:searchObj
        })
    },
    //角色删除 /delete/{id}
    removeById(id){
        return request({
            url:`${api_name}/delete/${id}`,
            method:'delete'
        })
    },
    //添加角色 save
      saveRole(role){
        return request({
            url:`${api_name}/save`,
            method:'post',
            data:role
        })
    },
    //添加角色 save /update
    updateRole(role){
        return request({
            url:`${api_name}/update`,
            method:'put',
            data:role
        })
    },
    //根据ID的查询用于数据显示 /get/{id}
    getRoleById(id){
        return request({
            url:`${api_name}/get/${id}`,
            method:'get'
        })
    },
    //根据ID的查询用于数据显示 /get/{id}
    findAll(){
        return request({
            url:`${api_name}/findAll`,
            method:'get'
        })
    },
    //根据ID进行批量删除 deleteBatch
    batchRemove(idList){
        return request({
            url:`${api_name}/deleteBatch`,
            method:'delete',
            data:idList
        })
    },
    getRoles(adminId) {
    return request({
        url: `${api_name}/toAssign/${adminId}`,
        method: 'get'
    })
    },

    assignRoles(assginRoleVo) {
    return request({
        url: `${apiBaseUrl}/doAssign`,
        method: 'post',
        data: assginRoleVo
    })
    }
}
