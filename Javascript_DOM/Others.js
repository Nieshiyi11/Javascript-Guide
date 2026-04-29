/*====================================================== 创建元素 ======================================================*/
const li = document.createElement("li");  // 只是在内存里造了一个“节点” ———— 还不在页面上
//1. 设置基本属性：
li.innerText = "新任务";
li.className = "item";            // 覆盖式
li.classList.add("item");         // 推荐（可叠加）
li.setAttribute("data-id", "1");  // 自定义属性:给HTML元素设置一个“属性”
//结果：<li data-id="1"></li>
/*
【case1】:
原来：<li class="a b"></li>
如果：li.className = "item";
现在：<li class="item"></li>
原来的a b全部被删除
*/
/*
【case2】:
原来：<li class="a b"></li>
如果：li.classList.add("item");
现在：<li class="a b item"></li>
原来的class被保留
*/


/*====================================================== 插入元素 ======================================================*/
ul.appendChild(li); // 把li加到ul的最后
ul.insertBefore(li, ul.firstChild); // 插到开头
ul.insertBefore(li, referenceNode); // 插到任意节点之前（参考节点之前：在referenceNode之前插入）
//现代API：（推荐！！）
ul.append(li);      // 尾部
ul.prepend(li);     // 头部
reference.before(li);  // 参考节点之前
reference.after(li);   // 参考节点之后
//一次性插入多个：
const frag = document.createDocumentFragment();
for(let i = 0; i < 100; i++){
    const li = document.createElement("li");
    li.innerText = i;
    frag.appendChild(li);
}
ul.appendChild(frag);


/*====================================================== 删除元素 ======================================================*/
li.remove();  // 直接删除
ul.removeChild(li); // 父节点删除子节点（需要先拿到父节点）


/*
【DOM操作流程】
创建（createElement）→ 设置内容/属性 → 插入到页面（append / before / ...）
删除则是：找到目标节点 → remove()
*/
/*
【注意事项/常见坑】
创建了但没插入 → 页面没变化
在循环里频繁appendChild → 性能差（改良：用fragment批量创建）
删除时没用委托 → 新元素没有事件
*/