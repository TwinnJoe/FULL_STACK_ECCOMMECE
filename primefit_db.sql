CREATE DATABASE IF NOT EXISTS `primefit`;
USE `primefit`;

-- Admin Table
CREATE TABLE `admin` (
  `admin_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL UNIQUE,
  `password` varchar(255) NOT NULL,
  PRIMARY KEY (`admin_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Store (Products) Table
CREATE TABLE `store` (
  `product_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `price` decimal(10,2) NOT NULL CHECK (price >= 0),
  `stock` int NOT NULL DEFAULT '0',
  `supplier` varchar(100) NOT NULL,
  `categories` enum('All','Gym Equipment','Gym Attire','Fitness Trackers') NOT NULL DEFAULT 'All',
  `image_url` JSON NULL,
  PRIMARY KEY (`product_id`),
  INDEX idx_category (`categories`),
  INDEX idx_name (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Personal Trainers Table
CREATE TABLE `personal_trainers` (
  `trainer_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL UNIQUE,
  `password` varchar(255) NOT NULL,
  `specialization` varchar(255) NOT NULL,
  `experience` int NOT NULL,
  `image_url` varchar(255) NOT NULL DEFAULT '',
  PRIMARY KEY (`trainer_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Subscriptions Table
CREATE TABLE `subscriptions` (
  `subscription_id` int NOT NULL AUTO_INCREMENT,
  `name` ENUM('Basic', 'Pro', 'Premium') NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `features` text NOT NULL,
  `duration_months` ENUM('12 months','24 months','36 months') NOT NULL DEFAULT '12 months',
  PRIMARY KEY (`subscription_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Users Table
CREATE TABLE `users` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL UNIQUE,
  `password` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `subscription_id` int NULL,
  PRIMARY KEY (`user_id`),
  FOREIGN KEY (`subscription_id`) REFERENCES `subscriptions`(`subscription_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Orders Table
CREATE TABLE `orders` (
  `order_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `order_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `total_amount` decimal(10,2) NOT NULL,
  `order_status` enum('pending','completed','cancelled') DEFAULT 'pending',
  `subscription_status` varchar(255) NOT NULL,
  PRIMARY KEY (`order_id`),
  FOREIGN KEY (`user_id`) REFERENCES `users`(`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Order Items Table (to link products with orders)
CREATE TABLE `order_items` (
  `order_item_id` int NOT NULL AUTO_INCREMENT,
  `order_id` int NOT NULL,
  `product_id` int NOT NULL,
  `quantity` int NOT NULL,
  `price` decimal(10,2) NOT NULL,
  PRIMARY KEY (`order_item_id`),
  FOREIGN KEY (`order_id`) REFERENCES `orders`(`order_id`) ON DELETE CASCADE,
  FOREIGN KEY (`product_id`) REFERENCES `store`(`product_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Bookings Table
CREATE TABLE `bookings` (
  `booking_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `trainer_id` int NOT NULL,
  `session_date` date NOT NULL,
  `session_time` time NOT NULL,
  `status` enum('pending', 'confirmed', 'cancelled') NULL DEFAULT 'pending',
  PRIMARY KEY (`booking_id`),
  FOREIGN KEY (`user_id`) REFERENCES `users`(`user_id`) ON DELETE CASCADE,
  FOREIGN KEY (`trainer_id`) REFERENCES `personal_trainers`(`trainer_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Inserting Data
INSERT INTO `admin` (`name`, `email`, `password`) VALUES
('Borris Johnson', 'borris.johnson@email.com', 'hashed_password');

-- (Insert other data as previously defined...)


INSERT INTO `store` (`name`, `description`, `price`, `stock`, `supplier`, `categories`, `image_url`) VALUES
-- Gym Equipment
('Adjustable Dumbbell', 'No matter how you train, our adjustable dumbbells make getting a complete workout smoother than you ever imagined. Weight: 21 kg. Dimensions: 40.5 × 19 × 17.8 cm. Set Includes: 2x 20-kg Dumbbells, 2 Cradles.', 15.373, 100, 'JOHNSON', 'Gym Equipment', 
'{"images":["https://github.com/seranger/E-commerece_Project/blob/main/frontend/public/images/products/Gym-Equipment/adjustable%20dumbell.jpg?raw=true",
 "https://github.com/seranger/E-commerece_Project/blob/main/frontend/public/images/products/Gym-Equipment/dumbell-1.jpg?raw=true",
 "https://github.com/seranger/E-commerece_Project/blob/main/frontend/public/images/products/Gym-Equipment/dumbell-2.jpg?raw=true"]}'),
 
('Adjustable Bench', 'Bring commercial-rated toughness and club-quality function to your home with our stylish Multi-adjustable Bench. Weight: 36 kg. Dimensions: 142.4 × 77.5 × 43.7 cm. Bench Height: 44cm. Backrest Adjustment Range: 5 Position Angles: 0, 30, 45, 60, 75. Seat Adjustment Range: 2 Position Angles; 0, 20.', 11.999, 50, 'JOHNSON', 'Gym Equipment', 
'{"images":["https://github.com/seranger/E-commerece_Project/blob/main/frontend/public/images/products/Gym-Equipment/adjustable-bench.jpg?raw=true", 
"https://github.com/seranger/E-commerece_Project/blob/main/frontend/public/images/products/Gym-Equipment/bench-1.jpg?raw=true", 
"https://github.com/seranger/E-commerece_Project/blob/main/frontend/public/images/products/Gym-Equipment/bench-2.jpg?raw=true"]}'),

('Horizon 3.0SC Indoor Cycle', 'If it’s hard to find time and energy for a workout, our Indoor Cycle 3.0SC can reinvigorate your senses while fitting your space, schedule and goals perfectly. Dimensions: 107 × 52 × 120 cm. Model Number: 3.0SC. Flywheel: 8 Color changing flywheel. Handlebars: Vertically Adjustable. Pedals: Self-balancing Pedals with Adjustable Straps. Seat: Ergo Seat.', 12.999, 30, 'JOHNSON', 'Gym Equipment', 
'{"images":["https://github.com/seranger/E-commerece_Project/blob/main/frontend/public/images/products/Gym-Equipment/horizon.jpg?raw=true", 
"https://github.com/seranger/E-commerece_Project/blob/main/frontend/public/images/products/Gym-Equipment/horizon-1.jpg?raw=true", 
"https://github.com/seranger/E-commerece_Project/blob/main/frontend/public/images/products/Gym-Equipment/horizon-2.jpg?raw=true"]}'),

('Horizon EX59 Elliptical', 'The intuitive design of our EX59 Elliptical makes it easy to get started, while nine workout programs and 10 resistance levels make it hard not to come back for more. Weight: 74.5 kg. Dimensions: 186 × 61 × 167 cm. Frame: SixStar Front-drive. Stride Length: 46 cm. Flywheel: 7 kg.', 18.999, 20, 'JOHNSON', 'Gym Equipment', 
'{"images":["https://github.com/seranger/E-commerece_Project/blob/main/frontend/public/images/products/Gym-Equipment/horizon_ex59.jpg?raw=true", 
"https://github.com/seranger/E-commerece_Project/blob/main/frontend/public/images/products/Gym-Equipment/horizon_ex59-1.jpg?raw=true", 
"https://github.com/seranger/E-commerece_Project/blob/main/frontend/public/images/products/Gym-Equipment/horizon_ex59-2.jpg?raw=true"]}'),

('Horizon TR5 Treadmill', 'Get a head start on your fitness journey with the TR 5.0 Treadmill. A built-in Bluetooth speaker lets you stream your favourite playlists, movies, and shows without headphones, and the electronic incline adjusts smoothly when you want to add a challenge. Weight: 59.2 kg. Dimensions: 162.5 × 77 × 139.5 cm. Running Area: 127 x 40.6 cm. Cushioning System: Variable Response Cushioning. Incline Range: 0 – 10%. Speed Range: 0.8 – 16 km/h.', 15.599, 25, 'JOHNSON', 'Gym Equipment', 
'{"images":["https://github.com/seranger/E-commerece_Project/blob/main/frontend/public/images/products/Gym-Equipment/horizon_tr5_tread.jpg?raw=true", 
"https://github.com/seranger/E-commerece_Project/blob/main/frontend/public/images/products/Gym-Equipment/horizon_tr5-1.jpg?raw=true", 
"https://github.com/seranger/E-commerece_Project/blob/main/frontend/public/images/products/Gym-Equipment/horizon_tr5-2.jpg?raw=true "]}'),

('Matrix FTR30 Functional Trainer', 'Already trusted in health clubs around the world, now you can get the powerful, versatile performance of a Matrix functional trainer in your home. Our incredibly smooth functional trainer lets you take on explosive athletic movements and heavy, controlled movements for a true full-body workout. Club-quality components stand up to the most intense use, and the low-height, open-frame design means our functional trainer will fit your space like it was made for it — because it was. Weight: 245 kg. Dimensions: 129.5 × 137.5 × 212 cm. Weight Stack: 136kg (Standard), 45kg (FTRHS Heavy Stack add-on). Effective Resistance: 1-Handle in Use: 1:4 Pulley Ratio: 34kg (Standard); 45kg (FTRHS Heavy Stack add-on), 2-Handles in Use: 1:2 Pulley Ratio: 68kg (Standard); 91kg (FTRHS Heavy Stack add-on). Weight Stack Guarding: Full Front and Rear Shields.', 67.899, 10, 'JOHNSON', 'Gym Equipment', 
'{"images":["https://github.com/seranger/E-commerece_Project/blob/main/frontend/public/images/products/Gym-Equipment/matrix_ftr.jpg?raw=true", 
"https://github.com/seranger/E-commerece_Project/blob/main/frontend/public/images/products/Gym-Equipment/matrix_ftr30-1.jpg?raw=true", 
"https://github.com/seranger/E-commerece_Project/blob/main/frontend/public/images/products/Gym-Equipment/matrix_ftr30-2.jpg?raw=true"]}'),

-- Gym Apparel
('Full-length Running Tights', 'Run with the wind in our Full-Length Running Tights. Constructed with improved stretch for added comfort and ease of mobility, Offer fitted support with next-to-skin comfort, Full-length, Reflective detail makes you more visible in low light conditions. Fabric Content: 100% Polyester. Wash Care: Wash at 30 degrees.', 299.99, 200, 'MR PRICE', 'Gym Attire', 
'{"images":["https://github.com/seranger/E-commerece_Project/blob/main/frontend/public/images/products/Gym-Attire/Full_length.jpg?raw=true", 
"https://github.com/seranger/E-commerece_Project/blob/main/frontend/public/images/products/Gym-Attire/Full_length-1.jpg?raw=true", 
"https://github.com/seranger/E-commerece_Project/blob/main/frontend/public/images/products/Gym-Attire/Full_length-2.jpg?raw=true"]}'),

('Dri_sport_Tshirt', 'Go for fit in our Dri-Sport t-shirt. Constructed with quick-drying Dri-Sport tech to ensure you stay cool, dry and comfy, Short sleeves, Reflective detail, Crew neck. Fabric Content: 100% Polyester.', 129.99, 150, 'MR PRICE', 'Gym Attire', 
'{"images":["https://github.com/seranger/E-commerece_Project/blob/main/frontend/public/images/products/Gym-Attire/Dri_Tshirt.jpg?raw=true", 
"https://github.com/seranger/E-commerece_Project/blob/main/frontend/public/images/products/Gym-Attire/Dri_Tshirt-1.jpg?raw=true", 
"https://github.com/seranger/E-commerece_Project/blob/main/frontend/public/images/products/Gym-Attire/Dri_Tshirt-2.jpg?raw=true"]}'),

('2-in-1 Running Shorts', 'Run wild in our double layer running shorts. Wide elasticated waistband, 2-in-1 design with built-in tights, Constructed with a slight stretch for added comfort and mobility, Zip-up pocket detail, Reflective details. Fabric Content: 100% Polyester. Wash Care: Machine wash at 30 degrees, Do not tumble dry, Air dry only.', 269.99, 100, 'MR PRICE', 'Gym Attire', 
'{"images":["https://github.com/seranger/E-commerece_Project/blob/main/frontend/public/images/products/Gym-Attire/2-in-1%20Running%20Shorts.jpg?raw=true", 
"https://github.com/seranger/E-commerece_Project/blob/main/frontend/public/images/products/Gym-Attire/2-in-1%20Running%20Shorts-1.jpg?raw=true", 
"https://github.com/seranger/E-commerece_Project/blob/main/frontend/public/images/products/Gym-Attire/2-in-1%20Running Shorts-2.jpg?raw=true"]}'),

('Quarter-zip Pullover', 'Take on those chilly day training sessions with our Maxed Modest quarter-zip pullover! Longer length for added coverage. Thumbholes offer extended coverage. Quarter zip detail. Constructed with quick-drying Dri Sport tech to ensure you stay cool, dry and comfy on the move. Birdseye panels for ventilation. Fabric Content: 100% Polyester. Wash Care: Wash at 30 degrees.', 229.99, 80, 'MR PRICE', 'Gym Attire', 
'{"images":["https://github.com/seranger/E-commerece_Project/blob/main/frontend/public/images/products/Gym-Attire/Quarter-zip%20Pullover.jpg?raw=true", 
"https://github.com/seranger/E-commerece_Project/blob/main/frontend/public/images/products/Gym-Attire/Quarter-zip%20Pullover-1.jpg?raw=true", 
"https://github.com/seranger/E-commerece_Project/blob/main/frontend/public/images/products/Gym-Attire/Quarter-zip%20Pullover-2.jpg?raw=true"]}'),

('Reset Full-Length Leggings', 'Make your move and grab those goals in our Reset full-length leggings. Constructed with fitted support and next-to-skin comfort. High-waisted fit. Quick-drying fabric ensures you stay cool dry and comfortable while training. Ideal for dance, hockey & tennis. Fabric Content: 80% Nylon 20% Elastane. Wash Care: Wash at 30 degrees.', 149.99, 120, 'MR PRICE', 'Gym Attire', 
'{"images":["https://github.com/seranger/E-commerece_Project/blob/main/frontend/public/images/products/Gym-Attire/Reset%20Full-length%20Leggings.jpg?raw=true", 
"https://github.com/seranger/E-commerece_Project/blob/main/frontend/public/images/products/Gym-Attire/Reset%20Full-length%20Leggings-1.jpg?raw=true", 
"https://github.com/seranger/E-commerece_Project/blob/main/frontend/public/images/products/Gym-Attire/Reset%20Full-length%20Leggings-2.jpg?raw=true"]}'),

('Elite Compression Long Sleeve Top', 'The Maxed Elite compression range offers snug activewear for optimal performance and recovery. The tight fit reduces muscle vibration and focuses your muscle use more efficiently. Our moisture management wickable fabric draws sweat away from the skin, keeping you drier and ensuring your body temperature is stabilized in both hot and cold weather. Constructed with soft-feel, quick-drying Dri-Sport fabric to keep you cool, dry and comfortable. Fabric Content: 90% Polyester 10% Elastane. Wash Care: Wash at 30 degrees.', 329.99, 90, 'MR PRICE', 'Gym Attire', 
'{"images":["https://github.com/seranger/E-commerece_Project/blob/main/frontend/public/images/products/Gym-Attire/Elite%20Compression%20Long%20Sleeve%20Top.jpg?raw=true", 
"https://github.com/seranger/E-commerece_Project/blob/main/frontend/public/images/products/Gym-Attire/Elite%20Compression%20Long%20Sleeve%20Top-1.jpg?raw=true", 
"https://github.com/seranger/E-commerece_Project/blob/main/frontend/public/images/products/Gym-Attire/Elite%20Compression%20Long%20Sleeve%20Top-2.jpg?raw=true"]}'),

-- Fitness Trackers
('Galaxy Fit3', 'Lasts up to 13 days on a single charge. Sits lightly on your wrist, tracking over 100 workouts and daily activities, including sleep. Lets you play music, check calls and send texts right from your wrist — stay empowered, connected and effortlessly on track with Galaxy Fit3. Highlights: Up to 13 days on a single charge, 1.6" large AMOLED display, Tracking sleep and over 100 exercises, Instant notifications and media controls.', 999.00, 50, 'SAMSUNG', 'Fitness Trackers', 
'{"images":["https://github.com/seranger/E-commerece_Project/blob/main/frontend/public/images/products/Fitness-Trackers/za-galaxy-fit3.jpg?raw=true", 
"https://github.com/seranger/E-commerece_Project/blob/main/frontend/public/images/products/Fitness-Trackers/za-galaxy-fit3-1.jpg?raw=true", 
"https://github.com/seranger/E-commerece_Project/blob/main/frontend/public/images/products/Fitness- Trackers/za-galaxy-fit3-2.jpg?raw=true"]}'),

('Galaxy Watch6 (Bluetooth, 40mm)', 'Style and comfort join forces in this slimmer, sleeker shape. Galaxy Watch6 has been redesigned with a trimmed-down watch form, making it easier to wear. Size (Main Display): 1.3" (33.3mm). Body Weight (g): 28.7 g. Bluetooth Version: Bluetooth v5.3.', 4.99, 40, 'SAMSUNG', 'Fitness Trackers', 
'{"images":["https://github.com/seranger/E-commerece_Project/blob/main/frontend/public/images/products/Fitness-Trackers/Galaxy6.jpg?raw=true", 
"https://github.com/seranger/E-commerece_Project/blob/main/frontend/public/images/products/Fitness-Trackers/Galaxy6-1.jpg?raw=true", 
"https://github.com/seranger/E-commerece_Project/blob/main/frontend/public/images/products/Fitness-Trackers/Galaxy6-2.jpg?raw=true"]}'),

('Galaxy Watch4', 'Enjoy every step you take with your friends and family with the Galaxy Watch4. Track your steps and compete with friends in a fun competition through a live message board. Size (Main Display): 1.4" (34.6mm). Body Weight (g): 30.3 g. Bluetooth Version: Bluetooth v5.0.', 3.599, 30, 'SAMSUNG', 'Fitness Trackers', 
'{"images":["https://github.com/seranger/E-commerece_Project/blob/main/frontend/public/images/products/Fitness-Trackers/za-galaxy-watch4.jpg?raw=true", 
"https://github.com/seranger/E-commerece_Project/blob/main/frontend/public/images/products/Fitness-Trackers/za-galaxy-watch4-1.jpg?raw=true", 
"https://github.com/seranger/E-commerece_Project/blob/main/frontend/public/images/products/Fitness-Trackers/za-galaxy-watch4-2.jpg?raw=true"]}'),

('Galaxy Watch7 (Bluetooth, 44mm)', 'Elevate your style with the Galaxy Watch7. A floating glass design and colorful stitching points add a touch of elegance to your wrist, while ripples on the band show you re ready for workouts. The Watch is available in Small and Large with three color options: Green, Silver and Cream. Size (Main Display): 1.3" (33.3mm). Bluetooth Version: Bluetooth v5.3. Storage (GB): 32Gb *. Processor: 1.6GHz, 1.5GHz.', 4.799, 20, 'SAMSUNG', 'Fitness Trackers', 
'{"images":["https://github.com/seranger/E-commerece_Project/blob/main/frontend/public/images/products/Fitness-Trackers/za-galaxy-watch7.jpg?raw=true", 
"https://github.com/seranger/E-commerece_Project/blob/main/frontend/public/images/products/Fitness-Trackers/za-galaxy-watch7-1.jpg?raw=true", 
"https://github.com/seranger/E-commerece_Project/blob/main/frontend/public/images/products/Fitness-Trackers/za-galaxy-watch7-2.jpg?raw=true"]}'),

('Galaxy Watch FE (Bluetooth, 40mm)', 'Simply press the release button on the one-click band to detach your current watch band and attach a new one. With multiple watch bands to choose from, find the one that matches your vibe!. Size (Main Display): 1.2" (30.4mm). Bluetooth Version: Bluetooth v5.3. Storage (GB): 16GB *. Processor: 1.18GHz.', 3.999, 15, 'SAMSUNG', 'Fitness Trackers', 
'{"images":["https://github.com/seranger/E-commerece_Project/blob/main/frontend/public/images/products/Fitness-Trackers/za-galaxy-watch-fe.jpg?raw=true", 
"https://github.com/seranger/E-commerece_Project/blob/main/frontend/public/images/products/Fitness-Trackers/za-galaxy-watch-fe-1.jpg?raw=true", 
"https://github.com/seranger/E-commerece_Project/blob/main/frontend/public/images/products/Fitness-Trackers/za-galaxy-watch-fe-2.jpg?raw=true"]}'),

('Samsung Gear Fit', 'This Samsung Gear Fit II SM-R360 is a great activity tracker for those who are always on the go. It features a built-in GPS and heart rate monitor, so you can track your progress and see how well you’re doing. The large strap size is perfect for those with larger wrists, and the black color looks great with any outfit. Weight: 0.2 kg. Bluetooth Version: Bluetooth v5.1. OS: FreeRTOS. Display: AMOLED. Size: 1.1" (27.8 mm). Resolution: 126 x 294. Memory: - RAM Size (MB): 2? - ROM Size (MB): 32?.', 5.397, 10, 'SAMSUNG', 'Fitness Trackers', 
'{"images":["https://github.com/seranger/E-commerece_Project/blob/main/frontend/public/images/products/Fitness-Trackers/Galaxy_Gear_Fit.jpg?raw=true", 
"https://github.com/seranger/E-commerece_Project/blob/main/frontend/public/images/products/Fitness-Trackers/Galaxy_Gear_Fit-1.jpg?raw=true", 
"https://github.com/seranger/E-commerece_Project/blob/main/frontend/public/images/products/Fitness-Trackers/Galaxy_Gear_Fit-2.jpg?raw=true"]}');


INSERT INTO `personal_trainers` (`name`, `email`, `password`, `specialization`, `experience`, `image_url`) VALUES 
('Johnny Bravo', 'johnny.bravo@examples.com', 'hashed_password', 'Upper Body', 5, 'https://github.com/seranger/E-commerece_Project/blob/main/frontend/public/images/Trainers/T1.jpeg?raw=true'),
('Jennifer Walters', 'jennifer.walters@examples.com', 'hashed_password', 'Glutes', 3, 'https://github.com/seranger/E-commerece_Project/blob/main/frontend/public/images/Trainers/T2.jpeg?raw=true'),
('Master Roshi', 'master.roshi@example.com', 'hashed_password', 'Endurance', 30, 'https://github.com/seranger/E-commerece_Project/blob/main/frontend/public/images/Trainers/T3.jpg?raw=true');

INSERT INTO `users` (`name`, `email`, `password`, `address`, `subscription_id`) VALUES 
('Jane Smith', 'jane.smith@email.com', 'hashed_password', '405 Forrel Rd Stellenbosch', NULL),
('Mike Johnson', 'mike.johnson@email.com', 'hashed_password', '10 Dahlia Street Sandton', NULL),
('Mick Jagger', 'mick.jagger@email.com', 'hashed_password', '1415 Gray Pl. Mayfield', NULL);

INSERT INTO `orders` (`user_id`, `order_date`, `total_amount`, `order_status`, `subscription_status`) VALUES
(1, '2025-03-01 14:30:00', 249.99, 'completed', 'Active'),
(2, '2025-03-02 09:45:00', 499.99, 'pending', 'Active'),
(3, '2025-03-03 12:15:00', 99.99, 'cancelled', 'Cancelled');

INSERT INTO `subscriptions` (`name`, `price`, `features`, `duration_months`) VALUES 
-- 12-Month Subscriptions
('Basic', 750.00, '3 x Gym equipment from a selection of equipment, Monthly equipment maintenance, Workout Video Tutorials', '12 months'),
('Pro', 1250.00, '5 x Gym equipment from a selection of equipment, Monthly equipment maintenance, Workout Video Tutorials, New Gym Attire every 3 months from our selection, A personal meal plan, Free Samsung fitness Tracker / Watch at the start of your subscription', '12 months'),
('Premium', 2500.00, '7 x Gym equipment from a selection of equipment, Monthly equipment maintenance, Workout Video Tutorial, New Gym Attire every 3 months from our selection, A personal meal plan,  Free Samsung fitness Tracker / Watch at the start of your subscription, Up to 8 in-person or online Personal Training Sessions p/m', '12 months'),

-- 24-Month Subscriptions
('Basic', 500.00, '3 x Gym equipment from a selection of equipment, Monthly equipment maintenance, Workout Video Tutorials', '24 months'),
('Pro', 1000.00, '5 x Gym equipment from a selection of equipment, Monthly equipment maintenance, Workout Video Tutorials, New Gym Attire every 3 months from our selection, A personal meal plan, Free Samsung fitness Tracker / Watch at the start of your subscription', '24 months'),
('Premium', 2250.00, '7 x Gym equipment from a selection of equipment, Monthly equipment maintenance, Workout Video Tutorial, New Gym Attire every 3 months from our selection, A personal meal plan,  Free Samsung fitness Tracker / Watch at the start of your subscription, Up to 6 in-person or online Personal Training Sessions p/m', '24 months'),

-- 36-Month Subscriptions
('Basic', 300.00, '3 x Gym equipment from a selection of equipment, Monthly equipment maintenance, Workout Video Tutorials', '36 months'),
('Pro', 800.00, '5 x Gym equipment from a selection of equipment, Monthly equipment maintenance, Workout Video Tutorials, New Gym Attire every 3 months from our selection, A personal meal plan, Free Samsung fitness Tracker / Watch at the start of your subscription', '36 months'),
('Premium', 2000.00, '7 x Gym equipment from a selection of equipment, Monthly equipment maintenance, Workout Video Tutorial, New Gym Attire every 3 months from our selection, A personal meal plan,  Free Samsung fitness Tracker / Watch at the start of your subscription, Up to 3 in-person or online Personal Training Sessions p/m', '36 months');

-- Inserting Sample Data into Order Items
INSERT INTO `order_items` (`order_id`, `product_id`, `quantity`, `price`) VALUES
(1, 1, 2, 15.373),
(1, 2, 1, 11.999),
(2, 3, 1, 12.999),
(3, 4, 1, 18.999);