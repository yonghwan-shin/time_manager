async function connectAndSend() {
  try {
    const status = document.getElementById('status');
    status.textContent = 'Requesting Bluetooth Device...';

    // Request a BLE device with the matching service UUID
    const device = await navigator.bluetooth.requestDevice({
      filters: [{ services: ['19b10000-e8f2-537e-4f6c-d104768a1214'] }]
    });

    status.textContent = 'Connecting to GATT Server...';
    const server = await device.gatt.connect();

    status.textContent = 'Getting Service...';
    const service = await server.getPrimaryService('19b10000-e8f2-537e-4f6c-d104768a1214');

    status.textContent = 'Getting Characteristic...';
    const characteristic = await service.getCharacteristic('19b10001-e8f2-537e-4f6c-d104768a1214');

    // Get the data from the input field
    const dataToSend = document.getElementById('dataInput').value;

    // Send the data to the Arduino
    await characteristic.writeValue(new TextEncoder().encode(dataToSend));
    status.textContent = `Data sent: ${dataToSend}`;
  } catch (error) {
    status.textContent = `Error: ${error}`;
  }
}