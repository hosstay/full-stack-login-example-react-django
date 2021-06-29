const bcrypt = require('bcryptjs');
const security = require('../security/security');
const util = require('../utility/utility');

const DEFAULT_ERROR_MESSAGE = 'Something went wrong';

// creates hash seed
const salt = bcrypt.genSaltSync(5);

async function createUser(req, res) {
  try {
    const cleanUsername = security.sanitize(req.body.username, 'username', 6, 32);
    const cleanPassword = security.sanitize(req.body.password, 'password', 8, 18);

    const hashedPassword = bcrypt.hashSync(cleanPassword, salt);

    const users = await db.getCollection('users');
    const cursor = await users.find({username: cleanUsername});

    if (await cursor.count() > 0) throw new Error('Username already exists.');
  
    await users.insert({username: cleanUsername, password: hashedPassword});

    db.close();

    return res.status(200).json(security.encrypt({success: true, result: {success: true}}));
  } catch (err) {
    util.errorHandler({err: err, context: 'createUser', isLast: true});
    const errorMessage = err.message === 'Username already exists.' ? err.message : DEFAULT_ERROR_MESSAGE;
    return res.status(200).json(security.encrypt({success: true, result: {success: false, msg: errorMessage}}));
  }
}

async function login(req, res) {
  try {
    const cleanUsername = security.sanitize(req.body.username, 'username', 6, 32);
    const cleanPassword = security.sanitize(req.body.password, 'password', 8, 18);

    const submittedPassword = cleanPassword;

    const users = await db.getCollection('users');
    const cursor = await users.find({username: cleanUsername});

    if (await cursor.count() === 0) throw new Error('Incorrect username or password.');

    const userData = await cursor.next();
    db.close();

    const isVerified = bcrypt.compareSync(submittedPassword, userData.password);
    if (!isVerified) throw new Error('Incorrect username or password.');

    // User authenticated... give them a token cookie
    const payload = {
      'id:': userData.id
    };
    const sessionToken = await security.generateJsonToken(payload);
    res.cookie('SESSIONID', sessionToken, {expires: new Date(Date.now() + 900000)}); // , httpOnly:true, secure:true});
    
    return res.status(200).json(security.encrypt({success: true, result: {success: true}}));
  } catch (err) {
    util.errorHandler({err: err, context: 'login', isLast: true});
    const errorMessage = err.message === 'Incorrect username or password.' ? err.message : DEFAULT_ERROR_MESSAGE;
    return res.status(200).json(security.encrypt({success: true, result: {success: false, msg: errorMessage}}));
    
  }
}

function logout(req, res) {
  if (req.cookies['SESSIONID']) {
    console.log('Logged out');
    res.cookie('SESSIONID', req.cookies['SESSIONID'], {expires: new Date(Date.now() - 900000)}); // , httpOnly:true, secure:true});
    return res.status(200).json(security.encrypt({success: true, result: true}));
  } else {
    console.log(`User wasn't logged in so can't log out.`);
    return res.status(200).json(security.encrypt({success: true, result: false}));
  }
}

module.exports = {
  createUser: createUser,
  login: login,
  logout: logout
};