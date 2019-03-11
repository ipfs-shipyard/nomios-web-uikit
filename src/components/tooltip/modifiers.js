import PopperJS from 'popper.js';

const oppositeMap = {
    top: 'bottom',
    bottom: 'top',
    left: 'right',
    right: 'left',
};

const getModifiers = ({ viewportPadding, boundariesElement }) => {
    const modifiers = {
        preventOverflow: {
            padding: viewportPadding,
            boundariesElement,
        },
        shift: {
            enabled: false,
        },
        offset: {
            enabled: false,
        },
        computeStyle: {},
        applyStyle: {
            enabled: true,
        },
    };

    // When the tooltip flips and the tooltip is still out-of-bounds, we want preventOverflow
    // to work only on the opposite axis and the original placement to be restored
    let originalOffsets;

    modifiers.preventOverflow.fn = (data, options) => {
        const offsets = data.offsets.popper;
        const newData = PopperJS.Defaults.modifiers.preventOverflow.fn(data, options);
        const newOffsets = newData.offsets.popper;

        originalOffsets = originalOffsets || offsets;

        if (data.flipped) {
            const placement = data.placement;
            const oppositePlacement = oppositeMap[placement];
            const overflowed = offsets[placement] !== newOffsets[placement] ||
                               offsets[oppositePlacement] !== newOffsets[oppositePlacement];

            if (overflowed) {
                newData.placement = data.originalPlacement;
                newOffsets[placement] = originalOffsets[placement];
                newOffsets[oppositePlacement] = originalOffsets[oppositePlacement];
            }
        }

        return newData;
    };

    modifiers.computeStyle.fn = (data, options) => {
        originalOffsets = null;

        return PopperJS.Defaults.modifiers.computeStyle.fn(data, options);
    };

    return modifiers;
};

export default getModifiers;
