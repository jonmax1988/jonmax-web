// #region tabline切换
const tabline = document.querySelector(".login ul.tabline");
let pre_tab = document.querySelector(".login ul.tabline>li.active");
let pre_active_page = document.querySelector(".login ul.pagelist>li.active");
tabline.addEventListener("click", function (e) {
  e.preventDefault();
  const o = e.target;
  if (o.tagName === "LI") {
    const data_id = o.dataset.id;
    const curr_page = document.querySelector(
      `.login ul.pagelist>li[data-id="${data_id}"]`,
    );
    pre_tab.classList.remove("active");
    o.classList.add("active");
    pre_tab = o;
    pre_active_page.classList.remove("active");
    curr_page.classList.add("active");
    pre_active_page = curr_page;
  }
});
// #endregion tabline切换
// #region 表单提交：账户登录
const fm = document.querySelector(".login form");
const uname = fm.querySelector("input[name='uname']");
const upwd = fm.querySelector("input[name='upwd']");
fm.addEventListener("submit", function (e) {
  e.preventDefault();
  localStorage.setItem("uname", uname.value);
  localStorage.setItem("upwd", upwd.value);
  location.href = "../index.html";
});
// #endregion 表单提交：账户登录
