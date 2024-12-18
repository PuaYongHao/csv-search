import PageContainer from "../components/PageContainer";
import { CSVContextProvider } from "../contexts/CSVContext";
import { DialogContextProvider } from "../contexts/DialogContext";
import CSVSearchTableContent from "../features/CSVSearchTableContent";

const HomePageComponent = () => {
    return (
        <PageContainer>
            <DialogContextProvider>
                <CSVContextProvider>
                    <CSVSearchTableContent />
                </CSVContextProvider>
            </DialogContextProvider>
        </PageContainer>
    );
};

export default HomePageComponent;
