var menu = [],
	list = [],
	menuInput = document.getElementById('inputMenu'),
	rdBtn = document.getElementById('randomBtn'),
	btn = document.getElementById('btnPlus'),
	formM = document.getElementById('menuForm'),
	menuList = document.getElementById('menuList'),
	popUp = document.getElementById('popup'),
	popUpTxt = document.getElementById('popupText');


//랜덤설정
	function randomEvent(e){
		e.preventDefault();

		if(menu.length < 2){   
			alert('메뉴를 2개 이상 입력해주세요');
			menuInput.focus();
		}else{
			var menuList = Math.floor(Math.random() * menu.length);

			var popOpen = setInterval(function(){
				popUp.style.top = "50%";
				popUpTxt.textContent = menu[menuList];
			})
			setTimeout(function(){
				clearInterval(popOpen);
				popUp.style.top = "-500%";
			},3000)      
		}
	}

//추가결과
	function myMenu(e){
		e.preventDefault();

		if(menu.indexOf(menuInput.value) != -1) { 
			alert('이미 입력되어 있습니다')
		}else if(menuInput.value == ""){
				alert('다시 입력해주세요');			
		}else{
			alert(menuInput.value + ' 이 추가되었습니다');
			menu.push(menuInput.value);
			var li = document.createElement('li');
			li.append(document.createTextNode(menuInput.value));
			menuList.appendChild(li);
			for (var i = 1; i < 6 ; i++ ){
				var bgNum = Math.floor(Math.random() * i + 1)
			}
			li.className += "bg" + bgNum;
		}
		menuInput.value = '';
		menuInput.focus();
	}

		rdBtn.addEventListener('click',randomEvent);
        formM.addEventListener('submit',myMenu);
