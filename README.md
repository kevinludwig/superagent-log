### superagent-log 

Use any logger implementation to log superagent calls 

### Install

```
npm install --save superagent-log
```

### API 

You provide a logger function that accepts an object of response data. Format and log however you like. The log function 
receives:

```
{
    protocol,
    method,
    href,
    qs,
    elapsed,
    status
}
```

### Usage

```
const request = require('superagent'),
    saLog = require('superagent-log');


function logFn (obj) {
    // or winston, bunyan, or some other logger I haven't heard of
    console.log('%s %s %s?%s (%dms) %s', obj.protocol, obj.method, obj.href, obj.qs, obj.elapsed, obj.status);
}

async function github() {
    const {body} = await request.get('https://github.com').use(saLog(logFn));
    return body;
}
```

### License 

MIT

