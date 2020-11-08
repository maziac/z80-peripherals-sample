
// Sample code
class PortOut {
	constructor(name, port) {
		this.name=name;
		this.port=port;
		this.value=0xFF;
		API.log("PortOut constructor called");
	}

	// Called when an 'out' is executed in Z80.
	out(port, value) {
		if(port == this.port) {
			// Store value internally
			this.value=value;
			// Send message to UI
			API.sendMessage({
				command: 'my_'+this.name,
				value: value
			});
		}
	}
};


// This in port returns t-states (for testing purposes).
class PortInTime {
	constructor(name, port) {
		this.name=name;
		this.port=port;
	}

	// Called when an 'out' is executed in Z80.
	// The returned value depends on time.
	in(port) {
		if(port != this.port)
			return undefined;
		// Return value
		// Does not make sense. Is just for testing:
		return API.tstates;
	}
};

// This in port returns the set value.
class PortIn extends PortInTime {
	constructor(name, port) {
		super(name, port);
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
this.outPortA = new PortOut('PortA', 0x8000);
this.outPortB = new PortOut('PortB', 0x8001);

// Instantiate 2 in ports.
this.inPortA = new PortIn('PortA', 0x9000);
this.inPortA.setValue(90);
this.inPortB = new PortInTime('PortB', 0x9001);


var instrCount = 0;
/**
 * This function is called when time (t-states) advances.
 */
API.tick = () => {
	this.inPortA.setValue(2 * API.tstates);
	// Generate interrupt after 50 t-states
	instrCount++;
	if (instrCount % 5 == 0) {
		//API.generateInterrupt(true, 0);	// NMI
		API.generateInterrupt(false, 0);	// Maskable interrupt
	}
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
API.receivedMessage = (msg) => {
	// Check if joy data
	switch(msg.command) {
		case 'joy0':
			this.inPortA.setValue(msg.data);
		break;
		case 'joy1':
			this.inPortB.setValue(msg.data);
		break;
	}
}
