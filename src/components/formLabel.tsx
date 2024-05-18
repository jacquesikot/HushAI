import styled from 'styled-components';


interface FormLabelProps{
    label: string
}
const Label = styled.label`
color: ${(props) => props.theme.colors.text['text-secondary-(700)'].value};
  font-family: Inter, sans-serif; /* Added a fallback font */
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  align-item: left
`;

const FormLabel: React.FC<FormLabelProps> = ({ label }) => {
    return (
      <div>
        <Label>{label}</Label>
      </div>
    );
  };

export default FormLabel;
