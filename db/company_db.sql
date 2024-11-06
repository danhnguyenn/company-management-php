-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Nov 06, 2024 at 11:19 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `company_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `AttendanceRecords`
--

CREATE TABLE `AttendanceRecords` (
  `record_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `check_in` datetime DEFAULT NULL,
  `check_out` datetime DEFAULT NULL,
  `date` date NOT NULL,
  `status` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `AttendanceRules`
--

CREATE TABLE `AttendanceRules` (
  `rule_id` int(11) NOT NULL,
  `working_hours` int(11) NOT NULL,
  `break_time` int(11) DEFAULT NULL,
  `penalty_policy` text DEFAULT NULL,
  `created_by` int(11) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `LeaveRequests`
--

CREATE TABLE `LeaveRequests` (
  `request_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `leave_type` varchar(50) DEFAULT NULL,
  `reason` text DEFAULT NULL,
  `start_date` date NOT NULL,
  `end_date` date NOT NULL,
  `status` varchar(50) DEFAULT 'Pending',
  `approved_by` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `Notifications`
--

CREATE TABLE `Notifications` (
  `notification_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `content` text DEFAULT NULL,
  `date` datetime NOT NULL DEFAULT current_timestamp(),
  `status` varchar(50) DEFAULT 'Unread'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `PasswordResets`
--

CREATE TABLE `PasswordResets` (
  `reset_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `reset_token` varchar(255) NOT NULL,
  `expires_at` datetime NOT NULL,
  `status` varchar(50) DEFAULT 'Pending'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `Reports`
--

CREATE TABLE `Reports` (
  `report_id` int(11) NOT NULL,
  `generated_by` int(11) NOT NULL,
  `approved_by` int(11) DEFAULT NULL,
  `content` text DEFAULT NULL,
  `date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `Roles`
--

CREATE TABLE `Roles` (
  `role_id` int(11) NOT NULL,
  `role_name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `Roles`
--

INSERT INTO `Roles` (`role_id`, `role_name`) VALUES
(1, 'Admin');

-- --------------------------------------------------------

--
-- Table structure for table `SalaryRecords`
--

CREATE TABLE `SalaryRecords` (
  `salary_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `base_salary` decimal(10,2) NOT NULL,
  `allowances` decimal(10,2) DEFAULT NULL,
  `deductions` decimal(10,2) DEFAULT NULL,
  `net_salary` decimal(10,2) NOT NULL,
  `generated_by` int(11) NOT NULL,
  `approved_by` int(11) DEFAULT NULL,
  `date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `Users`
--

CREATE TABLE `Users` (
  `user_id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role_id` int(11) DEFAULT NULL,
  `phone_number` varchar(20) DEFAULT NULL,
  `profile_picture` varchar(255) DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `Users`
--

INSERT INTO `Users` (`user_id`, `email`, `password`, `role_id`, `phone_number`, `profile_picture`, `created_at`) VALUES
(2, 'admin@gmail.com', '$2y$10$EVwTp66HQHuxTOC.2eswMuUKPXlyz55t2894DCyv4bsbzQq6lUZAC', 1, '0927999999', NULL, '2024-11-01 21:42:46');

-- --------------------------------------------------------

--
-- Table structure for table `ViolationReports`
--

CREATE TABLE `ViolationReports` (
  `report_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `violation_type` varchar(50) DEFAULT NULL,
  `date` date NOT NULL,
  `handled_by` int(11) DEFAULT NULL,
  `status` varchar(50) DEFAULT 'Unresolved'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `AttendanceRecords`
--
ALTER TABLE `AttendanceRecords`
  ADD PRIMARY KEY (`record_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `AttendanceRules`
--
ALTER TABLE `AttendanceRules`
  ADD PRIMARY KEY (`rule_id`),
  ADD KEY `created_by` (`created_by`);

--
-- Indexes for table `LeaveRequests`
--
ALTER TABLE `LeaveRequests`
  ADD PRIMARY KEY (`request_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `approved_by` (`approved_by`);

--
-- Indexes for table `Notifications`
--
ALTER TABLE `Notifications`
  ADD PRIMARY KEY (`notification_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `PasswordResets`
--
ALTER TABLE `PasswordResets`
  ADD PRIMARY KEY (`reset_id`),
  ADD UNIQUE KEY `reset_token` (`reset_token`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `Reports`
--
ALTER TABLE `Reports`
  ADD PRIMARY KEY (`report_id`),
  ADD KEY `generated_by` (`generated_by`),
  ADD KEY `approved_by` (`approved_by`);

--
-- Indexes for table `Roles`
--
ALTER TABLE `Roles`
  ADD PRIMARY KEY (`role_id`),
  ADD UNIQUE KEY `role_name` (`role_name`);

--
-- Indexes for table `SalaryRecords`
--
ALTER TABLE `SalaryRecords`
  ADD PRIMARY KEY (`salary_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `generated_by` (`generated_by`),
  ADD KEY `approved_by` (`approved_by`);

--
-- Indexes for table `Users`
--
ALTER TABLE `Users`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `role_id` (`role_id`);

--
-- Indexes for table `ViolationReports`
--
ALTER TABLE `ViolationReports`
  ADD PRIMARY KEY (`report_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `handled_by` (`handled_by`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `AttendanceRecords`
--
ALTER TABLE `AttendanceRecords`
  MODIFY `record_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `AttendanceRules`
--
ALTER TABLE `AttendanceRules`
  MODIFY `rule_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `LeaveRequests`
--
ALTER TABLE `LeaveRequests`
  MODIFY `request_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `Notifications`
--
ALTER TABLE `Notifications`
  MODIFY `notification_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `PasswordResets`
--
ALTER TABLE `PasswordResets`
  MODIFY `reset_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `Reports`
--
ALTER TABLE `Reports`
  MODIFY `report_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `Roles`
--
ALTER TABLE `Roles`
  MODIFY `role_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `SalaryRecords`
--
ALTER TABLE `SalaryRecords`
  MODIFY `salary_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `Users`
--
ALTER TABLE `Users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `ViolationReports`
--
ALTER TABLE `ViolationReports`
  MODIFY `report_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `AttendanceRecords`
--
ALTER TABLE `AttendanceRecords`
  ADD CONSTRAINT `attendancerecords_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `Users` (`user_id`);

--
-- Constraints for table `AttendanceRules`
--
ALTER TABLE `AttendanceRules`
  ADD CONSTRAINT `attendancerules_ibfk_1` FOREIGN KEY (`created_by`) REFERENCES `Users` (`user_id`);

--
-- Constraints for table `LeaveRequests`
--
ALTER TABLE `LeaveRequests`
  ADD CONSTRAINT `leaverequests_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `Users` (`user_id`),
  ADD CONSTRAINT `leaverequests_ibfk_2` FOREIGN KEY (`approved_by`) REFERENCES `Users` (`user_id`);

--
-- Constraints for table `Notifications`
--
ALTER TABLE `Notifications`
  ADD CONSTRAINT `notifications_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `Users` (`user_id`);

--
-- Constraints for table `PasswordResets`
--
ALTER TABLE `PasswordResets`
  ADD CONSTRAINT `passwordresets_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `Users` (`user_id`);

--
-- Constraints for table `Reports`
--
ALTER TABLE `Reports`
  ADD CONSTRAINT `reports_ibfk_1` FOREIGN KEY (`generated_by`) REFERENCES `Users` (`user_id`),
  ADD CONSTRAINT `reports_ibfk_2` FOREIGN KEY (`approved_by`) REFERENCES `Users` (`user_id`);

--
-- Constraints for table `SalaryRecords`
--
ALTER TABLE `SalaryRecords`
  ADD CONSTRAINT `salaryrecords_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `Users` (`user_id`),
  ADD CONSTRAINT `salaryrecords_ibfk_2` FOREIGN KEY (`generated_by`) REFERENCES `Users` (`user_id`),
  ADD CONSTRAINT `salaryrecords_ibfk_3` FOREIGN KEY (`approved_by`) REFERENCES `Users` (`user_id`);

--
-- Constraints for table `Users`
--
ALTER TABLE `Users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`role_id`) REFERENCES `Roles` (`role_id`);

--
-- Constraints for table `ViolationReports`
--
ALTER TABLE `ViolationReports`
  ADD CONSTRAINT `violationreports_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `Users` (`user_id`),
  ADD CONSTRAINT `violationreports_ibfk_2` FOREIGN KEY (`handled_by`) REFERENCES `Users` (`user_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
