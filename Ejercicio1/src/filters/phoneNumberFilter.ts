import { CustomData } from '../data-structure/CustomData';

// Reemplaza cada espacio en el input por un punto.
export const phoneNumberFilter = (input: CustomData): CustomData => {
    let result = input.telefono.replace(/\s+/g, '');;  // Reemplaza cada espacio (' ') por un vacio ('').
    //let result = input.telefono.trim();
    if(result.length == 9){
        try {
            const telefono = Number.parseInt(result);
            if (telefono < 90000000 || telefono >= 100000000)
                throw new Error("Numero de telefono no valido."); 
        }
        catch {
            throw new Error("Numero de telefono no valido.");
        }
    }
    else throw new Error("Numero de telefono no valido.");

    console.log(`Filtro phoneNumberFilter, output ${result} }`);
    return input;
};

/*export const phoneNumberFilter = (input: CustomData): CustomData => {
    // Obtener el teléfono del objeto CustomData
    const telefono = input.telefono;

    // Eliminar espacios en blanco del teléfono
    const telefonoSinEspacios = telefono.replace(/\s+/g, '');

    // Verificar si la longitud del teléfono sin espacios es de 9 caracteres
    const tiene9Caracteres = telefonoSinEspacios.length === 9;

    // Verificar si el teléfono comienza con "09"
    const comienzaCon09 = telefonoSinEspacios.startsWith('09');

    // Si el teléfono cumple con ambas condiciones, retornar el objeto CustomData
    if (tiene9Caracteres && comienzaCon09) {
        return input;
    } else {
        throw new Error("Numero de telefono no valido.");
    }
};*/