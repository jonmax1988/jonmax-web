/**
 * 目标：网站-更换背景
 *  1. 选择图片上传，设置body背景
 *  2. 上传成功时，"保存"图片url网址
 *  3. 网页运行后，"获取"url网址使用
 * */
document.querySelector('.bg-ipt').addEventListener('change', e => {
  const formData = new FormData()
    formData.append('img', e.target.files[0])
    axios({
      url: 'http://hmajax.itheima.net/api/uploadimg',
      method: 'post',
      data: formData
    }).then(result => {
      const imgUrl = result.data.data.url
        document.body.style.backgroundImage = `url(${imgUrl})`
        localStorage.setItem('bgImgUrl', imgUrl)
    })
})

const bgImgUrl = localStorage.getItem('bgImgUrl') || ''
// bgImgUrl && (document.body.style.backgroundImage = `url(${bgImgUrl})`)  逻辑中断
document.body.style.backgroundImage = `url(${bgImgUrl})`