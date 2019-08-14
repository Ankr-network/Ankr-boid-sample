require('./common')

describe('DCCN User Manager', () => {
    before(authenticateWithTestAcct)
    context('logout',() => {
        it('should send a logout request', async () => {
            const loginfo = await reqA('POST', '/login',{
                email: 'liyifan.work@gmail.com',
                password: 'Boid12345'
            })
            const logoutinfo = await reqA('POST', '/logout',{
                refresh_token: loginfo.authentication_result.refresh_token
            })
            console.log(logoutinfo)
        })
    })
})