const mongoose = require('mongoose')

const {Uplink} = require('./models/index')



    module.exports = async function (context) {
        mongoose.connect(process.env['CosmosDB_STRING'],  {
            useNewUrlParser:true
        })
            .then(db => context.log('DB connected successfully'))
            .catch(err => context.log(err))
         
        try {
            //const client = new pg.Client(config);
            const dataDecoded = context.bindings.name.decoder;
            const metadata = context.bindings.name.data;
            const device = context.bindings.name.deviceName;
            const modelHex = context.bindings.name.modelHex;

            const uplink= new Uplink({
                device_id: device,
                model: modelHex,
                data: dataDecoded,
                meta_data:metadata 
            }) 
            context.log(uplink)

        if((error = await saveSchema(uplink)) != true) {
            context.log("await")
            context.log(error)
            context.done()
            return
        }
    
            // context.log('insert completed successfully!');
            return 'insert completed successfully!'
        } catch (error) {
            context.log('insert failed!', error);
            return 'insert failed!'
        }
    };

// function to send the json to the Service Bus
 

saveSchema = async function(schema) {
    try {
            
        await schema.save()
        return true

    } catch (error) {
        
        return error

    }
}

