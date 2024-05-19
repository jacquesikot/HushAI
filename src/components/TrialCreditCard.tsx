import XIcon from '@/icons/XIcon';
import CircularProgress from '@/components/CircularProgress';
import styled from 'styled-components';

const Wrapper = styled.div`
  background-color: ${(props) => props.theme.colors.background['bg-tertiary'].value};
  border-radius: ${(props) => props.theme.radius['radius-md'].value};
  padding: ${(props) => props.theme.spacing['spacing-2xl'].value} ${(props) => props.theme.spacing['spacing-xl'].value};
`;

const Title = styled.p`
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: 20px;
  color: ${(props) => props.theme.colors.text['text-primary-(900)'].value};
  margin-top: ${(props) => props.theme.spacing['spacing-xl'].value};
  margin-bottom: 0;
  letter-spacing: 0.3px;
`;

const Subtitle = styled.p`
  color: ${(props) => props.theme.colors.text['text-tertiary-(600)'].value};
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px;
  margin-top: 0;
  margin-bottom: ${(props) => props.theme.spacing['spacing-xl'].value};
  width: 216px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: ${(props) => props.theme.spacing['spacing-md'].value};
`;

const Button = styled.button<{ isUpgradeButton?: boolean }>`
  background-color: transparent;
  color: ${({ isUpgradeButton, theme }) =>
    isUpgradeButton
      ? theme.componentColors.components.buttons['tertiary-color']['button-tertiary-color-fg'].value
      : theme.componentColors.components.buttons.tertiary['button-tertiary-fg'].value};
  border: none;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: 20px;
  cursor: pointer;

  margin: 0;
  padding: 0;
`;

const TopWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

interface Props {
  percentage: number;
  onDismissClick: () => void;
  onUpgradeClick: () => void;
}

const TrialCreditCard = (props: Props) => {
  return (
    <Wrapper>
      <TopWrapper>
        <CircularProgress percentage={props.percentage} radius={29} />

        <XIcon />
      </TopWrapper>

      <Title>Free trial credits</Title>
      <Subtitle>Your team has used 80% of your available credit. Need more?</Subtitle>

      <ButtonContainer>
        <Button onClick={props.onDismissClick}>Dismiss</Button>
        <Button onClick={props.onDismissClick} isUpgradeButton>
          Upgrade plan
        </Button>
      </ButtonContainer>
    </Wrapper>
  );
};

export default TrialCreditCard;
