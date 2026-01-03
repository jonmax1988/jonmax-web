/**
 * 目标1：渲染图书列表
 *  1.1 获取数据
 *  1.2 渲染数据
 */
//全局用户标识 请求接口需要
const creator = 'JonMax'
  // 封装渲染函数
function getBookList() {
  axios({
    url: 'http://hmajax.itheima.net/api/books',
    method: 'get',
    params: {
      creator
    }
  }).then(result => {
    // console.log(result.data.data);
    const books = result.data.data
      //拿到接口的数据进行渲染
      const htmlStr = books.map((item, index) => {
        return `<tr>
          <td>${index + 1}</td>
          <td>${item.bookname}</td>
          <td>${item.author}</td>
          <td>${item.publisher}</td>
          <td data-id=${item.id}>
            <span class="del">删除</span>
            <span class="edit">编辑</span>
          </td>
        </tr>`
      }).join('')

      document.querySelector('.list').innerHTML = htmlStr
  })
}
// 网页加载运行
getBookList()

// 新增数据 保存 需要用bootstrap的 js关闭
const modalDom = document.querySelector('.add-modal')
  const addModal = new bootstrap.Modal(modalDom)
  //保存的按钮绑定点击事件
  document.querySelector('.add-btn').addEventListener('click', () => {
    //form 表单收集
    //  const myForm = document.querySelector('.login-form')
    //  const formValues = serialize(myForm, { hash: true, empty: true })
    const addForm = document.querySelector('.add-form')
      const formValues = serialize(addForm, {
        hash: true,
        empty: true
      })
      // 解构 更简洁的写法在 因为参数名称都一样key  value 使用展开函数高级写法
      // const { bookname, author, publisher } = formValues
      // console.log(bookname,author,publisher);


      if (verify(formValues.bookname) && verify(formValues.author) && verify(formValues.publisher)) {
        axios({
          url: 'http://hmajax.itheima.net/api/books',
          method: 'post',
          data: {
            // bookname,
            // author,
            // publisher,
            // 采用 展开函数的高级应用 额滴神...
            ...formValues,
            creator
          }
        }).then(result => {
          getBookList()
          console.log(result);
          // 之前忘记了重置表单
          addForm.reset()
          addModal.hide()
        }).catch(error => {
          console.log(error.response.data.message);
        })
      } else {
        alert('请输入正确的数据')
      }

  })

  // 删除数据 给删除事件绑定点击事件，但是删除时动态创建的元素 所以委托给父级节点
  document.querySelector('.list').addEventListener('click', e => {
    //获取真正触发事件的元素 判断类名中是否包含
    if (e.target.classList.contains('del')) {
      // 有个坑，这个id 时绑定在父级上的，因为编辑按钮也需要用
      const id = e.target.parentNode.dataset.id
        if (id) {
          axios({
            //delete 删除请求
            url: `http://hmajax.itheima.net/api/books/${id}`,
            method: 'delete'
          }).then(result => {
            console.log(result);
            getBookList()
          })
        }
    }
  })

  /**
   * 编辑图书
   * 编辑弹框的显示和隐藏 因为涉及数据的处理，所以只能时通过bootstrap的js方法
   * 获取当前的编辑图书的数据 回显到编辑表单中
   * 提交保存修改，并刷新列表
   *
   */
  //编辑弹框的显示和隐藏
  const editDom = document.querySelector('.edit-modal')
  const editModal = new bootstrap.Modal(editDom)
  document.querySelector('.list').addEventListener('click', e => {
    if (e.target.classList.contains('edit')) {
      const id = e.target.parentNode.dataset.id
        axios({
          url: `http://hmajax.itheima.net/api/books/${id}`,
          method: 'get'
        }).then(r => {
          // console.log(r);
          const bookObj = r.data.data
            //数据对象的属性 和 标签的类名一致
            //所以遍历数据对象，使用属性去获取对应的标签，快速赋值 这个时候已经给隐藏元素id 赋值啦
            const keys = Object.keys(bookObj)
            // console.log('输出===============',keys);   输出=============== (4) ['id', 'bookname', 'author', 'publisher']
            keys.forEach(key => {
              document.querySelector(`.edit-form .${key}`).value = bookObj[key]
            })
            editModal.show()
        })
    }
  })
  //修改按钮，隐藏弹框
  document.querySelector('.edit-btn').addEventListener('click', () => {
    const editForm = document.querySelector('.edit-form')
      // const formValues = serialize(editForm, {
      //   hash: true,
      //   empty: true
      // })
      // 解构 更简洁的写法在 因为参数名称都一样key  value 使用展开函数高级写法
      // const { id, bookname, author, publisher } = formValues
      // console.log(bookname,author,publisher);

      const { id, bookname, author, publisher } = serialize(editForm, {
        hash: true,
        empty: true
      });
    // if (verify(formValues.bookname) && verify(formValues.author) && verify(formValues.publisher)) { //尝试换一种写法
    if (verify(bookname) && verify(author) && verify(publisher)) {
      axios({
        url: `http://hmajax.itheima.net/api/books/${id}`,
        method: 'put',
        data: {
          bookname,
          author,
          publisher,
          creator
        }
      }).then(result => {
        getBookList()
        console.log(result);
        editModal.hide()
      }).catch(error => {
        console.log(error);
      })
    } else {
      alert('请输入正确的数据')
    }

  })

  //自行封装验证
function verify(str = '', type = -1) {
  let reg = ''
    let rlt = false
    switch (type) {
    case 0:
      reg = /^[a-zA-Z][a-zA-Z0-9-_]{5,9}$/; // 用户名验证
      break;
    case 1:
      reg = /^1(3\d|4[5-9]|5[0-35-9]|6[567]|7[0-8]|8\d|9[0-35-9]|)\d{8}$/; // 手机号验证
      break;
    case 2:
      reg = /^[0-9]{6}$/; // 短信验证码
      break;
    case 3:
      reg = /^[\S]{6,20}$/; // 密码验证
      break;
    default:
      reg = /^.{3,}$/
    }
    rlt = reg.test(str);
  return rlt;
}
