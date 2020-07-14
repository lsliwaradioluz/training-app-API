const EventEmitter = require('events')

class Logger extends EventEmitter {
  log() {
    this.emit('message', 'Hello from log method!')
  }
}

module.exports = Logger