document.getElementById('connectButton').addEventListener('click', async () => {
  console.log("heelo");
  const status = document.getElementById('status');
  const dataInput = document.getElementById('dataInput');
  status.textContent = 'Requesting Bluetooth Device...';

  try {
    // Request the Arduino device with the matching service UUID
    const device = await navigator.bluetooth.requestDevice({
      filters: [{ services: ['12345678-1234-1234-1234-123456789abc'] }]
    });

    status.textContent = 'Connecting to GATT Server...';
    const server = await device.gatt.connect();

    status.textContent = 'Getting Service...';
    const service = await server.getPrimaryService('12345678-1234-1234-1234-123456789abc');

    status.textContent = 'Getting Characteristic...';
    const characteristic = await service.getCharacteristic('87654321-4321-4321-4321-abcdef654321');

    // Use the input value or default to "Hello, Arduino!"
    const dataToSend = dataInput.value || 'Hello, Arduino!';
    const encoder = new TextEncoder();
    await characteristic.writeValue(encoder.encode(dataToSend));

    status.textContent = `Data sent: ${dataToSend}`;
  } catch (error) {
    status.textContent = `Error: ${error}`;
  }
});