import { Runtime } from '@genx/react';
import createSvgIconSet from './createSvgIconSet';

if (!Runtime.config.iconFamilies) {
    Runtime.config.iconFamilies = {};
}

Runtime.config.iconFamilies.addon = createSvgIconSet((name) => Runtime.require(`icon:addon:${name}`));
