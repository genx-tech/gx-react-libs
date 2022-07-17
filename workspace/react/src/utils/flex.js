//v1.0.190425

export const flexBox = (vertical, hAlign, vAlign, wrap, alignContent) => {
    let styles = {
        display: 'flex',
    };

    let hAttr, vAttr;

    if (vertical) {
        styles.flexDirection = 'column';
        hAttr = alignContent ? 'alignContent' : 'alignItems';
        vAttr = 'justifyContent';
    } else {
        vAttr = alignContent ? 'alignContent' : 'alignItems';
        hAttr = 'justifyContent';
    }

    if (hAlign === 'left') {
        hAlign = 'flex-start';
    } else if (hAlign === 'right') {
        hAlign = 'flex-end';
    }

    if (hAlign && hAlign !== 'flex-start') {
        styles[hAttr] = hAlign;
    }

    if (vAlign === 'top') {
        vAlign = 'flex-start';
    } else if (vAlign === 'bottom') {
        vAlign = 'flex-end';
    }

    if (vAlign && vAlign !== 'stretch') {
        styles[vAttr] = vAlign;
    }

    if (wrap) {
        styles.flexWrap = 'wrap';
    }

    return styles;
};

/**
 * Create a horizontal box style set.
 * @param {string} [vAlign='stretch'] - Vertical alignment
 *   normal | stretch | <baseline-position> | [ <overflow-position>? <self-position> ]
 *   {@link https://developer.mozilla.org/en-US/docs/Web/CSS/align-items}
 * @param {string} [hAlign='space-evenly'] - Horizontal alignment
 *   flex-start | flex-end | center | space-between | space-around | space-evenly
 *   {@link https://developer.mozilla.org/en-US/docs/Web/CSS/justify-content}
 * @param {boolean} [wrap=false] - Wrap the content if overflow
 * @param {boolean} [alignContent=false] - "alignContent" specifies the alignment of the lines themselves.
 *   flex-start | flex-end | center | space-between | space-around | space-evenly | stretch
 *   {@link https://developer.mozilla.org/en-US/docs/Web/CSS/align-content}
 * @return {object}
 */
export const hBox = (vAlign = 'stretch', hAlign = 'flex-start', wrap = false, alignContent = false) =>
    flexBox(false, hAlign, vAlign, wrap, alignContent);

/**
 * Create a vertical box style set.
 * @param {string} [hAlign='space-evenly'] - Horizontal alignment
 *   normal | stretch | <baseline-position> | [ <overflow-position>? <self-position> ]
 *   {@link https://developer.mozilla.org/en-US/docs/Web/CSS/align-items}
 * @param {string} [vAlign='stretch'] - Vertical alignment
 *   flex-start | flex-end | center | space-between | space-around | space-evenly
 *   {@link https://developer.mozilla.org/en-US/docs/Web/CSS/justify-content}
 * @param {boolean} [wrap=false] - Wrap the content if overflow
 * @param {boolean} [alignContent=false] - "alignContent" specifies the alignment of the lines themselves.
 *   flex-start | flex-end | center | space-between | space-around | space-evenly | stretch
 *   {@link https://developer.mozilla.org/en-US/docs/Web/CSS/align-content}
 * @return {object}
 */
export const vBox = (hAlign = 'stretch', vAlign = 'flex-start', wrap = false, alignContent = false) =>
    flexBox(true, hAlign, vAlign, wrap, alignContent);

/**
 * Produce a vertical alignment style applied to the component itself (not the container).
 * @param {string} vAlign - top, bottom, center
 * @return {object} alignSelf style
 */
export const vAlignInHBox = (vAlign) => {
    if (vAlign === 'top') {
        vAlign = 'flex-start';
    } else if (vAlign === 'bottom') {
        vAlign = 'flex-end';
    }

    return { alignSelf: vAlign };
};

/**
 * Produce a horizontal alignment style applied to the component itself (not the container).
 * @param {string} hAlign - left, right, center
 * @return {object} alignSelf style
 */
export const hAlignInVBox = (hAlign) => {
    if (hAlign === 'left') {
        hAlign = 'flex-start';
    } else if (hAlign === 'right') {
        hAlign = 'flex-end';
    }

    return { alignSelf: hAlign };
};

export default {
    hBox,
    vBox,
    vAlignInHBox,
    hAlignInVBox,
};
