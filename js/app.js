const plantillaSelect = document.getElementById('plantilla');
const camposDiv = document.getElementById('campos');
const darkToggle = document.getElementById('darkModeToggle');

const plantillas = {
    cupon: {
        nombre: "Cupón de pago",
        metaTemplate: "recordatorio_cupon_de_pago",
        campos: ["Nombre", "Compañía", "Vehículo", "Monto"]
    },
    link: {
        nombre: "Link de pago",
        metaTemplate: "recordatorio_link_de_pago",
        campos: ["Nombre", "Compañía", "Vehículo", "Monto", "Link"]
    },
    cbu: {
        nombre: "Débito por CBU",
        metaTemplate: "recordatorio_debito_cbu",
        campos: ["Nombre", "Compañía", "Vehículo", "Monto", "Fecha"]
    },
    tarjeta: {
        nombre: "Tarjeta de crédito",
        metaTemplate: "recordatorio_tarjeta_credito",
        campos: ["Nombre", "Compañía", "Vehículo", "Monto", "Fecha"]
    }
};

// cargar selector
for (const key in plantillas) {
    const option = document.createElement('option');
    option.value = key;
    option.textContent = plantillas[key].nombre;
    plantillaSelect.appendChild(option);
}

// generar inputs dinámicos
plantillaSelect.addEventListener('change', () => {
    const plantilla = plantillas[plantillaSelect.value];
    camposDiv.innerHTML = '';

    plantilla.campos.forEach((campo, i) => {
        camposDiv.innerHTML += `<input placeholder="${campo}" data-index="${i}">`;
    });
});

// enviar mensaje
document.getElementById('enviarBtn').addEventListener('click', async () => {

    const telefono = document.getElementById('telefono').value;

    const inputs = camposDiv.querySelectorAll('input');
    const valores = [...inputs].map(i => i.value);

    const plantillaSeleccionada = plantillas[plantillaSelect.value];

    const res = await fetch("http://localhost:3000/enviar-mensaje", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            telefono: telefono,
            template: plantillaSeleccionada.metaTemplate,
            variables: valores
        })
    });

    const data = await res.json();

    if (data.success) {
        alert("Mensaje enviado correctamente");
    } else {
        alert("Error al enviar mensaje");
        console.error(data);
    }

});

// 🌙 modo oscuro
darkToggle.addEventListener('change', () => {
    document.body.classList.toggle('dark');
});