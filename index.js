// Define ExerciseLog class to log exercises
class ExerciseLog {
    constructor() {
        this.exercises = [];
    }

    logExercise(exercise) {
        this.exercises.push(exercise);
    }

    getLoggedExercises() {
        return this.exercises;
    }
}

const exerciseLog = new ExerciseLog();
// Function to prompt the user for their name and display it
function promptAndDisplayUsername() {
    const usernameContainer = document.getElementById('usernameContainer');
    const usernameSpan = document.getElementById('username');

    const savedUsername = localStorage.getItem('username');
    if (savedUsername) {
        usernameSpan.textContent = savedUsername;
    } else {
        const promptUsername = prompt('Please enter your name:');
        if (promptUsername) {
            localStorage.setItem('username', promptUsername);
            usernameSpan.textContent = promptUsername;
        }
    }
}
// Function to clear the username and display it
function clearAndDisplayUsername() {
    const usernameContainer = document.getElementById('usernameContainer');
    const usernameSpan = document.getElementById('username');

    localStorage.removeItem('username'); // Clear the saved username
    usernameSpan.textContent = ''; // Clear the displayed username
}

// Call the function when the page loads
clearAndDisplayUsername();

// Call the function when the page loads
promptAndDisplayUsername();



// Function to update content based on the selected mode
function updateContent(mode) {
    const contentDiv = document.getElementById('content');
    contentDiv.innerHTML = '';
    // Function to calculate BMI
    function calculateBMI(height, weight) {
        // BMI formula: BMI = weight (kg) / (height (m) * height (m))
        const heightInMeters = height / 100; // Convert height to meters
        const bmi = weight / (heightInMeters * heightInMeters);
        return bmi;
    }


    switch (mode) {
        case 'exercise':
            contentDiv.innerHTML = ''; // Clear previous content

            // Create a form for logging exercises
            const exerciseForm = document.createElement('form');
            exerciseForm.innerHTML = `
        <h2>Log an Exercise</h2>
        <label for="exerciseName">Exercise Name:</label>
        <input type="text" id="exerciseName" required><br>
        <label for="exerciseDuration">Duration (minutes):</label>
        <input type="number" id="exerciseDuration" required><br>
        <label for="caloriesBurned">Calories Burned:</label>
        <input type="number" id="caloriesBurned" required><br>
        <button type="submit">Log Exercise</button>
    `;
            contentDiv.appendChild(exerciseForm);

            // Display logged exercises
            const loggedExercises = exerciseLog.getLoggedExercises();
            if (loggedExercises.length === 0) {
                const noExercisesMsg = document.createElement('p');
                noExercisesMsg.textContent = 'No exercises have been logged.';
                contentDiv.appendChild(noExercisesMsg);
            } else {
                const exerciseList = document.createElement('ul');
                exerciseList.innerHTML = '<h2>Logged Exercises:</h2>';
                loggedExercises.forEach(exercise => {
                    const exerciseItem = document.createElement('li');
                    exerciseItem.textContent = `${exercise.name} - ${exercise.duration} minutes - Calories Burned: ${exercise.caloriesBurned}`;
                    exerciseList.appendChild(exerciseItem);
                });
                contentDiv.appendChild(exerciseList);
            }

            // Handle exercise logging form submission
            exerciseForm.addEventListener('submit', (event) => {
                event.preventDefault();
                const exerciseName = document.getElementById('exerciseName').value;
                const exerciseDuration = parseFloat(document.getElementById('exerciseDuration').value);
                const caloriesBurned = parseFloat(document.getElementById('caloriesBurned').value);

                if (exerciseName && exerciseDuration > 0 && caloriesBurned >= 0) {
                    exerciseLog.logExercise({
                        name: exerciseName,
                        duration: exerciseDuration,
                        caloriesBurned: caloriesBurned
                    });
                    updateContent('exercise'); // Refresh the content to show the updated list
                }
            });
            break;



        case 'bmi':
            contentDiv.innerHTML = ''; // Clear previous content

            // Create a form for BMI calculation
            const bmiForm = document.createElement('form');
            bmiForm.innerHTML = `
                    <h2>BMI Calculator</h2>
                    <label for="height">Height (cm):</label>
                    <input type="number" id="height" required><br>
                    <label for="weight">Weight (kg):</label>
                    <input type="number" id="weight" required><br>
                    <button type="submit">Calculate BMI</button>
                `;
            contentDiv.appendChild(bmiForm);

            // Display BMI calculation result
            bmiForm.addEventListener('submit', (event) => {
                event.preventDefault();
                const height = parseFloat(document.getElementById('height').value);
                const weight = parseFloat(document.getElementById('weight').value);

                if (height > 0 && weight > 0) {
                    const bmi = calculateBMI(height, weight);
                    const resultMessage = document.createElement('p');
                    resultMessage.textContent = `Your BMI is ${bmi.toFixed(2)}`;
                    contentDiv.appendChild(resultMessage);
                }
            });

            break;


        case 'weights':
            contentDiv.innerHTML = ''; // Clear previous content

            // Create a form for weights plates calculator
            const weightsForm = document.createElement('form');
            weightsForm.innerHTML = `
                    <h2>Weights Plates Calculator</h2>
                    <label for="weight">Weight:</label>
                    <input type="number" id="weight" required>
                    <select id="unit">
                        <option value="kg">kg</option>
                        <option value="lb">lb</option>
                    </select><br>
                    <button id="addWeight" type="button">Add Weight</button>
                    <button id="convertUnit" type="button">Convert to Pounds</button>
                    <p id="result"></p>
                `;
            contentDiv.appendChild(weightsForm);

            let currentWeight = 0; // Weight is stored in kilograms
            let currentUnit = 'kg';

            // Function to add weight to the current weight
            function addWeight() {
                const weightInput = document.getElementById('weight');
                const weight = parseFloat(weightInput.value);

                try {
                    if (isNaN(weight) || weight <= 0) {
                        throw new Error('Invalid input. Please enter a positive number.');
                    }

                    if (currentUnit === 'lb') {
                        // Convert pounds to kilograms before adding
                        currentWeight += weight * 0.453592;
                    } else {
                        currentWeight += weight;
                    }

                    updateResult();
                    weightInput.value = ''; // Clear the input field
                } catch (error) {
                    alert(error.message);
                }
            }

            // Function to convert the unit (kg to lb or lb to kg)
            function convertUnit() {
                currentUnit = currentUnit === 'kg' ? 'lb' : 'kg';
                const convertButton = document.getElementById('convertUnit');
                convertButton.textContent = currentUnit === 'kg' ? 'Convert to Pounds' : 'Convert to Kilograms';
                updateResult();
            }

            // Function to update the result
            function updateResult() {
                const resultElement = document.getElementById('result');
                const displayWeight = currentUnit === 'lb' ? (currentWeight / 0.453592).toFixed(2) : currentWeight.toFixed(2);
                resultElement.textContent = `Total Weight: ${displayWeight} ${currentUnit}`;
            }

            // Event listeners for adding weights and converting units
            document.getElementById('addWeight').addEventListener('click', addWeight);
            document.getElementById('convertUnit').addEventListener('click', convertUnit);

            break;

    }
}

// Event listeners for mode buttons
const exerciseButton = document.getElementById('exerciseMode');
const bmiButton = document.getElementById('bmiMode');
const weightsButton = document.getElementById('weightsMode');

exerciseButton.addEventListener('click', () => {
    updateContent('exercise');
});

bmiButton.addEventListener('click', () => {
    updateContent('bmi');
});

weightsButton.addEventListener('click', () => {
    updateContent('weights');
});

// Initialize the app with the Exercise Tracker mode
updateContent('exercise');
