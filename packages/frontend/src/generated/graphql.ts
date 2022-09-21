import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
};

export type CreateTicket = {
  description: Scalars['String'];
  product: TicketType;
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  /** Deletes a ticket */
  deleteTicket: TicketResponse;
  /** Signs a user in */
  login: UserResponse;
  logout: Scalars['Boolean'];
  /** Creates a new User */
  register: UserResponse;
  /** Creates a ticket */
  setTicket: TicketResponse;
  /** Creates a note for the given ticket */
  setTicketNote: TicketResponse;
  /** Updates a ticket */
  updateTicket: TicketResponse;
};


export type MutationDeleteTicketArgs = {
  ticketId: Scalars['String'];
};


export type MutationLoginArgs = {
  options: UserLoginInput;
};


export type MutationRegisterArgs = {
  options: UserRegInput;
};


export type MutationSetTicketArgs = {
  ticket: CreateTicket;
};


export type MutationSetTicketNoteArgs = {
  note: Scalars['String'];
  ticketId: Scalars['String'];
};


export type MutationUpdateTicketArgs = {
  ticket: UpdateTicket;
};

export type Note = {
  __typename?: 'Note';
  _id: Scalars['ID'];
  createdAt?: Maybe<Scalars['DateTime']>;
  createdBy: User;
  noteText: Scalars['String'];
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type Query = {
  __typename?: 'Query';
  /** Returns the Ticket with the given Id */
  getTicket: TicketResponse;
  /** Returns all tickets in the collection. Admin only */
  getTickets: TicketsResponse;
  /** Returns the roles assigned to the currently logged user */
  getUserRoles: Array<Role>;
  /** Returns the tickets that the currently logged user has submitted */
  getUserTickets: TicketsResponse;
  /** Returns the currently logged user */
  me: User;
};


export type QueryGetTicketArgs = {
  ticketId: Scalars['String'];
};

/** The user Role */
export enum Role {
  Admin = 'Admin',
  User = 'User'
}

export type Ticket = {
  __typename?: 'Ticket';
  _id: Scalars['ID'];
  createdAt?: Maybe<Scalars['DateTime']>;
  description: Scalars['String'];
  notes?: Maybe<Array<Note>>;
  product: TicketType;
  status: TicketStatus;
  updatedAt?: Maybe<Scalars['DateTime']>;
  userDoc: User;
};

export type TicketResponse = {
  __typename?: 'TicketResponse';
  errors?: Maybe<Array<FieldError>>;
  ticket?: Maybe<Ticket>;
};

/** The status of the ticket */
export enum TicketStatus {
  Closed = 'Closed',
  Open = 'Open',
  Submitted = 'Submitted'
}

/** The type of ticket */
export enum TicketType {
  Engine = 'Engine',
  FrontWing = 'FrontWing',
  FuelPump = 'FuelPump',
  RearWing = 'RearWing',
  Tires = 'Tires'
}

export type TicketsResponse = {
  __typename?: 'TicketsResponse';
  errors?: Maybe<Array<FieldError>>;
  tickets?: Maybe<Array<Ticket>>;
};

export type UpdateTicket = {
  description?: InputMaybe<Scalars['String']>;
  id: Scalars['String'];
  product?: InputMaybe<TicketType>;
  status?: InputMaybe<TicketStatus>;
};

export type User = {
  __typename?: 'User';
  _id: Scalars['ID'];
  email: Scalars['String'];
  roles: Array<Role>;
  token?: Maybe<Scalars['String']>;
  username: Scalars['String'];
};

export type UserLoginInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type UserRegInput = {
  email: Scalars['String'];
  password: Scalars['String'];
  roles?: InputMaybe<Array<Role>>;
  username: Scalars['String'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
};

export type SetTicketMutationVariables = Exact<{
  ticket: CreateTicket;
}>;


export type SetTicketMutation = { __typename?: 'Mutation', setTicket: { __typename?: 'TicketResponse', ticket?: { __typename?: 'Ticket', _id: string, product: TicketType, description: string, status: TicketStatus, createdAt?: any | null, updatedAt?: any | null, userDoc: { __typename?: 'User', _id: string, username: string, email: string, roles: Array<Role>, token?: string | null }, notes?: Array<{ __typename?: 'Note', _id: string, noteText: string, createdAt?: any | null, updatedAt?: any | null, createdBy: { __typename?: 'User', _id: string, username: string, email: string, roles: Array<Role>, token?: string | null } }> | null } | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type UpdateTicketMutationVariables = Exact<{
  ticket: UpdateTicket;
}>;


export type UpdateTicketMutation = { __typename?: 'Mutation', updateTicket: { __typename?: 'TicketResponse', ticket?: { __typename?: 'Ticket', _id: string, product: TicketType, description: string, status: TicketStatus, createdAt?: any | null, updatedAt?: any | null, userDoc: { __typename?: 'User', _id: string, username: string, email: string, roles: Array<Role>, token?: string | null }, notes?: Array<{ __typename?: 'Note', _id: string, noteText: string, createdAt?: any | null, updatedAt?: any | null, createdBy: { __typename?: 'User', _id: string, username: string, email: string, roles: Array<Role>, token?: string | null } }> | null } | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type DeleteTicketMutationVariables = Exact<{
  ticketId: Scalars['String'];
}>;


export type DeleteTicketMutation = { __typename?: 'Mutation', deleteTicket: { __typename?: 'TicketResponse', ticket?: { __typename?: 'Ticket', _id: string, product: TicketType, description: string, status: TicketStatus, createdAt?: any | null, updatedAt?: any | null, userDoc: { __typename?: 'User', _id: string, username: string, email: string, roles: Array<Role>, token?: string | null }, notes?: Array<{ __typename?: 'Note', _id: string, noteText: string, createdAt?: any | null, updatedAt?: any | null, createdBy: { __typename?: 'User', _id: string, username: string, email: string, roles: Array<Role>, token?: string | null } }> | null } | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type SetTicketNoteMutationVariables = Exact<{
  note: Scalars['String'];
  ticketId: Scalars['String'];
}>;


export type SetTicketNoteMutation = { __typename?: 'Mutation', setTicketNote: { __typename?: 'TicketResponse', ticket?: { __typename?: 'Ticket', _id: string, product: TicketType, description: string, status: TicketStatus, createdAt?: any | null, updatedAt?: any | null, userDoc: { __typename?: 'User', _id: string, username: string, email: string, roles: Array<Role>, token?: string | null }, notes?: Array<{ __typename?: 'Note', _id: string, noteText: string, createdAt?: any | null, updatedAt?: any | null, createdBy: { __typename?: 'User', _id: string, username: string, email: string, roles: Array<Role>, token?: string | null } }> | null } | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type LoginMutationVariables = Exact<{
  options: UserLoginInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'UserResponse', errors?: Array<{ __typename?: 'FieldError', message: string, field: string }> | null, user?: { __typename?: 'User', _id: string, email: string, username: string, roles: Array<Role>, token?: string | null } | null } };

export type RegisterMutationVariables = Exact<{
  options: UserRegInput;
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'UserResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, user?: { __typename?: 'User', _id: string, username: string, email: string, roles: Array<Role>, token?: string | null } | null } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: boolean };

export type GetUserTicketsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUserTicketsQuery = { __typename?: 'Query', getUserTickets: { __typename?: 'TicketsResponse', tickets?: Array<{ __typename?: 'Ticket', _id: string, product: TicketType, description: string, status: TicketStatus, createdAt?: any | null, updatedAt?: any | null, userDoc: { __typename?: 'User', _id: string, username: string, email: string, roles: Array<Role>, token?: string | null }, notes?: Array<{ __typename?: 'Note', _id: string, noteText: string, createdAt?: any | null, updatedAt?: any | null, createdBy: { __typename?: 'User', _id: string, username: string, email: string, roles: Array<Role>, token?: string | null } }> | null }> | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type GetTicketsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetTicketsQuery = { __typename?: 'Query', getTickets: { __typename?: 'TicketsResponse', tickets?: Array<{ __typename?: 'Ticket', _id: string, product: TicketType, description: string, status: TicketStatus, createdAt?: any | null, updatedAt?: any | null, userDoc: { __typename?: 'User', _id: string, username: string, email: string, roles: Array<Role>, token?: string | null }, notes?: Array<{ __typename?: 'Note', _id: string, noteText: string, createdAt?: any | null, updatedAt?: any | null, createdBy: { __typename?: 'User', _id: string, username: string, email: string, roles: Array<Role>, token?: string | null } }> | null }> | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type GetTicketQueryVariables = Exact<{
  ticketId: Scalars['String'];
}>;


export type GetTicketQuery = { __typename?: 'Query', getTicket: { __typename?: 'TicketResponse', ticket?: { __typename?: 'Ticket', _id: string, product: TicketType, description: string, status: TicketStatus, createdAt?: any | null, updatedAt?: any | null, userDoc: { __typename?: 'User', _id: string, username: string, email: string, roles: Array<Role>, token?: string | null }, notes?: Array<{ __typename?: 'Note', _id: string, noteText: string, createdAt?: any | null, updatedAt?: any | null, createdBy: { __typename?: 'User', _id: string, username: string, email: string, roles: Array<Role>, token?: string | null } }> | null } | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me: { __typename?: 'User', _id: string, username: string, email: string, roles: Array<Role>, token?: string | null } };


export const SetTicketDocument = gql`
    mutation SetTicket($ticket: CreateTicket!) {
  setTicket(ticket: $ticket) {
    ticket {
      _id
      userDoc {
        _id
        username
        email
        roles
        token
      }
      product
      description
      status
      notes {
        _id
        noteText
        createdBy {
          _id
          username
          email
          roles
          token
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
    errors {
      field
      message
    }
  }
}
    `;

export function useSetTicketMutation() {
  return Urql.useMutation<SetTicketMutation, SetTicketMutationVariables>(SetTicketDocument);
};
export const UpdateTicketDocument = gql`
    mutation UpdateTicket($ticket: UpdateTicket!) {
  updateTicket(ticket: $ticket) {
    ticket {
      _id
      userDoc {
        _id
        username
        email
        roles
        token
      }
      product
      description
      status
      notes {
        _id
        noteText
        createdBy {
          _id
          username
          email
          roles
          token
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
    errors {
      field
      message
    }
  }
}
    `;

export function useUpdateTicketMutation() {
  return Urql.useMutation<UpdateTicketMutation, UpdateTicketMutationVariables>(UpdateTicketDocument);
};
export const DeleteTicketDocument = gql`
    mutation DeleteTicket($ticketId: String!) {
  deleteTicket(ticketId: $ticketId) {
    ticket {
      _id
      userDoc {
        _id
        username
        email
        roles
        token
      }
      product
      description
      status
      notes {
        _id
        noteText
        createdBy {
          _id
          username
          email
          roles
          token
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
    errors {
      field
      message
    }
  }
}
    `;

export function useDeleteTicketMutation() {
  return Urql.useMutation<DeleteTicketMutation, DeleteTicketMutationVariables>(DeleteTicketDocument);
};
export const SetTicketNoteDocument = gql`
    mutation SetTicketNote($note: String!, $ticketId: String!) {
  setTicketNote(note: $note, ticketId: $ticketId) {
    ticket {
      _id
      userDoc {
        _id
        username
        email
        roles
        token
      }
      product
      description
      status
      notes {
        _id
        noteText
        createdBy {
          _id
          username
          email
          roles
          token
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
    errors {
      field
      message
    }
  }
}
    `;

export function useSetTicketNoteMutation() {
  return Urql.useMutation<SetTicketNoteMutation, SetTicketNoteMutationVariables>(SetTicketNoteDocument);
};
export const LoginDocument = gql`
    mutation Login($options: UserLoginInput!) {
  login(options: $options) {
    errors {
      message
      field
    }
    user {
      _id
      email
      username
      roles
      token
    }
  }
}
    `;

export function useLoginMutation() {
  return Urql.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument);
};
export const RegisterDocument = gql`
    mutation Register($options: UserRegInput!) {
  register(options: $options) {
    errors {
      field
      message
    }
    user {
      _id
      username
      email
      roles
      token
    }
  }
}
    `;

export function useRegisterMutation() {
  return Urql.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument);
};
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;

export function useLogoutMutation() {
  return Urql.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument);
};
export const GetUserTicketsDocument = gql`
    query GetUserTickets {
  getUserTickets {
    tickets {
      _id
      userDoc {
        _id
        username
        email
        roles
        token
      }
      product
      description
      status
      notes {
        _id
        noteText
        createdBy {
          _id
          username
          email
          roles
          token
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
    errors {
      field
      message
    }
  }
}
    `;

export function useGetUserTicketsQuery(options?: Omit<Urql.UseQueryArgs<GetUserTicketsQueryVariables>, 'query'>) {
  return Urql.useQuery<GetUserTicketsQuery, GetUserTicketsQueryVariables>({ query: GetUserTicketsDocument, ...options });
};
export const GetTicketsDocument = gql`
    query GetTickets {
  getTickets {
    tickets {
      _id
      userDoc {
        _id
        username
        email
        roles
        token
      }
      product
      description
      status
      notes {
        _id
        noteText
        createdBy {
          _id
          username
          email
          roles
          token
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
    errors {
      field
      message
    }
  }
}
    `;

export function useGetTicketsQuery(options?: Omit<Urql.UseQueryArgs<GetTicketsQueryVariables>, 'query'>) {
  return Urql.useQuery<GetTicketsQuery, GetTicketsQueryVariables>({ query: GetTicketsDocument, ...options });
};
export const GetTicketDocument = gql`
    query GetTicket($ticketId: String!) {
  getTicket(ticketId: $ticketId) {
    ticket {
      _id
      userDoc {
        _id
        username
        email
        roles
        token
      }
      product
      description
      status
      notes {
        _id
        noteText
        createdBy {
          _id
          username
          email
          roles
          token
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
    errors {
      field
      message
    }
  }
}
    `;

export function useGetTicketQuery(options: Omit<Urql.UseQueryArgs<GetTicketQueryVariables>, 'query'>) {
  return Urql.useQuery<GetTicketQuery, GetTicketQueryVariables>({ query: GetTicketDocument, ...options });
};
export const MeDocument = gql`
    query Me {
  me {
    _id
    username
    email
    roles
    token
  }
}
    `;

export function useMeQuery(options?: Omit<Urql.UseQueryArgs<MeQueryVariables>, 'query'>) {
  return Urql.useQuery<MeQuery, MeQueryVariables>({ query: MeDocument, ...options });
};