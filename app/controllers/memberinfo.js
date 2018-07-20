
const {
    fail,
    findUser,
    jsonOkay,
} = require('./helpers')


module.exports = async (req, res, done)=> {
    try {

        const { jwt } = req
        if (!jwt || !jwt.username) {
            return fail(res, 'Unknown auth error')
        }

        const user = await findUser(jwt.username)
        return user
        ? jsonOkay(res, { msg:'Welcome', data:user })
        : fail(res, 'Authentication failed. User not found')

    } catch (err) {
        fail(res, err.message)
        console.log(err)
    }
}
