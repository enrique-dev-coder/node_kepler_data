import { parse } from 'csv-parse';
import fs from 'fs';
import { isHabitablePlanet } from './utils.js';

const habitablePlanets = [];

// el on es para indicar un evento a node
// node tiene un chingo de eventos al parecer  con frameworks como express ya no  es necesario usar estop dle on
// la idea del pipe function es conectar streams  en este caso parse( ) viene como stream

fs.createReadStream('kepler_data.csv')
  .pipe(
    parse({
      comment: '#',
      columns: true,
    })
  )
  .on('data', (data) => {
    if (isHabitablePlanet(data)) {
      habitablePlanets.push(data);
    }
  })
  .on('error', (err) => {
    console.log(err);
  })
  .on('end', () => {
    console.log(habitablePlanets.map((item) => item['kepler_name']));
    console.log(`${habitablePlanets.length} found!`);
    console.log('done');
  });
