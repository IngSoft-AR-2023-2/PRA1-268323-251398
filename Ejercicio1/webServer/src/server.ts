import express, { Express, Request, Response } from 'express';
import { Pipeline } from '../../src/pipeline/Pipeline';
import { QueueFactory } from '../../src/pipeline/QueueFactory';
import { CustomData } from '../../src/data-structure/CustomData';
import { asistenciaMovilidadFilter } from '../../src/filters/asistenciaMovilidadFilter';
import { convertirJsonACustomData } from '../../src/data-structure/CustomJson';
import { phoneNumberFilter } from '../../src/filters/phoneNumberFilter';
import fs from 'fs';  // Importar fs para trabajar con el sistema de archivos.
require('dotenv').config();

const app: Express = express();
const port: number = 3000;

app.use(express.json());

app.post('/clients', (req: Request, res: Response) => {
  //console.log('Received data:', req.body);

  const clientes = convertirJsonACustomData(req.body);
  const queueFactory = QueueFactory.getQueueFactory<CustomData>;

  const pipeline = new Pipeline<CustomData>([phoneNumberFilter, asistenciaMovilidadFilter], queueFactory);

  let result: { status: number, message: string } = { status: 500, message: "Error del servidor" };

  pipeline.on('finalOutput', (output) => {
    const outputMessage = `Salida final: ${output.data}\n`;
    res.status(200).send({ message: `Salida final: ${output.data}` });
  });

  pipeline.on('errorInFilter', (error, data) => {
    res.status(400).send({ message: `Error en el filtro: ${error}, Datos: ${data.data}` });
  });

  for (const client of clientes) {
    let dataToProcess: CustomData = client
    pipeline.processInput(dataToProcess);        
  }
});

app.listen(port, () => {
  console.log(`API listening at http://localhost:${port}`);
});

