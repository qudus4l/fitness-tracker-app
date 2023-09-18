# Incorporating Classes, Switch Statements, and Try-Catch-Finally Statements in My Website

In my website project, I've employed several programming features to enhance functionality, including object-oriented programming (OOP) principles through classes, dynamic content rendering with switch statements, and robust error handling with try-catch-finally statements. This document provides a comprehensive overview of how these features were integrated into the website's functionality.

## Classes for Exercise Logging

### ExerciseLog Class

To maintain a log of exercises, I introduced an `ExerciseLog` class, which comprises three essential components:

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

## Exercise Log Class

The `ExerciseLog` class has the following methods:

- **Constructor**: Initializes an empty array to store exercises.

- **logExercise Method**: Adds a new exercise to the log.

- **getLoggedExercises Method**: Retrieves the logged exercises.

An instance of this class, `exerciseLog`, is created to manage and display exercise data on the website.

## Dynamic Content Rendering with Switch Statements

Switch statements are employed to dynamically update the website's content based on user-selected modes.

    function updateContent(mode) {
        const contentDiv = document.getElementById('content');
        contentDiv.innerHTML = '';

        switch (mode) {
            // ... other cases ...
            
            case 'exercise':
                contentDiv.innerHTML = '';

                // Create a form for logging exercises
                const exerciseForm = document.createElement('form');
                // ... form elements ...
                contentDiv.appendChild(exerciseForm);

                // Display logged exercises or a message if none
                const loggedExercises = exerciseLog.getLoggedExercises();
                if (loggedExercises.length === 0) {
                    // ... no exercises message ...
                } else {
                    // ... display logged exercises ...
                }

                // Handle exercise logging form submission
                exerciseForm.addEventListener('submit', (event) => {
                    // ... form submission logic ...
                });
                break;

            // ... other cases ...
        }
    }

Here's a detailed breakdown of how switch statements are used for each mode:

### Exercise Tracker Mode

- Clears the content and presents a BMI calculation form.
- Calculates BMI upon form submission and displays the result.

### Weights Plates Calculator Mode

- Clears the content and shows a form for weight plates calculation.
- Allows users to add weights, convert units, and displays the total weight.

## Robust Error Handling with Try-Catch-Finally Statements

To ensure error-free user interactions, try-catch-finally statements are used when adding weights in the Weights Plates Calculator mode:

    // Function to add weight to the current weight
    function addWeight() {
        const weightInput = document.getElementById('weight');
        const weight = parseFloat(weightInput.value);

        try {
            if (isNaN(weight) || weight <= 0) {
                throw new Error('Invalid input. Please enter a positive number.');
            }

            // ... weight addition logic ...

            updateResult();
            weightInput.value = '';
        } catch (error) {
            alert(error.message);
        }
    }

- A try block parses the user input and checks if it's valid (not NaN and positive).
- If an error is detected, a custom error message is thrown.
- The catch block catches the error and displays it as an alert to the user.
- Finally, whether the input is valid or not, the input field is cleared.

## User Instructions

- When the website loads, it prompts the user to enter their name. The name is stored in local storage and displayed on the page.
- Three mode buttons are provided: Exercise Tracker, BMI Calculator, and Weights Plates Calculator. Clicking on any of these buttons switches between modes.

### Exercise Tracker Mode

In Exercise Tracker mode, users can log exercises, and logged exercises are displayed below the form.

### BMI Calculator Mode

In BMI Calculator mode, users can calculate their BMI by entering their height (in cm) and weight (in kg).

### Weights Plates Calculator Mode

In Weights Plates Calculator mode, users can add weights, convert units (kg to lb or lb to kg), and see the total weight.

These classes, switch statements, and try-catch-finally statements collectively enhance the website's functionality, making it user-friendly and resilient in handling various user interactions and input scenarios.
