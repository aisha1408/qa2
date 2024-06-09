document.addEventListener('DOMContentLoaded', function() {
    const inputContainer = document.getElementById('input-container');
    for (let i = 1; i <= 31; i++) {
        const inputDiv = document.createElement('div');
        inputDiv.innerHTML = `
            <label for="day${i}">Day ${i} Emotion (1-10): </label>
            <input type="number" id="day${i}" class="emotion-input" min="1" max="10" value="5">
        `;
        inputContainer.appendChild(inputDiv);
    }
    updateChart();
});

function calculateAverage() {
    let totalEmotion = 0;
    let count = 0;
    let feedback = '';

    for (let i = 1; i <= 31; i++) {
        const emotionValue = parseInt(document.getElementById(`day${i}`).value, 10);
        if (!isNaN(emotionValue) && emotionValue >= 1 && emotionValue <= 10) {
            totalEmotion += emotionValue;
            count++;
        } else {
            feedback += `Please enter a valid emotion (1-10) for Day ${i}.<br>`;
        }
    }

    if (feedback) {
        document.getElementById('feedback').innerHTML = feedback;
        document.getElementById('feedback').className = 'feedback error';
    } else {
        const averageEmotion = (totalEmotion / count).toFixed(2);
        document.getElementById('result').innerText = `Average Emotion: ${averageEmotion}`;
        document.getElementById('feedback').innerText = 'Emotions recorded successfully!';
        document.getElementById('feedback').className = 'feedback success';
    }

    updateChart();
}

function updateChart() {
    const ctx = document.getElementById('emotionChart').getContext('2d');
    const labels = Array.from({ length: 31 }, (_, i) => `Day ${i + 1}`);
    const data = labels.map((_, i) => parseInt(document.getElementById(`day${i + 1}`).value, 10) || 0);

    if (window.myChart) {
        window.myChart.destroy();
    }
    window.myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Daily Emotions',
                data: data,
                backgroundColor: 'rgba(163, 210, 202, 0.2)',
                borderColor: '#5eaaa8',
                borderWidth: 2,
                fill: true,
                tension: 0.1
            }]
        },
        options: {
            scales: {
                x: {
                    type: 'category'
                },
                y: {
                    beginAtZero: true,
                    max: 10
                }
            }
        }
    });
}
