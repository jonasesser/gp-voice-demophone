import * as alt from 'alt-client';
import { SYSTEM_EVENTS } from '../../../shared/enums/system';
import { GPPhone } from './src/phone';

alt.onceServer(SYSTEM_EVENTS.TICKS_START, GPPhone.init);
