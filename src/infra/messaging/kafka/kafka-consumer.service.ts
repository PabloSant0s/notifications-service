import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { ServerKafka } from '@nestjs/microservices';
@Injectable()
export class KafkaConsumerService
  extends ServerKafka
  implements OnModuleDestroy
{
  constructor() {
    super({
      client: {
        clientId: 'notifications',
        brokers: ['funny-goldfish-10672-us1-kafka.upstash.io:9092'],
        sasl: {
          mechanism: 'scram-sha-256',
          username:
            'ZnVubnktZ29sZGZpc2gtMTA2NzIk9PEd1khKo1k6y9nc2B1fiym3UosSAk-Ct90',
          password:
            'b8Pxzi00XF-4zg25tUx27aWPzQBZWCKW9XsCqkG1q3ONiyjKPmxPsJtianU1-o9v6X8ppw==',
        },
        ssl: true,
      },
    });
  }
  async onModuleDestroy() {
    await this.close();
  }
}
