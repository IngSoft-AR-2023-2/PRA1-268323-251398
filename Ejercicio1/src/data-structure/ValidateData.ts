import { CustomData } from './CustomData';

export function isDataCorrect(data: CustomData): boolean {
    if (data == null) {
        return false;
    }

    if (!data.nombre || data.nombre.trim().length <= 1) {
        return false;
    }

    if (!data.apellido || data.apellido.trim().length <= 1) {
        return false;
    }

    if (!data.cedula || data.cedula.trim().length <= 1) {
        return false;
    }

    if (!data.telefono || data.telefono.trim().length <= 9) {
        return false;
    }

    if (!data.departamento || data.departamento.trim().length <= 1) {
        return false;
    }

    if (typeof data.necesita_asistencia_movilidad !== 'boolean') {
        return false;
    }

    return true;
}
