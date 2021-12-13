CREATE TABLE student(
	id SERIAL PRIMARY KEY,
	name VARCHAR(50) NOT NULL,
	regd INTEGER NOT NULL,
	dept VARCHAR(20) NOT NULL
);

INSERT INTO employee (name, regd, dept)
VALUES
('Sahil Das', 01, 'B.tech'),
('Subhrajit Pattnayak', 02, 'MCA'),
('Anil Choudhry', 03, 'MCA'),
('Ipsita Sahoo', 04, 'B.tech');