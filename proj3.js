// Array of students with their scores
let students = [
    { name: "Alice", score: 85 },
    { name: "Bob", score: 72 },
    { name: "Charlie", score: 90 },
    { name: "David", score: 65 }
];

// Function to evaluate student scores using if-else statements
function evaluateScore(score) {
    if (score >= 90) {
        return "Excellent!";
    } else if (score >= 80) {
        return "Great job!";
    } else if (score >= 70) {
        return "Good effort!";
    } else {
        return "Needs improvement.";
    }
}

// Function to categorize students using a switch statement
function getStudentCategory(score) {
    switch (true) {
        case (score >= 90):
            return "A+ Student";
        case (score >= 80):
            return "A Student";
        case (score >= 70):
            return "B Student";
        case (score >= 60):
            return "C Student";
        default:
            return "Needs more effort";
    }
}

// Loop through the students array and display results
for (let i = 0; i < students.length; i++) {
    let student = students[i];
    console.log(`Student: ${student.name}`);
    console.log(`Score: ${student.score}`);
    console.log(`Performance: ${evaluateScore(student.score)}`);
    console.log(`Category: ${getStudentCategory(student.score)}`);
    console.log("----------------------");
}
