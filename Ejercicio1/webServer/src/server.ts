import express, { Express, Request, Response } from 'express';
import { Pipeline } from '../../src/pipeline/Pipeline';
import { QueueFactory } from '../../src/pipeline/QueueFactory';
import { CustomData } from '../../src/data-structure/CustomData';
import { asistenciaMovilidadFilter } from '../../src/filters/asistenciaMovilidadFilter';
import { convertirJsonACustomData } from '../../src/data-structure/CustomJson';
import { phoneNumberFilter } from '../../src/filters/phoneNumberFilter';
require('dotenv').config();

const app: Express = express();
const port: number = 4000;

app.use(express.json());

app.post('/clients', (req: Request, res: Response) => {

  const cliente = convertirJsonACustomData(req.body);

  const queueFactory = QueueFactory.getQueueFactory<CustomData>;
  const pipeline = new Pipeline<CustomData>([phoneNumberFilter, asistenciaMovilidadFilter], queueFactory);

  pipeline.on('finalOutput', (output: CustomData) => {
    res.status(200).send({ message: `Se ha finalizado satisfactoriamente el proceso de agenda para la persona ${output.nombre} ${output.apellido}.` });
  });

  pipeline.on('errorInFilter', (error, data) => {
    res.status(400).send({ message: `No se ha podido agendar ${data.nombre} ${data.apellido}.` });
  });

    let dataToProcess: CustomData = {
      nombre: cliente.nombre,
      apellido: cliente.apellido,
      cedula: cliente.cedula,
      telefono: cliente.telefono,
      departamento: cliente.departamento,
      necesita_asistencia_movilidad: cliente.necesita_asistencia_movilidad
    }
    pipeline.processInput(dataToProcess);        
});

app.listen(port, () => {
  console.log(`API listening at http://localhost:${port}`);
});

