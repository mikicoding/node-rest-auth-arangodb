
const {
    exitIfMissing,
    findUser,
    userRegister,
    okay,
    fail,
} = require('./helpers')


module.exports = async (req, res)=> {
    try {

        const { username, password } = req.body
        if (exitIfMissing(res, username, password)) {
            return
        }

        if (await findUser(username)) {
            return fail(res, 'That username is already taken')
        }

        const regResult = await userRegister(username, password)
        console.log('regResult', regResult)
        return okay(res, 'Registration successful')

    } catch (err) {
        fail(res, err.message)
        console.log(err)
    }
}
