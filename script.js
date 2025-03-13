// 3D Scene Setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / 300, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, 300);
document.getElementById('3d-container').appendChild(renderer.domElement);

// Simple 3D Cube (Replace with your model)
const geometry = new THREE.BoxGeometry(2, 2, 2);
const material = new THREE.MeshPhongMaterial({ 
    color: 0x00ff88,
    wireframe: true
});
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// Lighting
const light = new THREE.PointLight(0xffffff, 1, 100);
light.position.set(10, 10, 10);
scene.add(light);
scene.add(new THREE.AmbientLight(0x404040));

camera.position.z = 5;

// Animation
function animate() {
    requestAnimationFrame(animate);
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    renderer.render(scene, camera);
}
animate();

// Form Handling
document.getElementById('fitness-form').addEventListener('submit', (e) => {
    e.preventDefault();

    // Get User Input
    const userName = document.getElementById('name').value;
    const gender = document.getElementById('gender').value;
    const weight = document.getElementById('weight').value;
    const height = document.getElementById('height').value;
    const age = document.getElementById('age').value;

    // Update Greeting
    document.getElementById('user-greeting').innerHTML = `
        Welcome, ${userName}! 🌟<br>
        Let's achieve your fitness goals together!
    `;

    // Show Input Summary
    document.getElementById('input-summary').innerHTML = `
        <h3>Your Profile</h3>
        <p>Gender: ${gender.toUpperCase()}</p>
        <p>Weight: ${weight} kg</p>
        <p>Height: ${height} cm</p>
        <p>Age: ${age} years</p>
    `;

    // Generate Plans
    const workoutPlan = generateWorkoutPlan(gender, weight, height, age);
    const dietPlan = generateDietPlan(gender, weight, height, age);

    // Display Plans
    document.getElementById('workout-plan').innerHTML = `
        <h3>Your Personalized Workout Plan</h3>
        ${workoutPlan}
    `;

    document.getElementById('diet-plan').innerHTML = `
        <h3>Your Nutrition Guide</h3>
        ${dietPlan}
    `;

    // Show Output Section
    document.querySelector('.plan-output').style.display = 'block';
});

function generateWorkoutPlan(gender, weight, height, age) {
    const bmi = (weight / ((height / 100) ** 2)).toFixed(1);
    let plan = `<p>Based on your BMI of ${bmi}:</p><ul>`;

    if (bmi < 18.5) {
        plan += `
            <li>URL myURL = new URL("https://www.mayoclinic.org/healthy-lifestyle/fitness/in-depth/strength-training/art-20046670")Strength Training 4x/week</li>
            <li>Compound Exercises (Squats, Deadlifts)</li>
            <li>30-45 min sessions</li>
        `;
    } else if (bmi < 25) {
        plan += `
            <li>Full Body Workouts 3x/week</li>
            <li>HIIT Sessions 2x/week</li>
            <li>Yoga/Stretching 1x/week</li>
        `;
    } else {
        plan += `
            <li>Cardio 5x/week</li>
            <li>Circuit Training 3x/week</li>
            <li>Core Workouts Daily</li>
        `;
    }

    return plan + '</ul>';
}

function generateDietPlan(gender, weight, height, age) {
    const calorieNeeds = gender === 'male'
        ? (88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age)).toFixed(0)
        : (447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age)).toFixed(0);

    return `
        <p>Daily Calorie Target: ${calorieNeeds} kcal</p>
        <ul>
            <li>5-6 balanced meals/day</li>
            <li>${gender === 'male' ? 'High protein intake' : 'Moderate protein + healthy fats'}</li>
            <li>Stay hydrated (3-4L water/day)</li>
        </ul>
    `;
}
