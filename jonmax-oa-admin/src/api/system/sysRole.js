import request from '@/utils/request'

const apiBaseUrl = '/system/admin/sysRole'
export default{
    
    //条件分页查询 /system/admin/sysRole {page}/{limit}
    getPageList(crreunt,limit,searchObj){
        return request({
            url:`${apiBaseUrl}/${crreunt}/${limit}`,
            method:'get',
            //普通对象params：对象参数名称
            //json data:对象参数名称
            params:searchObj
        })
    }


}
