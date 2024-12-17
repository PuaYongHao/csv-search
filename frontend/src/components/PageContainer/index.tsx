import { Container } from "@mui/material";
import "./style.css";

type PageContainerProps = {
  children: React.ReactNode;
};

const PageContainer = ({ children }: PageContainerProps) => {
  return (
    <Container className="page_container" maxWidth={false}>
      {children}
    </Container>
  );
};

export default PageContainer;
