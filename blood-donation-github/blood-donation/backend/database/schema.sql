-- =========================================================
-- Blood Donation Center - MySQL schema
-- Run this once to create the database and all tables.
--   mysql -u root -p < database/schema.sql
-- =========================================================

CREATE DATABASE IF NOT EXISTS blood_donation
  CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE blood_donation;

-- ---------------------------------------------------------
-- Users: donors + admins (Register.js / Login.js map here)
-- ---------------------------------------------------------
CREATE TABLE IF NOT EXISTS users (
  id                  INT AUTO_INCREMENT PRIMARY KEY,
  full_name           VARCHAR(150) NOT NULL,
  email               VARCHAR(150) NOT NULL UNIQUE,
  phone               VARCHAR(30),
  password_hash       VARCHAR(255) NOT NULL,
  role                ENUM('Donor', 'Admin') NOT NULL DEFAULT 'Donor',

  blood_group         VARCHAR(5),
  age                 INT,
  gender              VARCHAR(20),
  city                VARCHAR(100),
  province            VARCHAR(100),

  times_donated       INT DEFAULT 0,
  last_donated_date   DATE NULL,
  donation_frequency  VARCHAR(50),

  has_illness         ENUM('Yes','No') DEFAULT 'No',
  illness_details     TEXT,
  on_medication       ENUM('Yes','No') DEFAULT 'No',
  medication_details  TEXT,
  had_surgery         ENUM('Yes','No') DEFAULT 'No',

  status              ENUM('Active','Inactive','Suspended') DEFAULT 'Active',
  created_at          TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at          TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- ---------------------------------------------------------
-- Appointments (donation appointments booked by donors)
-- ---------------------------------------------------------
CREATE TABLE IF NOT EXISTS appointments (
  id              INT AUTO_INCREMENT PRIMARY KEY,
  donor_id        INT NOT NULL,
  appointment_date DATE NOT NULL,
  appointment_time TIME NOT NULL,
  location        VARCHAR(150),
  status          ENUM('Pending','Confirmed','Completed','Cancelled') DEFAULT 'Pending',
  notes           TEXT,
  created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (donor_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- ---------------------------------------------------------
-- Blood inventory (stock levels per blood group)
-- ---------------------------------------------------------
CREATE TABLE IF NOT EXISTS blood_inventory (
  id            INT AUTO_INCREMENT PRIMARY KEY,
  blood_group   VARCHAR(5) NOT NULL UNIQUE,
  units_available INT NOT NULL DEFAULT 0,
  updated_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB;

INSERT INTO blood_inventory (blood_group, units_available) VALUES
  ('A+', 0), ('A-', 0), ('B+', 0), ('B-', 0),
  ('O+', 0), ('O-', 0), ('AB+', 0), ('AB-', 0)
ON DUPLICATE KEY UPDATE blood_group = VALUES(blood_group);

-- ---------------------------------------------------------
-- Blood requests (hospitals / patients requesting blood)
-- ---------------------------------------------------------
CREATE TABLE IF NOT EXISTS blood_requests (
  id              INT AUTO_INCREMENT PRIMARY KEY,
  requester_name  VARCHAR(150) NOT NULL,
  contact_number  VARCHAR(30) NOT NULL,
  blood_group     VARCHAR(5) NOT NULL,
  units_needed    INT NOT NULL DEFAULT 1,
  hospital        VARCHAR(150),
  urgency         ENUM('Low','Medium','High','Critical') DEFAULT 'Medium',
  status          ENUM('Pending','Approved','Fulfilled','Rejected') DEFAULT 'Pending',
  notes           TEXT,
  created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- ---------------------------------------------------------
-- Donation history (completed donations, tied to a donor)
-- ---------------------------------------------------------
CREATE TABLE IF NOT EXISTS donations (
  id            INT AUTO_INCREMENT PRIMARY KEY,
  donor_id      INT NOT NULL,
  donation_date DATE NOT NULL,
  blood_group   VARCHAR(5),
  units         INT DEFAULT 1,
  location      VARCHAR(150),
  created_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (donor_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- ---------------------------------------------------------
-- Notifications
-- ---------------------------------------------------------
CREATE TABLE IF NOT EXISTS notifications (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  user_id     INT NULL,
  title       VARCHAR(150) NOT NULL,
  message     TEXT,
  is_read     BOOLEAN DEFAULT FALSE,
  created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- NOTE: no admin account is seeded here because the password must be
-- bcrypt-hashed. After running this schema, create your first admin
-- account by running:  node seedAdmin.js  (see project root)
