window.onload = () => {
	greetVisitor();
    triangle();
	strings();
    array();
    timer();
    test();
    magic();
    array_string();
    oftenSymbol();
    anagramm();

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
        console.log(height.value);
        if(height.value == ''||base.value == '') triangle_area.innerText = "Введите значения";
        else if(height.value<=0||base.value<=0) triangle_area.innerText = "Значения должны быть больше нуля";
		else triangle_area.innerText = "Площадь: " + height.value * base.value / 2;
	}
}


function strings(){
	let str1 = document.getElementById('str1');
	let str2 = document.getElementById('str2');
	let strings_res = document.getElementById('strings_res');

	document.getElementById('strings_submit').onclick = e => {
		e.preventDefault();
        if(str1.value == ''||str2.value == '') strings_res.innerText = 'Введите строки';
		else if(str1.value.length === str2.value.length)
            strings_res.innerText = 'Строки одинаковой длины';
		else
            strings_res.innerText = 'Строки разной длины';
	}
}


function array(){
    let minRes =  document.getElementById('min');
    let maxRes =  document.getElementById('max');

    document.getElementById('array_submit').onclick = e =>{
        e.preventDefault();
        check();
    }

    function check(){
        let arr = [];
        arr[0] = document.getElementById('num1');
        arr[1] = document.getElementById('num2');
        arr[2] = document.getElementById('num3');
        arr[3] = document.getElementById('num4');
        arr[4] = document.getElementById('num5');
        console.log(arr[0].value);
        
        let checker = true;
        for (let i = 0; i<arr.length; i++){
            if(arr[i].value == ''){
                minRes.innerText = 'Введите массив полностью';
                checker = false;
                break;
            }   
        }
        
        if(checker) analize(arr);
    }

    function analize(arr){
        
        let min = arr[0].value;
        let max = arr[0].value;

        for (let i =1; i<arr.length; i++){
            if(arr[i].value < min) min = arr[i].value;
            if(arr[i].value > max) max = arr[i].value;
        }
        minRes.innerText = "Минимальный элемент: " + min;
        maxRes.innerText = "Максимальный элемент: " + max;
    }

}



function timer(){
    

    let display_hour = document.getElementById('timer_display_hour');
    let display_min = document.getElementById('timer_display_min');
    let display_sec = document.getElementById('timer_display_sec');
    let start = document.getElementById('timer_start');
    let stop = document.getElementById('timer_stop');
    let reset = document.getElementById('timer_reset');
    
    let elapsed_time = document.getElementById('elapsed_time');
    let time = 0;
    let start_time = 0;
    function tick(){
        let Timer = timeNow(time);
        display_hour.innerText = `${Timer.hours}`;
        display_min.innerText =  `${Timer.mins}`;
        display_sec.innerText =  `${Timer.secs}`;
        
        time--;
        
    }

    function timeNow(time){
        let hour;
        let min;
        let sec;
        if(time>0){
            hour = Math.floor(time/3600);
            min = Math.floor(time/60);
            sec = time % 60;
        }
        else{
            hour = 0;
            min = 0;
            sec = 0;
        }
        if (time>3600&&min>59) min = min % 60;
        if (hour<10) hour = "0" + hour;
        if (min<10) min = "0" + min;
        if (sec<10) sec = "0" + sec;

        return{
            hours: hour,
            mins: min,
            secs: sec,
        };
    }
    start.onclick = (e) =>{
        e.preventDefault();
        let set_hour = document.getElementById('set_hour');
        let set_min = document.getElementById('set_min');
        let set_sec = document.getElementById('set_sec');
        
        if(set_hour.value == ''&&set_min.value == ''&&set_sec.value == '') elapsed_time.innerText = "Введите значения, пожалуйста";     
        else if((set_hour.value < 0||set_min.value < 0||set_sec.value < 0)) elapsed_time.innerText = "Введите положительные значения, пожалуйста";
        else{
            time = set_hour.value*3600 + set_min.value*60 + set_sec.value*1;
            start_time = time;
            tickGenerator(true);
            start.disabled = 'true'; 
            
            elapsed_time.innerText = "Таймер запущен";
        }

    }
    stop.onclick = (e) =>{
        e.preventDefault();
        tickGenerator(false);
        start.disabled = '';
        let Elapsed_time = timeNow(start_time-time-1);
        elapsed_time.innerText = "Прошло времени: " + `${Elapsed_time.hours}:${Elapsed_time.mins}:${Elapsed_time.secs}`
    }
    reset.onclick = (e) =>{
        stop.onclick(e);
        time = 0;
        start_time = 0;
        window.requestAnimationFrame(()=>{
			display_hour.innerText = "00";
            display_min.innerText =  "00";
            display_sec.innerText =  "00";
		});
        elapsed_time.innerText = "Прошло времени: 00:00:00";
        
    }

    let isRunning;
    function tickGenerator(value){
        if(value){
            //tick();
            isRunning = setInterval(tick, 1000);
        } 
        else clearInterval(isRunning);
    }
}

