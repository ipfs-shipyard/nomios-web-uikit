import React from 'react';
import Icon from './Icon';

const cameraSvg = import(/* webpackChunkName: "svg-sprite" */ '../../media/icons/icon-camera.svg');
const desktopSvg = import(/* webpackChunkName: "svg-sprite" */ '../../media/icons/icon-desktop.svg');
const entitySvg = import(/* webpackChunkName: "svg-sprite" */ '../../media/icons/icon-entity.svg');
const eyeOffSvg = import(/* webpackChunkName: "svg-sprite" */ '../../media/icons/icon-eye-off.svg');
const eyeSvg = import(/* webpackChunkName: "svg-sprite" */ '../../media/icons/icon-eye.svg');
const infoSvg = import(/* webpackChunkName: "svg-sprite" */ '../../media/icons/icon-info.svg');
const laptopSvg = import(/* webpackChunkName: "svg-sprite" */ '../../media/icons/icon-laptop.svg');
const mobileSvg = import(/* webpackChunkName: "svg-sprite" */ '../../media/icons/icon-mobile.svg');
const otherSvg = import(/* webpackChunkName: "svg-sprite" */ '../../media/icons/icon-other.svg');
const userSvg = import(/* webpackChunkName: "svg-sprite" */ '../../media/icons/icon-user.svg');
const plusSvg = import(/* webpackChunkName: "svg-sprite" */ '../../media/icons/icon-plus.svg');
const refreshSvg = import(/* webpackChunkName: "svg-sprite" */ '../../media/icons/icon-refresh.svg');
const tabletSvg = import(/* webpackChunkName: "svg-sprite" */ '../../media/icons/icon-tablet.svg');
const warningSvg = import(/* webpackChunkName: "svg-sprite" */ '../../media/icons/icon-warning.svg');
const crossOutlineSvg = import(/* webpackChunkName: "svg-sprite" */ '../../media/icons/icon-cross-outline.svg');
const checkmarkOutlineSvg = import(/* webpackChunkName: "svg-sprite" */ '../../media/icons/icon-checkmark-outline.svg');

const CameraIcon = (props) => <Icon { ...props } svg={ cameraSvg } />;
const CheckmarkIcon = (props) => <Icon { ...props } svg={ checkmarkOutlineSvg } />;
const CrossIcon = (props) => <Icon { ...props } svg={ crossOutlineSvg } />;
const DesktopIcon = (props) => <Icon { ...props } svg={ desktopSvg } />;
const EntityIcon = (props) => <Icon { ...props } svg={ entitySvg } />;
const EyeOffIcon = (props) => <Icon { ...props } svg={ eyeOffSvg } />;
const EyeIcon = (props) => <Icon { ...props } svg={ eyeSvg } />;
const InfoIcon = (props) => <Icon { ...props } svg={ infoSvg } />;
const LaptopIcon = (props) => <Icon { ...props } svg={ laptopSvg } />;
const MobileIcon = (props) => <Icon { ...props } svg={ mobileSvg } />;
const OtherIcon = (props) => <Icon { ...props } svg={ otherSvg } />;
const UserIcon = (props) => <Icon { ...props } svg={ userSvg } />;
const PlusIcon = (props) => <Icon { ...props } svg={ plusSvg } />;
const RefreshIcon = (props) => <Icon { ...props } svg={ refreshSvg } />;
const TabletIcon = (props) => <Icon { ...props } svg={ tabletSvg } />;
const WarningIcon = (props) => <Icon { ...props } svg={ warningSvg } />;

export default Icon;
export {
    CameraIcon,
    CheckmarkIcon,
    CrossIcon,
    DesktopIcon,
    EntityIcon,
    EyeOffIcon,
    EyeIcon,
    InfoIcon,
    LaptopIcon,
    MobileIcon,
    OtherIcon,
    UserIcon,
    PlusIcon,
    RefreshIcon,
    TabletIcon,
    WarningIcon,
};
