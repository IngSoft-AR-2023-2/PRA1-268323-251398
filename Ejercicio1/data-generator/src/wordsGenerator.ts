import axios from 'axios';
//import faker from 'faker';

const faker = require('faker');


const sendData = async () => {
    try {
      const randomWords = Array.from({ length: 10}, () => faker.random.word());
      const response = await axios.post('http://localhost:3000/clients', randomWords);
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
  
  sendData();