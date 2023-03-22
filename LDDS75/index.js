module.exports = async function (context) {

    /* ******************************************
     * hex to number
     ********************************************/
    const hexToDecimal = hex => parseInt(hex, 16);
    const hexToFloat = hex => Buffer.from(hex, 'hex').readFloatBE(0);
    const hexToBoolean = hex => Buffer.from(hex, 'hex').readUInt8(0) === 1;

    const hexStr = context.bindings.name;
    // if (hexStr.length !== 72) {
    //     context.log('Length of data Model A is not 72', hexStr.length);0
    //     return `Length of data Prototype A is not 72, is ${hexStr.length}`;
    // }
    //context.log("hexStr",hexStr)
    let  payload = Buffer.from(hexStr, 'hex').toString('base64')
     
    var bytes = Buffer.from(payload, 'base64') 
    let value=(bytes[0]<<8 | bytes[1]) & 0x3FFF;
    let batV=value/1000;//Battery,units:V
    
    value=bytes[2]<<8 | bytes[3];
    let distanceMeters=(value/1000);//distance,units:m
    let distanceMillimeters=(value);//distance,units:mm

     context.log("distancia",distanceMillimeters)
     context.log("bateria",batV)
    
    let result = {};
    // const leng_data = hexStr.slice(0, 2);
    // const id = hexStr.slice(2, 6);
    // const model = hexStr.slice(6, 8);
    // const interval_time = hexStr.slice(8, 16);
    // const timestamp = hexStr.slice(16, 24);
    // const battery_v = hexStr.slice(24, 32);
    // const battery_lvl = hexStr.slice(32, 34);
    // const memory = hexStr.slice(34, 42);
    // const status = hexStr.slice(42, 44);
    // const current = hexStr.slice(44, 52);
    // const primary = hexStr.slice(52, 60);
    // const primary_id = hexStr.slice(60, 62);
    // const second = hexStr.slice(62, 70);
    // const second_id = hexStr.slice(70, 72);

    result = {
        leng_data: hexStr,
        model:"LDDS75",
        distance_Meters:distanceMeters,
        distance_Milimiters:distanceMillimeters,
        battery_v: batV,
        
    }
    context.log(result)
    return result;

    // return `Hello ${context.bindings.name}!`;
};