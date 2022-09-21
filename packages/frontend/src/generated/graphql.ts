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
};

export type CreateTicket = {
  description: Scalars['String'];
  product: TicketType;
};

export type FieldError = {
  __typename?: 'FieldError';
  field?: Maybe<Scalars['String']>;
  message: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  /** Deletes a ticket */
  deleteTicket: TicketResponse;
  /** Signs a user in */
  login: UserResponse;
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
  createdBy: User;
  noteText: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  /** Returns the roles assigned to the currently logged user */
  getUserRoles: Array<Role>;
  /** Returns the currently logged user */
  me: User;
  /** Returns the Ticket with the given Id */
  ticket: TicketResponse;
  /** Returns all tickets in the collection. Admin only */
  tickets: TicketsResponse;
  /** Returns the tickets that the currently logged user has submitted */
  userTickets: TicketsResponse;
};


export type QueryTicketArgs = {
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
  description: Scalars['String'];
  notes?: Maybe<Array<Note>>;
  product: TicketType;
  status: TicketStatus;
  userDoc: User;
};

export type TicketResponse = {
  __typename?: 'TicketResponse';
  errors?: Maybe<Array<FieldError>>;
  success: Scalars['Boolean'];
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
  success: Scalars['Boolean'];
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

export type LoginMutationVariables = Exact<{
  options: UserLoginInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'UserResponse', errors?: Array<{ __typename?: 'FieldError', message: string, field?: string | null }> | null, user?: { __typename?: 'User', _id: string, email: string, username: string, roles: Array<Role>, token?: string | null } | null } };

export type RegisterMutationVariables = Exact<{
  options: UserRegInput;
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'UserResponse', errors?: Array<{ __typename?: 'FieldError', field?: string | null, message: string }> | null, user?: { __typename?: 'User', _id: string, username: string, email: string, roles: Array<Role>, token?: string | null } | null } };


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