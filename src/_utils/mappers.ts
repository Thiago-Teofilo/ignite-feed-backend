export interface HTTPUser {
  name: string;
  email: string;
  avatarUrl?: string | null;
  role: string;
}

export interface HTTPSession {
  token: string;
  user: HTTPUser;
}

export interface HTTPPost {
  id: string;
  content: string;
  publishedAt: Date;
  author: HTTPUser;
  comments: HTTPComment[];
}

export interface HTTPComment {
  id: string;
  content: string;
  publishedAt: Date;
  author: HTTPUser;
}
