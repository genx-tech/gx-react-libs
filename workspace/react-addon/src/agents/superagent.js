import request from 'superagent';
import { Runtime } from '@genx/react';

Runtime.register('httpAgentCreator', () => request.agent());
