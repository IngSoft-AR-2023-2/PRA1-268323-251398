import express, { Express, Request, Response } from 'express';
import { Pipeline } from '../../src/pipeline/Pipeline';
import { QueueFactory } from '../../src/pipeline/QueueFactory';
import { CustomData } from '../../src/data-structure/CustomData';
import { randomErrorFilter } from '../../src/filters/randomErrorFilter';
import { replaceSpacesWithDotsFilter } from '../../src/filters/replaceSpacesWithDotsFilter';
import { toLowercaseWithSpacesFilter } from '../../src/filters/toLowercaseWithSpacesFilter';
import { toUppercaseFilter } from '../../src/filters/toUppercaseFilter';
import fs from 'fs';  // Importar fs para trabajar con el sistema de archivos.
require('dotenv').config();

const app: Express = express();
const port: number = 3000;

app.use(express.json());

app.post('/words', (req: Request, res: Response) => {
  console.log('Received data:', req.body);
  const queueFactory = QueueFactory.getQueueFactory<CustomData>;

  const pipeline = new Pipeline<CustomData>([randomErrorFilter, replaceSpacesWithDotsFilter, toLowercaseWithSpacesFilter, toUppercaseFilter], queueFactory);

  let result: { status: number, message: string } = { status: 500, message: "Error del servidor" };

  //se crea el listener para cuando un job termina
  pipeline.on('finalOutput', (output) => {
    const outputMessage = `Salida final: ${output.data}\n`;
    fs.appendFileSync('output.txt', outputMessage);  // Guarda cada salida en el archivo 'output.txt'
    res.status(200).send({ message: `Salida final: ${output.data}` });
    //result = { status: 200, message: `Salida final: ${output.data}` };
  });

  //se crea el listener para cuando un job da error
  pipeline.on('errorInFilter', (error, data) => {
    res.status(400).send({ message: `Error en el filtro: ${error}, Datos: ${data.data}` });
    //result = { status: 400, message: `Error en el filtro: ${error}, Datos: ${data.data}` };
  });

  for (const word of req.body) {
    let dataToProcess: CustomData = {data: word}
    pipeline.processInput(dataToProcess);        
  }
  //res.status(result.status).send({ message: result.message });
});

app.listen(port, () => {
  console.log(`API listening at http://localhost:${port}`);
});

