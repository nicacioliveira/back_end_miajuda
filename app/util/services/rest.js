function sendJson(res, status, content) {
    res.status(status);
    res.json(content);
}

function ok(res, content) {
    res.status(200);
    res.json(content);
}

function serverError(res, err) {
    res.status(500);
    res.json(err);
}

function somethingWentWrong(res, err) {
    res.status(500);
    res.json({err: err, log: 'Algo deu errado!'});
}

function wrongPassword(res, err) {
    res.status(401);
    res.json({err: err, log: 'Senha incorreta!'});
}

function unregisteredUser(res, err) {
    res.status(401);
    res.json({err: err, log: 'Usuário não registrado!'});
}

function nameIsRequired(res, err) {
    res.status(401);
    res.json({err: err, log: 'Nome não pode ser vazio!'});
}

function idIsRequired(res, err) {
    res.status(401);
    res.json({err: err, log: 'id não pode ser vazio!'});
}

function emailIsRequired(res, err) {
    res.status(401);
    res.json({err: err, log: 'Email não pode ser vazio!'});
}

function passwordIsRequired(res, err) {
    res.status(401);
    res.json({err: err, log: 'Senha não pode ser vazia!'});
}

function roleIsRequired(res, err) {
    res.status(401);
    res.json({err: err, log: 'Tipo de usuário não pode ser vazio!'});
}

function userNotFound(res, err) {
    res.status(404);
    res.json({err: err, log: 'Usuário não encontrado!'});
}


function classNotFound(res, err) {
    res.status(404);
    res.json({err: err, log: 'Turma não encontrada!'});
}

function authenticationRequired(res, err) {
    res.status(401);
    res.json({err: err, log: 'Autenticação requerida!'});
}

function userAlreadyExists(res, err) {
    res.status(401);
    res.json({err: err, log: 'Usuário já cadastrado!'});
}

function classCodeisEmpty(res, err) {
    res.status(401);
    res.json({err: err, log: 'Código da turma vazio!'});
}

function invalidClasscode(res, err) {
    res.status(401);
    res.json({err: err, log: 'Código da turma inválido!'});
}

function alreadyEnrolledInTheClass(res) {
    res.status(200);
    res.json('Já matriculado nessa turma!');
}

function isNotA(res, err, msg) {
    res.status(401);
    res.json({err: err, log: 'Não é um ' + msg});
}

function classAlreadyExists(res) {
    res.status(200);
    res.json('Turma já cadastrada!');
}

function notAuthorized(res, err) {
    res.status(401);
    res.json({err: err, log: 'você não possui altorização para esta função!'});
}

module.exports = {
    ok: ok,
    json: sendJson,
    serverError: serverError,
    somethingWentWrong: somethingWentWrong,
    wrongPassword: wrongPassword,
    unregisteredUser: unregisteredUser,
    nameIsRequired: nameIsRequired,
    emailIsRequired: emailIsRequired,
    passwordIsRequired: passwordIsRequired,
    roleIsRequired: roleIsRequired,
    userNotFound: userNotFound,
    authenticationRequired: authenticationRequired,
    userAlreadyExists: userAlreadyExists,
    classCodeisEmpty: classCodeisEmpty,
    invalidClasscode: invalidClasscode,
    alreadyEnrolledInTheClass: alreadyEnrolledInTheClass,
    isNotA: isNotA,
    classAlreadyExists: classAlreadyExists,
    notAuthorized: notAuthorized,
    idIsRequired: idIsRequired,
    classNotFound: classNotFound
};