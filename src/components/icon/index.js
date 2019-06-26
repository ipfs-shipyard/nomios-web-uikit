import React, { forwardRef } from 'react';
import Icon from './Icon';

const actionsSvg = import(/* webpackChunkName: "svg-sprite" */ '../../media/icons/icon-actions.svg');
const arrowRightSvg = import(/* webpackChunkName: "svg-sprite" */ '../../media/icons/icon-arrow-right.svg');
const bellSvg = import(/* webpackChunkName: "svg-sprite" */ '../../media/icons/icon-bell.svg');
const cameraSvg = import(/* webpackChunkName: "svg-sprite" */ '../../media/icons/icon-camera.svg');
const checkmarkSvg = import(/* webpackChunkName: "svg-sprite" */ '../../media/icons/icon-checkmark.svg');
const checkSvg = import(/* webpackChunkName: "svg-sprite" */ '../../media/icons/icon-check.svg');
const chevronSvg = import(/* webpackChunkName: "svg-sprite" */ '../../media/icons/icon-chevron.svg');
const closeSvg = import(/* webpackChunkName: "svg-sprite" */ '../../media/icons/icon-close.svg');
const copySvg = import(/* webpackChunkName: "svg-sprite" */ '../../media/icons/icon-copy.svg');
const crossmarkSvg = import(/* webpackChunkName: "svg-sprite" */ '../../media/icons/icon-crossmark.svg');
const desktopSvg = import(/* webpackChunkName: "svg-sprite" */ '../../media/icons/icon-desktop.svg');
const downloadSvg = import(/* webpackChunkName: "svg-sprite" */ '../../media/icons/icon-download.svg');
const editSvg = import(/* webpackChunkName: "svg-sprite" */ '../../media/icons/icon-edit.svg');
const entitySvg = import(/* webpackChunkName: "svg-sprite" */ '../../media/icons/icon-entity.svg');
const eyeSvg = import(/* webpackChunkName: "svg-sprite" */ '../../media/icons/icon-eye.svg');
const eyeOffSvg = import(/* webpackChunkName: "svg-sprite" */ '../../media/icons/icon-eye-off.svg');
const facebookSvg = import(/* webpackChunkName: "svg-sprite" */ '../../media/icons/icon-facebook.svg');
const githubSvg = import(/* webpackChunkName: "svg-sprite" */ '../../media/icons/icon-github.svg');
const infoSvg = import(/* webpackChunkName: "svg-sprite" */ '../../media/icons/icon-info.svg');
const laptopSvg = import(/* webpackChunkName: "svg-sprite" */ '../../media/icons/icon-laptop.svg');
const linkedinSvg = import(/* webpackChunkName: "svg-sprite" */ '../../media/icons/icon-linkedin.svg');
const locationSvg = import(/* webpackChunkName: "svg-sprite" */ '../../media/icons/icon-location.svg');
const mobileSvg = import(/* webpackChunkName: "svg-sprite" */ '../../media/icons/icon-mobile.svg');
const otherSvg = import(/* webpackChunkName: "svg-sprite" */ '../../media/icons/icon-other.svg');
const userSvg = import(/* webpackChunkName: "svg-sprite" */ '../../media/icons/icon-user.svg');
const pdfSvg = import(/* webpackChunkName: "svg-sprite" */ '../../media/icons/icon-pdf.svg');
const plusSvg = import(/* webpackChunkName: "svg-sprite" */ '../../media/icons/icon-plus.svg');
const printSvg = import(/* webpackChunkName: "svg-sprite" */ '../../media/icons/icon-print.svg');
const refreshSvg = import(/* webpackChunkName: "svg-sprite" */ '../../media/icons/icon-refresh.svg');
const removeSvg = import(/* webpackChunkName: "svg-sprite" */ '../../media/icons/icon-remove.svg');
const settingsSvg = import(/* webpackChunkName: "svg-sprite" */ '../../media/icons/icon-settings.svg');
const tabletSvg = import(/* webpackChunkName: "svg-sprite" */ '../../media/icons/icon-tablet.svg');
const trashSvg = import(/* webpackChunkName: "svg-sprite" */ '../../media/icons/icon-trash.svg');
const twitterSvg = import(/* webpackChunkName: "svg-sprite" */ '../../media/icons/icon-twitter.svg');
const warningSvg = import(/* webpackChunkName: "svg-sprite" */ '../../media/icons/icon-warning.svg');
const writeSvg = import(/* webpackChunkName: "svg-sprite" */ '../../media/icons/icon-write.svg');

