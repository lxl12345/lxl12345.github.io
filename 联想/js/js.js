window.onload = function() {
	img.onmousemove = function() {
		ul1.style.display = 'block';
		ul1.style.transaction = 'all 2s'

	}
	img.onmouseout = function() {
		ul1.style.display = 'none'
	}
	img2.onmousemove = function() {
		ul2.style.display = 'block';
		ul2.style.height = '126px'
		ul2.style.transaction = 'all 2s'
	}
	img2.onmouseout = function() {
		ul2.style.display = 'none'
	}
	inp.onclick = function() {
		inp_text.style.display = 'none'
	}
	var liArr = document.querySelectorAll('.ul>li')

	for(var i = 0; i < liArr.length; i++) { //找到.nav>li所有元素
		liArr[i].index = i;
		liArr[i].onmouseover = function() {
			//在悬停事件中找到this对象下的ul 改变ul的状态（透明度）

			var mainB_A = this.getElementsByClassName('list_cont')
			for(var j = 0; j < mainB_A.length; j++) {
				mainB_A[j].style.display = 'block'

			}
		}
		liArr[i].onmouseout = function() {
			var mainB_A = this.getElementsByClassName('list_cont')
			for(var j = 0; j < mainB_A.length; j++) {
				mainB_A[j].style.display = 'none'
			}
		}

	}
	var box = document.getElementById("box"); //轮播器盒子
	var List = document.getElementById("list"); //6张图片的画布
	var oImg = List.getElementsByTagName("img"); //6张图片
	var oBtn = box.getElementsByTagName("button"); //左右按钮
	var oLi = box.getElementsByTagName("li"); //5个焦点

	var sum = 0; //计数器，记录步数
	var onOff = true;
	var imgIndex = 0; //图片计数器
	var dotIndex = 0 //焦点计数器

	function move(width, step) {

		var num = Math.abs(width / step); //一个width宽度需要走的总步数
		List.timer = setInterval(function() {
			if(sum == num) {
				clearInterval(List.timer);
				sum = 0; //计数器归零
				onOff = true;
				return;
			}
			List.style.marginLeft = parseFloat(getStyle(List, "marginLeft")) + step + "px";
			
			sum++;
		}, 20)

	}

	function noColor() { //所有焦点失去背景色
		for(var i = 0; i < 5; i++) {
			oLi[i].className = "";
		}
	}

	function autoPlay() { //自动轮播
		box.a = setInterval(function() {
			oBtn[1].onclick();
			
		}, 1500)
	}
	//鼠标悬停轮播停止
	box.onmousemove = function() {
			clearInterval(box.a);
		}
		//鼠标移开自动轮播
	box.onmouseout = function() {
		autoPlay();
	}
	autoPlay();

	//右键
	oBtn[1].onclick = function() {
			if(onOff) {
				if(imgIndex == 5) {
					List.style.marginLeft = "0px";
					imgIndex = 0;
				}
				onOff = false;
				move(770, -35);
				imgIndex++;
				noColor();
				if(dotIndex == 4) {
					dotIndex = -1;
				}
				oLi[dotIndex + 1].className = "on";
				dotIndex++;
			}

		}
		//左键
	oBtn[0].onclick = function() {
			if(onOff) {
				if(imgIndex == 0) {
					List.style.marginLeft = "-4620px";
					imgIndex = 5;
				}
				onOff = false;
				move(770, 35);
				imgIndex--;
				noColor();
				if(dotIndex == -1) {
					dotIndex = 4;
				}
				oLi[dotIndex + 1].className = "on";
				dotIndex++;
			}

		}
		//5个li点击事件
	for(i = 0; i < oLi.length; i++) {
		oLi[i].index = i;
		oLi[i].onclick = function() {
			if(onOff) {
				onOff = false;
				noColor();
				this.className = "on";
				if(this.index > dotIndex) {
					var width = (this.index - dotIndex) * 770;
					move(width, -35)
				} else {
					var width = (dotIndex - this.index) * 770;
					move(width, 35)
				}
				dotIndex = imgIndex = this.index;

			}

		}
	}

	function getStyle(element, attribute) {
		if("currentStyle" in element) { //in语法：判断某属性是否存在某对象里
			//ie9-获取非行内样式方法
			return element.currentStyle[attribute];
		} else {
			//非ie获取非行内样式方法
			return getComputedStyle(element)[attribute];
		}
	}
}