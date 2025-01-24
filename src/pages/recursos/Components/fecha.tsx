import React from "react";

// Función para formatear la fecha
export function fecha(fecha, formato) {
    const padZero = (n) => (n < 10 ? "0" : "") + n;

    const map = {
        dd: padZero(fecha.getDate()),
        mm: padZero(fecha.getMonth() + 1), // Los meses van de 0 a 11
        yy: fecha.getFullYear().toString().slice(-2),
        yyyy: fecha.getFullYear(),
    };

    return formato.replace(/dd|mm|yy|yy/gi, (matched) => map[matched]);
}

// Componente React para mostrar la fecha actual
export default function Dias() {
    const hoy = new Date();
    const fechaFormateada = fecha(hoy, "dd/mm/yyyy"); // Puedes cambiar el formato aquí si es necesario
    return <span>{fechaFormateada}</span>;
}
