
// Sample code
class PortOut {
	constructor(name, port) {
		this.name=name;
		this.port=port;
		this.out(0);	// Initial value
		API.log("PortOut constructor called");
	}

	// Called when an 'out' is executed in Z80.
	out(port, value) {
		if(port == this.port) {
			// Store value internally
			if (this.value != value) {
				this.value = value;
				// Send message to UI
				API.sendToCustomUi({
					command: 'port_written',
					port: port,
					value: value
				});
			}
		}
	}
};


// This in port returns the set value.
class PortIn {
	constructor(name, port) { // REMOVE: name
		this.name = name;
		this.port = port;
		this.value=0xFF;	// Default
	}

	// Sets the value that will be returned.
	setValue(value) {
		this.value = value;
	}

	// Called when an 'out' is executed in Z80.
	// Toggles on each call.
	in(port) {
		if(port != this.port)
			return undefined;
		// Return value
		return this.value;
	}
};

// Instantiate 2 out ports.
this.outPortA = new PortOut('PortA', 0x9000);
this.outPortB = new PortOut('PortB', 0x9001);

// Instantiate 2 in ports.
this.inPortA = new PortIn('PortA', 0x8000);
this.inPortB = new PortIn('PortB', 0x8001);



/**
 * This function is called when time (t-states) advances.
 */
API.tick = () => {
}

/**
 * This function is called when an 'out' is executed in Z80.
 */
API.writePort = (port, value) => {
	// Go through all ports
	this.outPortA.out(port, value);
	this.outPortB.out(port, value);
}

/**
 * This function is called when an 'in' is executed in Z80.
 */
API.readPort = (port) => {
	// Check all ports and return a valid value
	let value = this.inPortA.in(port);
	if(value != undefined)
		return value;
	value = this.inPortB.in(port);
	return value;
}

/**
 * This function is called if new input
 * data is available.
 */
API.receivedFromCustomUi = (msg) => {
	switch(msg.command) {
		case 'generate_interrupt':
			// Generate interrupt
			//API.generateInterrupt(true, 0);	// NMI
			API.generateInterrupt(false, 0);	// Maskable interrupt
		break;
		case 'input_port':
			// Set value for input port
			if(msg.port == 0x8000)
				this.inPortA.setValue(msg.value);
			if(msg.port == 0x8001)
				this.inPortB.setValue(msg.value);
		break;
	}
}
