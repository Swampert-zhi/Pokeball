/*==============================================================*/
/* DBMS name:      MySQL 5.0                                    */
/* Created on:     2020/4/21 18:06:19                           */
/*==============================================================*/




drop table if exists Cart;

drop table if exists Orderitem;

drop table if exists Userorder;

drop table if exists Book;

drop table if exists User;

/*==============================================================*/
/* Table: Book                                                  */
/*==============================================================*/
create table Book
(
   book_id              integer not null auto_increment,
   isbn                 varchar(13) not null,
   title                varchar(50) ,
   author               varchar(100),
   language             varchar(20),
   price                decimal(10,2) not null default 0.00,
   stock                integer not null default 0,
   exist                boolean not null default 1,
   primary key (book_id),
   unique (isbn)
);

/*==============================================================*/
/* Table: Cart                                                  */
/*==============================================================*/
create table Cart
(   
   cart_id              integer not null auto_increment,
   id                   integer not null,
   book_id              integer not null,
   num                  integer not null default 0,
   primary key (cart_id),
   unique(id,book_id)
);

/*==============================================================*/
/* Table: Orderitem                                             */
/*==============================================================*/
create table Orderitem
(
   item_id              integer not null auto_increment,
   order_id             integer not null,
   book_id              integer not null,
   num                  integer not null default 1,
   oldprice             decimal(10,2) not null default 0.00,
   primary key (item_id),
   unique(order_id,book_id)
);

/*==============================================================*/
/* Table: User                                                  */
/*==============================================================*/
create table User
(
   id                   integer not null auto_increment,
   username             varchar(20) not null,
   password             varchar(100) not null,
   name                 varchar(30),
   email                varchar(50) not null,
   role                 boolean not null default 0,/*0-customer,1-administrator*/
   usable               boolean not null default 1,
   primary key (id),
   unique (username)
);

/*==============================================================*/
/* Table: Userorder                                             */
/*==============================================================*/
create table Userorder
(
   order_id             integer not null auto_increment,
   id                   integer not null,
   ordertime            timestamp default CURRENT_TIMESTAMP,
   primary key (order_id)
);

alter table Cart add constraint FK_Cart foreign key (id)
      references User (id) on delete restrict on update restrict;

alter table Cart add constraint FK_Cart2 foreign key (book_id)
      references Book (book_id) on delete restrict on update restrict;

alter table Orderitem add constraint FK_Reference_3 foreign key (order_id)
      references Userorder (order_id) on delete restrict on update restrict;

alter table Orderitem add constraint FK_Reference_6 foreign key (book_id)
      references Book (book_id) on delete restrict on update restrict;

alter table Userorder add constraint FK_Reference_7 foreign key (id)
      references User (id) on delete restrict on update restrict;