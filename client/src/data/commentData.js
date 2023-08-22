export const commentData = [
  {
    id: 1,
    content: "This is a comment 1",
    createdAt: "01-09-2023",
    updatedAt: "01-09-2023",
    belongsToCommentId: null,
    postId: 1,
    user: {
      id: 101,
      firstName: "Anh",
      lastName: "Nguyễn",
      avatar:
        "https://u4d2z7k9.rocketcdn.me/wp-content/uploads/2021/10/rsz_sk_rahaman_hossain_1-min.jpg",
    },
  },
  {
    id: 2,
    content: "This is a comment 2",
    createdAt: "02-09-2023",
    updatedAt: "02-09-2023",
    belongsToCommentId: null,
    user: {
      id: 102,
      firstName: "Mãi",
      lastName: "Văn",
      avatar:
        "https://u4d2z7k9.rocketcdn.me/wp-content/uploads/2021/10/rsz_sk_rahaman_hossain_1-min.jpg",
    },
    comments: [
      {
        id: 3,
        content: "This is a reply comment 2 - 1",
        createdAt: "03-09-2023",
        updatedAt: "03-09-2023",
        belongsToCommentId: 2,
        postId: 1,
        user: {
          id: 101,
          firstName: "Anh",
          lastName: "Nguyễn",
          avatar:
            "https://u4d2z7k9.rocketcdn.me/wp-content/uploads/2021/10/rsz_sk_rahaman_hossain_1-min.jpg",
        },
      },
      {
        id: 4,
        content: "This is a replly comment 2 - 2",
        createdAt: "03-09-2023",
        updatedAt: "03-09-2023",
        belongsToCommentId: 2,
        postId: 1,
        user: {
          id: 101,
          firstName: "Anh",
          lastName: "Nguyễn",
          avatar:
            "https://u4d2z7k9.rocketcdn.me/wp-content/uploads/2021/10/rsz_sk_rahaman_hossain_1-min.jpg",
        },
      }
    ],
  },
];
