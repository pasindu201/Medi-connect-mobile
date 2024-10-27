import React, { useRef, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { DownloadIcon } from './Icons/icon';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import * as XLSX from 'xlsx';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChart = ({xAxis,yAxis,xPara}) => {
  const chartRef = useRef(null); // Create a reference to the chart
  const [showDownloadOptions, setShowDownloadOptions] = useState(false); // Control modal visibility

  // Dummy data for the chart
  const data = {
    labels: xPara,
    datasets: [
      {
        label: '',
        data: [65, 59, 80, 81, 56],
        backgroundColor: [
          '#71797E'
        ],

        
        borderWidth: 1,
        borderColor: 'rgba(0, 0, 0, 0.1)',
        barThickness:30,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        ticks: {
          color: 'black',
        },
        title: {
          display: true,
          text: xAxis,
          font: {
            size: 16,
            weight: 'bold',
          },
          color: '#3b3b3b',
        },
        grid: {
          drawOnChartArea: false, // Grid outside the chart area for X-axis
          drawTicks: true,        // Enable tick marks
          color: '	#636363',         // Grid line color
          tickWidth:3,
        },
        border: {
          color: '#3b3b3b', // Axis line color
          width: 2.5,         // Increase X-axis thickness (adjust as needed)
        },
      },
      y: {
        ticks: {
          display: true,
          color: 'black',
        },
        title: {
          display: true,
          text: yAxis,
          font: {
            size: 16,
            weight: 'bold',
          },
          color: '#000000',
        },
        grid: {
          drawOnChartArea: false, // Grid outside the chart area for Y-axis
          drawTicks: true,        // Enable tick marks
          tickLength: 10,         // Length of the tick marks
          tickColor: '	#636363',     // Color of the tick marks
          color: '	#636363',
          tickWidth:3,         // Grid line color
        },
        beginAtZero: true,
        border: {
          color: '#000000', // Axis line color
          width: 2.5,         // Increase y-axis thickness (adjust as needed)
        },
      },
    },
  };
  
  

  // Download chart as PDF
  const downloadPDF = () => {
    const chart = chartRef.current;

    html2canvas(chart, { useCORS: true }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('landscape');
      pdf.addImage(imgData, 'PNG', 10, 10, 280, 150); // Adjust the dimensions as needed
      pdf.save('chart.pdf');
    });
  };

  // Download chart data as Excel file
  const downloadExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(
      data.labels.map((label, index) => ({
        Month: label,
        Value: data.datasets[0].data[index],
      }))
    );
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'BarChart Data');
    XLSX.writeFile(workbook, 'chart-data.xlsx');
  };

  // Handle download click
  const handleDownloadClick = () => {
    setShowDownloadOptions(true); // Show the options when the download icon is clicked
  };

  // Close modal
  const closeDownloadOptions = () => {
    setShowDownloadOptions(false);
  };

  return (
    <div className=""> {/* Remove outer margins and paddings */}
      {/* Conditional rendering of the download options (popup/modal) */}
      {showDownloadOptions && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Choose download format:</h2>
            <div className="flex space-x-4">
              <button
                onClick={() => {
                  downloadPDF();
                  closeDownloadOptions();
                }}
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
              >
                Download PDF
              </button>
              <button
                onClick={() => {
                  downloadExcel();
                  closeDownloadOptions();
                }}
                className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
              >
                Download Excel
              </button>
            </div>
            <button
              onClick={closeDownloadOptions}
              className="mt-4 text-gray-500 hover:underline"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
      <div className='flex'>
      <div
        className="bg-white  p-0"
        style={{ width: '600px', height: '300px', margin: '0' }} // Removed extra space and centered
        ref={chartRef}
      >
        <Bar data={data} options={options} />
      </div>
      <div className="flex justify-end ">
        <button onClick={handleDownloadClick} className="">
          <DownloadIcon />
        </button>
      </div>

      </div>
      
    </div>
  );
};

export default BarChart;
