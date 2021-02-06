import { AttachmentFileDataType } from "./attachment-file-data-type";
import { AttachmentInfoDataType } from "./attachment-info-data-type";

/**
 * Attachment Data type
 */
export type AttachmentDataType = {
    type: string;
    data: [AttachmentInfoDataType];
    attachments: [AttachmentFileDataType];
};
