function sendJson(res, status, content) {
    res.status(status);
    res.json(content);
}

function serverError(res, err) {
    res.status(500);
    res.json(err);
}

module.exports = {
    json : sendJson,
    serverError: serverError
};