require('./common')

describe('DCCN Application Manager', () => {
    before(authenticateWithTestAcct)
    context('cancel_application', () => {
        it('should cancel an application', async () => {
            // create an app for app_cancel
            const chartList = await reqA('GET', '/chart/list', {
                chart_repo: 'stable'
            })
            expect(chartList.charts.length).to.be.at.least(1)
            const chart = chartList.charts[0]
            const app = await reqA('POST', '/app/create', {
                app_name: 'app_cancel_test',
                chart: {
                    chart_name: chart.chart_name,
                    chart_repo: chart.chart_repo,
                    chart_ver: chart.chart_latest_version
                },
                namespace: {
                    ns_name: 'ns_app_cancel_test',
                    ns_cpu_limit: 1000,
                    ns_mem_limit: 2048,
                    ns_storage_limit: 8
                }
            })

            // wait for app status changed
            function sleep(delay) {
                var start = (new Date()).getTime()
                while((new Date()).getTime() - start < delay) {
                    continue
                }
            }
            sleep(8000)

            // cancel the app and check
            path_cancel = '/app/cancel/' + app.app_id
            const cancelApp = await reqA('POST', path_cancel)
            path_detail = '/app/detail/' + app.app_id
            const appDetail = await reqA('GET', path_detail)
            expect(appDetail.app_report.app_status).to.be.oneOf(['APP_CANCELING', 'APP_CANCELED'])
        }).timeout(15000)
    })
})  