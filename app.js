import {canvas, IMAGES as images} from './initialize.js'
import {ctx, drawObj, run, start, dT} from './initialize.js'

// CREACIón del objeto balón
// PROPIEDADES> x, y, vX, vY, r, imagen
// METODOS> dibujarse, moverse

// Creo un array [] para almacenar todas las particulas
let particulas = []

// console.log(images)
let particula = {
    //PROPIEDADES
    x:200,
    y:200,
    r:15,
    vX: 50,// px por segundo
    vY: -50,
    // imagen: undefined,
    //METODOS
    dibujarse:function(){
        // dibuja un círculo
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 2*Math.PI, 0);
        ctx.fillStyle = "rgba(0,0,0,0.5)"
        ctx.stroke();
        ctx.fill();
    },
    //Random y cambia variables para que haga la ilusión de moverse
    moverse:function(){
        this.x = this.x + this.vX * dT/1000;
        this.y = this.y + this.vY * dT/1000;
    }

}

drawObj.draw =  function(){
    //eliminar lo anterior creador y seguir haciendo la ilusión
    ctx.clearRect(0, 0, 400, 400);
    //para cada particula dentro de la bolsa se hacen los dos funciones
    for (let particula of particulas){
        // console.log(particula)
        particula.dibujarse()
        particula.moverse()
    }
    // balon.dibujarse();
    // balon2.dibujarse()
    // balon.moverse();
    // balon2.moverse();
}
run()

function crearParticula(click){
    let nuevaParticula = Object.create(particula)
    //asignar x, y, vX y vY
    nuevaParticula.x = click.offsetX
    //Sintaxis para que vaya a coordenada x de mouse cuando se haga click
    nuevaParticula.y = click.offsetY
    // Genero el angulo de manera aleatoria
    // Math.random genera un numero aleatorio entre 0 y 1
    let ang = 2 * Math.PI * Math.random()
    //esta es la direccion
    nuevaParticula.vX = 400 * Math.cos(ang) * Math.random()
    nuevaParticula.vY = 400 * Math.sin(ang) * Math.random()

    // añado el nuevo balón al array de balones
    particulas.push(nuevaParticula)
    console.log(particulas)
}

// Al hacer click se va a ejecutar la función crear partícula
canvas.onclick = crearParticula