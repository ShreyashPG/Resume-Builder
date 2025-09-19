const amqp = require('amqplib/callback_api');

class MessageQueue {
    constructor() {
        this.connection = null;
        this.channel = null;
        this.connected = false;
    }

    connect() {
        return new Promise((resolve, reject) => {
            amqp.connect('amqp://admin:password123@localhost:5672', (error0, connection) => {
                if (error0) {
                    console.error('Failed to connect to RabbitMQ:', error0);
                    return reject(error0);
                }

                this.connection = connection;
                
                connection.createChannel((error1, channel) => {
                    if (error1) {
                        console.error('Failed to create channel:', error1);
                        return reject(error1);
                    }

                    this.channel = channel;
                    this.connected = true;
                    
                    // Declare queues
                    this.channel.assertQueue('pdf_generation_queue', {
                        durable: true
                    });
                    
                    this.channel.assertQueue('pdf_response_queue', {
                        durable: true
                    });

                    console.log('Connected to RabbitMQ successfully');
                    resolve();
                });
            });
        });
    }

    sendToPDFQueue(data) {
        if (!this.connected) {
            throw new Error('Not connected to RabbitMQ');
        }

        const message = JSON.stringify(data);
        
        this.channel.sendToQueue('pdf_generation_queue', Buffer.from(message), {
            persistent: true,
            messageId: data.requestId
        });

        console.log('Message sent to PDF queue:', data.requestId);
    }

    consumePDFResponses(callback) {
        if (!this.connected) {
            throw new Error('Not connected to RabbitMQ');
        }

        this.channel.consume('pdf_response_queue', (msg) => {
            if (msg !== null) {
                const data = JSON.parse(msg.content.toString());
                callback(data);
                this.channel.ack(msg);
            }
        });
    }

    close() {
        if (this.connection) {
            this.connection.close();
        }
    }
}

module.exports = new MessageQueue();
