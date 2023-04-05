export interface I_Newslist {
  direction?: string;
  limit?: number;
  page?: number;
  sort?: string;
  title?: string;
}
export interface I_Get_News_Id_Response_Data {
  id: string;
  title: string;
  titleEn: string;
  body: string;
  bodyEn: string;
  image: string;
  newsUrl: string;
  isActive: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
  publishedAt: string;
  type: number;
}
