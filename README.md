# Screen-Responsive-Js, Responsive Design en HTML sin uso de Media Query ni nada similar

![](sr.gif)

Existen las media query y muchas formas de hacer responsive design, por eso no recomiendo usar esta clase imperfecta. Esta es tan solo una práctica humilde de javascript puro, lógica, uso de clase, constructor, scope, objetos, props, childrend, bind, setInterval, método nativo screen, etc.

Para usar solo crear el index.html, en un script importar la clase. Hacer un div contenedor con una id, y dentro del mismo crear divs hijos con un nombre común de clase. Tanta la ID como el nombre común de clase será definidos en la la clase importada:

# Uso de la clase

1.- Crear instancia y definir nombre del contenedor padre (#), nombre común de hijos (.) y un objeto de flex (configuración)
2.- Definir método OrderDivs, con un parámetro array contenedor del conjunto de hijos, en el orden en que que quieran mostrarse (No usar el 0)
3.- Definir método RScreens para que se den los cambios de flexibilidad según resolución

// Los valores de estas llaves se pueden modificar, no las llaves.

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
