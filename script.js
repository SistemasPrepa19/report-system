function mostrarNotificacion(mensaje, tipo) {
    const notificacion = document.createElement('div');
    notificacion.className = `notificacion ${tipo}`;

    const imagen = document.createElement('img');
    imagen.src = tipo === 'exito' 
        ? 'https://cdn-icons-png.flaticon.com/512/845/845646.png'  // Ícono de éxito
        : 'https://cdn-icons-png.flaticon.com/512/1828/1828843.png'; // Ícono de error

    const texto = document.createElement('p');
    texto.textContent = mensaje;

    notificacion.appendChild(imagen);
    notificacion.appendChild(texto);
    document.body.appendChild(notificacion);

    setTimeout(() => {
        notificacion.remove();
        location.reload();
    }, 3000);
}

document.getElementById("soporteForm").addEventListener("submit", function(event){
    event.preventDefault();
    
    var usuario = document.getElementById("usuario").value;
    var edificio = document.getElementById("edificio").value;
    var aula = document.getElementById("aula").value;
    var maquina = document.getElementById("maquina").value;
    var categoria = document.getElementById("categoria").value;
    var problema = document.getElementById("problema").value;

    // Enviar los datos al backend (Google Apps Script) usando fetch
    fetch('https://script.google.com/macros/s/AKfycbwxS34jSRIRnxVdo3J9csC0TXVxST37sLoFDNQb9BcectuWweOhPAcjT4OqZPLHp3KA/exec', {
        method: 'POST',
        mode: "no-cors",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            usuario: usuario,
            edificio: edificio,
            aula: aula,
            maquina: maquina,
            categoria: categoria,
            problema: problema
        })
    }).then(response => {
        if (response.ok) {
            mostrarNotificacion('Hubo un error al enviar el formulario', 'error');
        } else {
            mostrarNotificacion('Formulario enviado correctamente', 'exito');
        }
    }).catch(error => {
        alert('Error de red: ' + error);
    });
});
