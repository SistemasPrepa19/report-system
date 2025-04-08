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
    var solucion = document.getElementById("solucion").value;

    // Enviar los datos al backend (Google Apps Script) usando fetch
    fetch('https://script.google.com/macros/s/AKfycbxd_HfBXU6VgmADgbOTGaa45yFS8vQhEmGLKbVWMEwurVTRfumY9VRBtKw-8ovnC3Gh/exec', {
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
            problema: problema,
            solucion: solucion
        })
    }).then(response => {
        if (response.ok) {
            mostrarNotificacion('Hubo un error al enviar el formulario', 'error');
        } else {
            mostrarNotificacion('Formulario enviado correctamente', 'exito');
            console.log(usuario+'...'+solucion);
        }
    }).catch(error => {
        alert('Error de red: ' + error);
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const botonSoporte = document.getElementById('abrirSoporte');
    const inputSolucion = document.getElementById('solution');
  
    botonSoporte.addEventListener('click', function () {
      inputSolucion.style.display = 'block';
    });
  });

  








  document.addEventListener("DOMContentLoaded", function () {
    // Selects de edificio/aula
    const edificioSelect = document.getElementById("edificio");
    const aulaSelect = document.getElementById("aula");
    const optgroupsAulaOriginales = Array.from(aulaSelect.querySelectorAll("optgroup"));

    edificioSelect.addEventListener("change", function () {
      const seleccionado = this.value;
      aulaSelect.innerHTML = '<option value="" disabled selected>Aula / Lab</option>';

      const especiales = ["Biblioteca", "Coordinación", "Dirección"];
      if (especiales.includes(seleccionado)) {
        const opt = document.createElement("option");
        opt.value = seleccionado;
        opt.textContent = seleccionado;
        aulaSelect.appendChild(opt);
        return;
      }

      const grupoCoincidente = optgroupsAulaOriginales.find(group => group.label === seleccionado);
      if (grupoCoincidente) {
        aulaSelect.appendChild(grupoCoincidente.cloneNode(true));
      }
    });

    // Selects de categoría/problema
    const categoriaSelect = document.getElementById("categoria");
    const problemaSelect = document.getElementById("problema");
    const optgroupsProblemaOriginales = Array.from(problemaSelect.querySelectorAll("optgroup"));

    categoriaSelect.addEventListener("change", function () {
      const seleccionado = this.value;
      problemaSelect.innerHTML = '<option value="" disabled selected>Problema</option>';

      // Mapeo para traducir valor del select a label del optgroup
      const categoriaToLabel = {
        "Hardware": "Físico",
        "Software": "Aplicación",
        "Redes": "Internet", // Internet también está bajo Físico (Ethernet)
        "Otros": "Otros"
      };

      const label = categoriaToLabel[seleccionado];
      const grupoCoincidente = optgroupsProblemaOriginales.find(group => group.label === label);
      if (grupoCoincidente) {
        problemaSelect.appendChild(grupoCoincidente.cloneNode(true));
      }
    });
  });