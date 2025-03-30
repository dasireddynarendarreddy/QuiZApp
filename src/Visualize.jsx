import { useEffect, useRef } from "react";
import {
  Card,
  CardHeader,
  CardContent,
} from "@/components/ui/card";
import {
  Chart,
  BarController,
  BarElement,
  LinearScale,
  CategoryScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register the necessary components including the BarController
Chart.register(BarController, BarElement, LinearScale, CategoryScale, Title, Tooltip, Legend);

const Visualize = () => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null); // Use a ref to store the chart instance

  useEffect(() => {
    // Destroy the existing chart if it exists
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    // Fetch the quiz data from localStorage
    let quizData = JSON.parse(localStorage.getItem("userstats"));
    if (!quizData || quizData.length === 0) return; // Prevent errors if there is no data

    const ctx = chartRef.current.getContext("2d");

    // Create the new chart and store the instance in the ref
    chartInstance.current = new Chart(ctx, {
      type: "bar", // Bar chart type
      data: {
        labels: quizData.map((quiz) => {
          // Ensure that the stored date is a valid string and parse it
          const dateStr = quiz.date;
          
          // Parse the date string explicitly to handle the RFC format
          const parsedDate = new Date(dateStr);
          if (isNaN(parsedDate)) {
            console.error("Invalid date:", dateStr);
            return "Invalid Date"; // If invalid, return a default label
          }

          return parsedDate.toLocaleDateString("en-GB", {
            year: "numeric",
            month: "short",
            day: "numeric",
          });
        }), // Date as X-axis labels
        datasets: [
          {
            label: "Correct Answers",
            data: quizData.map((quiz) => quiz.correctans), // Correct answers as data
            backgroundColor: "rgba(75, 192, 192, 0.2)", // Color for bars
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 1,
            barThickness: 10, // Decrease the width of the bars
          },
          {
            label: "Attempted Questions",
            data: quizData.map((quiz) => quiz.attempted), // Attempted questions as data
            backgroundColor: "rgba(153, 102, 255, 0.2)", // Color for bars
            borderColor: "rgba(153, 102, 255, 1)",
            borderWidth: 1,
            barThickness: 10, // Decrease the width of the bars
          },
        ],
      },
      options: {
        responsive: true, // Make the chart responsive
        maintainAspectRatio: false, // Optional: allow resizing freely
        scales: {
          y: {
            beginAtZero: true, // Start Y-axis from 0
            ticks: {
              stepSize: 1, // Set step size to 1 to avoid decimals
              callback: function (value) {
                return value % 1 === 0 ? value : ''; // Show only integers
              },
            },
          },
          x: {
            ticks: {
              autoSkip: true, // Automatically skip labels on the x-axis
              maxRotation: 45, // Rotate the labels by 45 degrees to fit long dates
              minRotation: 30, // Ensure labels are readable even on smaller screens
            },
          },
        },
        plugins: {
          tooltip: {
            callbacks: {
              // Customizing the tooltip content
              title: function (tooltipItem) {
                // Display the topic in the tooltip title
                const quizIndex = tooltipItem[0].dataIndex;
                const topic = quizData[quizIndex].topic; // Retrieve the topic for this quiz entry
                return `Topic: ${topic}`;
              },
              label: function (tooltipItem) {
                // Add the correct answers and attempted questions info
                const datasetLabel = tooltipItem.dataset.label || '';
                const value = tooltipItem.raw;
                return `${datasetLabel}: ${value}`;
              },
            },
          },
        },
      },
    });

    return () => {
      // Cleanup: Destroy the chart when the component unmounts
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, []);

  return (
    <Card>
      <CardHeader>
        <h2>Quiz Stats</h2>
      </CardHeader>
      <CardContent>
        <canvas ref={chartRef}></canvas>
      </CardContent>
    </Card>
  );
};

export default Visualize;
