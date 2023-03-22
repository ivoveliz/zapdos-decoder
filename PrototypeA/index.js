module.exports = async function (context) {

    /* ******************************************
     * hex to number
     ********************************************/
    const hexToDecimal = hex => parseInt(hex, 16);
    const hexToFloat = hex => Buffer.from(hex, 'hex').readFloatBE(0);
    const hexToBoolean = hex => Buffer.from(hex, 'hex').readUInt8(0) === 1;

    const hexStr = context.bindings.name;
    if (hexStr.length !== 84) {
        context.log('Length of data Model A is not 74', hexStr.length);
        return `Length of data Prototype A is not 74, is ${hexStr.length}`;
    }
    let result = {};
    const leng_data = hexStr.slice(0, 2);
    const msg_count = hexStr.slice(2, 10);
    const model = hexStr.slice(10, 12);
    const interval_time = hexStr.slice(12, 20);
    const timestamp = hexStr.slice(20, 36);
    const battery_v = hexStr.slice(36, 44);
    const battery_lvl = hexStr.slice(44, 46);
    const memory = hexStr.slice(46, 54);
    const status = hexStr.slice(54, 56);
    const current = hexStr.slice(56, 64);
    const primary = hexStr.slice(64, 72);
    const primary_id = hexStr.slice(72, 74);
    const second = hexStr.slice(74, 82);
    const second_id = hexStr.slice(82, 84);

    /*
    context.log('leng_data: ', leng_data);
    context.log('msg_count: ', msg_count);
    context.log('model: ', model);
    context.log('interval_time: ', interval_time);
    context.log('timestamp: ', timestamp);
    context.log('battery_v: ', battery_v);
    context.log('battery_lvl: ', battery_lvl);
    context.log('memory: ', memory);
    context.log('status: ', status);
    context.log('current: ', current);
    context.log('primary: ', primary);
    context.log('primary_id: ', primary_id);
    context.log('second: ', second);
    context.log('second_id: ', second_id);
    */

    result = {
        leng_data: hexToDecimal(leng_data),
        msg_count: hexToDecimal(msg_count),
        model,
        interval_time: hexToDecimal(interval_time),
        timestamp: hexToDecimal(timestamp),
        battery_v: hexToFloat(battery_v),
        battery_lvl: hexToDecimal(battery_lvl),
        memory: hexToDecimal(memory),
        status: hexToBoolean(status),
        current: hexToFloat(current),
        flow: hexToFloat(primary),
        flow_um: hexToDecimal(primary_id),
        tote: hexToFloat(second),
        tote_um: hexToDecimal(second_id)
    }
    return result;

    // return `Hello ${context.bindings.name}!`;
};