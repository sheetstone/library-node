module.exports.schema = {
  type: 'object',
  properties: {
    books: {
      type: 'array',
      minItems: 10,
      maxItems: 15,
      items: {
        type: 'object',
        properties: {
          title: {
            type: 'string',
            unique: true,
            minimum: 1,
          },
          genre: {
            enum: ['Fantesy', 'Science Fiction', 'Love'],
          },
          author: {
            type: 'string',
            faker: 'name.findName()',
          },
          read: {
            type: 'boolean',
          },
        },
        required: ['title', 'genre', 'author', 'read'],
      },
    },
  },
  required: ['books'],
};