const ActionsIcon = forwardRef((props, ref) => <Icon ref={ ref } { ...props } svg={ actionsSvg } />);
const ArrowRightIcon = forwardRef((props, ref) => <Icon ref={ ref } { ...props } svg={ arrowRightSvg } />);
const BellIcon = forwardRef((props, ref) => <Icon ref={ ref } { ...props } svg={ bellSvg } />);
const CameraIcon = forwardRef((props, ref) => <Icon ref={ ref } { ...props } svg={ cameraSvg } />);
const CheckmarkIcon = forwardRef((props, ref) => <Icon ref={ ref } { ...props } svg={ checkmarkSvg } />);
const CheckIcon = forwardRef((props, ref) => <Icon ref={ ref } { ...props } svg={ checkSvg } />);
const ChevronIcon = forwardRef((props, ref) => <Icon ref={ ref } { ...props } svg={ chevronSvg } />);
const CloseIcon = forwardRef((props, ref) => <Icon ref={ ref } { ...props } svg={ closeSvg } />);
const CopyIcon = forwardRef((props, ref) => <Icon ref={ ref } { ...props } svg={ copySvg } />);
const CrossmarkIcon = forwardRef((props, ref) => <Icon ref={ ref } { ...props } svg={ crossmarkSvg } />);
const DesktopIcon = forwardRef((props, ref) => <Icon ref={ ref } { ...props } svg={ desktopSvg } />);
const DownloadIcon = forwardRef((props, ref) => <Icon ref={ ref } { ...props } svg={ downloadSvg } />);
const EditIcon = forwardRef((props, ref) => <Icon ref={ ref } { ...props } svg={ editSvg } />);
const EntityIcon = forwardRef((props, ref) => <Icon ref={ ref } { ...props } svg={ entitySvg } />);
const EyeIcon = forwardRef((props, ref) => <Icon ref={ ref } { ...props } svg={ eyeSvg } />);
const EyeOffIcon = forwardRef((props, ref) => <Icon ref={ ref } { ...props } svg={ eyeOffSvg } />);
const FacebookIcon = forwardRef((props, ref) => <Icon ref={ ref } { ...props } svg={ facebookSvg } />);
const GithubIcon = forwardRef((props, ref) => <Icon ref={ ref } { ...props } svg={ githubSvg } />);
const InfoIcon = forwardRef((props, ref) => <Icon ref={ ref } { ...props } svg={ infoSvg } />);
const LaptopIcon = forwardRef((props, ref) => <Icon ref={ ref } { ...props } svg={ laptopSvg } />);
const LinkedinIcon = forwardRef((props, ref) => <Icon ref={ ref } { ...props } svg={ linkedinSvg } />);
const LocationIcon = forwardRef((props, ref) => <Icon ref={ ref } { ...props } svg={ locationSvg } />);
const MobileIcon = forwardRef((props, ref) => <Icon ref={ ref } { ...props } svg={ mobileSvg } />);
const OtherIcon = forwardRef((props, ref) => <Icon ref={ ref } { ...props } svg={ otherSvg } />);
const UserIcon = forwardRef((props, ref) => <Icon ref={ ref } { ...props } svg={ userSvg } />);
const PdfIcon = forwardRef((props, ref) => <Icon ref={ ref } { ...props } svg={ pdfSvg } />);
const PlusIcon = forwardRef((props, ref) => <Icon ref={ ref } { ...props } svg={ plusSvg } />);
const PrintIcon = forwardRef((props, ref) => <Icon ref={ ref } { ...props } svg={ printSvg } />);
const RefreshIcon = forwardRef((props, ref) => <Icon ref={ ref } { ...props } svg={ refreshSvg } />);
const RemoveIcon = forwardRef((props, ref) => <Icon ref={ ref } { ...props } svg={ removeSvg } />);
const SettingsIcon = forwardRef((props, ref) => <Icon ref={ ref } { ...props } svg={ settingsSvg } />);
const TabletIcon = forwardRef((props, ref) => <Icon ref={ ref } { ...props } svg={ tabletSvg } />);
const TrashIcon = forwardRef((props, ref) => <Icon ref={ ref } { ...props } svg={ trashSvg } />);
const TwitterIcon = forwardRef((props, ref) => <Icon ref={ ref } { ...props } svg={ twitterSvg } />);
const WarningIcon = forwardRef((props, ref) => <Icon ref={ ref } { ...props } svg={ warningSvg } />);
const WriteIcon = forwardRef((props, ref) => <Icon ref={ ref } { ...props } svg={ writeSvg } />);

export default Icon;
export {
    ActionsIcon,
    ArrowRightIcon,
    BellIcon,
    CameraIcon,
    CheckmarkIcon,
    CheckIcon,
    ChevronIcon,
    CloseIcon,
    CopyIcon,
    CrossmarkIcon,
    DesktopIcon,
    DownloadIcon,
    EditIcon,
    EntityIcon,
    EyeIcon,
    EyeOffIcon,
    FacebookIcon,
    GithubIcon,
    InfoIcon,
    LaptopIcon,
    LinkedinIcon,
    LocationIcon,
    MobileIcon,
    OtherIcon,
    UserIcon,
    PdfIcon,
    PlusIcon,
    PrintIcon,
    RefreshIcon,
    RemoveIcon,
    SettingsIcon,
    TabletIcon,
    TrashIcon,
    TwitterIcon,
    WarningIcon,
    WriteIcon,
};
