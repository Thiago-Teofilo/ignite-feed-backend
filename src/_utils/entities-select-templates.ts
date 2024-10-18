export const userSelects = {
  id: true,
  name: true,
  email: true,
  avatarUrl: true,
  bannerUrl: true,
  role: true,
};

export const postSelects = {
  id: true,
  content: true,
  publishedAt: true,
  author: {
    select: userSelects,
  },
  Comment: {
    select: {
      id: true,
      content: true,
      publishedAt: true,
      author: {
        select: userSelects,
      },
      CommentLike: {
        select: {
          id: true,
          userId: true,
        },
      },
    },
  },
};

export const commentSelect = {
  id: true,
  content: true,
  publishedAt: true,
  author: {
    select: userSelects,
  },
  CommentLike: {
    select: {
      id: true,
      userId: true,
    },
  },
};

export const sessionSelect = {
  token: true,
  user: {
    select: userSelects,
  },
};

export const rootPostSelects = {
  id: true,
  content: true,
  publishedAt: true,
  author: {
    select: userSelects,
  },
  Comment: {
    select: commentSelect,
  },
};
