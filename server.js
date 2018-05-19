var server = require("WS").Server;
// import  {Server} from "WS"
var s = new server({ port: 3001 })


// s.once
s.on("connection", (ws) => {
    console.log("i got connected a new client");
    console.log("all connected clients array: ", s.clients)

    // // to send message to all connected clients
    // s.clients.forEach(eachClient=>{
    //     eachClient.send("some message" + actualMessage)
    // })


    // any message sent by the client will receive here
    ws.on('message', actualMessage => {
        console.log("received: ", actualMessage);
        let message = JSON.parse(actualMessage)

        if (message.type == "enroll") {

            //adding another attribute in that client instance
            ws.clientName = message.name
            return;

        } else if (message.type == "message") {

            s.clients.forEach(eachClient => {
                if(eachClient != ws) // send to all but do not send to the sender again
                    eachClient.send( JSON.stringify({
                        type: "message",
                        text: message.text,
                        from: ws.clientName
                    }))
            })

        }


    })

    //when a browser window close, or somehow a client is disconnect
    ws.on("close", () => {
        console.log("i Lost a client");
    })
})