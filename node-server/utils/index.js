const os = require('os');

function getIpAddress () {
  const interfaces = os.networkInterfaces();

  for (let iface of Object.values(interfaces)) {
    for (let v of iface) {
      if (v.family === 'IPv4' && v.address !== '127.0.0.1' && !v.internal) {
        return v.address;
      }
    }
  }
}

module.exports = {
  getIpAddress
};