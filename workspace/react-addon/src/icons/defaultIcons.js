import { Runtime } from '@genx/react';
import { each } from 'lodash';
import './initAddonIconSet';
import Editable from '../assets/icons/editable.svg';

import ChevronBack from '../assets/icons/chevron-back.svg';
import ChevronDown from '../assets/icons/chevron-down.svg';
import ChevronForward from '../assets/icons/chevron-forward.svg';
import ChevronUp from '../assets/icons/chevron-up.svg';

import ZoomIn from '../assets/icons/zoom-in.svg';
import ZoomOut from '../assets/icons/zoom-out.svg';
import Close from '../assets/icons/close.svg';
import ArrowLeft from '../assets/icons/arrow-circle-left.svg';
import ArrowRight from '../assets/icons/arrow-circle-right.svg';

import MoreHorizontal from '../assets/icons/more-horizontal.svg';

import Search from '../assets/icons/search.svg';

import Plus from '../assets/icons/plus-circle.svg';
import Minus from '../assets/icons/minus-circle.svg';

import Info from '../assets/icons/info.svg';
import Success from '../assets/icons/checkmark-circle.svg';

import Trash from '../assets/icons/trash.svg';

const iconSet = {
    Editable,
    ChevronBack,
    ChevronDown,
    ChevronForward,
    ChevronUp,
    ZoomIn,
    ZoomOut,
    Close,
    ArrowLeft,
    ArrowRight,
    MoreHorizontal,
    Search,
    Plus,
    Minus,
    Info,
    Success,
    Trash,
};

each(iconSet, (svg, name) => {
    Runtime.register(`icon:addon:${name}`, svg);
    Runtime.update(`Icon${name}`, { type: 'addon', name: name });
});
