function allowDrop(event) {
    event.preventDefault();
  }
  
  function drag(event) {
    event.dataTransfer.setData("text", event.target.id);
  }
  
  function drop(event) {
    event.preventDefault();
    const data = event.dataTransfer.getData("text");
    event.target.appendChild(document.getElementById(data));

  }
  function dragstart(event) {
    event.dataTransfer.setData("text", event.target.id);
    // Aplicar el color de fondo deseado mientras se arrastra la tarjeta
    event.target.style.backgroundColor = "purple";
  }
  function dragend(event) {
    // Restablecer el color de fondo original después de soltar la tarjeta
    event.target.style.backgroundColor = event.target.dataset.prioridad;
  }