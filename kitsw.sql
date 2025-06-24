-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 24, 2025 at 12:57 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `kitsw`
--

-- --------------------------------------------------------

--
-- Table structure for table `skills`
--

CREATE TABLE `skills` (
  `rollno` varchar(20) DEFAULT NULL,
  `skill_name` varchar(20) DEFAULT NULL,
  `proficiency` varchar(20) DEFAULT NULL,
  `isworking` tinyint(1) DEFAULT 1,
  `hours` int(11) DEFAULT 0,
  `monday` int(11) DEFAULT 0,
  `tuesday` int(11) DEFAULT 0,
  `wednesday` int(11) DEFAULT 0,
  `thursday` int(11) DEFAULT 0,
  `friday` int(11) DEFAULT 0,
  `saturday` int(11) DEFAULT 0,
  `sunday` int(11) DEFAULT 0,
  `id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `skills`
--

INSERT INTO `skills` (`rollno`, `skill_name`, `proficiency`, `isworking`, `hours`, `monday`, `tuesday`, `wednesday`, `thursday`, `friday`, `saturday`, `sunday`, `id`) VALUES
('b23ai011', 'c', 'Beginner', 1, 11, 1, 2, 1, 2, 2, 2, 1, 50),
('b23ai011', 'java', 'Intermediate', 1, 10, 2, 2, 2, 1, 1, 1, 1, 51),
('b23ds054', 'c', 'Expert', 0, 15, 2, 1, 2, 3, 3, 2, 2, 52),
('b23ai011', 'react', 'Intermediate', 1, 14, 1, 2, 1, 3, 2, 2, 3, 53),
('b23ds054', 'java', 'Beginner', 1, 10, 2, 1, 1, 2, 1, 1, 2, 54),
('b23ai011', 'python', 'Beginner', 1, 9, 1, 2, 1, 1, 1, 1, 2, 55),
('b23ai011', 'nodejs', 'Intermediate', 1, 12, 1, 2, 2, 2, 2, 1, 2, 56);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `name` varchar(20) DEFAULT NULL,
  `rollno` varchar(20) DEFAULT NULL,
  `password` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`name`, `rollno`, `password`) VALUES
('vyshnavi', 'b23ai011', 'abhinav'),
('Abhinav Rama', 'b23ds054', 'sweety'),
('Simba Rama', 'b24ds054', 'abhiluu'),
('Simba Rama', 'b24ds054', 'abhiluu'),
('sreesha', 'b23ai073', 'sreesha'),
('simba', '123', 'abhiluu'),
('sahika', 'b23cs123L', 'kandu'),
('rasha rehman', 'b23cn098', 'rasha'),
('Aarya Rama', 'b21me036', 'aarya');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `skills`
--
ALTER TABLE `skills`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `skills`
--
ALTER TABLE `skills`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=57;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
