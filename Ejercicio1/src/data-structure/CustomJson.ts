import { CustomData } from './CustomData';

interface ICustomDataInput {
    nombre?: string;
    apellido?: string;
    cedula?: string;
    telefono?: string;
    departamento?: string;
    necesita_asistencia_movilidad?: boolean;
}

// Asegúrate de que el parámetro 'dato' cumpla con la interfaz definida.
export function convertirJsonACustomData(dato: ICustomDataInput): CustomData {
    const customDataObj = new CustomData();
    customDataObj.nombre = dato.nombre || '';
    customDataObj.apellido = dato.apellido || '';
    customDataObj.cedula = dato.cedula || '';
    customDataObj.telefono = dato.telefono || '';
    customDataObj.departamento = dato.departamento || '';
    customDataObj.necesita_asistencia_movilidad = dato.necesita_asistencia_movilidad !== undefined ? dato.necesita_asistencia_movilidad : false;

    return customDataObj;
}