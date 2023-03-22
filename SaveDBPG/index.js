const pg = require('pg');

const config = {
    host: process.env["HOST_DB"],
    user: process.env["USER_DB"],
    password: process.env["PASS_DB"],
    database: process.env["NAME_DB"],
    port: process.env["PORT_DB"],
    ssl: true
};

module.exports = async function (context) {
    try {
        const client = new pg.Client(config);
        const dataDecoded = context.bindings.name.decoder;
        const metadata = context.bindings.name.data;
        const device = context.bindings.name.deviceName;
        const modelHex = context.bindings.name.modelHex;
        //const query = 'insert into iotdata(deviceid, data) values(' + '\'' + device + '\''+ ',\'' + JSON.stringify(dataDecoded) + '\''  + ')';
        const query = 'insert into iotdata(device_id, model, data, meta_data) values(' + '\'' + device + '\'' + ',\'' + modelHex + '\'' + ',\'' + JSON.stringify(dataDecoded) + '\'' + ',\'' + JSON.stringify(metadata) + '\'' + ')';
        await client.connect();
        await client.query(query);
        await client.end();

        // context.log('insert completed successfully!');
        return 'insert completed successfully!'
    } catch (error) {
        context.log('insert failed!', error);
        return 'insert failed!'
    }
};