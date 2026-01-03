/**
 * 目标1：信息渲染
 *  1.1 获取用户的数据
 *  1.2 回显数据到标签上
 * */
const creator = 'JonMax'
  axios({
    url: 'http://hmajax.itheima.net/api/settings',
    method: 'get',
    params: {
      creator
    }
  }).then(result => {
    // console.log(result);
    const userObj = result.data.data
      console.log(userObj);
    Object.keys(userObj).forEach(key => {
      // debugger
      if (key === 'avatar') {
        document.querySelector('.prew').src = userObj[key]
      } else if (key === 'gender') {
        const gRadioList = document.querySelectorAll('.gender')
          const gNum = userObj[key]
          gRadioList[gNum].checked = true
      } else {
        document.querySelector(`.${key}`).value = userObj[key]
      }
    })
  })

  //获取选中的图像  上传图片
  document.querySelector('.upload').addEventListener('change', e => {
    const formData = new FormData()
      formData.append('avatar', e.target.files[0])
      formData.append('creator', creator)
      axios({
        url: 'http://hmajax.itheima.net/api/avatar',
        method: 'put',
        data: formData
      }).then(result => {
        const imgUrl = result.data.data.avatar
          document.querySelector('.prew').src = imgUrl
      })
  })

  //信息修改  收集 提交

  document.querySelector('.submit').addEventListener('click', () => {
    //收集表单数据
    const userForm = document.querySelector('.user-form')
    const userObj = serialize(userForm, { hash:true, empty: true})
    //追加一个参数
    userObj.creator = creator
    //性别转数字 parseInt()
    userObj.gender = +userObj.gender
    console.log(userObj);
    // 提交数据 axios可以自动将js对象转换为json字符串
    axios({
      url: 'http://hmajax.itheima.net/api/settings',
      method: 'put',
      data: userObj
    }).then(result => {
      //  console.log(result.data.message);
       //创建 toast对象
       const toastDom = document.querySelector('.my-toast')
       const toast = new bootstrap.Toast(toastDom)
       document.querySelector('.my-toast .info-box').innerHTML = result.data.message
       toast.show()
    })
  })
