const posts = [
    {
      "id": 1,
      "content": "Lorem ipsum dolor sit amet.",
      "timestamp": "2023-08-06T10:00:00Z",
      "is_lock": false,
      "image": "https://u4d2z7k9.rocketcdn.me/wp-content/uploads/2021/10/rsz_sk_rahaman_hossain_1-min.jpg",
      "user": {
        "id": 101,
        "first_name": "John",
        "last_name": "Doe",
        "avatar": "https://res.cloudinary.com/dougpz2fu/image/upload/v1691309723/mobile-assets/blank_avatar_peyifv.jpg"
      }
    },
    {
      "id": 2,
      "content": "Consectetur adipiscing elit.",
      "timestamp": "2023-08-06T11:30:00Z",
      "is_lock": true,
      "image": "https://u4d2z7k9.rocketcdn.me/wp-content/uploads/2021/10/rsz_sk_rahaman_hossain_1-min.jpg",
      "user": {
        "id": 102,
        "first_name": "Jane",
        "last_name": "Smith",
        "avatar": "https://res.cloudinary.com/dougpz2fu/image/upload/v1691309723/mobile-assets/blank_avatar_peyifv.jpg"
      }
    },
    {
      "id": 3,
      "content": "Sed do eiusmod tempor incididunt.",
      "timestamp": "2023-08-06T12:45:00Z",
      "is_lock": false,
      "image": "https://u4d2z7k9.rocketcdn.me/wp-content/uploads/2021/10/rsz_sk_rahaman_hossain_1-min.jpg",
      "user": {
        "id": 103,
        "first_name": "Alice",
        "last_name": "Johnson",
        "avatar": "https://res.cloudinary.com/dougpz2fu/image/upload/v1691309723/mobile-assets/blank_avatar_peyifv.jpg"
      }
    },
    {
      "id": 4,
      "content": "Ut labore et dolore magna aliqua.",
      "timestamp": "2023-08-06T14:15:00Z",
      "is_lock": true,
      "image": "https://u4d2z7k9.rocketcdn.me/wp-content/uploads/2021/10/rsz_sk_rahaman_hossain_1-min.jpg",
      "user": {
        "id": 104,
        "first_name": "Bob",
        "last_name": "Williams",
        "avatar": "https://res.cloudinary.com/dougpz2fu/image/upload/v1691309723/mobile-assets/blank_avatar_peyifv.jpg"
      }
    },
    {
      "id": 5,
      "content": "Excepteur sint occaecat cupidatat non proident.",
      "timestamp": "2023-08-06T15:30:00Z",
      "is_lock": false,
      "image": "https://u4d2z7k9.rocketcdn.me/wp-content/uploads/2021/10/rsz_sk_rahaman_hossain_1-min.jpg",
      "user": {
        "id": 105,
        "first_name": "Eve",
        "last_name": "Brown",
        "avatar": "https://res.cloudinary.com/dougpz2fu/image/upload/v1691309723/mobile-assets/blank_avatar_peyifv.jpg"
      }
    },
    {
      "id": 6,
      "content": "Sunt in culpa qui officia deserunt mollit anim id est laborum.",
      "timestamp": "2023-08-06T16:45:00Z",
      "is_lock": true,
      "image": "https://u4d2z7k9.rocketcdn.me/wp-content/uploads/2021/10/rsz_sk_rahaman_hossain_1-min.jpg",
      "user": {
        "id": 106,
        "first_name": "Michael",
        "last_name": "Davis",
        "avatar": "https://res.cloudinary.com/dougpz2fu/image/upload/v1691309723/mobile-assets/blank_avatar_peyifv.jpg"
      }
    },
    {
      "id": 7,
      "content": "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
      "timestamp": "2023-08-06T18:00:00Z",
      "is_lock": false,
      "image": "https://u4d2z7k9.rocketcdn.me/wp-content/uploads/2021/10/rsz_sk_rahaman_hossain_1-min.jpg",
      "user": {
        "id": 107,
        "first_name": "Emily",
        "last_name": "Miller",
        "avatar": "https://res.cloudinary.com/dougpz2fu/image/upload/v1691309723/mobile-assets/blank_avatar_peyifv.jpg"
      }
    },
    {
      "id": 8,
      "content": "Cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      "timestamp": "2023-08-06T19:15:00Z",
      "is_lock": true,
      "image": "https://u4d2z7k9.rocketcdn.me/wp-content/uploads/2021/10/rsz_sk_rahaman_hossain_1-min.jpg",
      "user": {
        "id": 108,
        "first_name": "William",
        "last_name": "Jones",
        "avatar": "https://res.cloudinary.com/dougpz2fu/image/upload/v1691309723/mobile-assets/blank_avatar_peyifv.jpg"
      }
    },
    {
      "id": 9,
      "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      "timestamp": "2023-08-06T20:30:00Z",
      "is_lock": false,
      "image": "https://u4d2z7k9.rocketcdn.me/wp-content/uploads/2021/10/rsz_sk_rahaman_hossain_1-min.jpg",
      "user": {
        "id": 109,
        "first_name": "Olivia",
        "last_name": "Wilson",
        "avatar": "https://res.cloudinary.com/dougpz2fu/image/upload/v1691309723/mobile-assets/blank_avatar_peyifv.jpg"
      }
    },
    {
      "id": 10,
      "content": "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      "timestamp": "2023-08-06T21:45:00Z",
      "is_lock": true,
      "image": "https://u4d2z7k9.rocketcdn.me/wp-content/uploads/2021/10/rsz_sk_rahaman_hossain_1-min.jpg",
      "user": {
        "id": 110,
        "first_name": "Liam",
        "last_name": "Martin",
        "avatar": "https://res.cloudinary.com/dougpz2fu/image/upload/v1691309723/mobile-assets/blank_avatar_peyifv.jpg"
      }
    }
];

export default posts;
  