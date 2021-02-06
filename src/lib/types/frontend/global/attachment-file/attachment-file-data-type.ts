/**
 * AttachmentFile Data type
 */
export type AttachmentFileDataType = {
    code: string;
    originalName: string;
    size: number;

    uploaded_at: Date;
    uploaded_by: string;
    deleted_at?: Date;
    deleted_by?: string;

    tags?: [string];
};
