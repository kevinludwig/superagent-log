const url = require('url'),
      querystring = require('querystring');

module.exports = (logfn) => {
    return (req) => {
        const start = new Date().getTime();
        const uri = url.parse(req.url);
        const method = req.method;

        req.on('response', (res) => {
            const end = new Date().getTime();
            const elapsed = end - start;
            logfn({
                protocol: uri.protocol.replace(/[^\w]/g, '').toUpperCase(),
                method: method.toUpperCase(), 
                href: uri.href, 
                qs: req.qs && querystring.encode(req.qs), 
                status: res.status, 
                elapsed
            });
        });
    };
};
