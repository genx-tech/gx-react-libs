import request from 'superagent';
import { Runtime } from '@genx/react';

Runtime.registerCreator('httpAgent', () => request.agent());
