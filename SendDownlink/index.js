/*
 * This function is for sending downlink messages to the device across another http function
*/

module.exports = async function (context) {
    return `Hello ${context.bindings.name}!`;
};