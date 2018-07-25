var config = {};

config.connection_string = "Your Azure IoT Hub Connection String";
config.send_value_array = [
    {"property1":"value1","property2":"value1"},
    {"property1":"value2","property2":"value2"}
];

module.exports = config;