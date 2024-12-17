import PageContainer from "../components/PageContainer";
import PageStack from "../components/PageStack";
import { CSVContextProvider } from "../contexts/CSVContext";
import { DialogContextProvider } from "../contexts/DialogContext";
import CSVSearchTableContent from "../features/CSVSearchTableContent";

const HomePageComponent = () => {
    return (
        <PageStack>
            <PageContainer>
                <DialogContextProvider>
                    <CSVContextProvider>
                        <CSVSearchTableContent />
                    </CSVContextProvider>
                </DialogContextProvider>
            </PageContainer>
        </PageStack>
    );
};

export default HomePageComponent;
