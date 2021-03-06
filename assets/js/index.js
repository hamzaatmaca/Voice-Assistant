import * as speech from './speech.js';
//VARIABLES
const addInfo = document.getElementById('addInfo');
const day = document.getElementById('day')
const week = document.getElementById('week')
const month = document.getElementById('month')
let addTask = document.getElementById('addTask')
const showTasks = document.getElementById('showTasks')
const daily = document.getElementById('daily');
const weekly = document.getElementById('weekly');
const montly = document.getElementById('montly');
let totalTaskList = document.getElementById('totalTaskList');
let taskPlan = document.getElementById('taskPlan')
let taskDateShow = document.createElement('DIV')
taskDateShow.style.width=100+'%';
taskDateShow.className = 'totalTaskList';
//LOCALSTORAGE SET ARRAY
let dayArr = [];
let weekArr = [];
let monthArr = [];


//GET DATA FROM LOCALSTORAGE AND SEND INTERFACE

class getDB{
	constructor(data){
		this.data = data;
	}

	getLocalStorage(getThisData){
		return JSON.parse(localStorage.getItem(getThisData));
	}

	getData(){
		
		if(this.data == 'day'){
			
			let getArr = this.getLocalStorage(this.data)

			let sendDay = getArr

			layout(sendDay,this.data)
		}
		if(this.data == 'week'){
			
			let getArr = this.getLocalStorage(this.data)

			let sendWeek = getArr
			
			layout(sendWeek,this.data)
		}
		if(this.data == 'month'){
			
			let getArr = this.getLocalStorage(this.data)		

			let sendMonth = getArr

			layout(sendMonth,this.data)
		}
	}
	
}


//ADD LOCALSTORAGE INPUT(ADDTASK.VALUE) DATA
addInfo.addEventListener('click',()=>{
	
	if(day.checked == true) { 

		if(!addTask.value == ""){

			dayArr.push(addTask.value);

			localStorage.setItem('day',JSON.stringify(dayArr));

			addTaskValueNull()

			let getDb = new getDB('day');
			getDb.getData();

		}

		else{
			alarm();
		}
	}

	else if(week.checked == true) {  
		
		if(!addTask.value == ""){

			weekArr.push(addTask.value);

			localStorage.setItem('week',JSON.stringify(weekArr)); 

			addTaskValueNull()

			let getDb = new getDB('week');
			getDb.getData();

		}

		else{

			alarm();
		}
	}

	else if(month.checked == true) {   

		if(!addTask.value == ""){

			monthArr.push(addTask.value);

			localStorage.setItem('month',JSON.stringify(monthArr));

			let getDb = new getDB('month');
			getDb.getData();

			addTaskValueNull()
		}

		else{

			alarm();
		}
	}

	else { 

		alarm();   
	}  
})


/******************************** ALERT SECTION *************************************************/
//EMPTY INPUT
function addTaskValueNull(){
	return addTask.value="";
}
//ALERT FUNCTION
function alarm(){
	return alert("Bo?? De??er Girilemez")
}

function emptyLocalstorageValue(param){
	return alert("Hi??bir "+ param + " G??rev Tan??ml?? De??il")
}

/******************************** ALERT SECTION ***************************************/

//CREATE LAYOUT FOR ALL TODO IN FIRST AREA

function layout(sendDate,param){
	
	if(param == 'day'){

		param = "G??nl??k" 
	}

	if(param == 'week'){

		param = "Haftal??k" 
	}

	if(param == 'month'){

		param = "Ayl??k"
	}

	totalTaskList.innerHTML += `

	
		<li class="totalTaskListElement">${sendDate[sendDate.length-1] + "<span class='param'>"+param+"</span>"}</li>
	
	`
	
}



/******************** G??NL??K - HAFTALIK - AYLIK BUTTONS PROPERTIES ************************/

