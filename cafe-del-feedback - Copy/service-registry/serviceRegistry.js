const express = require('express');
const axios = require('axios');
const app = express();
app.use(express.json());

const services = {};  // Store services by name: { serviceName: { host, port, endpoint } }

// Register service endpoint
app.post('/register', (req, res) => {
  const { name, host, port, endpoint } = req.body;

  // Check if service data is valid
  if (!name || !host || !port || !endpoint) {
    return res.status(400).send('Missing service details');
  }

  // Log the incoming request data for debugging
  console.log('Registering service:', req.body);

  // Store the service in the registry
  services[name] = { host, port, endpoint };

  // Log the registered services
  console.log('Registered services:', services);

  // Respond with a success message
  res.status(200).send(`${name} service registered`);
});

// Get the list of all registered services
app.get('/services', (req, res) => {
  res.json(services);
});

// Check the status of a specific service
app.get('/service/:name', async (req, res) => {
  const service = services[req.params.name];
  if (!service) {
    return res.status(404).send('Service not found in registry');
  }

  try {
    // Construct the URL to ping the service
    const url = `http://${service.host}:${service.port}${service.endpoint}`;

    // Check if the service is up by making a GET request to the service's endpoint
    await axios.get(url);
    res.send(`Service ${req.params.name} is UP at ${url}`);
  } catch (error) {
    res.status(503).send(`Service ${req.params.name} is DOWN`);
  }
});

// Deregister a service by name
app.delete('/deregister/:name', (req, res) => {
  const serviceName = req.params.name;
  if (services[serviceName]) {
    delete services[serviceName];
    res.send(`${serviceName} service deregistered`);
  } else {
    res.status(404).send('Service not found');
  }
});

// Start the server
app.listen(3000, () => {
  console.log('Service Registry running at http://localhost:3000');
});