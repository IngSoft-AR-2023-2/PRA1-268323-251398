import { CustomData } from '../data-structure/CustomData';

// Reemplaza cada espacio en el input por un punto.
export const replaceSpacesWithDotsFilter = (input: CustomData): CustomData => {
    let result = input.data.replace(/ /g, '.');  // Reemplaza cada espacio (' ') por un punto ('.').
    console.log(`Filtro replaceSpacesWithDots,  input${JSON.stringify(input)}, output ${result} }`)
    return {data: result}
};