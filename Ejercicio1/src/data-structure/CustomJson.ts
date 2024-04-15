import { CustomData } from './CustomData';

export function convertirJsonACustomData(json: string): CustomData[] {
    const datos = JSON.parse(json);
    
    if (!Array.isArray(datos)) {
        throw new Error('El JSON no es un array válido de objetos CustomData.');
    }

    const customDataArray: CustomData[] = [];

    for (const dato of datos) {
        const customDataObj = new CustomData();
        customDataObj.nombre = dato.nombre || '';
        customDataObj.apellido = dato.apellido || '';
        customDataObj.cedula = dato.cedula || '';
        customDataObj.telefono = dato.telefono || '';
        customDataObj.departamento = dato.departamento || '';
        customDataObj.necesita_asistencia_movilidad = dato.necesita_asistencia_movilidad || false;

        customDataArray.push(customDataObj);
    }

    return customDataArray;
}
