/**
 * User domain types — mirror the JSONPlaceholder /users endpoint shape.
 *
 * The API returns nested `address` (with `geo`) and `company` objects.
 * The form layer flattens these for editing, then the form's `onSubmit`
 * re-nests them before calling the service — see UserForm for the
 * flatten ↔ nest helpers.
 */
export type Geo = {
  lat: string;
  lng: string;
};

export type Address = {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: Geo;
};

export type Company = {
  name: string;
  catchPhrase: string;
  bs: string;
};

export type User = {
  id: number;
  name: string;
  username: string;
  email: string;
  address: Address;
  phone: string;
  website: string;
  company: Company;
};

/** Payload for `POST /users` — server assigns the id. */
export type CreateUserInput = {
  name: string;
  username: string;
  email: string;
  address: Address;
  phone: string;
  website: string;
  company: Company;
};

/** Payload for `PUT /users/:id` or `PATCH /users/:id`. */
export type UpdateUserInput = Partial<CreateUserInput>;
