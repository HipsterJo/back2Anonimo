
// import {
//     ConnectedSocket,
//     MessageBody,
//     SubscribeMessage,
//     WebSocketGateway,
//     WebSocketServer,
//   } from '@nestjs/websockets';
//   import {UserDocument} from './schemes/user.scheme';

//   import { Server, Socket } from 'socket.io';
//    import { Logger } from '@nestjs/common';

// interface Message {
//     message: string;
//     user: string;
//     roomId: string;
    

//  }

//  interface Action {
//     userId : string;
//     playing: boolean;
//     progress: number;
//     roomId: string;
// }

// interface Room{
//     roomId: string;
//     host: string;

// }




//   @WebSocketGateway({cors: true})
//   export class Appgateway {
//     logger: Logger;

//     constructor() {
//         this.logger = new Logger('RoomGateway');
//     }
    
//     @WebSocketServer()
//     server: Server;

//     @SubscribeMessage('send_message')
//     listenForMessages(@MessageBody() data: Message, @ConnectedSocket() socket: Socket) {
//         console.log(data)
//         this.logger.log(
//             "\n___________________________message___________________________ \n" +
//             "\t\t" + data.roomId + "\n" +
//             "user: " + data.user + "\n" +
//             "message: " + data.message + "\n" +
//             "__________________________________________________________________ \n"
//         )
//         this.server.to(data.roomId).emit('receive_message', data);
//     }

//     @SubscribeMessage('action')
//     listenForActions(@MessageBody() data: Action, @ConnectedSocket() socket: Socket) {
      
//         if (data.userId === data.roomId){
      
//          this.logger.log
//          ("\n___________________________hostAction___________________________ \n" +
//           "\t\t" + data.roomId + "\n" +
//           "playing: " + data.playing + "\n" +
//           "progress: " + data.progress + "\n" +
//           "__________________________________________________________________ \n");
         
//             this.server.to(data.roomId).emit('AnAction', {playing: data.playing, progress: data.progress});
//         }
        
        


//     }


//     handleConnection(socket: Socket, ...args: any[] ) {
//         const userName = socket.handshake.query.userName;
//         const roomId = socket.handshake.query.roomId;
//         this.logger.warn(
//             "\n___________________________connection___________________________ \n" +
//             "\t\t" + roomId + "\n" +
//             "user: " + userName + "\n" +
//             "__________________________________________________________________ \n"
//         )
//         socket.join(roomId.toString());

       
//     }    
//   }