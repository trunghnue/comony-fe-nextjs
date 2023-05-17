import { I_TagListItem } from "./tag";

export interface I_SpaceListDTO {
  anonymous: number;
  category: Object;
  categoryId: number;
  coverDataValue: string;
  coverDefaultImageUrl: string;
  coverType: number;
  createdAt: string;
  deepLink: string;
  deletedAt?: string;
  description: string;
  embedUrl: string;
  id: string;
  isRecommended: number;
  numFavorites: number;
  numViewers: number;
  orders?: string;
  publishedDate: string;
  publishedStatus: number;
  shortLink: string;
  tags: I_TagListItem[];
  thumbnailUrl: string;
  title: string;
  updatedAt: string;
  userSpaces: [];
  uuid?: number;
}

export interface I_SpaceListRequest {
  page?: number;
  limit?: number;
  sort?: string;
  sortAlias?: string;
  subSort?: string;
  subDirection?: string;
  publishedStatus?: number;
  direction?: string;
  categoryId?: number;
  include?: string;
  userId?: number;
  workspaceId?: string;
  isRandom?: number;
}
