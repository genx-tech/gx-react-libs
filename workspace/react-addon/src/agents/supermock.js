import request from 'superagent';
import superagentMock from 'superagent-mock';
import { Runtime } from '@genx/react';

const logging = (log) => Runtime.log('verbose', ['mock', log]);

Runtime.register('httpAgentCreator', (config) => {
    superagentMock(request, config, logging);
    return request;
});
