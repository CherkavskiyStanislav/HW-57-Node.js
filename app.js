import fs from 'fs';
import path from 'path';
import os from 'os';

const users = [
    {name: 'Mike', age: 25},
    {name: 'Bob', age: 32},
    {name: 'Nikola', age: 17},
];

const data = JSON.stringify({users}, null, 2);

const homedir = os.homedir();

const filePath = path.join(homedir, 'data.json');

fs.writeFile(filePath, data, err => {
    if (err) {
        console.error(err);
    } else {
        console.log('Data written to file:', filePath);
    }
});

const newData = [
    {name: 'Anna', age: 24},
    {name: 'Tom', age: 52},
];

async function updateData() {
    try {
        const existingData = await fs.promises.readFile(filePath, 'utf8');
        const parsedData = JSON.parse(existingData);
    
        parsedData.users.push(...newData);
        
        const updatedData = JSON.stringify(parsedData, null, 2);
        await fs.promises.writeFile(filePath, updatedData);
        
        console.log('Data updated successfully:', filePath);
    } catch (err) {
        console.error('Error updating data:', err);
    }
}

updateData();

async function isExist() {
    try {
      await fs.promises.stat(filePath);
      return true;
    } catch (error) {
      if (error.code === 'ENOENT') {
        return false;
      }
      throw error;
    }
}

isExist().then((result) => {
    console.log('File exists:', result);
  }).catch((error) => {
    console.error('Error checking file existence:', error);
  });


