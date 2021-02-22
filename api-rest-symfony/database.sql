CREATE DATABASE `ossian`;

use `ossian`;

CREATE TABLE `images` (
  `idImage` int(255) NOT NULL AUTO_INCREMENT,
  `title` varchar(50) NOT NULL,
  `description` varchar(600) NOT NULL,
  `category` varchar(50) NOT NULL,
  `url` varchar(255) NOT NULL,
  PRIMARY KEY (`idImage`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;