import styled from 'styled-components';
import { motion } from 'framer-motion';
import AuthForm from '@/components/molecules/AuthForm';

    const Panel = styled(motion.div)`
    width: 50%;
    height: 100%;
    padding: ${({ theme }) => theme.spacing(8)};
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 2;
    position: absolute;
    top: 0;
    `;

const ImagePanel = styled(Panel)`
  background: url("/pattern.png") center/cover no-repeat;
`;

const FormPanel = styled(Panel)`
  background: ${({ theme }) => theme.palette.background.paper};
`;

interface Props {
  isRegistering: boolean;
  email: string;
  password: string;
  confirm: string;
  onEmailChange: (v: string) => void;
  onPasswordChange: (v: string) => void;
  onConfirmChange: (v: string) => void;
  onToggle: () => void;
  onSubmit: (e: React.FormEvent) => void;
}

export default function AuthPanel(props: Props) {
  return (
    <>
      <ImagePanel
        initial={{ x: '100%' }}
        animate={{ x: props.isRegistering ? '100%' : '0%' }}
        transition={{ type: 'linear', stiffness: 60 }}
      />
      <FormPanel
        animate={{ x: props.isRegistering ? '0%' : '100%' }}
        transition={{ type: 'linear', stiffness: 60 }}
      >
        <AuthForm {...props} />
      </FormPanel>
    </>
  );
}