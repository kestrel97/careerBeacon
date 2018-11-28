create table university (
Uni_ID int(4) not null primary key,
uni_Name varchar(30) not null,
uni_address varchar(30) not null,
uni_rank int(2),
uni_city varchar(15) not null) ;

 create table broaderfield (
 bf_id int(4) primary key,
 unibf_uid int(4),
 bf_name varchar(20),
 foreign key(unibf_uid) references university(uni_id));

 create table criteria (
 cri_ID int(4) not null primary key,
 cri_eligibility varchar(5) not null,
 cri_bfid int(4) not null,
 cri_uid int(4) not null,
 foreign key(cri_bfid) references broaderfield(bf_id),
 foreign key(cri_uid) references university(uni_id));

 create table student (
 std_ID int(4) not null primary key,
 username varchar(25) not null unique,
 std_password varchar(25) not null,
 percentage int(3) not null,
 preferences varchar(25) not null,
 background varchar(25) not null
 );

 create table testt (
 qid int(4) not null primary key,
 questions varchar(100)
 );

 create table options (
 op_ID int(4) not null primary key,
 body varchar(50),
 flag INT not null,
 op_qid int(4) not null,
 foreign key(op_qid) references test(qid));
