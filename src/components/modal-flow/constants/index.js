const LAYOUT = {
    HALF_BORDERED: 'halfPanelBordered',
    HALF: 'halfPanel',
    WIDE: 'widePanel',
    FULL: 'fullPanel',
};

const LAYOUT_TRANSITION = {
    EMPTY_TO_HALF: 'emptyToHalf',
    HALF_TO_FULL_EXITING: 'halfToFullExiting',
    HALF_TO_FULL_ENTERING: 'halfToFullEntering',
    HALF_BORDERED_TO_WIDE_EXITING: 'halfBorderedToWideExiting',
    HALF_BORDERED_TO_WIDE_ENTERING: 'halfBorderedToWideEntering',
    HALF_BORDERED_TO_FULL_EXITING: 'halfBorderedToFullExiting',
    HALF_BORDERED_TO_FULL_ENTERING: 'halfBorderedToFullEntering',
    WIDE_TO_FULL_EXITING: 'wideToFullExiting',
    WIDE_TO_FULL_ENTERING: 'wideToFullEntering',
    FULL_TO_HALF_EXITING: 'fullToHalfExiting',
    FULL_TO_HALF_ENTERING: 'fullToHalfEntering',
    FULL_TO_WIDE_EXITING: 'fullToWideExiting',
    FULL_TO_WIDE_ENTERING: 'fullToWideEntering',
    FULL_TO_HALF_BORDERED_EXITING: 'fullToHalfBorderedExiting',
    FULL_TO_HALF_BORDERED_ENTERING: 'fullToHalfBorderedEntering',
};

export {
    LAYOUT,
    LAYOUT_TRANSITION,
};
