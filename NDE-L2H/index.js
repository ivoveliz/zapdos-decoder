module.exports = async function (context) {

    /* ******************************************
     * hex to number
     ********************************************/
    const hexToDecimal = hex => parseInt(hex, 16);
    const hexToFloat = hex => Buffer.from(hex, 'hex').readFloatBE(0);
    const hexToBoolean = hex => Buffer.from(hex, 'hex').readUInt8(0) === 1;

    const hexStr = context.bindings.name;
    if (hexStr.length !== 102) {
        context.log('Length of data Model A is not 102', hexStr.length);
        return `Length of data Prototype A is not 102, is ${hexStr.length}`;
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
    const status_h1 = hexStr.slice(42, 44);
    const current_h1 = hexStr.slice(44, 52);
    const primary_h1 = hexStr.slice(52, 60);
    const primary_id_h1 = hexStr.slice(60, 62);
    const second_h1 = hexStr.slice(62, 70);
    const second_id_h1 = hexStr.slice(70, 72);
    const status_h2 = hexStr.slice(72, 74);
    const current_h2 = hexStr.slice(74, 82);
    const primary_h2 = hexStr.slice(82, 90);
    const primary_id_h2 = hexStr.slice(90, 92);
    const second_h2 = hexStr.slice(92, 100);
    const second_id_h2 = hexStr.slice(100, 102);

    /*
    console.log('leng_data: ', leng_data);
    console.log('id: ', id);
    console.log('model: ', model);
    console.log('interval_time: ', interval_time);
    console.log('timestamp: ', timestamp);
    console.log('battery_v: ', battery_v);
    console.log('battery_lvl: ', battery_lvl);
    console.log('memory: ', memory);
    console.log('status_h1: ', status_h1);
    console.log('current_h1: ', current_h1);
    console.log('primary_h1: ', primary_h1);
    console.log('primary_id_h1: ', primary_id_h1);
    console.log('second_h1: ', second_h1);
    console.log('second_id_h1: ', second_id_h1);
    console.log('status_h2: ', status_h2);
    console.log('current_h2: ', current_h2);
    console.log('primary_h2: ', primary_h2);
    console.log('primary_id_h2: ', primary_id_h2);
    console.log('second_h2: ', second_h2);
    console.log('second_id_h2: ', second_id_h2);
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
    status_h1: hexToBoolean(status_h1),
    current_h1: hexToFloat(current_h1),
    flow_h1: hexToFloat(primary_h1),
    flow_um_h1: hexToDecimal(primary_id_h1),
    tote_h1: hexToFloat(second_h1),
    tote_um_h1:second_id_h1,
    status_h2: hexToBoolean(status_h2),
    current_h2: hexToFloat(current_h2),
    flow_h2: hexToFloat(primary_h2),
    flow_um_h2: primary_id_h2,
    tote_h2: hexToFloat(second_h2),
    tote_um_h2: second_id_h2
    }
    return result;

    // return `Hello ${context.bindings.name}!`;
};