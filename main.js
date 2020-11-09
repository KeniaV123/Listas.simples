var lista = document.querySelector("#listar");

class Producto {
  constructor(codigo, nombre, descripcion, cantidad, costo) {
    this.codigo = codigo;
    this.nombre = nombre;
    this.descripcion = descripcion;
    this.cantidad = cantidad;
    this.costo = costo;
    this.siguiente = null;
  }

  valorTotalM() {
    let cantidad = this.cantidad;
    let costo = this.costo;
    let valor = cantidad * costo;
    return valor;
  }

  articleToHtml() {
    let productString = '<li class="list-group-item">';
    for (let key in this) {
      productString += `<br><strong>${key}:</strong> ${this[key]}`;
    }
    let valor_string = `<br><strong>Valor total mercancia:</strong> ${this.valorTotalM()}`;
    return productString + valor_string + "</li>";
  }
}
  
class Inventario{
    constructor(){
        this.inicio = null;
        this.tamaño = 0;
    }

    agregarProduct(nuevo) {
        if (this.inicio === null ) {
            this.inicio = nuevo;
        }else {
            let aux = this.inicio;
            while (aux.siguiente !== null){
                aux = aux.siguiente;
            }
            aux.siguiente = nuevo;
        }
        this.tamaño++;
        document.getElementById("form1").reset();
        this.listar();
    }
    posicionProduct(nombre, posicion){
        if(this.inicio == null){
            return false;
        }
        let aux = this.inicio;
        while (aux != null){
            if (nombre.codigo == aux.codigo){
                return false;
            }   
            aux = aux.siguiente;
        }
        aux = this.inicio;
        let i = 1;
        while(i < posicion -1 && aux !== null){
            aux = aux.siguiente;
            i++;
        }
        if(aux === null){
            return null;
        }
        let temp = aux.siguiente;
        aux.siguiente = nombre;
        aux.siguiente.siguiente = temp;
        document.getElementById("form1").reset();
        this.listar();
    }

    agregarInicio(nombre){
        let aux = this.inicio;
        while(aux !== null){
            if(aux.codigo === nombre.codigo){
                return null;
            }
            aux = aux.siguiente;
        }
        nombre.siguiente = this.inicio;
        this.inicio = nombre;
        document.getElementById("form1").reset();
        this.listar();
    }

    borrarInicio(){
        let aux = this.inicio;
        this.inicio = this.inicio.siguiente;
        aux.siguiente = null;
        this.listar();
        return aux;
    }
  
    borrarProduct(codigo) {
        let aux = this.inicio;
        let temp = null;
        while(aux !== null){
            if(aux.codigo === codigo){
                if(!temp){
                    this.inicio = aux.siguiente;
                }else{
                    temp.siguiente = aux.siguiente
                }
                this.tamaño--;
                document.getElementById("form2").reset();
                this.listar();
                return aux
            }
            temp = aux;
            aux = aux.siguiente;
        }
        return null;
    }
  
    buscarProduct(codigo) {
        if(this.inicio == null){
            return null;
        }
        let aux = this.inicio;
        while(aux){
            if(aux.codigo == codigo){
                return (aux);
            }
            aux = aux.siguiente;
        }
        return null;
    }
  
    listar() {
        lista.innerHTML = "";
        if(this.tamaño === 0){
            return null;
        }
        let aux = this.inicio;
        while(aux){
            lista.innerHTML += aux.articleToHtml();
            aux = aux.siguiente;
        }
    }
  
    listarInvertido() {
        lista.innerHTML = "";
        if(this.inicio == null){
            return null;
        }
        let aux = this.inicio;
        while(aux !== null){
            lista.innerHTML += aux.articleToHtml();
            aux = aux.siguiente;
        }
    }
}

let inventario = new Inventario();

var botonAgregar = document.querySelector('#botonAgregar');
botonAgregar.addEventListener("click", () => {
  let codigoP = document.querySelector('#codigoP');
  let nombreP = document.querySelector('#nombreP');
  let descripcionP = document.querySelector('#descripcionP');
  let cantidadP = document.querySelector('#cantidadP');
  let costoP = document.querySelector('#costoP');
  let posicion = document.querySelector('#posicion')
  if(posicion.value == ""){
      let newProduct = new Producto (codigoP.value, nombreP.value, descripcionP.value, cantidadP.value, costoP.value);
      inventario.agregarProduct(newProduct);
  }else{
      let nuevo = new Producto(codigoP.value, nombreP.value, descripcionP.value, cantidadP.value, costoP.value);
      inventario.posicionProduct(nuevo);
  }
});

var botonInicio = document.querySelector('#botonInicio');
botonInicio.addEventListener("click", () => {
    let codigoP = document.querySelector('#codigoP');
    let nombreP = document.querySelector('#nombreP');
    let descripcionP = document.querySelector('#descripcionP');
    let cantidadP = document.querySelector('#cantidadP');
    let costoP = document.querySelector('#costoP');
    let newProduct = new Producto(codigoP.value, nombreP.value, descripcionP.value, cantidadP.value, costoP.value);
    inventario.agregarInicio(newProduct);
});

var botonPri = document.querySelector('#eliminarPrimero');
botonPri.addEventListener("click", () => {
  inventario.borrarInicio();
})

var botonBorrar = document.querySelector('#botonBorrar');
botonBorrar.addEventListener("click", () => {
  let borrarProducto = document.querySelector("#borrarProducto");
  inventario.borrarProduct(borrarProducto.value);
    
});
  
var botonBuscar = document.querySelector('#botonBuscar');
botonBuscar.addEventListener("click", () => {
  var buscarProducto = document.querySelector("#buscarProducto");
  inventario.buscarProduct(buscarProducto.value); 
});
  
var botonListar = document.querySelector('#botonListar');
botonListar.addEventListener("click", () => {
  inventario.listar();
});
  
var botonListarIn = document.querySelector('#botonListarIn');
botonListarIn.addEventListener("click", () => {
  inventario.listarInvertido();
});