const df = require("durable-functions");

module.exports = df.orchestrator(function* (context) {
    const outputs = [];

    context.log('test body', context.df.getInput());

    const data = context.df.getInput().data;
    
    payload = yield context.df.callActivity("InitDecoder", data);
    decoder = yield context.df.callActivity(payload.modelFunction, payload.hexPayload);
    const result = { data, decoder, deviceName: payload.deviceName, modelHex: payload.modelHex };

    if(payload.modelFunction !== 'Downlink'){
        outputs.push(yield context.df.callActivity("SaveDBPG", result));
    }
    if(payload.modelFunction === 'Downlink'){
        outputs.push(yield context.df.callActivity("SendDownlink", result));
    }

    return outputs;
});