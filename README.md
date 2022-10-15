# Hetzner SDK for JavaScript
![CI](https://github.com/itaibo/hetzner-sdk/actions/workflows/ci.yml/badge.svg)

## Installation
```
npm install hetzner-sdk
```

## Usage
Initialize the SDK with the Hetzner project API token. You can generate one here: https://console.hetzner.cloud/projects/YOUR_PROJECT_ID/security/tokens.

```js
import Hetzner from 'hetzner-sdk';

const hetzner = new Hetzner('HjewiJDD...');
```

Make a request. You will have to `await` all requests.

```js
const servers = await hetzner.servers.list();
```

## Methods
I will be adding new methods. Please open issues of the methods you need and I'll add them.

### Servers
```js
// List all servers in a project
const servers = await hetzner.servers.list();

// Get a server
const serverId = 19920612;
const server = await hetzner.servers.get(serverId);

// Get metrics for a specific server
const metrics = await hetzner.servers.getMetrics(serverId, {
	type: 'cpu',
	start: new Date('2022-10-01'),
	end: new Date('2022-10-15'),
});

// Update a server
const updatedServer = await hetzner.servers.get(serverId, {
	name: 'GoodServer',
	labels: {
		environment: 'production',	
	},
});

// Delete a server
const deletedSever = await hetzner.servers.delete(serverId);
```
