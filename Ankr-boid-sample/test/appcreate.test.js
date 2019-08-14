require('./common')

describe('DCCN Application Manager', () => {
    before(authenticateWithTestAcct)
    context('create_application', () => {
        it('should create an application', async () => {
            const app_info = require('commander')
            app_info
                .option('--app_create_name <string>', 'type in a create app name', 'app_create_test')
                .option('--app_create_ns_name <string>', 'type in a create namespace name', 'app_create_ns_test')
                .option('--app_create_ns_cpu_limit <int>', 'type in a create namespace cpu limit', 1000)
                .option('--app_create_ns_mem_limit <int>', 'type in a create namespace mem limit', 2048)
                .option('--app_create_ns_storage_limit <int>', 'type in a create namespace storage limit', 8)
                .option('--app_create_customValue_key <string>', 'type in a customValue_key', 'app_create_customValue_key')
                .option('--app_create_customValue_value <string>', 'type in a customValue_key', 'app_create_customValue_value')
            app_info.parse(process.argv)
            const app = await reqA('POST', '/app/create', {
                app_name: app_info.app_create_name,
                chart: {
                    chart_name: 'boid',
                    chart_repo: 'stable',
                    chart_ver: '0.1.0'
                },
                namespace: {
                    ns_name: app_info.app_create_ns_name,
                    ns_cpu_limit: app_info.app_create_ns_cpu_limit,
                    ns_mem_limit: app_info.app_create_ns_mem_limit,
                    ns_storage_limit: app_info.app_create_ns_storage_limit
                },              
                custom_values: [{
                    key: 'BOID_EMAIL',
                    value: 'liyifan9308@gmail.com'},
                    {
                    key: 'BOID_PASSWORD',
                    value: 'Lyf19930821'
                    }]
                })
                console.log(app)
            })
        })
    })