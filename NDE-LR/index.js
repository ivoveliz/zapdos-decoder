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
    const status_flow = hexStr.slice(42, 44);
    const flow = hexStr.slice(44, 52);
    const tote = hexStr.slice(52, 60);
    const tote_reseteable = hexStr.slice(60, 68);
    const tote_factor = hexStr.slice(68, 70);
    const vol_unit = hexStr.slice(70, 72);
    const time_unit = hexStr.slice(72, 74);
    const measurement_unit = hexStr.slice(74, 78);

    /*
    console.log('leng_data: ', leng_data);
    console.log('id: ', id);
    console.log('model: ', model);
    console.log('interval_time: ', interval_time);
    console.log('timestamp: ', timestamp);
    console.log('battery_v: ', battery_v);
    console.log('battery_lvl: ', battery_lvl);
    console.log('memory: ', memory);
    console.log('status_flow: ', status_flow);
    console.log('flow: ', flow);
    console.log('tote: ', tote);
    console.log('tote_reseteable: ', tote_reseteable);
    console.log('tote_factor: ', tote_factor);
    console.log('vol_unit: ', vol_unit);
    console.log('time_unit: ', time_unit);
    console.log('measurement_unit: ', measurement_unit);
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
        status_flow: hexToBoolean(status_flow),
        flow: hexToFloat(flow),
        tote: hexToFloat(tote),
        tote_reseteable: hexToFloat(tote_reseteable),
        tote_factor: hexToDecimal(tote_factor),
        vol_unit: hexToDecimal(vol_unit),
        time_unit: hexToDecimal(time_unit),
        measurement_unit: hexToDecimal(measurement_unit),
    }
    return result;

    // return `Hello ${context.bindings.name}!`;
};