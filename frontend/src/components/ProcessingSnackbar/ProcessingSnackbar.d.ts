// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { VariantOverrides } from "notistack";

declare module "notistack" {
    interface VariantOverrides {
        processing: true;
    }
}
