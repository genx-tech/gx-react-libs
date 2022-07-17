import { format, getTime, formatDistanceToNow } from 'date-fns';
import { zhTW } from 'date-fns/locale';

// ----------------------------------------------------------------------

export function fCustomDate(date, fmt) {
    return format(new Date(date), fmt, { locale: zhTW });
}

export function fDate(date) {
    return format(new Date(date), 'yyyy年MM月dd日', { locale: zhTW });
}

export function fTime(date) {
    return format(new Date(date), 'HH:mm bbb', { locale: zhTW });
}

export function fDateTime(date) {
    return format(new Date(date), 'yyyy年MM月dd日 HH:mm', { locale: zhTW });
}

export function fTimestamp(date) {
    return getTime(new Date(date));
}

export function fDateTimeSuffix(date) {
    return format(new Date(date), 'yyyy年MM月dd日 p', { locale: zhTW });
}

export function fToNow(date) {
    return formatDistanceToNow(new Date(date), {
        addSuffix: true,
        locale: zhTW,
    });
}
