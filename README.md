# Anomaly Detection Project

This project is a full-stack web application built using the MERN stack with Kafka for event streaming. It provides real-time anomaly detection based on device-specific thresholds.

[![My Skills](https://skillicons.dev/icons?i=mongodb,express,react,nodejs,kafka,docker)](https://skillicons.dev)

## Installation

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/en) (v20.13.x or later)
- [npm](https://nodejs.org/en) (v10.5.x or later)
- [MongoDB](https://www.mongodb.com/)
- [Docker](https://www.docker.com/products/docker-desktop/)

### Backend Setup

1. Clone the repository:
    ```bash
    git clone https://github.com/mohammedmunna/anomaly-detection.git
    cd anomaly-detection
    ```

2. Navigate to the `back-end` directory and install dependencies:
    ```bash
    cd back-end
    npm install
    ```

3. Create a `.env` file in the `back-end` directory and add your MongoDB URI and other environment variables:
    ```
    MONGO_URI=yourmongodburi
    PORT=4000
    ```
    
4. Start Docker Engine and run the `docker-compose.yml` file:
    ```bash
    docker-compose up -d
    ```
    This command downloads the required Docker images and starts the Kafka and Zookeeper services in detached mode (-d).

5. Verify Kafka container is running:
   ```bash
    docker ps
    ```
   
6. Start the backend server:
    ```bash
    npm run dev
    ```
    
7. Start the Kafka producer in a separate terminal:
    ```bash
    npm run dev:producer
    ```
    
8. To stop and remove the Kafka and Zookeeper containers, run:
   ```bash
    docker-compose down
    ```

### Frontend Setup

1. Navigate to the `front-end` directory and install dependencies:
    ```bash
    cd ../front-end
    npm install
    ```

3. Start the frontend server:
    ```bash
    npm start
    ```

4. Open your browser and go to `http://localhost:3000`.

### Data Format

1. For creating new device profiles via the http://localhost:4000/profiles endpoint, use the following format:
   
   ```bash
   {
     "abc": [
       {
         "type": "load",
         "thresholds": {
    	      "upper": 50,
    	      "lower": 20
         },
  	    "window": 10
       }
     ]
   }
    ```
   This format specifies the thresholds and time window for anomaly detection based on device data.
