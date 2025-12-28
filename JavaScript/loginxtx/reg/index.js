// #region 案例：新用户注册
const fm = document.querySelector(".regist form");
let arr_rlt = [];
// #region 正则表达式验证函数
function verify(type = 0, str = "") {
  let reg;
  let rlt = false;
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
  }
  rlt = reg.test(str);
  return rlt;
}
// #endregion 正则表达式验证函数
// #region 验证用户名
const ipt_uname = fm.querySelector("#uname");
const span_uname = ipt_uname.nextElementSibling;
ipt_uname.addEventListener("change", function (e) {
  e.preventDefault();
  const uname = this.value;
  let type = 0;
  let rlt = verify(type, uname);
  arr_rlt[type] = rlt;
  if (rlt) {
    span_uname.innerHTML = "✔";
    span_uname.className = "right";
  } else {
    span_uname.innerHTML = "昵称长度为6到10个字符";
    span_uname.className = "wrong";
  }
});
// #endregion 验证用户名
// #region 验证手机号
const ipt_uphone = fm.querySelector("#uphone");
const span_uphone = ipt_uphone.nextElementSibling;
ipt_uphone.addEventListener("change", function (e) {
  e.preventDefault();
  const uphone = this.value;
  let type = 1;
  let rlt = verify(type, uphone);
  arr_rlt[type] = rlt;
  if (rlt) {
    span_uphone.innerHTML = "✔";
    span_uphone.className = "right";
  } else {
    span_uphone.innerHTML = "请输入正确的手机号";
    span_uphone.className = "wrong";
  }
});
// #endregion 验证手机号
// #region 短信验证码
const ipt_umsg = fm.querySelector("#umsg");
const span_umsg = ipt_umsg.nextElementSibling;
ipt_umsg.addEventListener("change", function (e) {
  e.preventDefault();
  const umsg = this.value;
  console.log(umsg);
  let type = 2;
  let rlt = verify(type, umsg);
  arr_rlt[type] = rlt;
  if (rlt) {
    span_umsg.innerHTML = "✔";
    span_umsg.className = "right";
  } else {
    span_umsg.innerHTML = "请输入正确的验证码";
    span_umsg.className = "wrong";
  }
});
// #endregion 短信验证码
// #region 密码
const ipt_upwd = fm.querySelector("#upwd");
const span_upwd = ipt_upwd.nextElementSibling;
ipt_upwd.addEventListener("change", function (e) {
  e.preventDefault();
  const upwd = this.value;
  let type = 3;
  let rlt = verify(type, upwd);
  arr_rlt[type] = rlt;
  if (rlt) {
    span_upwd.innerHTML = "✔";
    span_upwd.className = "right";
  } else {
    span_upwd.innerHTML = "设置6到20位字母、数字和符号组合";
    span_upwd.className = "wrong";
  }
});
// #endregion 密码
// #region 再次输入密码
const ipt_upwd_repeat = fm.querySelector("#upwd_repeat");
const span_upwd_repeat = ipt_upwd_repeat.nextElementSibling;
ipt_upwd_repeat.addEventListener("change", function (e) {
  e.preventDefault();
  const upwd_repeat = this.value;
  const upwd = ipt_upwd.value;
  let rlt = upwd_repeat === upwd;
  let type = 4;
  arr_rlt[type] = rlt;
  if (rlt) {
    span_upwd_repeat.innerHTML = "✔";
    span_upwd_repeat.className = "right";
  } else {
    span_upwd_repeat.innerHTML = "两次输入密码不一致";
    span_upwd_repeat.className = "wrong";
  }
});
// #endregion 再次输入密码
// #region 发送验证码
const avcode = fm.querySelector("a");
let flag = true;
avcode.addEventListener("click", function (e) {
  e.preventDefault();
  if (flag) {
    flag = false;
    console.log("验证码已发送!");
    let count = 5;
    avcode.innerHTML = `${count}秒后重新获取`;
    let id = setInterval(function () {
      count--;
      avcode.innerHTML = `${count}秒后重新获取`;
      if (count === 0) {
        avcode.innerHTML = "重新获取";
        clearInterval(id);
        flag = true;
      }
    }, 1000);
  }
});
// #endregion 发送验证码
fm.addEventListener("submit", function (e) {
  console.log(arr_rlt);
  let rlt;
  for (let i = 0; i < arr_rlt.length; i++) {
    rlt = arr_rlt[i];
    if (!rlt) {
      console.log("注册失败");
      e.preventDefault();
      break;
    }
  }
  if (rlt) {
    console.log("注册成功");
    location.href = "https://www.baidu.com";
  }
});
// #endregion 案例：新用户注册
