module.exports = async function (context) {
    let modelFunction;
    let modelHex = 'Unknown'
    try {
        
        const data = context.bindings.name;
        const deviceName = data ? data.end_device_ids.device_id : null;
        const hexPayload = data ? base64ToHex(data.uplink_message.frm_payload) : null;
        const DeviceTwinModel = data ? data.model : null;
        context.log("base64",data.uplink_message.frm_payload);
        context.log("hexpayload",hexPayload);
        if(hexPayload === '0D'){
            modelFunction = 'Downlink';
        }else if(deviceName === 'prototype-model-a'){
            modelFunction = 'PrototypeA';
            modelHex = hexPayload ? hexPayload.slice(10, 12) : null;
        }else{
            modelHex = hexPayload ? hexPayload.slice(6, 8) : null;
            switch (modelHex.toString()) {
                case '10':
                    modelFunction = 'DN-LB01';
                    break;
                case '11':
                    modelFunction = 'NDE-LH-FV';
                    break;
                case '12':
                    modelFunction = 'NDE-LH';
                    break;
                case '13':
                    modelFunction = 'NDE-LR-FV';
                    break;
                case '14':
                    modelFunction = 'NDE-LR';
                    break;
                case '15':
                    modelFunction = 'NDE-L2H';
                    break;
                case '16':
                    modelFunction = 'NDE-LHMO';
                    break;
                case '17':
                    modelFunction = 'NDE-LMI';
                    break;
                default:
                    modelFunction = 'Unknown';
                    break;
            }
        }

        if(modelFunction=='Unknown'){
        modelFunction=DeviceTwinModel
        modelHex=DeviceTwinModel
        }
         context.log('modelFunction: ', modelFunction);
        context.log('deviceName: ', deviceName);
        context.log('modelHex: ', modelHex);
        context.log('hexPayload: ', hexPayload);

        const result = { modelFunction, hexPayload, deviceName, modelHex };

        return result;
    } catch (error) {
        context.log(error);
        return { modelFunction, ...{}};
    }
    
};

/* ******************************************
     * base64 to hex
     ********************************************/
function base64ToHex(base64) {
    var raw = atob(base64);
    var HEX = '';
    for (i = 0; i < raw.length; i++) {
        var _hex = raw.charCodeAt(i).toString(16)
        HEX += (_hex.length == 2 ? _hex : '0' + _hex);
    }
    return HEX.toUpperCase();
}