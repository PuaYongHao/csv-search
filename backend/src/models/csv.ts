import { Document, Schema, model } from "mongoose";

interface CSVEntryInterface {
    postId: String;
    id: String;
    name: String;
    email: String;
    body: String;
}

interface CSVInterface extends Document {
    data: CSVEntryInterface[];
}

const CSVSchema = new Schema<CSVInterface>({
    data: [
        {
            postId: { type: String, required: true },
            id: { type: String, required: true },
            name: { type: String, required: true },
            email: { type: String, required: true },
            body: { type: String, required: true },
        },
    ],
});

const CSVModel = model("csv", CSVSchema);
export default CSVModel;
