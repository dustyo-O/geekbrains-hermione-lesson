var TEST_MODE = false;
var PRODUCTION_MODE = true;
var STUB_PREFIX = 'tests/data-stubs/';

// url - login/user-create
// data = { id: 5, title: 'new' } {login: 'log'}
function router(url, data, mode) {
    var urlTail;

    if (mode === PRODUCTION_MODE) {
        url = url + '.php';
    } else {
        for(var field in data) {
            if (data.hasOwnProperty(field)) {
                if (urlTail) {
                    urlTail = urlTail + '_';
                } else {
                    urlTail = '';
                }
                urlTail = urlTail + field + '-' + data[field];
            }
        }

        if (urlTail) {
            url = url + '-' + urlTail;
        }

        url = STUB_PREFIX + url + '.json';
    }

    return url;
}
