import React from 'react';
import Icon from './Icon';
import cameraSvg from '../../media/icons/icon-camera.svg';
import checkmarkSvg from '../../media/icons/icon-checkmark.svg';
import crossSvg from '../../media/icons/icon-cross.svg';
import desktopSvg from '../../media/icons/icon-desktop.svg';
import entitySvg from '../../media/icons/icon-entity.svg';
import eyeOffSvg from '../../media/icons/icon-eye-off.svg';
import eyeSvg from '../../media/icons/icon-eye.svg';
import infoSvg from '../../media/icons/icon-info.svg';
import laptopSvg from '../../media/icons/icon-laptop.svg';
import mobileSvg from '../../media/icons/icon-mobile.svg';
import otherSvg from '../../media/icons/icon-other.svg';
import userSvg from '../../media/icons/icon-user.svg';
import plusSvg from '../../media/icons/icon-plus.svg';
import refreshSvg from '../../media/icons/icon-refresh.svg';
import tabletSvg from '../../media/icons/icon-tablet.svg';
import warningSvg from '../../media/icons/icon-warning.svg';

const CameraIcon = (props) => <Icon { ...props } svg={ cameraSvg } />;
const CheckmarkIcon = (props) => <Icon { ...props } svg={ checkmarkSvg } />;
const CrossIcon = (props) => <Icon { ...props } svg={ crossSvg } />;
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
