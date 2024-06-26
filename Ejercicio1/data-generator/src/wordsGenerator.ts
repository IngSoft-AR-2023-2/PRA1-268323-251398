import axios from 'axios';
import {array} from './datosEntrada';
//import faker from 'faker';

const faker = require('faker');


const sendData = async (persona: object) => {
    try {
      const response = await axios.post('http://localhost:4000/clients', persona, {
        headers: {
            'Content-Type': 'application/json'
        }});
      console.error('Status:', response.status);
      console.log('Data sent successfully:', response.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          // La solicitud se realizó y el servidor respondió con un código de estado
          // que cae fuera del rango de 2xx
          console.error('Error response status:', error.response.status);
          console.error('Error response data:', error.response.data);
        } else if (error.request) {
          // La solicitud se hizo pero no se recibió respuesta
          console.error('Error request:', error.request);
        } else {
          // Algo más causó el error
          console.error('Error message:', error.message);
        }
      } else {
        // Error no relacionado con Axios
        console.error('Error:', error);
      }
    }
  };
  
  array.forEach(element => sendData(element));
  