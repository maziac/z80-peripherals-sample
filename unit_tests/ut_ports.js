/**
 * A map with the port values for ports 0x8000 and 0x8001.
 */
const utPorts = new Map([
	['Ports.UT_port_add_1', {port8000: 0, port8001: 0}],
	['Ports.UT_port_add_2', {port8000: 0, port8001: 3}],
	['Ports.UT_port_add_3', {port8000: 2, port8001: 3}],
	['Ports.UT_port_add_4', {port8000: 4, port8001: 0}]
]);


/**
 * This function is called when an 'in' is executed in Z80.
 */
API.readPort = (port) => {
	const ports = utPorts.get(API.unitTestLabel);
	if (ports) {
		if (port == 0x8000)
			return ports.port8000
		if (port == 0x8001)
			return ports.port8001;
	}
	return undefined;
}
