import React from 'react';
import styled, { useTheme } from 'styled-components';

interface CircularProgressProps {
  radius: number;
  percentage: number;
  color?: string;
}

const CircleContainer = styled.div<{ radius: number }>`
  width: ${({ radius }) => radius * 2}px;
  height: ${({ radius }) => radius * 2}px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const Svg = styled.svg`
  width: 100%;
  height: 100%;
  transform: rotate(-90deg);
`;

const CircleBackground = styled.circle<{ strokeWidth: number }>`
  fill: none;
  stroke: ${(props) => props.theme.colors.background['bg-quaternary'].value};
  stroke-width: ${({ strokeWidth }) => strokeWidth};
`;

const CircleProgress = styled.circle<{ color: string; strokeWidth: number }>`
  fill: none;
  stroke: ${({ color }) => color};
  stroke-width: ${({ strokeWidth }) => strokeWidth};
  stroke-linecap: round;
  transition: stroke-dashoffset 0.35s;
`;

const PercentageText = styled.p`
  color: ${(props) => props.theme.colors.text['text-primary-(900)'].value};
  text-align: center;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: 20px;
  font-family: 'Inter', sans-serif;
  position: absolute;
  letter-spacing: 0.5px;
`;

const CircularProgress: React.FC<CircularProgressProps> = ({ radius, percentage, color }) => {
  const strokeWidth = 6;
  const normalizedRadius = radius - strokeWidth / 2;
  const circumference = 2 * Math.PI * normalizedRadius;
  const offset = circumference - (percentage / 100) * circumference;
  const theme = useTheme();

  return (
    <CircleContainer radius={radius}>
      <Svg width={radius * 2} height={radius * 2}>
        <CircleBackground r={normalizedRadius} cx={radius} cy={radius} strokeWidth={strokeWidth} />
        <CircleProgress
          r={normalizedRadius}
          cx={radius}
          cy={radius}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          color={color || theme.colors.foreground['fg-brand-primary_alt'].value}
        />
      </Svg>

      <PercentageText>{percentage + '%'}</PercentageText>
    </CircleContainer>
  );
};

export default CircularProgress;
