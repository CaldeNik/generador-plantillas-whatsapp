const plantillaSelect = document.getElementById('plantilla');
const camposDiv = document.getElementById('campos');
const resultado = document.getElementById('resultado');
const darkToggle = document.getElementById('darkModeToggle');

const plantillas = {
    cupon: {
        nombre: "Cupón de pago",
        campos: ["Nombre", "Compañía", "Vehículo", "Monto"],
        generar: (v) => `Hola ${v[0]}, ¿cómo estás? Te envío el cupón para abonar la próxima cuota de tu seguro.

Compañía: ${v[1]}
Vehículo: ${v[2]}
Monto a abonar: ${v[3]}

Adjunto encontrarás el cupón de pago listo para utilizar.

Si necesitás alguna ayuda o querés revisar tu póliza, estoy acá para lo que necesites.`
    },
    link: {
        nombre: "Link de pago",
        campos: ["Nombre", "Compañía", "Vehículo", "Monto", "Link"],
        generar: (v) => `Hola ${v[0]}, ¿cómo estás? Te comparto el enlace para que puedas abonar la próxima cuota de tu seguro.
Compañía: ${v[1]}
Vehículo: ${v[2]}
Monto a abonar: ${v[3]}

Link de pago: ${v[4]}

Si necesitás ayuda para realizar el pago o querés consultar algo sobre la póliza, estoy a tu disposición.`
    },
    cbu: {
        nombre: "Débito por CBU",
        campos: ["Nombre", "Compañía", "Vehículo", "Monto", "Fecha"],
        generar: (v) => `Hola ${v[0]}, ¿cómo estás? Te comparto la información de tu próximo vencimiento por débito directo.
Compañía: ${v[1]}
Vehículo: ${v[2]}

El monto que se debitará en la próxima cuota es de $${v[3]}.
La fecha estimada de débito es el ${v[4]}.

Cualquier duda o si querés revisar tu póliza, estoy a tu disposición.`
    },
    tarjeta: {
        nombre: "Tarjeta de crédito",
        campos: ["Nombre", "Compañía", "Vehículo", "Monto", "Fecha"],
        generar: (v) => `Hola ${v[0]}, ¿cómo estás? Te escribo para avisarte sobre el vencimiento de la cuota de este mes de tu seguro.
Compañía: ${v[1]}
Vehículo: ${v[2]}

Te recuerdo que esta póliza se abona de manera automática por débito en tarjeta de crédito, por un monto de $${v[3]}, en la fecha estimada ${v[4]}.

Ante cualquier duda o si necesitás revisar tu cobertura, contá conmigo.`
    }
};

// Cargar selector
for (const key in plantillas) {
    const option = document.createElement('option');
    option.value = key;
    option.textContent = plantillas[key].nombre;
    plantillaSelect.appendChild(option);
}

// Mostrar campos dinámicos
plantillaSelect.addEventListener('change', () => {
    const plantilla = plantillas[plantillaSelect.value];
    camposDiv.innerHTML = '';

    if (!plantilla) return;

    plantilla.campos.forEach((campo, i) => {
        camposDiv.innerHTML += `<input placeholder="${campo}" data-index="${i}">`;
    });
});

// Generar mensaje
document.getElementById('generarBtn').addEventListener('click', () => {
    const plantilla = plantillas[plantillaSelect.value];
    if (!plantilla) return;

    const inputs = camposDiv.querySelectorAll('input');
    const valores = [...inputs].map(i => i.value);

    resultado.value = plantilla.generar(valores);
});

// Copiar mensaje
document.getElementById('copiarBtn').addEventListener('click', () => {
    resultado.select();
    document.execCommand('copy');
    alert('Mensaje copiado');
});

// Modo oscuro
darkToggle.addEventListener('change', () => {
    document.body.classList.toggle('dark');
});