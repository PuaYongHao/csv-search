import { Stack } from "@mui/material";

import "./style.css";

type PageStackProps = {
    children: React.ReactNode;
};

const PageStack = ({ children }: PageStackProps) => {
    return <Stack className="page_stack">{children}</Stack>;
};

export default PageStack;
