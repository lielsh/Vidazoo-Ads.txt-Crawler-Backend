const axios = require('axios');
const { performance } = require('perf_hooks');

exports.getDomains = async (domain) => {

    const domainsObj = {};
    let domainsSorted = [];
    let erros = 0;
    const results = { "domain": domain };
    const time = performance.now();

    await axios({
        method: "GET",
        url: `http://www.${domain}/ads.txt`
    })
    .then(res => {
        results['executionTime'] = parseInt(performance.now() - time);
        res.data.split('\n').forEach(line => {
            line = line.split(',');
            if (line.length >= 3) {
                const domain = line[0].toLowerCase();
                if (domainsObj[domain]) {
                    domainsObj[domain] = ++domainsObj[domain];
                }
                else {
                    domainsObj[domain] = 1;
                }
            }
        });
        domainsSorted = Object.entries(domainsObj).sort((a,b) => (a[1] < b[1]) ? 1 : ((b[1] < a[1]) ? -1 : 0));
    })
    .catch(err => {
        results['executionTime'] = parseInt(performance.now() - time);
        ++erros;
        console.log(err);
    });
    
    results['parseErrors'] = erros;
    results['results'] = domainsSorted;

    return results;
}