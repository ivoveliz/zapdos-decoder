module.exports = async function (context) {

    /* ******************************************
     * hex to number
     ********************************************/
    const hexToDecimal = hex => parseInt(hex, 16);
    const hexToFloat = hex => Buffer.from(hex, 'hex').readFloatBE(0);
    const hexToBoolean = hex => Buffer.from(hex, 'hex').readUInt8(0) === 1;

    const hexStr = context.bindings.name;
    if (hexStr.length !== 72) {
        context.log('Length of data Model A is not 72', hexStr.length);
        return `Length of data Prototype A is not 72, is ${hexStr.length}`;
    }

    let result = {};
    const leng_data = hexStr.slice(0, 2);
    const id = hexStr.slice(2, 6);
    const model = hexStr.slice(6, 8);
    const interval_time = hexStr.slice(8, 16);
    const timestamp = hexStr.slice(16, 24);
    const battery_v = hexStr.slice(24, 32);
    const battery_lvl = hexStr.slice(32, 34);
    const memory = hexStr.slice(34, 42);
    const status = hexStr.slice(42, 44);
    const current = hexStr.slice(44, 52);
    const primary = hexStr.slice(52, 60);
    const primary_id = hexStr.slice(60, 62);
    const second = hexStr.slice(62, 70);
    const second_id = hexStr.slice(70, 72);

    /*
    console.log('leng_data: ', leng_data);
    console.log('id: ', id);
    console.log('model: ', model);
    console.log('interval_time: ', interval_time);
    console.log('timestamp: ', timestamp);
    console.log('battery_v: ', battery_v);
    console.log('battery_lvl: ', battery_lvl);
    console.log('memory: ', memory);
    console.log('status: ', status);
    console.log('current: ', current);
    console.log('primary: ', primary);
    console.log('primary_id: ', primary_id);
    console.log('second: ', second);
    console.log('second_id: ', second_id);
    */

    result = {
        leng_data: hexToDecimal(leng_data),
        id: hexToDecimal(id),
        model,
        interval_time: hexToDecimal(interval_time),
        timestamp: hexToDecimal(timestamp),
        battery_v: hexToFloat(battery_v),
        battery_lvl: hexToDecimal(battery_lvl),
        memory: hexToDecimal(memory),
        status: hexToBoolean(status),
        current: hexToFloat(current),
        flow: hexToFloat(primary),
        flow_um: primary_id,
        tote: hexToFloat(second),
        tote_um: second_id
    }
    return result;

    // return `Hello ${context.bindings.name}!`;
};