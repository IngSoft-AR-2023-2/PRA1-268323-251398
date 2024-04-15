import { CustomData } from '../data-structure/CustomData';

export const asistenciaMovilidadFilter = (input: CustomData): CustomData => {
    if (input.necesita_asistencia_movilidad) {
        console.log(`La persona ${input.nombre} ${input.apellido} necesita asistencia en movilidad`);
    }
    else {
        console.log(`La persona ${input.nombre} ${input.apellido} será agendado en el proceso común`);
    }
    return input;
};
