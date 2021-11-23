const speakMode = document.getElementById('speakMode');
const speakArea = document.getElementById('speakArea')

window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new window.SpeechRecognition();
recognition.interimResults = false;

recognition.addEventListener('result',(e)=>{
	const text = Array.from(e.results)
	.map(result => result[0])
	.map(result => result.transcript)
	.join('');

	let speak = text;
	console.log(speak);

	if(toggle == true){
		speakArea.style.display ='block'
		speakArea.innerHTML = 'Komut : ' + speak
			
	}
	
	if(e.results[0].isFinal){

		if(text.includes('temizle')){
			localStorage.clear();
			alert('LocalStorage Temizlendi')
		};
		if(text.includes(`günlük görevleri aç`)){
			
			document.getElementById('daily').click();
			
		};
		if(text.includes(`haftalık görevleri aç`)){
			
			document.getElementById('weekly').click();
			
		};
		if(text.includes(`aylık görevleri aç`)){
			
			document.getElementById('montly').click();
			
		};
		if(text.includes('ekle')){
			
			
			document.getElementById('addInfo').click()
		};

		/**************Select Radio Button ***************/
		if(text.includes('günlük')){
			
			document.getElementById('day').click()
			
		};
		if(text.includes('aylık')){
			
			document.getElementById('month').click()
			
		};
		if(text.includes('haftalık')){
			
			document.getElementById('week').click()
			
		};

		/***********  theme  ******************/
		if(text.includes('siyah')){
			
			
			document.getElementById('taskPlan').style.backgroundColor="black"
			document.getElementById('taskPlan').style.color="white"
		};
		if(text.includes('beyaz')){
			
			
			document.getElementById('taskPlan').style.backgroundColor=""
			document.getElementById('taskPlan').style.color=""
		};
		/****************OPEN COMMANDS ******************/
		if(text.includes('liste')){
			
			
			document.getElementById('commands').click();
			
		};
		/******Close Speak mode ********/
		if(text.includes(`kapat`)){

			
			speakMode.innerHTML= "Speak-Off"
			recognition.stop();
			recognition.removeEventListener('end',audio)
			speakArea.style.display ='none'
			
		};

	}

	
})



/********************* ON-OFF SPEAK MODE *************************/
let toggle = false;

function audio(){
	recognition.start();
}

speakMode.addEventListener('click',()=>{
	
	toggle =!toggle;
	console.log(toggle)

	if(toggle == true){
		speakMode.innerHTML= "Speak-On"
		
		recognition.start();
		recognition.addEventListener('end',audio)

	}

	if(toggle == false){
		speakMode.innerHTML= "Speak-Off"
	
		recognition.stop();
		recognition.removeEventListener('end',audio)
		speakArea.style.display ='none'
	}
	
})






