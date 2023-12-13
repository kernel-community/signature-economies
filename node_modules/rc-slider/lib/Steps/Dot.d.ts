import * as React from 'react';
export interface DotProps {
    prefixCls: string;
    value: number;
    style?: React.CSSProperties;
    activeStyle?: React.CSSProperties;
}
export default function Dot(props: DotProps): JSX.Element;
