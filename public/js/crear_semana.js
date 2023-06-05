function eliminarSemana(id) {
  const deleteSemanaQuery = `
    mutation DeleteSemana($id: ID!) {
      deleteSemana(id: $id) {
        id
        semana
      }
    }`;

  fetch("http://localhost:3000/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      query: deleteSemanaQuery,
      variables: { id },
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      const deletedSemana = data.data.deleteSemana;
      console.log("Semana borrada", deletedSemana);
      location.reload();
    })
    .catch((error) => {
      console.error("Error al eliminar la semana:", error);
    });

  // Eliminar la tarjeta correspondiente al id
  let card = document.getElementById(id);
  if (card) {
    card.remove();
  }

  // Cerrar el modal de confirmación
  let modal = document.getElementById("eliminar-modal");
  $(modal).modal("hide");

  // Remover el evento "click" del botón "Eliminar" del modal
  let eliminarBtn = modal.querySelector(".btn-danger");
  eliminarBtn.removeEventListener("click", eliminarSemana);
}

function crearCard() {
  const form = document.querySelector("form");
  if (!form.checkValidity()) {
    const errorMessage = document.querySelector(".error-message");
    errorMessage.style.display = "block";
    return; // Salir de la función si el formulario no es válido
  }

  // Obtener los valores de los inputs
  let semana = parseInt(document.getElementById("semana-input").value);
  let anio = parseInt(document.getElementById("anio-input").value);
  let descripcion = document.getElementById("descripcion-input").value;
  let mes = document.getElementById("mes-input").value;
  let horas = parseInt(document.getElementById("horas-input").value);
  let color = document.getElementById("color-select").value;

  // Verificar que todos los campos requeridos tengan valor
  if (!semana || !anio || !descripcion || !mes || !horas || !color) {
    return; // Salir de la función si algún campo requerido está vacío
  }
  const id = uuidv4();
  const semanaData = {
    id, 
    semana,
    anio,
    descripcion,
    mes,
    horas,
    color,
  };
  console.log(semanaData)

  fetch("http://localhost:3000/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      query: `
        mutation crearSemana($input: SemanaInput!) {
          crearSemana(input: $input) {
            id
            semana
            anio
            descripcion
            mes
            horas
            color
          }
        }
      `,
      variables: { input: semanaData },
     
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      const nuevaSemana = data;
      console.log(semanaData);
      console.log("Nueva semana creada:", nuevaSemana);
    })
    .catch((error) => {
      console.error("Error al crear la semana:", error);
    });

  // Crear el elemento card
  let card = document.createElement("div");
  let cardId = "card-" + Date.now().toString();
  card.setAttribute("id", cardId);
  card.className = "card";
  card.style.backgroundColor = color;
  card.style.width = "320px";
  card.style.height = "250px";

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
  button1.style.backgroundColor = "#70A9A1";
  button1.style.marginRight = "10px";
  button1.style.marginLeft = "5px";

  button1.addEventListener("click",function(){
      window.location.href="tareas_pendientes.html";
  })

  let button2 = document.createElement("button");
  button2.className = "btn btn-secondary btn-sm";
  button2.textContent = "Eliminar";
  button2.setAttribute("data-toggle", "modal");
  button2.setAttribute("data-target", "#eliminar-modal");
  button2.style.backgroundColor = "#E40066";
  button2.style.marginRight = "0";

  // Añadir el evento "click" al botón2
  button2.addEventListener("click", function () {
    let cardId = card.getAttribute("id");
    // Obtener el modal de confirmación
    let modal = document.getElementById("eliminar-modal");

    // Añadir el evento "click" al botón "Eliminar" del modal
    let eliminarBtn = modal.querySelector(".btn-danger");

    eliminarBtn.addEventListener("click", function () {
      // Eliminar la semana
      eliminarSemana(cardId);

      // Cerrar el modal de confirmación
      $(modal).modal("hide");
    });

    // Mostrar el modal de confirmación
    $(modal).modal("show");
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

  // Añadir la card al contenedor
  let contenedor = document.getElementById("contenedor-cards");
  contenedor.appendChild(card);

  // Cerrar el modal
  let modal = document.getElementById("anadir-semana");
  $(modal).modal("hide");

  // Resetear el formulario
  form.reset();
}
