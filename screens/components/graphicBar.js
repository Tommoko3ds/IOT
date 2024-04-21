import React from 'react';
import { Dimensions } from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import { LineChart } from 'react-native-chart-kit';
const ChartComponent = ({ data }) => {
    const screenWidth = Dimensions.get('window').width;
    const chartData = {
        labels: Object.keys(data),
        datasets: [
            {
                data: Object.values(data),
            },
        ],
    };

    return (
        <BarChart
            data={chartData}
            width={screenWidth}
            height={220}
            yAxisLabel=""
            chartConfig={{
                backgroundColor: '#ffffff',
                backgroundGradientFrom: '#ffffff',
                backgroundGradientTo: '#ffffff',
                decimalPlaces: 0,
                color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                style: {
                    borderRadius: 16,
                },
            }}
            bezier
            style={{
                marginVertical: 8,
                borderRadius: 16,
            }}
        />
    );
};

export default ChartComponent;
