import styled from "styled-components";
import AuthPanel from "@/components/organisms/AuthPanel";
import ThemeToggleButton from "@/components/atoms/ThemeToggleButton";
import { Stack, Box } from "@mui/material";
const Wrapper = styled.div`
  background: ${({ theme }) => theme.palette.background.default};
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Container = styled.div`
  width: 800px;
  height: 624px; // múltiplo de 8
  position: relative;
  overflow: hidden;
  border-radius: 16px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
`;

export default function AuthTemplate(props: any) {
  return (
    <>
      <Box display="flex" justifyContent="flex-end" mb={4}>
        <ThemeToggleButton />
      </Box>
      <Wrapper>
        <Container>
          <AuthPanel {...props} />
        </Container>
      </Wrapper>
    </>
  );
}
