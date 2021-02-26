window.onload = () => {
	greetVisitor();
    triangle();
	strings();
    array();
    timer();
    test();
    magic();

}


function greetVisitor(){
	let greet = document.getElementById('greetings');
	let greet_msg = document.getElementById('greet_msg');
	

    let greet_name = document.getElementById('greet_name');
    let show_greet = name => {
		if(name == '' || !name)
			greet_msg.innerText = 'Привет, дружище!';
		else
			greet_msg.innerText = `Привет, ${name}`;

		greet.classList.remove('hidden');
		
	}
    document.getElementById('greet_submit').onclick = e =>{
		e.preventDefault();
		localStorage.setItem('userName', greet_name.value);
		show_greet(greet_name.value);
	}

    let name = localStorage.getItem('userName');

	if(name != null && name !='') {
		show_greet(name);
	}

	

	let show_change_name = () => {
		greet.classList.add('hidden');
		
	}

	document.getElementById('greet_other_name').onclick = e => {
		e.preventDefault();
		greet_name.value = '';
		localStorage.removeItem('userName');
		show_change_name();
	}

}

function triangle(){
	let height = document.getElementById('height');
	let base = document.getElementById('base');
	let triangle_submit = document.getElementById('triangle_submit');
	let triangle_area = document.getElementById('triangle_area');

	triangle_submit.onclick = e =>{
		e.preventDefault();
		triangle_area.innerText = "Площадь: " + height.value * base.value / 2;
	}
}
function strings(){
	let str1 = document.getElementById('str1');
	let str2 = document.getElementById('str2');
	let strings_res = document.getElementById('strings_res');
	document.getElementById('strings_submit').onclick = e => {
		e.preventDefault();
		if(str1.value.length === str2.value.length)
            strings_res.innerText = 'Строки одинаковой длины';
		else
            strings_res.innerText = 'Строки разной длины';
	}
}
function array(){
    let arr = document.getElementById('arr');
    let minRes =  document.getElementById('min');
    let maxRes =  document.getElementById('max');

    document.getElementById('array_submit').onclick = e =>{
        e.preventDefault();
        let a = arr.value.split(' ');
        let min = a[0];
        let max = a[0];
        for (let i =1; i<a.length; i++){
            if(a[i] < min) min = a[i];
            if(a[i] > max) max = a[i];
        }
        minRes.innerText = "Минимальный элемент: " + min;
        maxRes.innerText = "Максимальный элемент: " + max;
    }
}

function timer(){
    let display = document.getElementById('timer_display');
    let start = document.getElementById('timer_start');
    let stop = document.getElementById('timer_stop');
    let reset = document.getElementById('timer_reset');
    
    let time = 0;
    
    function tick(){
        let Timer = timeNow(time);
        display.innerText = `${Timer.mins}:${Timer.secs}`;
        time++;
        let i = 5+"Привет";
        console.log(i);
    }

    function timeNow(){
        let min;
        let sec;
        if(time>0){  
            min = Math.floor(time/60);
            sec = time % 60;
        }
        else{
            min = 0;
            sec = 0;
        }
        if (time>3600&&min>59) min = min % 60;
        if (min<10) min = "0" + min;
        if (sec<10) sec = "0" + sec;

        return{ 
            mins: min,
            secs: sec,
        };
    }
    start.onclick = (e) =>{
        e.preventDefault();
        tickGenerator(true);
        start.disabled = 'true';  
    }
    stop.onclick = (e) =>{
        e.preventDefault();
        tickGenerator(false);
        start.disabled = '';
    }
    reset.onclick = (e) =>{
        stop.onclick(e);
        time = 0;
        window.requestAnimationFrame(()=>{
			display.innerText = '00:00';
		});
        
    }

    let isRunning;
    function tickGenerator(value){
        if(value){
            tick();
            isRunning = setInterval(tick, 1000);
        } 
        else clearInterval(isRunning);
    }
}

function test(){
    let end = document.getElementById('test_submit');
    let result = document.getElementById('test_res');
    let score = 0;
   

   function check(){
        let arr = [];
        arr[0] = document.getElementsByName('q1');
        arr[1] = document.getElementsByName('q2');
        arr[2] = document.getElementsByName('q3');
        arr[3] = document.getElementsByName('q4');
        arr[4] = document.getElementsByName('q5');
        arr[5] = document.getElementsByName('q6');
        arr[6] = document.getElementsByName('q7');
                
        for(let i=0; i<arr.length; i++){     
            for(let j=0; j<arr[i].length; j++){
                if(arr[i][j].checked && arr[i][j].value == 'a'){ 
                    score++;             
                    break;
                }          
            }   
        }

    }

    end.onclick = (e) =>{
        e.preventDefault();
        score = 0;
        check();
        result.innerText = "Ваш результат: " + score + " из 7";
    }
}

function magic(){
    let popup = document.getElementById('mypopup');
    let popupOpen = document.getElementById('popupOpen');
    let popupClose = document.querySelector('.close');
    let date = document.getElementById('date');
    let name = "Гость";
    
    popupOpen.onclick = (e)=>{
        e.preventDefault();
        
        name = localStorage.getItem('userName');
        if(name==null) name = "Гость"

        let data = new Date();
        year = data.getFullYear();
        month = data.getMonth() + 1;
        
        day = data.getDate();
        if(month<10) month = "0"+month;
        if(day<10) day = "0"+day;
        
        date.innerText = name + `, cегодня ${`${day}.${month}.${year}`}`;
        
        popup.style.display="block";
    }
    popupClose.onclick = (e)=>{
        
        popup.style.display="none";
    }
    window.onclick = (e)=>{
        if(e.target == popup){
            popup.style.display="none";
        }
    }
}