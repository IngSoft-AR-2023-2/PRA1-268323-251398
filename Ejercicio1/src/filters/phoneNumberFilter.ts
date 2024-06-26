import { CustomData } from '../data-structure/CustomData';

export const phoneNumberFilter = (input: CustomData): CustomData => {
    let result = input.telefono.replace(/ /g, '');  // Reemplaza cada espacio (' ') por un vacio ('').
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