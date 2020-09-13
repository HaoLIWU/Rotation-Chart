function my$(id){
    return document.getElementById(id);
}

//获取任意元素中间的文本内容
function getInnerText(element){
    if(typeof element.textContent == "undefined"){
        return element.innerText;
    }else{
        return element.textContent;
    }
}

//设置任意元素中间的文本内容
function setInnerText(element,text){
    if(typeof element.textContent == "undefined"){
        element.innerText = text;
    }else{
        element.TextContent = text;
    }
}

//获取任意一个父级元素的第一个子元素
function getFirstElementChild(element){
    if(element.firstElementChild){ // ---> true
        return element.firstElementChild;
    }else{
        var node = element.firstChild; // ---》 第一个节点
        while(node && node.nodeType!=1){ // 当 node 存在 并且 节点类型不是标签时
            node = node.nextSibling;  //此时 node 等于下一个 节点
        }
        return node;
    }
}

//获取任意一个父级元素的最后一个子元素
function getLastElementChild(element){
    if(element.lastElementChild){ // ---> true
        return element.lastElementChild;
    }else{
        var node = element.LastChild;
        while(node && node.nodeType!=1){ // 当 node 存在 并且 节点类型不是标签时
            node = node.previousSibling; //此时 node 等于上一个 节点
        }
        return node;
    }
}

//鼠标进入事件
function mouseoverHandle(){
    this.style.backgroundColor = "yellow";
}
//鼠标离开事件
function mouseoutHandle(){
    this.style.backgroundColor = "";
}

//绑定事件的兼容代码
function addEventListener(element,type,fn){
    if(element.addEventListener){
        element.addEventListener(type,fn,false);
    }else if(element.attachEvent){
        element.attachEvent("on"+type,fn);
    }else{
        element["on"+type]=fn;
    }
}

//解绑事件的兼容代码
function removeEventListener(element,type,fnName){
    if(element.removeEventListener){
        element.removeEventListener(type,fnName,false);
    }else if(element.detachEvent){
        element.detachEvent("on"+type,fnName);
    }else{
        element["on"+type] = null;
    }
}

//封装动画函数
// 传入参数  ----》 元素  ，目标  ， 定时器刷新时间
function animation(element,target,time){
    //一点击就要清理一次定时器(保证只有一个定时器)
    clearInterval(element.timeId);
    //一定要清理定时器(只产生一个定时器)
    element.timeId = setInterval(function(){
        //下面这种写法，会造成点击一个按钮，产生一个定时器，占据内存
        //var timeId = setInterval(function(){
        //获取div当前位置
        var current = element.offsetLeft;
        //var current = element.style.left;  //获取不到，style只能赋值

        //div 每次移动多少像素
        var step = 9;
        //当第二次按 400 时，此时的div在800那，所以要让其step变成负数
        step = current<target?step:-step;
        //每次移动后的距离
        current+= step;
        //判断当前移动后的位置是否到达目标位置
        if(Math.abs(target-current)>= Math.abs(step)){
            //上面加上绝对值的好处就是 为下面的点击 400时让其往回走
            element.style.left = current+"px";
        }else{
            //清理定时器
            clearInterval(element.timeId);
            //当上面的 current 与 target距离小于 step时，直接让其等于 target的值
            element.style.left = target+"px";
        }
    },time);
}
