/**
 * 目标1：完成省市区下拉列表切换
 *  1.1 设置省份下拉菜单数据
 *  1.2 切换省份，设置城市下拉菜单数据，清空地区下拉菜单
 *  1.3 切换城市，设置地区下拉菜单数据
 */

// 设置省份下拉菜单那数据
axios({
  url: 'http://hmajax.itheima.net/api/province'
}).then(result => {
  // console.log(result);
  const htmlStr = result.data.list.map(pname => {
    return `<option value="${pname}">${pname}</option>`
  }).join('')
    document.querySelector('.province').innerHTML = `
    <option value="">省份</option>` + htmlStr
})

//1.2 切换省份，设置城市下拉菜单数据，清空地区下拉菜单
document.querySelector('.province').addEventListener('change', async e => {
  // console.log( e.target.value);
  const pname = e.target.value
    const result = await axios({
      url: 'http://hmajax.itheima.net/api/city',
      params: {
        pname
      }
    })
    // console.log(result);
    const htmlStr = result.data.list.map(cname => {
      return `<option value="${cname}">${cname}</option>`
    }).join('')
    document.querySelector('.city').innerHTML = `<option value="">城市</option>` + htmlStr
    document.querySelector('.area').innerHTML = `<option value="">地区</option>`
})

//  1.3 切换城市，设置地区下拉菜单数据
document.querySelector('.city').addEventListener('change', async e => {
  // console.log(e.target.value);
  const pname = document.querySelector('.province').value
    const cname = e.target.value
    const result = await axios({
      url: 'http://hmajax.itheima.net/api/area',
      params: {
        pname,
        cname
      }
    })
    // console.log(result);
    const htmlStr = result.data.list.map(aname => {
      return `<option value="${aname}">${aname}</option>`
    }).join('')
    document.querySelector('.area').innerHTML = `<option value="">地区</option>` + htmlStr
})

//添加监听事件
document.querySelector('.submit').addEventListener('click', async() => {
  // 依靠组件收集表单数据
  const formObj = document.querySelector('.info-form')
    const data = serialize(formObj, {
      hash: true,
      empty: true
    })

    try {

      // console.log(data);
      const result = await axios({
        url: 'http://hmajax.itheima.net/api/feedback',
        method: 'post',
        data
      })
          formObj.reset();
        // console.log(result);
        alert(result.data.message)

    } catch (error) {
        // console.dir(error)
        alert(error.response.data.message)
    }
})
