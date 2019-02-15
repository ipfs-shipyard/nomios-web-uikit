import React from 'react';
import Icon from './Icon';
import warningSvg from '../../media/icons/warning.svg';
import infoSvg from '../../media/icons/info.svg';
import eyeSvg from '../../media/icons/eye.svg';
import eyeOffSvg from '../../media/icons/eye-off.svg';

const WarningIcon = (props) => <Icon { ...props } svg={ warningSvg } />;
const InfoIcon = (props) => <Icon { ...props } svg={ infoSvg } />;
const EyeIcon = (props) => <Icon { ...props } svg={ eyeSvg } />;
const EyeOffIcon = (props) => <Icon { ...props } svg={ eyeOffSvg } />;

export default Icon;
export {
    WarningIcon,
    InfoIcon,
    EyeIcon,
    EyeOffIcon,
};
