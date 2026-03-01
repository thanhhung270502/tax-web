export enum EAllowedFileTypes {
  PDF = "application/pdf",
  DOCX = "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  DOC = "application/msword",
  JPEG = "image/jpeg",
  PNG = "image/png",
  JPG = "image/jpg",
  CSV = "text/csv",
}

export enum EUploadFileStatus {
  PENDING = "pending",
  UPLOADING = "uploading",
  SUCCESS = "success",
  ERROR = "error",
}
