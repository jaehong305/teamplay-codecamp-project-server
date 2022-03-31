import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: ['http://127.0.0.1:5500', 'http://localhost:3000', 'https://codecamptest.shop'],
    credentials: true,
  },
})
export class EventGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() public server: Server;

  // @SubscribeMessage('comeOn')
  // handleEvent(@MessageBody() data, @ConnectedSocket() client: Socket) {
  //   const [nickname, room] = data;
  //   console.log(`${nickname}님이 ${room}방에 접속했습니다.`);
  //   const comeOn = `${nickname}님이 입장했습니다.`;
  //   client.emit('comeOn' + room, comeOn);
  // }

  afterInit(server: Server) {
    console.log('=====init=======');
  }

  handleConnection(@ConnectedSocket() client: Socket) {
    console.log('======connected====', client.rooms);
  }

  handleDisconnect(@ConnectedSocket() client: Socket) {
    console.log('======disconnected====');
  }
}
