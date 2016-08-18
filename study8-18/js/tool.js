/////////////////////////获取id或者TagName//////////////////////////
//$(selector)
function $(selector,parent){
	var firstChar=selector.charAt(0);
	parent=parent||document;
	if(firstChar=="#"){
		return document.getElementById(selector.substring(1));
	}else{
		return parent.getElementsByTagName(selector);
	}
}

//做一个兼容性的获取样式的函数///////////////////////
function getStyle(obj,attr){
	return 	obj.currentStyle ?obj.currentStyle[attr]:getComputedStyle(obj)[attr];
}

////////////////////////////////////////////////////////
function arrIndexOf(arr,str,index){
	if(arguments.length!=0&&arguments.length!=1){
		index=index||0;
		for(var i=index;i<arr.length;i++){
			if(str==arr[i]){
				return i;
			}
		};
		return -1;
	}else{
		return "您写的参数不对";
	}	
}
///////////////////获取某个元素下第一个子元素//////////////////////
function first(parent){
	  var first=parent.firstElementChild||parent.firstChild;
	  
	  
	  if(!first||parent.nodeType!=1){
	  	return null;
	  }else{
	  	return first;
	  }
}
///////////////////或许某个元素下的最后一个子元素/////////////////////////////////
function last(parent){
	  var last=parent.lastElementChild||parent.lastChild;
	  
				  	if(!last||parent.nodeType!=1){
				  	  	return null;
				  	  }else{
				  	  	return last;
				  	  }
}
////////////////////获取某个元素的下一个兄弟元素////////////////////////////////////
  function next(element){
          var next=element.nextElementSibling||element.nextSibling
  
           if(!next||next.nodeType!=1){
				  	  	return null;
				  	  }else{
				  	  	return next;
				  	  }
  }
  
//////////////////获取某个元素的上一个兄弟元素//////////////////////////////////////////
function prev(element){
          var prev=element.previousElementSibling||element.previousSibling

           if(!prev||prev.nodeType!=1){
				  	  	return null;
				  	  }else{
				  	  	return prev;
				  	  }
}
//////////////////////从特定的元素中获取某个class名///////////////////////////////////////////////////////////////////
//手动封装了一个获取class的函数
function getClass(lei,parent,tagName){
	//要省略document，需要做一个内部的兼容处理
	parent=parent||document;
	//从特定的标签中获取相应的类，做一个兼容处理
	tagName=tagName||"*";
	//从整个文档下获取所有标签
	var allEles=parent.getElementsByTagName(tagName);
	//用于存储找到的类的元素
	var arr=[];
	//循环所有标签
	for(var i=0;i<allEles.length;i++){
		//将每一个标签的class通过split转成数组
		var arrClassNames=allEles[i].className.split(" ");
		//循环数组中的每一项
		for(var j=0;j<arrClassNames.length;j++){
			//如果只要数组中的哪一项和类相等，代表找到了
			if(arrClassNames[j]==lei){
				//如果找到类了，将当前标签元素存入数组中
				arr.push(allEles[i]);
				//停止当前的标签的类的查找，不再往后看了，到外层重新循环下一个标签
				break;
			}
		};
		
	};
	//当整个循环完毕，从函数内部返回该数组
	return arr;
}


    
    
 //////////////////////////move移动函数///////////////////////////////////////////////   
//  function move(obj,attr,target,step,callback){
//  	
//  	clearTimeout(obj.timer);
//  	step=parseInt(getStyle(obj,attr))>target?-step:step;
//  	obj.timer=setInterval(function(){
//  		
//  		var speed=parseInt(getStyle(obj,attr))+step;
//  		
//  		if(speed<target&&step<0||speed>target&&step>0){
//  			speed=target;
//  		}
//  		
//  		obj.style[attr]=speed+"px"
//  		if(speed==target){
//  			clearTimeout(obj.timer)
//  			callback&&callback();
//  		}
//  		
//  	},30)
// 	
//  }
    	function startMove(obj,json,endFn){
					var iCur=0;
					var speed=0;
					clearInterval(obj.timer);
					obj.timer=setInterval(function(){
						var onOff=true;
						for(var attr in json){
							if(attr=="opacity") iCur=Math.round(getStyle(obj,"opacity")*100);
							else iCur=parseInt(getStyle(obj,attr));
							var target=json[attr];
							speed=(target-iCur)/8;
							speed=(target-iCur) >0 ?  Math.ceil(speed) :  Math.floor(speed);
							if(iCur!=target){
								onOff=false;
								if(attr=="opacity"){
									obj.style.opacity=(iCur+speed)/100;
									obj.style.filter= "alpha(opacity="+iCur+speed+")";
								}else{
									obj.style[attr]=iCur+speed+"px";
								}
							}
						}
						if(onOff){
							clearInterval(obj.timer);
							endFn&&endFn();
						}
					},30)
				}

///////抛物线/////////////////////////////////////////////////////////////////
    function fn(obj,target,speed,fn){
			var  a=0.003;				
			var dis=0;			
			obj.timer=null;
			//相对的坐标
			var coord={
				x:target.left-obj.offsetLeft,
				y:target.top-obj.offsetTop,
			}			
			//求b系数			
			//var b= (y-ax2)/x;			
			var b=(coord.y-a*coord.x*coord.x)/coord.x;		
			var yuandian={
				x:obj.offsetLeft,
				y:obj.offsetTop
			}				
			obj.timer=setInterval(function(){				
				dis+=speed;			
				obj.style.left=yuandian.x+dis+"px";
				obj.style.top=yuandian.y+a*dis*dis+b*dis+"px";			
				if(dis>=coord.x){
					clearInterval(obj.timer);
					obj.style.left=target.x+"px";
					obj.style.top=target.y+"px";
					fn&&fn();
				}
		},30)

  }
    