'use strict';

var clientFromConnectionString = require('azure-iot-device-mqtt').clientFromConnectionString;
var Message = require('azure-iot-device').Message;
var config = require('./config')

var client = clientFromConnectionString(config.connection_string);
var dataToSend = config.send_value_array;
var dataToSendIndex = 0;

function printResultFor(op) {
  return function printResult(err, res) {
    if (err) console.log(op + ' error: ' + err.toString());
    if (res) console.log(op + ' status: ' + res.constructor.name);
  };
}

function sendData() {
  var nextValue = dataToSend[dataToSendIndex];
  dataToSendIndex++;

  if(dataToSendIndex >= dataToSend.length){
    dataToSendIndex = 0;
  }

  console.log('Data from array: ' + nextValue);
  var data = JSON.stringify(nextValue);
  var message = new Message(data);
  console.log("Sending message: " + message.getData());
  client.sendEvent(message, printResultFor('send'));
}

var connectCallback = function (err) {
    if (err) {
      console.log('Could not connect: ' + err);
    } else {
      console.log('Client connected');
  
      // Create a message and send it to the IoT Hub every 10 seconds
      setInterval(function(){
          sendData(); 
      }, config.send_interval_ms);
    }
};

console.log("Trying to connect with connectionstring: " + config.connection_string)
client.open(connectCallback);