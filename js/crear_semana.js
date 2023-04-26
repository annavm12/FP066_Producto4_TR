
function crearCard() {

    const form = document.querySelector('form');
    if (!form.checkValidity()) {
        const errorMessage = document.querySelector('.error-message');
        errorMessage.style.display = 'block';
        return; // salimos de la función si el formulario no es válido
    }

    // Obtener los valores de los inputs
    let semana = document.getElementById("semana-input").value;
    let anio = document.getElementById("anio-input").value;
    let descripcion = document.getElementById("descripcion-input").value;
    let mes = document.getElementById("mes-input").value;
    let horas = document.getElementById("horas-input").value;
    let color = document.getElementById("color-select").value;

    // Verificar que todos los campos requeridos tengan valor
    if (!semana || !anio || !descripcion || !mes || !horas || !color) {
        return; // salimos de la función si algún campo requerido está vacío
    }

    let fondo = document.createElement("div");
    fondo.className = "fondo";
    fondo.style.backgroundColor = "#F6F1D1";

// Crear el elemento card 
    let card = document.createElement("div");
    card.className = "card";
    let cardId = "card-" + Date.now().toString();
    card.setAttribute("id", cardId);
    card.style.backgroundColor = color;
    card.style.width = "320px";
    card.style.height = "250px";

    //guardarTarjeta(id, semana, anio, descripcion, mes, horas, color);

    // Crear el contenido de la card
    let cardBody = document.createElement("div");
    cardBody.className = "card-body";
    let cardTitle = document.createElement("h5");
    cardTitle.className = "card-title";
    cardTitle.textContent = "Semana " + semana + " - " + anio;
    let cardText = document.createElement("p");
    cardText.className = "card-text";
    cardText.style.maxHeight = "80px";
    cardText.style.overflow = "hidden"; 
    cardText.textContent = descripcion;
    let cardFooter = document.createElement("div");
    cardFooter.className = "card-footer";
    let cardFooterText = document.createElement("small");
    cardFooterText.className = "text-muted";
    cardFooterText.textContent = mes + " - " + horas + " horas";
    let button1 = document.createElement("button");
    button1.className = "btn btn-primary btn-sm";
    button1.textContent = "Detalles";
    button1.style.backgroundColor = "#CFD7C7";
    button1.onclick = function() {
        window.location.href = "../html/tareas_pendientes.html";
    };
    button1.style.backgroundColor = "#70A9A1"; 
    button1.style.marginRight = "10px";
    button1.style.marginLeft = "5px";

    let button2 = document.createElement("button");
    button2.className = "btn btn-secondary btn-sm";
    button2.textContent = "Eliminar";
    button2.setAttribute("data-toggle", "modal"); 
    button2.setAttribute("data-target", "#eliminar-modal");
    button2.style.backgroundColor = "#E40066"; 
    button2.style.marginRight = "0"; 

    // Añadir el evento "click" al botón2
    button2.addEventListener("click", function(){
    // Obtener el modal de confirmación
    let modal = document.getElementById("eliminar-modal");

    // Añadir el evento "click" al botón "Eliminar" del modal
    let eliminarBtn = modal.querySelector(".btn-danger");
    eliminarBtn.addEventListener("click", function() {
    
        card.remove();
    // Cerrar el modal de confirmación
    $(modal).modal('hide');
    });

    // Mostrar el modal de confirmación
    $(modal).modal('show');
    });


    cardFooter.appendChild(button1);
    cardFooter.appendChild(button2);

    // Añadir el contenido a la card

    cardBody.appendChild(cardTitle);
    cardBody.appendChild(cardText);
    cardFooter.appendChild(cardFooterText);
    cardFooter.appendChild(button1);
    cardFooter.appendChild(button2);
    card.appendChild(cardBody);
    card.appendChild(cardFooter);
    fondo.appendChild(card);
    
        // Cerrar el modal
        let modal = document.getElementById("anadir-semana");
        $(modal).modal('hide');
    // Añadir la card al contenedor
    let contenedor = document.getElementById("contenedor-cards");
    contenedor.appendChild(card);
    // Resetear el formulario
    document.getElementById("formulario").reset();


}

function guardarTarjeta(id, semana, anio, descripcion, mes, horas, color){
    // Creamos un objeto con la información que queremos enviar
    var datos = {id, semana, anio, descripcion, mes, horas, color};

    // Enviamos el objeto al servidor
    $.ajax({
        url: "http://localhost:3000/semana",
        type: "POST",
        data: datos,
        success: function(respuesta) {
            // Aquí puedes manejar la respuesta del servidor
            console.log(respuesta);
        }
    });

}
