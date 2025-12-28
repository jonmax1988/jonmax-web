// #region 加载用户
const aname = document.querySelector(".nav a.login");
console.log(aname);
const aname_text = aname.innerHTML;
const aregist = document.querySelector(".nav a.regist");
console.log(aregist);
const aregist_text = aregist.innerHTML;
let isLogin = false;
function setUsername() {
  const rlt = localStorage.getItem("uname");
  if (rlt) {
    aname.innerHTML = `
      <span class="iconfont icon-account"></span>
      ${rlt}
    `;
    aregist.innerHTML = "退出登录";
    isLogin = true;
  } else {
    aname.innerHTML = aname_text;
  }
}
setUsername();
aname.addEventListener("click", function (e) {
  e.preventDefault();
  location.href = `./html/login.html`;
});
aregist.addEventListener("click", function () {
  if (isLogin) {
    localStorage.removeItem("uname");
    setUsername();
    this.innerHTML = aregist_text;
  } else {
    location.href = "./reg/index.html";
  }
});
// #endregion 加载用户
