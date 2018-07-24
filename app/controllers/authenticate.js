
const {
    exitIfMissing,
    findUser,
    passwordMatch,
    jwtEncode,
    jsonOkay,
    fail,
} = require('./helpers')


module.exports = async (req, res)=> {
    try {

        const { username, password } = req.body
        if (exitIfMissing(res, username, password)) {
            return
        }

        const user = await findUser(username)
        if (!user) {
            return fail(res, 'Authentication failed, no match')
        }

        if (passwordMatch(user, password)) {
            const { payload, token } = jwtEncode(req, username)
            return jsonOkay(res, { token, payload })
        }
        else {
            return fail(res, 'Invalid credentials')
        }

    } catch (err) {
        fail(res, err.message)
        console.log(err)
    }
}
