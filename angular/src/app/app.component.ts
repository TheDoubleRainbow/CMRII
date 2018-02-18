import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
	locales = {
		en: {lang: "Language", inputTitle: 'Add your alternatives', add: 'Add', ready: "Ready", alts: 'Alternatives', compare: "Compare", answer: 'Answer', result: 'Result'},
		ru: {lang: "Язык", inputTitle: 'Введите альтернативы', add: 'Добавить', ready: 'Готово', alts: 'Альтернативы', compare: "Сравнение", answer: 'Ответить', result: 'Результат'},
		ua: {lang: "Мова", inputTitle: 'Додайте альтернативи', add: 'Додати', ready: 'Готово', alts: 'Альтернативи', compare: "Порівняння", answer: 'Відповісти', result: 'Результат'}};
	locale = this.locales.ua
	alternatives = [/*{name: "Файловий менеджер", rate: 0}, {name: "Браузер", rate: 0}, {name: "Сапер", rate: 0}, {name: "Поштовий клієнт", rate: 0}, {name: "Калькулятор", rate: 0}*/];
	alternativesList = [];
	currentCompare = [];
	currentRange = 5;
	currentFirst = undefined;
	currentIteration = 0;
	outOfAlternatives = false;
	newAlternative = '';
	resultList = [];
	ready = false;

	getCurrentCompare = function(){
			if(this.alternativesList.length > 1){
				this.currentCompare = [];
				if((this.currentIteration>=this.alternativesList.length) || this.currentFirst == undefined){
					let num = this.rnd(0, this.alternativesList.length);
					this.currentFirst = this.alternativesList[num]
					this.alternativesList.splice(num, 1)
					this.currentIteration = 0
				}
				this.currentCompare[0] = this.currentFirst;
				this.currentCompare[1] = this.alternativesList[this.currentIteration]
				this.currentIteration++
			}
			else{
				console.warn("Out of alternatives");
				this.outOfAlternatives = true
				this.result()
			}
		}
		answer = function(){
			if(!this.outOfAlternatives){
				let values = [10-this.currentRange, this.currentRange*1];
				for(let i = 0; i < this.alternatives.length; i++){
					if(this.alternatives[i].name == this.currentCompare[0].name){
						this.alternatives[i].rate += values[0]
					}
					else if(this.alternatives[i].name == this.currentCompare[1].name){
						this.alternatives[i].rate += values[1]
					}
				}
				this.getCurrentCompare()
				this.currentRange = 5;
			}
		}
		result = function(){
			this.resultList = this.alternatives.sort(function(a,b){
				return a.rate - b.rate
			}).reverse()
		}
		rnd = function(min, max, prev) {
			if(prev != undefined){
				let num = Math.floor(Math.random() * (max - min)) + min;
				if(num != prev){
					let ret = num
				}else{
					console.log(prev)
					this.rnd(min, max, prev)
				}
				return num
			}else{
				return Math.floor(Math.random() * (max - min)) + min;
			}
		}
		addAlternative = function(){
			if(this.newAlternative != "" && this.newAlternative != " "){
				this.alternatives.push({name: this.newAlternative, rate: 0})
				this.newAlternative = '';
			}
			else{
				alert("Input correct alternative!")
			}
		}
		getReady = function(){
			this.alternativesList = JSON.parse(JSON.stringify(this.alternatives));
			this.getCurrentCompare();
			this.ready = true;
		}
}
