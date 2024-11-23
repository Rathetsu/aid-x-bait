-- Migrations will appear here as you chat with AI

create table users (
  id bigint primary key generated always as identity,
  username text not null unique,
  email text not null unique,
  password_hash text not null,
  full_name text,
  phone_number text,
  address text,
  latitude numeric(9, 6),
  longitude numeric(9, 6),
  payment_info jsonb,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

create table therapists (
  id bigint primary key generated always as identity,
  full_name text not null,
  email text not null unique,
  phone_number text,
  area_latitude numeric(9, 6),
  area_longitude numeric(9, 6),
  profile jsonb,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

create table consultants (
  id bigint primary key generated always as identity,
  full_name text not null,
  email text not null unique,
  phone_number text,
  specialty text,
  profile jsonb,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

create table products (
  id bigint primary key generated always as identity,
  name text not null,
  description text,
  price numeric(10, 2) not null,
  stock int not null,
  category text,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

create table orders (
  id bigint primary key generated always as identity,
  user_id bigint references users (id),
  total_amount numeric(10, 2) not null,
  status text not null,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

create table order_items (
  id bigint primary key generated always as identity,
  order_id bigint references orders (id),
  product_id bigint references products (id),
  quantity int not null,
  price numeric(10, 2) not null
);

create table exercise_protocols (
  id bigint primary key generated always as identity,
  name text not null,
  description text,
  price numeric(10, 2) not null,
  video_url text,
  instructions jsonb,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

create table user_exercise_history (
  id bigint primary key generated always as identity,
  user_id bigint references users (id),
  protocol_id bigint references exercise_protocols (id),
  completed_at timestamp with time zone
);

create table home_visits (
  id bigint primary key generated always as identity,
  user_id bigint references users (id),
  therapist_id bigint references therapists (id),
  package_size int not null,
  status text not null,
  scheduled_at timestamp with time zone,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

create table online_consultations (
  id bigint primary key generated always as identity,
  user_id bigint references users (id),
  consultant_id bigint references consultants (id),
  category text not null,
  status text not null,
  scheduled_at timestamp with time zone,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

create table carts (
  id bigint primary key generated always as identity,
  user_id bigint references users (id),
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

create table cart_items (
  id bigint primary key generated always as identity,
  cart_id bigint references carts (id),
  product_id bigint references products (id),
  quantity int not null
);