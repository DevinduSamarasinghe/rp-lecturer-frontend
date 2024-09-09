import Plot from 'react-plotly.js';

// Function to calculate heatmap data based on bounding box positions
const calculateHeatmapData = (session) => {
  const heatmapData = session.session_intervals.map((interval) => ({
    x: interval.bbox[0],
    y: interval.bbox[1],
    value: 1, // Each interval is a presence marker
  }));

  return heatmapData;
};

// Heatmap component using bounding box (bbox) data
const HeatmapPlot = ({ session }) => {
  const heatmapData = calculateHeatmapData(session);

  return (
    <Plot
      data={[
        {
          x: heatmapData.map((d) => d.x),
          y: heatmapData.map((d) => d.y),
          z: heatmapData.map((d) => d.value),
          type: 'heatmap',
          colorscale: 'Viridis',
        },
      ]}
      layout={{
        title: 'Lecturer Movement Heatmap',
        xaxis: { title: 'X Position' },
        yaxis: { title: 'Y Position' },
      }}
    />
  );
};

export default HeatmapPlot;
