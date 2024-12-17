import PageContainer from "../components/PageContainer";
import PageStack from "../components/PageStack";
import { DialogContextProvider } from "../contexts/DialogContext";
import CSVSearchTableContent from "../features/CSVSearchTableContent";

const HomePageComponent = () => {
  return (
    <PageStack>
      <PageContainer>
        <DialogContextProvider>
          <CSVSearchTableContent />
        </DialogContextProvider>
      </PageContainer>
    </PageStack>
  );
};

export default HomePageComponent;
