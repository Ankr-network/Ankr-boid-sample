require('./common')

describe('DCCN Application Manager', () => {
    before(authenticateWithTestAcct)
    context('list_application', () => {
        it('should list applications', async () => {
            const appList = await reqA('GET', '/app/list')
            console.log(appList)
        })
    })
})  