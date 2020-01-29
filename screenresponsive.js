"use strict";

//Los elementos ya deben estar montados en el DOM para usar la clase Responsive HTML

//Las propiedades del viewport se pueden editar, definido aquí no es necesario incluirlo directamente en el HTML
let viewport = document.createElement("meta");
viewport.setAttribute("name","viewport");
viewport.setAttribute("content","width=device-width, initial-scale=1")
let head = document.querySelector("head");
head.appendChild(viewport)

class HTML{
	constructor(divPadre,divHijos,configHTML){
		this.divPadre = divPadre; //Container Div
		this.divHijos = divHijos; //ClassName children divs
		this.padre = ""; //Container 
		this.hijos = ""; //Individual Childs
		this.configHTML = configHTML;
		let chtml = [configHTML];
		chtml.map(e => {
			if (e.header !== undefined && e.section !== undefined && e.aside !== undefined && e.footer !== undefined){
				this.props = configHTML;
				this.propsAside = configHTML.aside;
				//"defined"
			} else {
				this.props = { // Default Props
					"header": "1 1 auto",
					"section" : "3 0",
					"aside" : "2 0",
					"footer" : "1 1 auto",
					"other" : "2 0"
				}
				//"undefined"
			}
		})
	}

	Flex(){ //Flex Divs
		this.padre = document.getElementById(`${this.divPadre}`);
		this.padre.style.display = "flex";
		this.padre.style.flexFlow = "row wrap";

		this.hijos = document.getElementsByClassName(`${this.divHijos}`);

		this.orderChildren.map((e,i) => {
			// this.hijos[i].style.flexGrow = "1";
			// this.hijos[i].style.flexBasis = "100%";
			})
	}

	OrderDivs(divOrder){ //Order Childs
		if (divOrder !== undefined){
			this.orderChildren = divOrder; //Children Order 
			if (divOrder.length > 4){// If childs are > 4, config 'others' special case	
				this.propsOther = this.configHTML.other
			}
		} else {
			console.warn("Order not specified. You should define an order of your HTML structure inside 'OrderDivs'")
			this.orderChildren = [1,1,1,1,1,1,1]
		}
		return (divOrder === undefined) ? false : true;
	}

	RScreens(){ //Responsive Design
		this.Flex(); //Init Flex Function

		if (this.orderChildren === undefined){
			console.warn("'OrderDivs' method undefined")
			this.orderChildren = [1,1,1,1,1,1,1]
		}

		if(window.screen.width <= 749) { // Resolution <= 600px
			console.log("<=600")
			this.orderChildren.map((e,i) =>{
				this.hijos[i].style.order = `${e}`;
				this.hijos[i].style.flex = "1 1 auto";
			})
		}

		if (window.screen.width >= 750 && window.screen.width <= 999){ // Resolution >= 750px && <= 999px
			console.log(">=750 && <=999")
			let header = this.props.header;
			let section = this.props.section;
			let aside = this.props.aside;
			let footer = this.props.footer;
			let other = this.props.other;

				this.props = { //Update  by resolution change
					header : header,
					section : section.split(" ")[0] = String(Number(section.split(" ")[0])) + " 0 ",
					aside : aside.split(" ")[0] = String(Number(section.split(" ")[0])) + " 0 ",
					footer : footer,
					other : other
				}
		
			this.orderChildren.map((e,i) =>{
				this.hijos[i].style.order = `${e}`;
				(e === 1) ? this.hijos[i].style.flex = this.props.header : (e === 2) ? this.hijos[i].style.flex = this.props.section : (e === 3) ? this.hijos[i].style.flex = this.props.aside : (e === 4) ? this.hijos[i].style.flexBasis = this.props.footer : this.hijos[i].style.flex = this.props.other
			})
		}

		if(window.screen.width >= 1000) { //Resolution >= 1000px
			console.log(">= 1000")
			this.props = { //Update  by resolution change
					header : this.props.header,
					section : this.props.section,
					aside : this.propsAside, //Special Case
					footer : this.props.footer,
					other : this.propsOther
				}

			this.orderChildren.map((e,i)=>{
				this.hijos[i].style.order = `${e}`; //Order Children Divs
				(e === 1) ? this.hijos[i].style.flex= this.props.header : (e === 2) ? this.hijos[i].style.flex = this.props.section : (e === 3) ? this.hijos[i].style.flex = this.props.aside : (e === 4) ? this.hijos[i].style.flexBasis = this.props.footer : this.hijos[i].style.flex = this.props.other
			})
		}	
	}

	detectChangeResolution(){
		return document.querySelector("body").scrollWidth
	}
}

// Uso
// Crear instancia y definir nombre del contenedor padre (#), nombre común de hijos (.) y un objeto de flex (configuración)
// Definir método OrderDivs, con un parámetro array contenedor del conjunto de hijos, en el orden en que que quieran mostrarse
// Definir método RScreens para que se den los cambios de flexibilidad según resolución

//Los valores de estas llaves se pueden modificar, no las llaves
let flex = {
	header: "1 1 auto",
	section : "3 0",
	aside : "2 0",
	footer : "1 1 auto",
	other : "2 0 25%" //40% it's fine 
}

let html = new HTML("root","children",flex)
html.OrderDivs([7,2,3,4,5,1])
html.RScreens()

// FIN 



//OPCIONAL AGREGAR
// ----------Para que si se reduce el screen-width del navegador se vea el cambio automático

let initSWR;
setInterval(()=>{
	initSWR = html.detectChangeResolution();
},150) 

setInterval(()=>{
	let scrollWidthChanged = html.detectChangeResolution();
	if (scrollWidthChanged !== initSWR){
		html.RScreens()
	} 
},250) 