daily.addEventListener('click',()=>{

//Empty value firstly taskDateShow(Area 2)
	taskDateShow.innerHTML="<h4 class='taskDateShowTitle'>G??nl??k G??revler</h4>";

	taskDateShow.style.width = 100 + "%";

//Create new class object for get data to localstorage 

	let getDb = new getDB();
	
	let taskDateShowDay = getDb.getLocalStorage('day');

//FOR EMPTY keyname = 'day' LOCALSTORAGE array KEYVALUE
	if(taskDateShowDay == null ){
		emptyLocalstorageValue('G??nl??k')
	}

	else{

		for(var i = 0; i<taskDateShowDay.length; i++){

			taskDateShow.innerHTML += `
			
			<h6 class="totalTaskListElement">${taskDateShowDay[i]+'<br>'}
			<button onclick="function delet(e){e.closest('.totalTaskListElement').remove();} delet(this)" class='deleteBtn'>Sil</button>
			</h6>
			`
			taskPlan.appendChild(taskDateShow)
		}
	}
	

})


weekly.addEventListener('click',()=>{
//Empty value firstly taskDateShow(Area 2)
	taskDateShow.innerHTML="<h4 class='taskDateShowTitle'>Haftal??k G??revler</h4>";

	taskDateShow.style.width = 100+"%";

//Create new class object for get data to localstorage 

	let getDb = new getDB();

	let taskDateShowWeek = getDb.getLocalStorage('week');

//FOR EMPTY keyname = 'week' LOCALSTORAGE array KEYVALUE
	
	if(taskDateShowWeek == null ){
		emptyLocalstorageValue('Haftal??k');
	}

	else{
		for(var i = 0; i<taskDateShowWeek.length; i++){

			taskDateShow.innerHTML += `
			
			<h6 class="totalTaskListElement">${taskDateShowWeek[i]+'<br>'}
			<button onclick="function delet(e){e.closest('.totalTaskListElement').remove();} delet(this)" class='deleteBtn'>Sil</button>
			</h6>
			`
			taskPlan.appendChild(taskDateShow)
		}
	}
})

montly.addEventListener('click',()=>{

//Empty value firstly taskDateShow(Area 2)

	taskDateShow.innerHTML="<h4 class='taskDateShowTitle'>Ayl??k G??revler</h4>";

//Create new class object for get data to localstorage 

	taskDateShow.style.width = 100+"%";

	let getDb = new getDB();

	let taskDateShowMonth = getDb.getLocalStorage('month');

//FOR EMPTY keyname = 'week' LOCALSTORAGE array KEY VALUE
	
	if(taskDateShowMonth == null ){
		emptyLocalstorageValue('Ayl??k')
	}

	else{


		for(var i = 0; i<taskDateShowMonth.length; i++){

			taskDateShow.innerHTML += `
			<h6 class="totalTaskListElement">${taskDateShowMonth[i]}
			<button onclick="function delet(e){e.closest('.totalTaskListElement').remove();} delet(this)" class='deleteBtn'>Sil</button></h6><br>

			`
			taskPlan.appendChild(taskDateShow)
		}
	}
})

/*************** DELETE ALL LOCAL DATABASE *****************/

let deleteButton = document.getElementById('deleteButton')
deleteButton.addEventListener('click',()=>{
	localStorage.clear();
})

/***************** ALL Commands ***********************/

let commands = document.getElementById('commands');

commands.addEventListener('click',()=>{
	let win = window.open('','Commands','width=400,height=400')
	win.document.write(`
		<h2 style="color:red">Buradaki komutlar?? komutlar butonuna bast??ktan 
		sonra sesli bir ??ekilde s??yleyiniz</h2>
		<h3>G??nl??k Haftal??k Ayl??k G??revler A??ma</h3>
		<p>g??nl??k g??revleri a??</p>
		<p>haftal??k g??revleri a??</p>
		<p>ayl??k g??revleri a??</p>

		<h3>Input g??rev giri??i yap??ld??ktan sonra</h3>
		<p>ekle</p>
		<h3>G??nl??k Haftal??k Ayl??k Radio Button Se??imi</h3>
		<p>g??nl??k </p>
		<p>ayl??k </p>
		<p>haftal??k </p>
		<h3>Sesli Mod ????k????</h3>
		<p>kapat</p>
		<h3>T??m g??revleri Sil</h3>
		<p>temizle</p>
		<h3>Karanl??k - Ayd??nl??k Mod</h3>
		<p>siyah</p>
		<p>beyaz</p>
		<h3>Komut Listesi A??ma/h3>
		<p>liste</p>
		`)
})