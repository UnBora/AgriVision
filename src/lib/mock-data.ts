import { Bar, Pie } from "recharts"

export const MOCK_DATA = {
  dashboard: {
    activeSensors: 125,
    cropHealthAlerts: 8,
    droneFlightsToday: 12,
    weeklyRainForecast: [
      { day: "Mon", rain: 2 },
      { day: "Tue", rain: 5 },
      { day: "Wed", rain: 10 },
      { day: "Thu", rain: 4 },
      { day: "Fri", rain: 0 },
      { day: "Sat", rain: 0 },
      { day: "Sun", rain: 8 },
    ],
    fieldHeatmapData: [
      { top: "20%", left: "30%", value: 0.8 },
      { top: "50%", left: "50%", value: 0.4 },
      { top: "60%", left: "15%", value: 0.9 },
      { top: "40%", left: "75%", value: 0.6 },
      { top: "75%", left: "60%", value: 0.2 },
    ]
  },
  cropMonitoring: {
    crops: [
      { id: 'CORN-001', type: 'Corn', fieldId: 'F01', ndvi: 0.82, lastUpdated: '2 hours ago', issue: null, region: 'North' },
      { id: 'WHEA-002', type: 'Wheat', fieldId: 'F02', ndvi: 0.75, lastUpdated: '1 day ago', issue: null, region: 'South' },
      { id: 'SOYB-003', type: 'Soybean', fieldId: 'F03', ndvi: 0.65, lastUpdated: '5 hours ago', issue: 'pest', region: 'East' },
      { id: 'RICE-004', type: 'Rice', fieldId: 'F04', ndvi: 0.91, lastUpdated: '30 mins ago', issue: null, region: 'West' },
      { id: 'POTA-005', type: 'Potato', fieldId: 'F05', ndvi: 0.55, lastUpdated: '3 days ago', issue: 'drought', region: 'North' },
      { id: 'CORN-006', type: 'Corn', fieldId: 'F06', ndvi: 0.88, lastUpdated: '4 hours ago', issue: null, region: 'West' },
    ],
  },
  iotSensors: {
    sensors: [
      { id: "SM-001", type: "Soil Moisture", status: "Online", value: "45%" },
      { id: "PH-002", type: "pH Level", status: "Online", value: "6.8" },
      { id: "NPK-003", type: "NPK Levels", status: "Offline", value: "N/A" },
      { id: "TMP-004", type: "Temperature", status: "Online", value: "28°C" },
    ],
    soilData: [
        { time: '10:00', moisture: 45, pH: 6.8, temp: 28 },
        { time: '11:00', moisture: 44, pH: 6.8, temp: 29 },
        { time: '12:00', moisture: 42, pH: 6.7, temp: 30 },
        { time: '13:00', moisture: 43, pH: 6.8, temp: 31 },
        { time: '14:00', moisture: 41, pH: 6.9, temp: 30 },
        { time: '15:00', moisture: 40, pH: 6.8, temp: 29 },
    ],
  },
  droneManager: {
    drones: [
      { id: 'AG-DRN-01', status: 'Idle', battery: '95%', lastMission: 'Crop Dusting - F01' },
      { id: 'AG-DRN-02', status: 'In-Flight', battery: '62%', lastMission: 'NDVI Scan - F03' },
      { id: 'AG-DRN-03', status: 'Charging', battery: '45%', lastMission: 'Pest Spotting - F05' },
      { id: 'AG-DRN-04', status: 'Maintenance', battery: '0%', lastMission: 'Seeding - F02' },
    ],
    flightPaths: [
        "M10 80 C 40 10, 65 10, 95 80 S 150 150, 180 80",
        "M20 20 C 20 110, 110 110, 110 20",
        "M150 20 L 180 50 L 150 80 L 120 50 Z",
        "M50 150 Q 125 50 200 150",
        "M200 20 C 220 60, 280 60, 300 20"
      ]
  },
  climateTools: {
    forecast: [
        { day: 'Today', icon: 'cloud-sun', temp: '29°C', rain: '10%' },
        { day: 'Tomorrow', icon: 'sun', temp: '31°C', rain: '5%' },
        { day: 'Wednesday', icon: 'cloud-drizzle', temp: '28°C', rain: '40%' },
        { day: 'Thursday', icon: 'cloud-lightning', temp: '27°C', rain: '70%' },
    ],
    recommendations: [
        { crop: 'Corn', recommendation: 'Increase irrigation by 15% for the next 2 days due to high temperatures.'},
        { crop: 'Rice', recommendation: 'Reduce nitrogen application, soil levels are optimal.'},
        { crop: 'Soybean', recommendation: 'Scout Field F03 for signs of leaf-eating pests.'},
    ]
  },
  supplyChain: {
    products: [
        { id: 'PROD-001', product: 'Sweet Corn', yield: '20 tons', storageTemp: '4°C', marketPrice: '$550/ton', season: 'Summer' },
        { id: 'PROD-002', product: 'Hard Wheat', yield: '50 tons', storageTemp: '18°C', marketPrice: '$320/ton', season: 'Summer' },
        { id: 'PROD-003', product: 'Soybeans', yield: '35 tons', storageTemp: '10°C', marketPrice: '$480/ton', season: 'Autumn' },
        { id: 'PROD-004', product: 'Basmati Rice', yield: '40 tons', storageTemp: '15°C', marketPrice: '$900/ton', season: 'Autumn' },
        { id: 'PROD-005', product: 'Russet Potatoes', yield: '60 tons', storageTemp: '7°C', marketPrice: '$400/ton', season: 'Winter' },
    ]
  },
  farmerAccounts: {
    farmers: [
        { id: 'FARM-01', name: 'Sokun Nhem', village: 'Kandal', role: 'Farmer', language: 'Khmer' },
        { id: 'FARM-02', name: 'John Smith', village: 'Phnom Penh', role: 'Trainer', language: 'English' },
        { id: 'FARM-03', name: 'Kim Min-jun', village: 'Siem Reap', role: 'Farmer', language: 'Korean' },
        { id: 'FARM-04', name: 'Chan Lina', village: 'Battambang', role: 'Farmer', language: 'Khmer' },
        { id: 'FARM-05', name: 'David Wilson', village: 'Kandal', role: 'Field Agent', language: 'English' },
    ]
  },
  trainingCenter: {
    videos: [
        { id: 'VID-01', title: 'Modern Drip Irrigation Techniques', duration: '15:32', views: 1250, thumbnailUrl: 'https://placehold.co/600x400.png', "data-ai-hint": "drip irrigation" },
        { id: 'VID-02', title: 'Identifying Common Pests in Rice Paddies', duration: '22:10', views: 890, thumbnailUrl: 'https://placehold.co/600x400.png', "data-ai-hint": "rice paddy" },
        { id: 'VID-03', title: 'Using Your AgriVision Drone for Scanning', duration: '08:45', views: 2100, thumbnailUrl: 'https://placehold.co/600x400.png', "data-ai-hint": "farm drone" },
        { id: 'VID-04', title: 'Optimizing Soil pH for Corn Growth', duration: '12:55', views: 950, thumbnailUrl: 'https://placehold.co/600x400.png', "data-ai-hint": "corn field" },
    ],
    forumSummary: [
        { topic: "Low moisture reading in F05", replies: 5, lastPost: '2 hours ago' },
        { topic: "Best fertilizer for new wheat batch?", replies: 12, lastPost: '1 day ago' },
        { topic: "Drone camera calibration issue", replies: 8, lastPost: '3 hours ago' },
    ]
  },
  analytics: {
    roiByCrop: [
        { crop: 'Corn', roi: 4500, investment: 1500, revenue: 6000 },
        { crop: 'Wheat', roi: 8000, investment: 3200, revenue: 11200 },
        { crop: 'Soybean', roi: 6500, investment: 2000, revenue: 8500 },
        { crop: 'Rice', roi: 12000, investment: 4000, revenue: 16000 },
    ],
    sustainability: [
        { metric: 'Carbon Footprint', value: '1.2 tCO2e/ha', change: '-5%' },
        { metric: 'Water Usage', value: '4,500 m³/ha', change: '-12%' },
        { metric: 'Sustainability Index', value: '8.2 / 10', change: '+8%' },
    ]
  }
};

export const chartConfig = {
    rain: { label: "Rain (mm)", color: "hsl(var(--primary))" },
    moisture: { label: "Moisture (%)", color: "hsl(var(--chart-1))" },
    pH: { label: "pH", color: "hsl(var(--chart-2))" },
    temp: { label: "Temp (°C)", color: "hsl(var(--chart-3))" },
    revenue: { label: "Revenue", component: Bar, color: "hsl(var(--chart-1))" },
    investment: { label: "Investment", component: Bar, color: "hsl(var(--chart-2))" },
    roi: { label: "ROI", component: Bar, color: "hsl(var(--chart-3))" },
  } satisfies import("@/components/ui/chart").ChartConfig
