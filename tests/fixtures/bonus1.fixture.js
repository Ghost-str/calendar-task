export const INPUT = [
  {
    id: 1,
    user: {
      name: {
        first: "John",
        last: "Doe",
      },
    },
    address: {
      street: "123 Main St",
      city: "Anytown",
      state: "CA",
    },
  },
  {
    id: 2,
    user: {
      name: {
        first: "Jane",
        last: "Doe",
      },
    },
    address: {
      street: "456 Oak St",
      city: "Anytown",
      state: "CA",
    },
  },
  {
    id: 3,
    user: {
      name: {
        first: "John",
        last: "Doe",
      },
    },
    address: {
      street: "789 Elm St",
      city: "Othertown",
      state: "NY",
    },
  },
  {
    id: 4,
    user: {
      name: {
        first: "Bob",
        last: "Smith",
      },
    },
    address: {
      street: "555 Pine St",
      city: "Someville",
      state: "CA",
    },
  },
  {
    id: 5,
    user: {
      name: {
        first: "Jane",
        last: "Smith",
      },
    },
    address: {
      street: "999 Maple St",
      city: "Othertown",
      state: "NY",
    },
  },
];

// address.city
export const UNIQ_BY_CITY = [
  {
    id: 1,
    user: {
      name: {
        first: "John",
        last: "Doe",
      },
    },
    address: {
      street: "123 Main St",
      city: "Anytown",
      state: "CA",
    },
  },
  {
    id: 3,
    user: {
      name: {
        first: "John",
        last: "Doe",
      },
    },
    address: {
      street: "789 Elm St",
      city: "Othertown",
      state: "NY",
    },
  },
  {
    id: 4,
    user: {
      name: {
        first: "Bob",
        last: "Smith",
      },
    },
    address: {
      street: "555 Pine St",
      city: "Someville",
      state: "CA",
    },
  },
];

// user.name.first
export const UNIQ_BY_USER_NAME = [
  {
    id: 1,
    user: {
      name: {
        first: "John",
        last: "Doe",
      },
    },
    address: {
      street: "123 Main St",
      city: "Anytown",
      state: "CA",
    },
  },
  {
    id: 2,
    user: {
      name: {
        first: "Jane",
        last: "Doe",
      },
    },
    address: {
      street: "456 Oak St",
      city: "Anytown",
      state: "CA",
    },
  },
  {
    id: 4,
    user: {
      name: {
        first: "Bob",
        last: "Smith",
      },
    },
    address: {
      street: "555 Pine St",
      city: "Someville",
      state: "CA",
    },
  },
];
