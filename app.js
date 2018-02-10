var app = new Vue({
	el: "#app",
	data: {
		alternatives: [{name: "first", rate: 0}, {name: "second", rate: 0}, {name: "third", rate: 0}, {name: "fourth", rate: 0}, {name: "fifth", rate: 0}],
		currentCompare: [],
		currentRange: 5,
		currentNum: 0
	},
	methods: {
		getCurrentCompare: function(){
			this.currentCompare = [];
			if(this.currentNum+1<this.alternatives.length){
				for(let i = this.currentNum; i < this.currentNum+2; i++){
					this.currentCompare.push(this.alternatives[i])
				}
			}
			else{
				console.warn("Error while loading current compare")
			}
		},
		answer: function(){
			let values = [10-this.currentRange, this.currentRange*1];
			for(let i = 0; i < this.alternatives.length; i++){
				if(this.alternatives[i].name == this.currentCompare[0].name){
					this.alternatives[i].rate += values[0]
				}
				else if(this.alternatives[i].name == this.currentCompare[1].name){
					this.alternatives[i].rate += values[1]
				}
			}
		}
	},
	created: function(){
		this.getCurrentCompare()
	}
})