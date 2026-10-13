// Оқушылар тізімі және олардың бағалары
const students = [
    { id: 1, name: "Әлихан Серікұлы", bzhb: 85, tzhb: 90 },
    { id: 2, name: "Аружан Маратқызы", bzhb: 70, tzhb: 75 },
    { id: 3, name: "Нұрдәулет Ерболатұлы", bzhb: 95, tzhb: 92 },
    { id: 4, name: "Дильназ Қайратқызы", bzhb: 60, tzhb: 65 }
];

// Кестені толтыру функциясы
function loadTable() {
    const tableBody = document.getElementById("studentTable");
    tableBody.innerHTML = "";

    students.forEach((student, index) => {
        tableBody.innerHTML += `
            <tr class="hover:bg-gray-50">
                <td class="p-3 font-medium">${student.name}</td>
                <td class="p-3 text-center"><input type="number" id="bzhb_${index}" value="${student.bzhb}" class="w-16 border rounded text-center p-1"></td>
                <td class="p-3 text-center"><input type="number" id="tzhb_${index}" value="${student.tzhb}" class="w-16 border rounded text-center p-1"></td>
                <td class="p-3 text-center font-bold text-indigo-600" id="final_${index}">-</td>
            </tr>
        `;
    });
}

// Бағаны салмақпен есептеу алгоритмі (БЖБ 40%, ТЖБ 60%) және табель шығару
function calculateGrades() {
    let reportHTML = `<h3 class="font-bold text-center text-lg mb-2">ТОҚСАНДЫҚ ТАБЕЛЬ</h3><ul class="divide-y divide-gray-200">`;

    students.forEach((student, index) => {
        let bzhbVal = parseFloat(document.getElementById(`bzhb_${index}`).value) || 0;
        let tzhbVal = parseFloat(document.getElementById(`tzhb_${index}`).value) || 0;

        // Формула: (БЖБ * 0.4) + (ТЖБ * 0.6)
        let finalScore = (bzhbVal * 0.4) + (tzhbVal * 0.6);
        let letterGrade = getLetterGrade(finalScore);

        document.getElementById(`final_${index}`).innerText = `${finalScore.toFixed(1)} (${letterGrade})`;

        reportHTML += `<li class="py-2 flex justify-between"><span>${student.name}</span> <span class="font-bold">${letterGrade} (${finalScore.toFixed(1)} ұпай)</span></li>`;
    });

    reportHTML += `</ul>`;
    document.getElementById("reportCard").innerHTML = reportHTML;
}

// Әріптік бағаға түрлендіру
function getLetterGrade(score) {
    if (score >= 85) return '5 (Үздік)';
    if (score >= 70) return '4 (Жақсы)';
    if (score >= 50) return '3 (Қанағаттанарлық)';
    return '2 (Қанағаттанарлықсыз)';
}

// Бет ашылғанда кестені жүктеу
window.onload = loadTable;