function test(){
    let end = document.getElementById('test_submit');
    let result = document.getElementById('test_res');
    let score = 0;

    end.onclick = (e) =>{
        e.preventDefault();
        score = 0;
        check();
        result.innerText = "Ваш результат: " + score + " из 7";
    }

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

function array_string(){
    let res = document.getElementById('max_long_str');
    let button = document.getElementById('array_strings_submit');

    button.onclick = (e) =>{
        e.preventDefault();

        let arr = getArr();

        res.innerText = find_max_long_str(arr);     
    }

    function getArr(){
        let arr = [];
        arr[0] = document.getElementById('string1');
        arr[1] = document.getElementById('string2');
        arr[2] = document.getElementById('string3');
        arr[3] = document.getElementById('string4');
        arr[4] = document.getElementById('string5');
        

        return arr;
    }
    function find_max_long_str(arr){
        let checker = true;
        for (let i = 0; i<arr.length; i++){
            if(arr[i].value == ''){
                checker = false;
                break;
            } 
        }

        if (checker){
            let str = arr[0].value;
            for (let i=0; i<arr.length; i++){
                if (arr[i].value.length>str.length){
                    str = arr[i].value;
                } 
            }           
            return "Самая длинна строка: " + str;
        }
        else return "Введите массив строк полностью";    
    }

}

function anagramm(){
    
    let res = document.getElementById('anagramm_result');
    let button = document.getElementById('anagramm_strings_submit');

    button.onclick = (e) =>{
        e.preventDefault();
        let str1 = document.getElementById('a_str1').value;
	    let str2 = document.getElementById('a_str2').value;

        if(str1 != '' && str2 != ''){
            res.innerText = anagramm_check(str1, str2);    
        }
        else{
            res.innerText = "Введите строки полностью";    
        }
    }

    function anagramm_check(str1, str2){
        if (str1.length != str2.length) return "Это не анаграмма";

        let arr1 = toSortArray(str1);
        let arr2 = toSortArray(str2);
        
        if (compare(arr1, arr2)) return "Это анаграмма";
        else return "Это не анаграмма";
    }

    function toSortArray(str){
        let arr = [];
        for (let i=0; i<str.length; i++){
            arr[i] = str[i];     
        }
        arr.sort();
        return arr;
    }

    function compare(arr1, arr2){

        for (let i=0; i<arr1.length; i++){
            if (arr1[i] != arr2[i]){
                return false;
            }     
        }

        return true;
    }
}

function oftenSymbol(){
    let res = document.getElementById('often_symbol_result');
    let res_change = document.getElementById('change_symbol_result');
    let button1 = document.getElementById('often_symbol_submit');
    let button2 = document.getElementById('change_symbol_submit');
    let str;
    let often_symbol;

    button2.disabled = 'true';

    button1.onclick = (e) =>{
        e.preventDefault();
        str = document.getElementById('o_str').value;
        
        if(str != ''){
            often_symbol = findSymbol(str);
            res.innerText = "Самый частый символ в строке: " + often_symbol;
            button2.disabled = '';
        }
        else{
            res.innerText = "Введите строку";
        }
    }
    button2.onclick = (e) =>{
        e.preventDefault();
        
        let new_symbol = prompt("Введите символ:");
        let stupid_counter = 0;
        while(new_symbol.length!=1){
            stupid_counter++;
            if(stupid_counter > 5) new_symbol = prompt("Ты издеваешься да?");
            if(stupid_counter > 3) new_symbol = prompt("Да введи ты уже ОДИН СИМВОЛ!");
            else new_symbol = prompt("Введите только один символ:");
        }
        if(stupid_counter > 5){
            stupid_counter = 0;
            alert("Ганс, смотри, оно эволюционирует");
        } 
        if(stupid_counter > 3) alert("Ммм, ну молодец, ты справился");
        
        res_change.innerText = "Результат: " + toChangeStr(new_symbol);
        
        
    }

    function toChangeStr(new_symbol){
        let arr = toArray(str);

        for (let i=0; i<arr.length; i++) {
            if (arr[i] == often_symbol) {
                arr[i] = new_symbol;
            } 
        }
        
        return arr.join('');

    }
    function findSymbol(str) {
        let charMap = {};
        let charArray = [];
        let vaulesArray = [];
        let maxCharValue = 0;
       
        for (let char of str) {
            if (charMap.hasOwnProperty(char)) {
                charMap[char]++;
            } else {
                charMap[char] = 1;
            }
        }
       
        charArray = Object.keys(charMap);
        vaulesArray = Object.values(charMap);
        maxCharValue = Math.max(...vaulesArray);
       
        return charArray[vaulesArray.indexOf(maxCharValue)];
    }
    function toArray(str){
        let arr = [];
        for (let i=0; i<str.length; i++){
            arr[i] = str[i];     
        }
        
        return arr;
    }
  
}