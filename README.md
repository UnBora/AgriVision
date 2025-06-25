# AgriVision - Smart Agriculture Platform

Welcome to AgriVision, a comprehensive smart agriculture platform built with Next.js and Firebase Studio. This application provides farmers and agricultural managers with tools for crop monitoring, drone management, IoT sensor integration, and data-driven analytics to optimize farming operations.

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (with App Router)
- **UI Components**: [ShadCN UI](https://ui.shadcn.com/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **AI/Generative Features**: [Genkit](https://firebase.google.com/docs/genkit)
- **Icons**: [Lucide React](https://lucide.dev/guide/packages/lucide-react)

## Getting Started

To get the application running locally, follow these steps:

1.  **Install dependencies:**
    ```bash
    npm install
    ```

2.  **Run the development server:**
    ```bash
    npm run dev
    ```

3.  Open [http://localhost:9002](http://localhost:9002) with your browser to see the result.

## Project Structure

Here's a brief overview of the key directories in this project:

-   `src/app`: Contains all the application routes, pages, and layouts, following the Next.js App Router structure.
-   `src/components`: Holds reusable React components, including UI components from ShadCN.
-   `src/lib`: Contains utility functions and shared logic, such as mock data for now.
-   `src/ai`: Includes all Genkit-related code for AI features, such as flows and prompts.
-   `public`: Stores static assets like images and fonts.
-   `package.json`: Lists project dependencies and scripts.

## Features

-   **Dashboard**: An overview of key metrics, including active sensors, crop health alerts, drone flights, a weekly rain forecast, and an interactive field heatmap.
-   **Crop Monitoring**: View, filter, and manage crop data. Add new crops, view AI-powered image analysis for plant health, and export data to Excel.
-   **IoT Sensors**: Monitor real-time data from various IoT sensors like soil moisture, pH, and temperature. View live data streams in chart format.
-   **Drone Manager**: Manage a fleet of drones, view their status, battery life, and recent missions. Schedule new missions (e.g., NDVI scans, crop dusting) and visualize flight paths.
-   **Climate Tools**: Access a 4-day weather forecast, view an irrigation schedule on a calendar, and receive AI-powered recommendations based on climate data.
-   **Supply Chain**: Track products from farm to market, including expected yield, storage requirements, and market prices. Includes an AI-powered route optimization feature.
-   **Farmer Accounts**: Manage user accounts for farmers, trainers, and agents. Send SMS messages with on-the-fly AI translation to a farmer's preferred language.
-   **Training Center**: A resource hub with video tutorials for farmers. Includes a summary of recent topics from the community forum.
-   **Analytics & Reports**: Visualize data with charts for ROI by crop and view detailed sustainability reports with key environmental metrics.
-   **System Settings**: Configure application settings, including user roles and permissions, language preferences, and data privacy options.

## Proposed Database Schema

Below is a proposed database schema for the backend.

### `users`

Stores information about all users of the platform.

| Column        | Type                     | Description                               |
|---------------|--------------------------|-------------------------------------------|
| `id`          | `VARCHAR(255)` (Primary Key) | Unique identifier for the user (e.g., FARM-01). |
| `name`        | `VARCHAR(255)`           | Full name of the user.                    |
| `email`       | `VARCHAR(255)` (Unique)  | User's email address.                     |
| `phone_number`| `VARCHAR(20)`            | User's phone number.                      |
| `village`     | `VARCHAR(255)`           | The village or locality of the user.      |
| `language`    | `VARCHAR(50)`            | Preferred language for communication.     |
| `role_id`     | `INT` (Foreign Key)      | References `roles.id`.                    |
| `created_at`  | `TIMESTAMP`              | Timestamp of account creation.            |

### `roles`

Defines the roles available in the system.

| Column | Type                     | Description                           |
|--------|--------------------------|---------------------------------------|
| `id`   | `INT` (Primary Key, Auto-increment) | Unique identifier for the role.       |
| `name` | `VARCHAR(255)` (Unique)  | Name of the role (e.g., "Admin", "Farmer"). |

### `permissions`

Lists all possible permissions in the system.

| Column      | Type                     | Description                               |
|-------------|--------------------------|-------------------------------------------|
| `id`        | `INT` (Primary Key, Auto-increment) | Unique identifier for the permission.   |
| `action`    | `VARCHAR(255)` (Unique)  | The permission action (e.g., "manage-drones"). |
| `description`| `TEXT`                   | A brief description of the permission.    |

### `role_permissions`

A join table linking roles to their permissions.

| Column         | Type               | Description                     |
|----------------|--------------------|---------------------------------|
| `role_id`      | `INT` (Foreign Key) | References `roles.id`.          |
| `permission_id`| `INT` (Foreign Key) | References `permissions.id`.    |

### `crops`

Stores details about each crop being monitored.

| Column        | Type                   | Description                               |
|---------------|------------------------|-------------------------------------------|
| `id`          | `VARCHAR(255)` (Primary Key)| Unique identifier for the crop instance.  |
| `type`        | `VARCHAR(255)`         | Type of crop (e.g., "Corn", "Wheat").   |
| `field_id`    | `VARCHAR(255)`         | Identifier for the field where it's planted. |
| `region`      | `VARCHAR(255)`         | Geographic region of the field.           |
| `ndvi_score`  | `FLOAT`                | The latest NDVI score for the crop.       |
| `status`      | `VARCHAR(255)`         | Health status (e.g., "Healthy", "Pest", "Drought"). |
| `last_updated`| `TIMESTAMP`            | When the crop data was last updated.      |

### `drones`

Manages the fleet of agricultural drones.

| Column        | Type                   | Description                             |
|---------------|------------------------|-----------------------------------------|
| `id`          | `VARCHAR(255)` (Primary Key)| Unique drone identifier.                |
| `status`      | `ENUM('Idle', 'In-Flight', 'Charging', 'Maintenance')` | Current status of the drone.          |
| `battery_percent` | `INT`              | Current battery level as a percentage.  |
| `last_mission_id` | `INT` (Foreign Key)| References `missions.id`.             |

### `missions`

Stores information about drone missions.

| Column       | Type                   | Description                                |
|--------------|------------------------|--------------------------------------------|
| `id`         | `INT` (Primary Key, Auto-increment) | Unique identifier for the mission.       |
| `drone_id`   | `VARCHAR(255)` (Foreign Key) | References `drones.id`.                  |
| `mission_type`| `VARCHAR(255)`         | Type of mission (e.g., "NDVI Scan", "Crop Dusting"). |
| `field_id`   | `VARCHAR(255)`         | The target field for the mission.          |
| `scheduled_at`| `TIMESTAMP`            | When the mission is scheduled to start.    |
| `status`     | `ENUM('Scheduled', 'In-Progress', 'Completed', 'Aborted')` | Status of the mission.                 |

### `sensors`

Keeps track of all IoT sensors.

| Column | Type                   | Description                               |
|--------|------------------------|-------------------------------------------|
| `id`   | `VARCHAR(255)` (Primary Key)| Unique sensor identifier.                 |
| `type` | `VARCHAR(255)`         | Type of sensor (e.g., "Soil Moisture", "pH Level"). |
| `status` | `ENUM('Online', 'Offline')` | Current connectivity status of the sensor. |
| `field_id` | `VARCHAR(255)`       | The field where the sensor is located.    |

### `sensor_data`

Stores time-series data collected from sensors.

| Column     | Type                   | Description                          |
|------------|------------------------|--------------------------------------|
| `id`       | `INT` (Primary Key, Auto-increment) | Unique identifier for the data point.|
| `sensor_id`| `VARCHAR(255)` (Foreign Key) | References `sensors.id`.           |
| `timestamp`| `TIMESTAMP`            | When the data was recorded.          |
| `value`    | `VARCHAR(255)`         | The data value recorded by the sensor.|
| `metric`   | `VARCHAR(255)`         | The metric being measured (e.g., "moisture", "pH"). |

---

This project was bootstrapped with [Firebase Studio](https://firebase.google.com/studio).
