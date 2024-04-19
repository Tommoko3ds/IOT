const mqtt = require('mqtt')
const SerialPort = require('serialport').SerialPort;
const { DelimiterParser } = require('@serialport/parser-delimiter');

const puerto = new SerialPort(
    {
        path: 'COM4',
        baudRate: 9600
    });

const parser = puerto.pipe(new DelimiterParser({ delimiter: '\n' }))

const pub = mqtt.connect('mqtt://localhost:9000')


pub.on('connect', () => {
    parser.on('data', (data) => {
        pub.publish('topic test', data)
    })
});